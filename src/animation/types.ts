export type AnimationState = "idle" | "playing" | "paused" | "completed";
export interface CurveTiming { start: number; end: number; }
export interface AnimationConfig { duration: number; }
export interface AnimationController {
  play(): void;
  pause(): void;
  reset(): void;
  replay(): void;
  showComplete(): void;
  getProgress(): number;
  getState(): AnimationState;
  onChange(listener: () => void): () => void;
  onComplete(listener: () => void): () => void;
}
