import type { AnimationController } from "../animation/types";
import type { AudioPlayback } from "../audio/audio.types";

export type ExperienceState =
  | "IDLE" | "INTRO" | "SCROLLING_TO_B" | "PLAYING_B"
  | "READING_B_MATH" | "TRANSITION" | "SCROLLING_TO_A"
  | "PLAYING_A" | "READING_A_MATH" | "CLOSING"
  | "RETURNING_HOME" | "COMPLETE" | "MANUAL" | "MANUAL_REDUCED";

export interface ExperienceView {
  bGraph: HTMLElement;
  aGraph: HTMLElement;
  transition: HTMLElement;
  closing: HTMLElement;
  bDisclosure: HTMLDetailsElement;
  aDisclosure: HTMLDetailsElement;
}

export interface ExperienceDependencies {
  b: AnimationController;
  a: AnimationController;
  audio?: AudioPlayback;
  view: ExperienceView;
  wait: (ms: number, signal: AbortSignal) => Promise<void>;
  scroll: (target: Element | number, duration: number, signal: AbortSignal) => Promise<void>;
  readDisclosure: (element: HTMLDetailsElement, minimumMs: number, signal: AbortSignal) => Promise<void>;
  home: () => void;
  onState?: (state: ExperienceState, autoplay: boolean) => void;
}
