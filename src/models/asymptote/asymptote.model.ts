import { validateDomain } from "../../math/utils";
import type { AsymptoteModel, AsymptoteParameters } from "./asymptote.types";
function validate(p: AsymptoteParameters): void {
  validateDomain(p.domain.start, p.domain.end);
  const values = [p.limit.slope, p.limit.intercept, p.carlos.amplitude, p.carlos.decay, p.carlos.frequency, p.carlos.phase, p.fer.amplitude, p.fer.decay, p.fer.frequency, p.fer.phase];
  if (!values.every(Number.isFinite) || p.carlos.amplitude <= 0 || p.carlos.decay <= 0 || p.carlos.frequency === 0 || p.fer.amplitude <= 0 || p.fer.decay <= 0 || p.fer.frequency === 0) throw new Error("Invalid asymptote parameters");
}
export function createAsymptoteModel(p: AsymptoteParameters): AsymptoteModel {
  validate(p);
  const limit = (t: number) => p.limit.slope * t + p.limit.intercept;
  const offset = (q: AsymptoteParameters["carlos"], t: number) => q.amplitude * Math.exp(-q.decay * t) * Math.sin(q.frequency * t + q.phase);
  const carlos = (t: number) => limit(t) + offset(p.carlos, t);
  const fer = (t: number) => limit(t) + offset(p.fer, t);
  return { limit, carlos, fer, carlosDistanceToLimit: t => Math.abs(offset(p.carlos, t)), ferDistanceToLimit: t => Math.abs(offset(p.fer, t)), interpersonalDistance: t => Math.abs(carlos(t) - fer(t)) };
}
