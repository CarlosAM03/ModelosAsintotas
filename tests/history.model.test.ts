import { historyParameters } from "../src/models/history/history.parameters";
import { createHistoryModel } from "../src/models/history/history.model";
const model = createHistoryModel(historyParameters);
describe("Modelo A", () => {
  it("produce funciones finitas, amplitud positiva y distancia no negativa", () => { for (const t of [0, .12, .4, .7, .9, 1]) { for (const fn of [model.center, model.amplitude, model.drift, model.separation, model.carlos, model.fer, model.distance, model.coupling, model.memory]) expect(Number.isFinite(fn(t))).toBe(true); expect(model.amplitude(t)).toBeGreaterThan(0); expect(model.distance(t)).toBeGreaterThanOrEqual(0); } });
  it("es determinista y expresa pico, divergencia, coupling y memoria", () => { expect(model.carlos(.5)).toBe(model.carlos(.5)); expect(model.amplitude(.4)).toBeLessThan(model.amplitude(0)); expect(model.drift(.9)).toBeGreaterThan(model.drift(.4)); expect(model.coupling(.5)).toBeGreaterThan(model.coupling(0)); expect(model.coupling(1)).toBeLessThan(model.coupling(.5)); expect(model.memory(1)).toBeGreaterThanOrEqual(historyParameters.memory.residual); });
});
