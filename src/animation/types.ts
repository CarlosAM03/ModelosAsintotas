export type AnimationState = "idle" | "playing" | "completed";
export interface CurveTiming { start: number; end: number; }
export interface AnimationConfig { duration: number; autoplay: boolean; loop: boolean; loopDelay: number; easing?: "linear" | "easeInOut"; reducedMotion?: boolean; }
export interface AnimationController { play(): void; restart(): void; stop(): void; getProgress(): number; getState(): AnimationState; }
