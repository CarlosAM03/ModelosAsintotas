import { historyParameters } from "../src/models/history/history.parameters";
import { createHistoryModel } from "../src/models/history/history.model";
const model = createHistoryModel(historyParameters);
describe("Modelo A", () => {
  it("produce funciones finitas, amplitud positiva y distancia no negativa", () => { for (const t of [0, .12, .4, .7, .9, 1]) { for (const fn of [model.center, model.amplitude, model.drift, model.separation, model.carlos, model.fer, model.distance, model.coupling, model.memory]) expect(Number.isFinite(fn(t))).toBe(true); expect(model.amplitude(t)).toBeGreaterThan(0); expect(model.distance(t)).toBeGreaterThanOrEqual(0); } });
  it("es determinista y expresa pico, divergencia y coupling", () => { expect(model.carlos(.5)).toBe(model.carlos(.5)); expect(model.amplitude(.4)).toBeLessThan(model.amplitude(0)); expect(model.drift(.9)).toBeGreaterThan(model.drift(.4)); expect(model.coupling(.5)).toBeGreaterThan(model.coupling(0)); expect(model.coupling(1)).toBeLessThan(model.coupling(.5)); });
  it("implementa la memoria por tramos y converge al residual", () => {
    const { encounter: te, present: tn } = historyParameters.milestones;
    const residual = historyParameters.memory.residual;
    expect(model.memory(te - 0.001)).toBe(0);
    expect(model.memory(te)).toBeCloseTo(0, 12);
    expect(model.memory((te + tn) / 2)).toBeGreaterThan(0);
    expect(model.memory(tn)).toBeGreaterThan(residual);
    expect(model.memory(tn - 0.00001)).toBeCloseTo(model.memory(tn + 0.00001), 4);
    expect(model.memory(tn + 1)).toBeLessThan(model.memory(tn + 0.001));
    expect(model.memory(tn + 100)).toBeCloseTo(residual, 8);
    expect(model.memory(0.6)).toBe(model.memory(0.6));
  });
  it("es continua alrededor del encuentro dentro de la tolerancia numérica", () => {
    const te = historyParameters.milestones.encounter;
    const epsilon = 0.00001;
    expect(model.memory(te - epsilon)).toBe(0);
    expect(model.memory(te)).toBeCloseTo(0, 12);
    expect(model.memory(te + epsilon)).toBeCloseTo(model.memory(te), 4);
  });
  it("rechaza memoria residual o decaimiento no estrictamente positivos", () => {
    expect(() => createHistoryModel({ ...historyParameters, memory: { ...historyParameters.memory, residual: 0 } })).toThrow();
    expect(() => createHistoryModel({ ...historyParameters, memory: { ...historyParameters.memory, decay: 0 } })).toThrow();
  });
});
