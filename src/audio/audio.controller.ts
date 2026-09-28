import type { AudioPlayback, AudioState } from "./audio.types";

/** Owns the single soundtrack; it has no knowledge of graph or narrative time. */
export class AudioController implements AudioPlayback {
  private state: AudioState = "idle";
  private attempt = 0;
  private failureReported = false;

  constructor(private readonly audio: HTMLAudioElement, private readonly onFailure?: () => void) {
    audio.addEventListener("ended", () => { if (this.state === "playing") this.state = "ended"; });
    audio.addEventListener("error", () => { if (this.state !== "idle") this.fail("error"); });
  }

  getState(): AudioState { return this.state; }

  private fail(state: "blocked" | "error"): void {
    this.state = state;
    if (!this.failureReported) { this.failureReported = true; this.onFailure?.(); }
  }

  startFromBeginning(): Promise<void> {
    const attempt = ++this.attempt;
    this.failureReported = false;
    this.audio.pause();
    try {
      this.audio.currentTime = 0;
      // Keep play() in the original user-gesture call stack, before any await.
      const playback = this.audio.play();
      return Promise.resolve(playback).then(() => {
        if (attempt === this.attempt && this.state !== "error") this.state = "playing";
      }).catch((error: unknown) => {
        if (attempt === this.attempt) this.fail(error instanceof DOMException && error.name === "NotAllowedError" ? "blocked" : "error");
      });
    } catch (error) {
      if (attempt === this.attempt) this.fail(error instanceof DOMException && error.name === "NotAllowedError" ? "blocked" : "error");
      return Promise.resolve();
    }
  }

  pause(): void {
    ++this.attempt;
    this.audio.pause();
    if (this.state === "playing") this.state = "paused";
  }

  reset(): void {
    ++this.attempt;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.state = "idle";
    this.failureReported = false;
  }
}
