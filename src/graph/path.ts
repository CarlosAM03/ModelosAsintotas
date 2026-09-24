import type { ScreenPoint } from "../math/types";
export function pointsToPath(points: ScreenPoint[]): string { if (!points.length) throw new Error("Cannot create empty path"); return points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(" "); }
