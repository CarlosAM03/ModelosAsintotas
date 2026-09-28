import { createAnimationController } from "../src/animation/animator";

describe("AnimationController", () => {
  it("pauses exactly, resumes from progress, replays from zero and never loops", () => {
    let time = 0;
    let nextId = 0;
    const callbacks = new Map<number, FrameRequestCallback>();
    const values: number[] = [];
    const controller = createAnimationController({
      config: { duration: 100 }, update: value => values.push(value),
      raf: callback => { const id = ++nextId; callbacks.set(id, callback); return id; },
      caf: id => { callbacks.delete(id); }, now: () => time
    });
    const frame = (at: number) => { time = at; const [id, callback] = callbacks.entries().next().value!; callbacks.delete(id); callback(at); };
    expect(controller.getState()).toBe("idle");
    controller.play(); frame(40); controller.pause();
    expect(controller.getState()).toBe("paused");
    expect(controller.getProgress()).toBeCloseTo(0.4);
    time = 70; controller.play(); frame(100);
    expect(controller.getProgress()).toBeCloseTo(0.7);
    frame(130);
    expect(controller.getState()).toBe("completed");
    expect(callbacks.size).toBe(0);
    controller.replay();
    expect(controller.getProgress()).toBe(0);
    expect(controller.getState()).toBe("playing");
    controller.reset();
    expect(controller.getState()).toBe("idle");
    expect(values.at(-1)).toBe(0);
  });
});
