import { sigmoid } from "../../math/sigmoid";
import { validateDomain } from "../../math/utils";
import type { HistoryModel, HistoryParameters, NoiseTerm } from "./history.types";
function validate(p: HistoryParameters): void {
  validateDomain(p.domain.start, p.domain.end);
  const flat = [p.milestones.encounter, p.milestones.peak, p.milestones.divergence, p.milestones.present, p.center.slope, p.center.intercept, p.center.amplitude, p.center.frequency, p.center.phase, p.oscillation.initialAmplitude, p.oscillation.minimumAmplitude, p.oscillation.finalAmplitude, p.oscillation.frequency, p.oscillation.phase, p.drift.initial, p.drift.final, p.transitions.encounterSharpness, p.transitions.peakSharpness, p.transitions.divergenceSharpness, p.transitions.presentSharpness, p.memory.decay, p.memory.residual, ...p.perturbations.carlos.flatMap(n => [n.amplitude, n.frequency, n.phase]), ...p.perturbations.fer.flatMap(n => [n.amplitude, n.frequency, n.phase])];
  if (!flat.every(Number.isFinite) || !(p.milestones.encounter < p.milestones.peak && p.milestones.peak < p.milestones.divergence && p.milestones.divergence < p.milestones.present) || p.oscillation.minimumAmplitude <= 0 || p.memory.decay <= 0 || p.memory.residual <= 0) throw new Error("Invalid history parameters");
}
const noise = (terms: NoiseTerm[], t: number) => terms.reduce((sum, n) => sum + n.amplitude * Math.sin(n.frequency * t + n.phase), 0);
const integrate = (fn: (t: number) => number, start: number, end: number, steps = 160): number => {
  if (start === end) return 0;
  const h = (end - start) / steps;
  let total = 0;
  for (let i = 0; i <= steps; i++) {
    const t = start + i * h;
    total += (i === 0 || i === steps ? 0.5 : 1) * fn(t);
  }
  return total * h;
};
export function createHistoryModel(p: HistoryParameters): HistoryModel {
  validate(p); const { milestones: m, transitions: k } = p;
  const center = (t: number) => p.center.slope * t + p.center.intercept + p.center.amplitude * Math.sin(p.center.frequency * t + p.center.phase);
  const amplitude = (t: number) => p.oscillation.initialAmplitude - (p.oscillation.initialAmplitude - p.oscillation.minimumAmplitude) * sigmoid(t, m.peak, k.peakSharpness) + (p.oscillation.finalAmplitude - p.oscillation.minimumAmplitude) * sigmoid(t, m.divergence, k.divergenceSharpness);
  const drift = (t: number) => p.drift.initial * (1 - sigmoid(t, m.encounter, k.encounterSharpness)) + p.drift.final * sigmoid(t, m.divergence, k.divergenceSharpness);
  const coupling = (t: number) => sigmoid(t, m.encounter, k.encounterSharpness) * (1 - sigmoid(t, m.present, k.presentSharpness));
  const separation = (t: number) => drift(t) + amplitude(t) * Math.sin(p.oscillation.frequency * t + p.oscillation.phase);
  const carlos = (t: number) => center(t) + separation(t) / 2 + (1 - coupling(t)) * noise(p.perturbations.carlos, t);
  const fer = (t: number) => center(t) - separation(t) / 2 + (1 - coupling(t)) * noise(p.perturbations.fer, t);
  const interaction = (start: number, end: number) => integrate(coupling, start, end);
  const qn = interaction(m.encounter, m.present);
  if (!(qn > 0) || !Number.isFinite(qn)) throw new Error("Invalid history interaction integral: Q_n must be positive");
  const transientMemory = (t: number, end: number) => integrate(s => coupling(s) * Math.exp(-p.memory.decay * (t - s)), m.encounter, end);
  const memory = (t: number) => {
    if (t < m.encounter) return 0;
    if (t <= m.present) {
      const q = interaction(m.encounter, t);
      return p.memory.residual * (q / qn) + transientMemory(t, t);
    }
    return p.memory.residual + transientMemory(t, m.present);
  };
  return { center, amplitude, drift, separation, carlos, fer, distance: t => Math.abs(carlos(t) - fer(t)), coupling, memory };
}
