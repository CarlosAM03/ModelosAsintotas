import type { MathematicalFunction, MathematicalPoint } from "../math/types";
import { assertFinite } from "../math/types";
import { validateDomain } from "../math/utils";
export interface SampleOptions { start: number; end: number; samples: number; }
export function sampleFunction(fn: MathematicalFunction, options: SampleOptions): MathematicalPoint[] {
  validateDomain(options.start, options.end); if (!Number.isInteger(options.samples) || options.samples < 2) throw new Error("samples must be an integer >= 2");
  const step = (options.end - options.start) / (options.samples - 1);
  return Array.from({ length: options.samples }, (_, i) => { const t = options.start + i * step; return { t, y: assertFinite(fn(t), "function result") }; });
}
