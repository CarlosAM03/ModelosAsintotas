import { historyParameters } from "../models/history/history.parameters";
import { createHistoryModel } from "../models/history/history.model";
import { sampleFunction } from "../graph/sampler";
import { calculateBounds } from "../graph/bounds";
import { mountGraph, observeAutoplay } from "./shared";
import type { AnimationController } from "../animation/types";
export function initializeHistorySection(): AnimationController {
  const container = document.querySelector<HTMLElement>('[data-graph="history"]'); if (!container) throw new Error("History graph container missing"); const model = createHistoryModel(historyParameters); const options = { start: 0, end: 1, samples: 900 }; const carlos = sampleFunction(model.carlos, options), fer = sampleFunction(model.fer, options), center = sampleFunction(model.center, options); const bounds = calculateBounds([carlos, fer, center]); const animationConfig = { duration: 24000, autoplay: true, loop: true, loopDelay: 4000, easing: "linear" as const }; const result = mountGraph(container, "Modelo A: Historia", "Dos trayectorias evolucionan alrededor de un marco central móvil.", [{ points: carlos, className: "curve curve-carlos", label: "Carlos", timing: { start: 0, end: 1 } }, { points: fer, className: "curve curve-fer", label: "Fer", timing: { start: 0, end: 1 } }, { points: center, className: "curve curve-center", label: "Trayectoria central", timing: { start: 0, end: 1 } }], bounds, { width: 1000, height: 600, padding: 60 }, animationConfig); observeAutoplay(container, result.controller, 0.35, animationConfig); document.querySelector<HTMLButtonElement>('[data-replay="history"]')?.addEventListener("click", () => result.controller.restart()); return result.controller;
}
