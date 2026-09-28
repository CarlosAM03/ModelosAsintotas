import type { ExperienceController } from "../experience/experience.controller";

/** The entry gesture is the sole initial trigger for the audiovisual run. */
export function bindEntry(experience: ExperienceController, reduced: () => boolean): () => void {
  const button = document.querySelector<HTMLButtonElement>("[data-open-letter]");
  const autoplay = document.querySelector<HTMLButtonElement>("[data-autoplay]");
  const heading = document.querySelector<HTMLElement>("#intro-title");
  if (!button || !autoplay || !heading) throw new Error("Letter entry missing");
  const open = () => {
    button.hidden = true;
    autoplay.hidden = false;
    if (!reduced()) experience.enable();
    heading.focus({ preventScroll: true });
  };
  button.addEventListener("click", open, { once: true });
  return () => button.removeEventListener("click", open);
}
