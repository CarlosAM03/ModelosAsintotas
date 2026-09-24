import type { MathematicalPoint } from "../math/types";
export interface Bounds { xMin: number; xMax: number; yMin: number; yMax: number; }
export function calculateBounds(series: MathematicalPoint[][]): Bounds {
  if (!series.length || series.some(s => !s.length)) throw new Error("Cannot calculate empty bounds");
  const points = series.flat(); const ys = points.map(p => p.y); const xs = points.map(p => p.t); const b = { xMin: Math.min(...xs), xMax: Math.max(...xs), yMin: Math.min(...ys), yMax: Math.max(...ys) };
  if (![b.xMin, b.xMax, b.yMin, b.yMax].every(Number.isFinite) || b.xMin === b.xMax || b.yMin === b.yMax) throw new Error("Invalid bounds"); return b;
}
