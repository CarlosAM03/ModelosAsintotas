import { clamp } from "../math/utils";
import { easeInOut, linear } from "./easing";
import type { AnimationConfig, AnimationController, AnimationState } from "./types";
interface AnimatorOptions { config: AnimationConfig; update: (progress: number) => void; raf?: (callback: FrameRequestCallback) => number; caf?: (id: number) => void; now?: () => number; reducedMotion?: boolean; }
export function createAnimationController(options: AnimatorOptions): AnimationController {
  if (!Number.isFinite(options.config.duration) || options.config.duration <= 0 || options.config.loopDelay < 0) throw new Error("Invalid animation config");
  const raf = options.raf ?? requestAnimationFrame; const caf = options.caf ?? cancelAnimationFrame; const now = options.now ?? (() => performance.now());
  const reduced = options.reducedMotion ?? options.config.reducedMotion ?? false; let state: AnimationState = "idle"; let progress = reduced ? 1 : 0; let start = 0; let frame = 0; let delay: ReturnType<typeof setTimeout> | undefined;
  options.update(progress);
  const tick: FrameRequestCallback = timestamp => { if (state !== "playing") return; progress = clamp((timestamp - start) / options.config.duration); options.update(options.config.easing === "easeInOut" ? easeInOut(progress) : linear(progress)); if (progress >= 1) { state = "completed"; if (options.config.loop && !reduced) delay = setTimeout(() => { progress = 0; options.update(0); state = "playing"; start = now(); frame = raf(tick); }, options.config.loopDelay); } else frame = raf(tick); };
  const play = () => { if (reduced) { progress = 1; state = "completed"; options.update(1); return; } if (state === "playing") return; if (delay) { clearTimeout(delay); delay = undefined; } state = "playing"; start = now() - progress * options.config.duration; frame = raf(tick); };
  const restart = () => { if (frame) caf(frame); if (delay) clearTimeout(delay); progress = 0; state = "idle"; options.update(0); play(); };
  const stop = () => { if (frame) caf(frame); if (delay) clearTimeout(delay); frame = 0; delay = undefined; state = "idle"; };
  return { play, restart, stop, getProgress: () => progress, getState: () => state };
}
