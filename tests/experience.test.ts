import { ExperienceController } from "../src/experience/experience.controller";
import type { ExperienceState } from "../src/experience/experience.types";
import type { AnimationController, AnimationState } from "../src/animation/types";
import type { AudioPlayback, AudioState } from "../src/audio/audio.types";

function fakeGraph() {
  let state: AnimationState = "idle";
  let progress = 0;
  const completeListeners = new Set<() => void>();
  const graph: AnimationController & { complete: () => void; calls: string[] } = {
    calls: [],
    play() { graph.calls.push("play"); state = "playing"; },
    pause() { graph.calls.push("pause"); if (state === "playing") state = "paused"; },
    reset() { graph.calls.push("reset"); state = "idle"; progress = 0; },
    replay() { graph.calls.push("replay"); state = "playing"; progress = 0; },
    showComplete() { graph.calls.push("showComplete"); state = "completed"; progress = 1; },
    getProgress: () => progress,
    getState: () => state,
    onChange: () => () => undefined,
    onComplete(listener) { completeListeners.add(listener); return () => completeListeners.delete(listener); },
    complete() { state = "completed"; progress = 1; [...completeListeners].forEach(listener => listener()); }
  };
  return graph;
}

function setup(wait: (ms: number, signal: AbortSignal) => Promise<void> = async () => undefined) {
  const b = fakeGraph();
  const a = fakeGraph();
  let audioState: AudioState = "idle";
  const audio: AudioPlayback & { calls: string[] } = {
    calls: [],
    startFromBeginning() { audio.calls.push("start"); audioState = "playing"; return Promise.resolve(); },
    pause() { audio.calls.push("pause"); audioState = "paused"; },
    reset() { audio.calls.push("reset"); audioState = "idle"; },
    getState: () => audioState
  };
  const states: ExperienceState[] = [];
  const targets: string[] = [];
  const bDisclosure = document.createElement("details");
  const aDisclosure = document.createElement("details");
  const element = (id: string) => { const node = document.createElement("div"); node.id = id; return node; };
  const controller = new ExperienceController({
    b, a, audio,
    view: { bGraph: element("b"), aGraph: element("a"), transition: element("transition"), closing: element("closing"), bDisclosure, aDisclosure },
    wait,
    scroll: async target => { targets.push(typeof target === "number" ? "home" : target.id); },
    readDisclosure: async (target) => { targets.push(target === bDisclosure ? "math-b" : "math-a"); },
    home: () => { targets.push("reset-home"); },
    onState: state => states.push(state)
  });
  return { controller, b, a, audio, bDisclosure, aDisclosure, states, targets };
}

const flush = async () => { for (let i = 0; i < 25; i++) await Promise.resolve(); };

describe("ExperienceController", () => {
  it("starts only when enabled; the manual initial state never plays a graph", async () => {
    const subject = setup();
    await flush();
    expect(subject.controller.getState()).toBe("IDLE");
    expect(subject.b.calls).toEqual([]);
    expect(subject.a.calls).toEqual([]);
    expect(subject.audio.calls).toEqual([]);
  });
  it("runs B, equations B, A, equations A, closing, home once", async () => {
    const subject = setup();
    subject.controller.enable();
    await flush();
    expect(subject.controller.getState()).toBe("PLAYING_B");
    subject.b.complete();
    await flush();
    expect(subject.bDisclosure.open).toBe(true);
    expect(subject.controller.getState()).toBe("PLAYING_A");
    subject.a.complete();
    await flush();
    expect(subject.aDisclosure.open).toBe(true);
    expect(subject.controller.getState()).toBe("COMPLETE");
    expect(subject.targets).toEqual(["reset-home", "b", "math-b", "transition", "a", "math-a", "closing", "home"]);
    expect(subject.b.calls.filter(call => call === "play")).toHaveLength(1);
    expect(subject.a.calls.filter(call => call === "play")).toHaveLength(1);
    expect(subject.states.indexOf("READING_B_MATH")).toBeLessThan(subject.states.indexOf("PLAYING_A"));
    expect(subject.audio.calls).toEqual(["reset", "start", "reset"]);
    expect(subject.audio.getState()).toBe("idle");
  });

  it("cancels pending work, preserves disclosures, ignores stale callbacks and restarts from zero", async () => {
    let release: (() => void) | undefined;
    const subject = setup(() => new Promise<void>(resolve => { release = resolve; }));
    subject.controller.enable();
    subject.bDisclosure.open = true;
    subject.controller.disable();
    expect(subject.controller.getState()).toBe("MANUAL");
    expect(subject.audio.getState()).toBe("paused");
    expect(subject.bDisclosure.open).toBe(true);
    release?.();
    await flush();
    expect(subject.b.calls).not.toContain("play");
    subject.controller.enable();
    expect(subject.bDisclosure.open).toBe(false);
    expect(subject.b.calls.filter(call => call === "reset")).toHaveLength(2);
    expect(subject.targets.filter(target => target === "reset-home")).toHaveLength(2);
    expect(subject.audio.calls).toEqual(["reset", "start", "pause", "reset", "start"]);
  });

  it("pauses the active graph and handles reduced motion without autoplay", async () => {
    const subject = setup();
    subject.controller.enable();
    await flush();
    subject.controller.disable();
    expect(subject.b.getState()).toBe("paused");
    expect(subject.audio.getState()).toBe("paused");
    subject.controller.setReducedMotion(true);
    expect(subject.controller.getState()).toBe("MANUAL_REDUCED");
    expect(subject.b.getProgress()).toBe(1);
    expect(subject.a.getProgress()).toBe(1);
    subject.controller.enable();
    expect(subject.controller.isAutoplayOn()).toBe(false);
    expect(subject.audio.calls.filter(call => call === "start")).toHaveLength(1);
  });

  it("continues visually when audio playback reports a blocked request", async () => {
    const subject = setup();
    subject.audio.startFromBeginning = () => { subject.audio.calls.push("blocked"); return Promise.reject(new Error("Playback denied")); };
    subject.controller.enable();
    await flush();
    expect(subject.controller.getState()).toBe("PLAYING_B");
    subject.b.complete();
    await flush();
    subject.a.complete();
    await flush();
    expect(subject.controller.getState()).toBe("COMPLETE");
  });

  it("stops the soundtrack and exposes complete graphs if reduced motion begins mid-run", async () => {
    const subject = setup();
    subject.controller.enable();
    await flush();
    subject.controller.setReducedMotion(true);
    expect(subject.controller.getState()).toBe("MANUAL_REDUCED");
    expect(subject.audio.getState()).toBe("paused");
    expect(subject.b.getProgress()).toBe(1);
    expect(subject.a.getProgress()).toBe(1);
    subject.controller.enable();
    expect(subject.audio.calls.filter(call => call === "start")).toHaveLength(1);
  });
});
