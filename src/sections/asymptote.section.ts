import { asymptoteParameters } from "../models/asymptote/asymptote.parameters";
import { createAsymptoteModel } from "../models/asymptote/asymptote.model";
import { sampleFunction } from "../graph/sampler";
import { calculateBounds } from "../graph/bounds";
import { mountGraph } from "./shared";
import type { AnimationController } from "../animation/types";
export function initializeAsymptoteSection(): AnimationController {
  const container = document.querySelector<HTMLElement>('[data-graph="asymptote"]'); if (!container) throw new Error("Asymptote graph container missing"); const model = createAsymptoteModel(asymptoteParameters); const options = { start: 0, end: 10, samples: 700 }; const limit = sampleFunction(model.limit, options), carlos = sampleFunction(model.carlos, options), fer = sampleFunction(model.fer, options); const bounds = calculateBounds([limit, carlos, fer]); const animationConfig = { duration: 30000 }; const result = mountGraph(container, "Modelo B: Asíntotas", "Carlos y Fer se acercan progresivamente a una trayectoria compartida.", [{ points: limit, className: "curve curve-limit", label: "Trayectoria compartida", timing: { start: 0, end: 0.92 } }, { points: carlos, className: "curve curve-carlos", label: "Carlos", timing: { start: 0.04, end: 1 } }, { points: fer, className: "curve curve-fer", label: "Fer", timing: { start: 0.04, end: 1 } }], bounds, { width: 1000, height: 600, padding: 60 }, animationConfig); return result.controller;
}
