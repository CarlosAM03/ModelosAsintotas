import { asymptoteParameters } from "../src/models/asymptote/asymptote.parameters";
import { createAsymptoteModel } from "../src/models/asymptote/asymptote.model";
const model = createAsymptoteModel(asymptoteParameters);
describe("Modelo B", () => {
  it("produce valores finitos, distancias no negativas y es determinista", () => { for (const t of [0, 1, 5, 10]) { expect(Number.isFinite(model.limit(t))).toBe(true); expect(model.carlos(t)).toBe(model.carlos(t)); expect(model.fer(t)).toBe(model.fer(t)); expect(model.interpersonalDistance(t)).toBeGreaterThanOrEqual(0); } });
  it("converge asintóticamente", () => { expect(model.carlosDistanceToLimit(100)).toBeLessThan(1e-9); expect(model.ferDistanceToLimit(100)).toBeLessThan(1e-9); expect(model.interpersonalDistance(100)).toBeLessThan(1e-8); });
});
