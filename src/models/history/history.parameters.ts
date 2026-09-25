import type { HistoryParameters } from "./history.types";
export const historyParameters: HistoryParameters = {
  domain: { start: 0, end: 1 }, milestones: { encounter: 0.12, peak: 0.28, divergence: 0.74, present: 0.90 },
  center: { slope: 0.35, intercept: 0, amplitude: 0.12, frequency: 6.28318530718, phase: 0.20 },
  oscillation: { initialAmplitude: 1.35, minimumAmplitude: 0.20, finalAmplitude: 0.95, frequency: 44.5575191895, phase: 0.25 },
  drift: { initial: 0.75, final: 0.96 },
  transitions: { encounterSharpness: 35, peakSharpness: 20, divergenceSharpness: 18, presentSharpness: 35 },
  memory: { decay: 1.4, residual: 0.20 },
  perturbations: { carlos: [{ amplitude: 0.10, frequency: 21.9911, phase: 0.20 }, { amplitude: 0.06, frequency: 53.4071, phase: 1.10 }, { amplitude: 0.035, frequency: 91.1062, phase: 2.00 }], fer: [{ amplitude: 0.09, frequency: 28.2743, phase: 1.40 }, { amplitude: 0.055, frequency: 59.6903, phase: 0.60 }, { amplitude: 0.04, frequency: 84.8230, phase: 2.50 }] }
};
export const BASELINE = "v1";
