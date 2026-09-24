import { sigmoid } from "../../math/sigmoid";
import { validateDomain } from "../../math/utils";
import type { HistoryModel, HistoryParameters, NoiseTerm } from "./history.types";
function validate(p: HistoryParameters): void {
  validateDomain(p.domain.start, p.domain.end);
  const flat = [p.milestones.encounter, p.milestones.peak, p.milestones.divergence, p.milestones.present, p.center.slope, p.center.intercept, p.center.amplitude, p.center.frequency, p.center.phase, p.oscillation.initialAmplitude, p.oscillation.minimumAmplitude, p.oscillation.finalAmplitude, p.oscillation.frequency, p.oscillation.phase, p.drift.initial, p.drift.final, p.transitions.encounterSharpness, p.transitions.peakSharpness, p.transitions.divergenceSharpness, p.transitions.presentSharpness, p.memory.decay, p.memory.residual, ...p.perturbations.carlos.flatMap(n => [n.amplitude, n.frequency, n.phase]), ...p.perturbations.fer.flatMap(n => [n.amplitude, n.frequency, n.phase])];
  if (!flat.every(Number.isFinite) || !(p.milestones.encounter < p.milestones.peak && p.milestones.peak < p.milestones.divergence && p.milestones.divergence < p.milestones.present) || p.oscillation.minimumAmplitude <= 0 || p.memory.decay < 0 || p.memory.residual < 0) throw new Error("Invalid history parameters");
}
const noise = (terms: NoiseTerm[], t: number) => terms.reduce((sum, n) => sum + n.amplitude * Math.sin(n.frequency * t + n.phase), 0);
export function createHistoryModel(p: HistoryParameters): HistoryModel {
  validate(p); const { milestones: m, transitions: k } = p;
  const center = (t: number) => p.center.slope * t + p.center.intercept + p.center.amplitude * Math.sin(p.center.frequency * t + p.center.phase);
  const amplitude = (t: number) => p.oscillation.initialAmplitude - (p.oscillation.initialAmplitude - p.oscillation.minimumAmplitude) * sigmoid(t, m.peak, k.peakSharpness) + (p.oscillation.finalAmplitude - p.oscillation.minimumAmplitude) * sigmoid(t, m.divergence, k.divergenceSharpness);
  const drift = (t: number) => p.drift.initial * (1 - sigmoid(t, m.encounter, k.encounterSharpness)) + p.drift.final * sigmoid(t, m.divergence, k.divergenceSharpness);
  const coupling = (t: number) => sigmoid(t, m.encounter, k.encounterSharpness) * (1 - sigmoid(t, m.present, k.presentSharpness));
  const separation = (t: number) => drift(t) + amplitude(t) * Math.sin(p.oscillation.frequency * t + p.oscillation.phase);
  const carlos = (t: number) => center(t) + separation(t) / 2 + (1 - coupling(t)) * noise(p.perturbations.carlos, t);
  const fer = (t: number) => center(t) - separation(t) / 2 + (1 - coupling(t)) * noise(p.perturbations.fer, t);
  const memory = (t: number) => {
    const end = Math.min(t, m.present); const start = m.encounter; if (end === start) return p.memory.residual;
    const steps = 160; const h = (end - start) / steps; let integral = 0;
    for (let i = 0; i <= steps; i++) { const s = start + i * h; const weight = i === 0 || i === steps ? 0.5 : 1; integral += weight * coupling(s) * Math.exp(-p.memory.decay * (t - s)); }
    return p.memory.residual + integral * h;
  };
  return { center, amplitude, drift, separation, carlos, fer, distance: t => Math.abs(carlos(t) - fer(t)), coupling, memory };
}
