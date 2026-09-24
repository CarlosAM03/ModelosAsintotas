import type { MathematicalPoint, ScreenPoint } from "../math/types";
import type { Bounds } from "./bounds";
export interface Viewport { width: number; height: number; padding: number; }
export function toScreenPoint(point: MathematicalPoint, bounds: Bounds, viewport: Viewport): ScreenPoint {
  if (viewport.width <= 0 || viewport.height <= 0 || viewport.padding < 0) throw new Error("Invalid viewport");
  return { x: viewport.padding + (point.t - bounds.xMin) / (bounds.xMax - bounds.xMin) * (viewport.width - 2 * viewport.padding), y: viewport.height - viewport.padding - (point.y - bounds.yMin) / (bounds.yMax - bounds.yMin) * (viewport.height - 2 * viewport.padding) };
}
export function transformPoints(points: MathematicalPoint[], bounds: Bounds, viewport: Viewport): ScreenPoint[] { return points.map(p => toScreenPoint(p, bounds, viewport)); }
