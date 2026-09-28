import type { AnimationController } from "../animation/types";
import type { ExperienceController } from "../experience/experience.controller";

type GraphName = "asymptote" | "history";

export function bindControls(
  experience: ExperienceController,
  graphs: Record<GraphName, AnimationController>,
  reduced: () => boolean
): () => void {
  const autoplay = document.querySelector<HTMLButtonElement>("[data-autoplay]");
  if (!autoplay) throw new Error("Autoplay control missing");
  const updateAutoplay = () => {
    const on = experience.isAutoplayOn();
    autoplay.textContent = experience.getState() === "COMPLETE" ? "Volver a empezar · Autoplay ON" : `Autoplay · ${on ? "ON" : "OFF"}`;
    autoplay.setAttribute("aria-pressed", String(on));
    autoplay.setAttribute("aria-label", reduced() ? "Autoplay no disponible con movimiento reducido" : experience.getState() === "COMPLETE" ? "Volver a reproducir la experiencia desde el inicio" : `Autoplay ${on ? "activado; desactivar" : "desactivado; activar desde el inicio"}`);
    autoplay.disabled = reduced();
  };
  const clickAutoplay = () => { if (experience.isAutoplayOn() && experience.getState() !== "COMPLETE") experience.disable(); else experience.enable(); updateAutoplay(); };
  autoplay.addEventListener("click", clickAutoplay);
  const cleanups: Array<() => void> = [() => autoplay.removeEventListener("click", clickAutoplay)];
  for (const name of ["asymptote", "history"] as const) {
    const graph = graphs[name];
    const buttons = {
      play: document.querySelector<HTMLButtonElement>(`[data-play="${name}"]`),
      pause: document.querySelector<HTMLButtonElement>(`[data-pause="${name}"]`),
      replay: document.querySelector<HTMLButtonElement>(`[data-replay="${name}"]`)
    };
    if (!buttons.play || !buttons.pause || !buttons.replay) throw new Error(`Controls missing for ${name}`);
    const { play, pause, replay } = buttons;
    const update = () => {
      const state = graph.getState();
      play.disabled = reduced() || state === "playing" || state === "completed";
      pause.disabled = reduced() || state !== "playing";
      replay.disabled = reduced();
      for (const [action, button] of Object.entries(buttons)) button?.setAttribute("aria-label", `${action === "play" ? "Reproducir" : action === "pause" ? "Pausar" : "Volver a ver"} Modelo ${name === "asymptote" ? "B" : "A"}`);
    };
    const act = (action: "play" | "pause" | "replay") => {
      experience.disable();
      graph[action]();
      const status = document.querySelector<HTMLElement>("[data-status]");
      if (status) status.textContent = `Modelo ${name === "asymptote" ? "B" : "A"} ${action === "play" ? "reproduciéndose" : action === "pause" ? "pausado" : "repetido"}`;
      updateAutoplay();
    };
    const handlers = {
      play: () => act("play"), pause: () => act("pause"), replay: () => act("replay")
    };
    play.addEventListener("click", handlers.play);
    pause.addEventListener("click", handlers.pause);
    replay.addEventListener("click", handlers.replay);
    const off = graph.onChange(update);
    cleanups.push(off, () => {
      play.removeEventListener("click", handlers.play);
      pause.removeEventListener("click", handlers.pause);
      replay.removeEventListener("click", handlers.replay);
    });
    update();
  }
  updateAutoplay();
  return () => cleanups.forEach(cleanup => cleanup());
}
