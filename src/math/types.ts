export interface MathematicalPoint { t: number; y: number; }
export type MathematicalFunction = (t: number) => number;
export interface ScreenPoint { x: number; y: number; }
export function assertFinite(value: number, label = "value"): number {
  if (!Number.isFinite(value)) throw new Error(`${label} must be finite`);
  return value;
}
