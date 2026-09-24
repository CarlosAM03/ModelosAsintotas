import { sampleFunction } from "../src/graph/sampler";
import { calculateBounds } from "../src/graph/bounds";
import { transformPoints } from "../src/graph/viewport";
import { pointsToPath } from "../src/graph/path";
describe("pipeline gráfico", () => {
  it("samplea extremos y cantidad solicitada", () => { const points = sampleFunction(t => t * t, { start: 0, end: 1, samples: 5 }); expect(points).toHaveLength(5); expect(points[0].t).toBe(0); expect(points.at(-1)?.t).toBe(1); });
  it("calcula bounds, viewport y path válidos", () => { const a = sampleFunction(Math.sin, { start: 0, end: 1, samples: 10 }); const b = sampleFunction(Math.cos, { start: 0, end: 1, samples: 10 }); const bounds = calculateBounds([a, b]); const screen = transformPoints(a, bounds, { width: 1000, height: 600, padding: 40 }); expect(screen.every(p => Number.isFinite(p.x) && Number.isFinite(p.y))).toBe(true); expect(pointsToPath(screen)).toMatch(/^M/); });
});
