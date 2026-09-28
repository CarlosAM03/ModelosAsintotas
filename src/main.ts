import "./styles.css";
import { initializeAsymptoteSection } from "./sections/asymptote.section";
import { initializeHistorySection } from "./sections/history.section";
import { ExperienceController } from "./experience/experience.controller";
import { cancellableDelay } from "./experience/cancellable-delay";
import { cinematicScroll, readDisclosure, returnHome } from "./experience/scroll";
import { bindControls } from "./presentation/controls";
import { bindManualIntent } from "./presentation/intent";
import { renderEquations } from "./presentation/equations";
import { bindEntry } from "./presentation/entry";
import { AudioController } from "./audio/audio.controller";
import { audiovisualConfig } from "./audio/audio.config";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
returnHome();
renderEquations();

const b = initializeAsymptoteSection();
const a = initializeHistorySection();
const requireElement = <T extends Element>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing presentation element: ${selector}`);
  return element;
};
const media = window.matchMedia("(prefers-reduced-motion: reduce)");
const status = requireElement<HTMLElement>("[data-status]");
const audioElement = requireElement<HTMLAudioElement>("[data-soundtrack]");
audioElement.src = audiovisualConfig.audio.src;
audioElement.preload = "auto";
const soundtrack = new AudioController(audioElement, () => {
  status.textContent = "La experiencia continúa sin audio.";
});
const experience = new ExperienceController({
  b, a, audio: soundtrack,
  view: {
    bGraph: requireElement('[data-graph="asymptote"]'),
    aGraph: requireElement('[data-graph="history"]'),
    transition: requireElement(".transition"),
    closing: requireElement("#closing"),
    bDisclosure: requireElement<HTMLDetailsElement>('[data-equations="asymptote"]'),
    aDisclosure: requireElement<HTMLDetailsElement>('[data-equations="history"]')
  },
  wait: cancellableDelay,
  scroll: cinematicScroll,
  readDisclosure,
  home: returnHome,
  onState: (state, on) => {
    const control = document.querySelector<HTMLButtonElement>("[data-autoplay]");
    if (control) {
      control.textContent = state === "COMPLETE" ? "Volver a empezar · Autoplay ON" : `Autoplay · ${on ? "ON" : "OFF"}`;
      control.setAttribute("aria-pressed", String(on));
      control.setAttribute("aria-label", media.matches ? "Autoplay no disponible con movimiento reducido" : state === "COMPLETE" ? "Volver a reproducir la experiencia desde el inicio" : `Autoplay ${on ? "activado; desactivar" : "desactivado; activar desde el inicio"}`);
    }
    if (state === "COMPLETE") status.textContent = "Experiencia completa";
    else if (state === "MANUAL_REDUCED") status.textContent = "Movimiento reducido: navegación manual";
    else if (state === "MANUAL") status.textContent = "Autoplay desactivado";
    else if (state === "INTRO") status.textContent = "Autoplay activado desde el inicio";
  }
});
bindControls(experience, { asymptote: b, history: a }, () => media.matches);
bindManualIntent(experience);
bindEntry(experience, () => media.matches);
const motionChanged = () => {
  experience.setReducedMotion(media.matches);
  document.querySelector<HTMLButtonElement>("[data-autoplay]")!.disabled = media.matches;
  if (!media.matches) { b.showComplete(); a.showComplete(); }
};
media.addEventListener?.("change", motionChanged);
if (media.matches) motionChanged();
window.addEventListener("load", () => { if (!experience.isRunning()) returnHome(); }, { once: true });
