import type { MathematicalPoint } from "../math/types";
import { clamp } from "../math/utils";

/** A mathematical-time prefix. The last point retains its exact visible t. */
export function temporalPrefix(points: readonly MathematicalPoint[], progress: number): MathematicalPoint[] {
  if (points.length < 2 || !Number.isFinite(progress)) throw new Error("Invalid temporal reveal input");
  const first = points[0];
  const last = points[points.length - 1];
  if (progress <= 0) return [first];
  if (progress >= 1) return [...points];
  const visibleT = first.t + clamp(progress) * (last.t - first.t);
  let low = 0;
  let high = points.length - 1;
  while (low < high) {
    const middle = Math.floor((low + high + 1) / 2);
    if (points[middle].t <= visibleT) low = middle;
    else high = middle - 1;
  }
  const visible = points.slice(0, low + 1);
  if (low < points.length - 1 && points[low].t < visibleT) {
    const left = points[low];
    const right = points[low + 1];
    const ratio = (visibleT - left.t) / (right.t - left.t);
    visible.push({ t: visibleT, y: left.y + ratio * (right.y - left.y) });
  }
  return visible;
}
