import { clamp } from "../math/utils";
import type { AnimationConfig, AnimationController, AnimationState } from "./types";
interface AnimatorOptions { config: AnimationConfig; update: (progress: number) => void; raf?: (callback: FrameRequestCallback) => number; caf?: (id: number) => void; now?: () => number; }
export function createAnimationController(options: AnimatorOptions): AnimationController {
  if (!Number.isFinite(options.config.duration) || options.config.duration <= 0) throw new Error("Invalid animation duration");
  const raf = options.raf ?? requestAnimationFrame;
  const caf = options.caf ?? cancelAnimationFrame;
  const now = options.now ?? (() => performance.now());
  let state: AnimationState = "idle";
  let progress = 0;
  let startedAt = 0;
  let frame: number | undefined;
  const changes = new Set<() => void>();
  const completions = new Set<() => void>();
  const publish = () => { options.update(progress); changes.forEach(listener => listener()); };
  const cancelFrame = () => { if (frame !== undefined) caf(frame); frame = undefined; };
  const advance = (timestamp: number) => {
    if (state !== "playing") return;
    progress = clamp((timestamp - startedAt) / options.config.duration);
    if (progress >= 1) {
      state = "completed";
      frame = undefined;
      publish();
      completions.forEach(listener => listener());
    } else {
      publish();
      frame = raf(advance);
    }
  };
  const pause = () => {
    if (state !== "playing") return;
    progress = clamp((now() - startedAt) / options.config.duration);
    cancelFrame();
    state = "paused";
    publish();
  };
  const play = () => {
    if (state === "playing" || state === "completed") return;
    state = "playing";
    startedAt = now() - progress * options.config.duration;
    publish();
    frame = raf(advance);
  };
  const reset = () => { cancelFrame(); progress = 0; state = "idle"; publish(); };
  const replay = () => { reset(); play(); };
  const showComplete = () => { cancelFrame(); progress = 1; state = "completed"; publish(); };
  publish();
  return {
    play, pause, reset, replay, showComplete,
    getProgress: () => progress,
    getState: () => state,
    onChange: listener => { changes.add(listener); return () => changes.delete(listener); },
    onComplete: listener => { completions.add(listener); return () => completions.delete(listener); }
  };
}
