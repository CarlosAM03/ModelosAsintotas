export type AudioState = "idle" | "playing" | "paused" | "ended" | "blocked" | "error";

export interface AudioPlayback {
  startFromBeginning(): Promise<void>;
  pause(): void;
  reset(): void;
  getState(): AudioState;
}
