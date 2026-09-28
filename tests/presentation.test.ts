import { renderEquations, equationCounts } from "../src/presentation/equations";
import { bindControls } from "../src/presentation/controls";
import { bindManualIntent } from "../src/presentation/intent";
import type { ExperienceController } from "../src/experience/experience.controller";
import type { AnimationController, AnimationState } from "../src/animation/types";

function graph(): AnimationController & { calls: string[]; setState: (state: AnimationState) => void } {
  let state: AnimationState = "idle";
  const listeners = new Set<() => void>();
  const result = {
    calls: [] as string[],
    setState(next: AnimationState) { state = next; listeners.forEach(listener => listener()); },
    play() { result.calls.push("play"); result.setState("playing"); },
    pause() { result.calls.push("pause"); result.setState("paused"); },
    reset() { result.calls.push("reset"); result.setState("idle"); },
    replay() { result.calls.push("replay"); result.setState("playing"); },
    showComplete() { result.setState("completed"); },
    getProgress: () => 0,
    getState: () => state,
    onChange(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener); },
    onComplete: () => () => undefined
  };
  return result;
}

describe("presentation contracts", () => {
  it("renders complete equations and keeps both disclosures accessible", () => {
    document.body.innerHTML = '<details data-equations="asymptote"><summary>Modelo B</summary><div data-equations-content="asymptote"></div></details><details data-equations="history"><summary>Modelo A</summary><div data-equations-content="history"></div></details>';
    renderEquations();
    expect(document.querySelectorAll('[data-equations-content="asymptote"] .equation')).toHaveLength(equationCounts.asymptote);
    expect(document.querySelectorAll('[data-equations-content="history"] .equation')).toHaveLength(equationCounts.history);
    expect(document.querySelectorAll('[role="math"]')).toHaveLength(equationCounts.asymptote + equationCounts.history);
    const history = document.querySelector('[data-equations-content="history"]')!;
    expect(history.textContent).toContain("H(t)");
    expect(history.textContent).toContain("Q(t)");
    expect(history.textContent).toContain("K(t)");
  });

  it("offers independent graph actions and accessible autoplay state without storage", () => {
    document.body.innerHTML = `
      <button data-autoplay></button>
      <button data-play="asymptote"></button><button data-pause="asymptote"></button><button data-replay="asymptote"></button>
      <button data-play="history"></button><button data-pause="history"></button><button data-replay="history"></button>`;
    const b = graph(); const a = graph();
    let enabled = false;
    const calls: string[] = [];
    const experience = {
      isAutoplayOn: () => enabled, getState: () => "MANUAL",
      enable: () => { calls.push("enable"); enabled = true; },
      disable: () => { calls.push("disable"); enabled = false; }
    } as unknown as ExperienceController;
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const cleanup = bindControls(experience, { asymptote: b, history: a }, () => false);
    const autoplay = document.querySelector<HTMLButtonElement>("[data-autoplay]")!;
    expect(autoplay.getAttribute("aria-pressed")).toBe("false");
    autoplay.click();
    expect(autoplay.getAttribute("aria-pressed")).toBe("true");
    document.querySelector<HTMLButtonElement>('[data-play="asymptote"]')!.click();
    expect(calls).toEqual(["enable", "disable"]);
    expect(b.calls).toEqual(["play"]);
    expect(a.calls).toEqual([]);
    expect(autoplay.getAttribute("aria-pressed")).toBe("false");
    expect(document.querySelector<HTMLButtonElement>('[data-pause="asymptote"]')!.disabled).toBe(false);
    expect(setItem).not.toHaveBeenCalled();
    cleanup(); setItem.mockRestore();
  });

  it("does not cancel a journey for incidental pointer contact", () => {
    const disable = vi.fn();
    const experience = { isRunning: () => true, disable } as unknown as ExperienceController;
    const cleanup = bindManualIntent(experience);
    window.dispatchEvent(new Event("pointerdown"));
    window.dispatchEvent(new Event("touchstart"));
    expect(disable).not.toHaveBeenCalled();
    cleanup();
  });

  it("disables motion controls and exposes the reduced state", () => {
    document.body.innerHTML = `
      <button data-autoplay></button>
      <button data-play="asymptote"></button><button data-pause="asymptote"></button><button data-replay="asymptote"></button>
      <button data-play="history"></button><button data-pause="history"></button><button data-replay="history"></button>`;
    const experience = { isAutoplayOn: () => false, getState: () => "MANUAL_REDUCED" } as unknown as ExperienceController;
    const cleanup = bindControls(experience, { asymptote: graph(), history: graph() }, () => true);
    expect(document.querySelector<HTMLButtonElement>("[data-autoplay]")!.disabled).toBe(true);
    expect(document.querySelector<HTMLButtonElement>("[data-autoplay]")!.getAttribute("aria-label")).toContain("movimiento reducido");
    for (const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-play], [data-pause], [data-replay]"))) expect(button.disabled).toBe(true);
    cleanup();
  });
});
