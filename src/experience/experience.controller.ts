import { experienceTiming as timing } from "./experience.config";
import type { ExperienceDependencies, ExperienceState } from "./experience.types";

export class ExperienceController {
  private state: ExperienceState = "IDLE";
  private enabled = false;
  private reduced = false;
  private runId = 0;
  private aborter?: AbortController;
  private activeGraph?: ExperienceDependencies["a"];

  constructor(private readonly deps: ExperienceDependencies) { this.publish(); }

  getState(): ExperienceState { return this.state; }
  isAutoplayOn(): boolean { return this.enabled; }
  isRunning(): boolean { return Boolean(this.aborter && !this.aborter.signal.aborted); }
  private publish(): void { this.deps.onState?.(this.state, this.enabled); }
  private setState(state: ExperienceState): void { this.state = state; this.publish(); }

  private abortRun(): void {
    this.runId++;
    this.aborter?.abort();
    this.aborter = undefined;
    this.activeGraph?.pause();
    this.activeGraph = undefined;
  }

  disable(): void {
    this.abortRun();
    this.enabled = false;
    this.setState(this.reduced ? "MANUAL_REDUCED" : "MANUAL");
  }

  setReducedMotion(reduced: boolean): void {
    if (this.reduced === reduced) return;
    this.reduced = reduced;
    if (reduced) {
      this.disable();
      this.deps.b.showComplete();
      this.deps.a.showComplete();
    } else {
      this.setState("MANUAL");
    }
  }

  enable(): void {
    if (this.reduced) return;
    this.abortRun();
    this.deps.b.reset();
    this.deps.a.reset();
    this.deps.view.bDisclosure.open = false;
    this.deps.view.aDisclosure.open = false;
    this.deps.home();
    this.enabled = true;
    const id = ++this.runId;
    const aborter = new AbortController();
    this.aborter = aborter;
    void this.run(id, aborter.signal);
  }

  private async waitForGraph(graph: ExperienceDependencies["a"], signal: AbortSignal): Promise<void> {
    this.activeGraph = graph;
    await new Promise<void>((resolve, reject) => {
      if (signal.aborted) { reject(signal.reason); return; }
      const clean = () => { off(); signal.removeEventListener("abort", abort); };
      const abort = () => { clean(); reject(signal.reason); };
      const off = graph.onComplete(() => { clean(); resolve(); });
      signal.addEventListener("abort", abort, { once: true });
      graph.play();
    });
    this.activeGraph = undefined;
  }

  private async run(id: number, signal: AbortSignal): Promise<void> {
    const { view, wait, scroll, readDisclosure } = this.deps;
    try {
      this.setState("INTRO");
      await wait(timing.intro, signal);
      this.setState("SCROLLING_TO_B");
      await scroll(view.bGraph, timing.scrollB, signal);
      await wait(timing.settle, signal);
      this.setState("PLAYING_B");
      await this.waitForGraph(this.deps.b, signal);
      await wait(timing.graphHold, signal);
      this.setState("READING_B_MATH");
      view.bDisclosure.open = true;
      await wait(timing.disclosureOpen, signal);
      await readDisclosure(view.bDisclosure, timing.readB, signal);
      this.setState("TRANSITION");
      await scroll(view.transition, timing.transitionTravel, signal);
      await wait(timing.transitionHold, signal);
      this.setState("SCROLLING_TO_A");
      await scroll(view.aGraph, timing.scrollA, signal);
      await wait(timing.settle, signal);
      this.setState("PLAYING_A");
      await this.waitForGraph(this.deps.a, signal);
      await wait(timing.graphHold, signal);
      this.setState("READING_A_MATH");
      view.aDisclosure.open = true;
      await wait(timing.disclosureOpen, signal);
      await readDisclosure(view.aDisclosure, timing.readA, signal);
      this.setState("CLOSING");
      await scroll(view.closing, timing.scrollClosing, signal);
      await wait(timing.closing, signal);
      this.setState("RETURNING_HOME");
      await scroll(0, timing.returnHome, signal);
      if (id !== this.runId || signal.aborted) return;
      this.aborter = undefined;
      this.setState("COMPLETE");
    } catch {
      if (id !== this.runId || signal.aborted) return;
      this.disable();
    }
  }
}
