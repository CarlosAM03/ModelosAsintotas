import { temporalPrefix } from "../src/graph/temporal-reveal";
import { toScreenPoint } from "../src/graph/viewport";

describe("temporal reveal", () => {
  const short = [{ t: 0, y: 0 }, { t: 5, y: 0 }, { t: 10, y: 0 }];
  const long = [{ t: 0, y: 0 }, { t: 5, y: 10 }, { t: 10, y: 0 }];
  it("synchronizes visible t and x despite different geometric lengths", () => {
    for (const progress of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
      const a = temporalPrefix(short, progress).at(-1)!;
      const b = temporalPrefix(long, progress).at(-1)!;
      expect(a.t).toBeCloseTo(b.t);
      const bounds = { xMin: 0, xMax: 10, yMin: -1, yMax: 11 };
      const viewport = { width: 1000, height: 600, padding: 60 };
      expect(toScreenPoint(a, bounds, viewport).x).toBeCloseTo(toScreenPoint(b, bounds, viewport).x);
    }
  });
  it("interpolates the last sample and handles both endpoints", () => {
    expect(temporalPrefix(long, 0)).toEqual([long[0]]);
    expect(temporalPrefix(long, 1)).toEqual(long);
    expect(temporalPrefix(long, 0.25).at(-1)).toEqual({ t: 2.5, y: 5 });
  });
});
