import { historyParameters } from "../src/models/history/history.parameters";
import { createHistoryModel } from "../src/models/history/history.model";
import type { HistoryParameters } from "../src/models/history/history.types";

const model = createHistoryModel(historyParameters);
const sampleTimes = [0, 0.05, 0.12, 0.2, 0.4, 0.6, 0.7, 0.9, 0.95, 1];

function parametersWith(mutator: (parameters: HistoryParameters) => void): HistoryParameters {
  const parameters: HistoryParameters = {
    ...historyParameters,
    domain: { ...historyParameters.domain },
    milestones: { ...historyParameters.milestones },
    center: { ...historyParameters.center },
    oscillation: { ...historyParameters.oscillation },
    drift: { ...historyParameters.drift },
    transitions: { ...historyParameters.transitions },
    memory: { ...historyParameters.memory },
    perturbations: {
      carlos: historyParameters.perturbations.carlos.map((term) => ({ ...term })),
      fer: historyParameters.perturbations.fer.map((term) => ({ ...term })),
    },
  };
  mutator(parameters);
  return parameters;
}

function expectRejected(mutator: (parameters: HistoryParameters) => void): void {
  expect(() => createHistoryModel(parametersWith(mutator))).toThrow();
}

describe("Modelo A", () => {
  it("acepta el baseline y exige el dominio normalizado [0, 1]", () => {
    expect(() => createHistoryModel(historyParameters)).not.toThrow();
    for (const domain of [
      { start: -1, end: 1 }, { start: 0, end: 2 },
      { start: 0.1, end: 1 }, { start: 0, end: 0.9 },
    ]) {
      expect(() => createHistoryModel(parametersWith((p) => { p.domain = domain; }))).toThrow();
    }
  });

  it("mantiene determinismo y valores finitos en [0, 1]", () => {
    const functions = [
      model.center, model.amplitude, model.drift, model.separation,
      model.carlos, model.fer, model.distance, model.coupling, model.memory,
    ];
    for (const t of sampleTimes) {
      for (const fn of functions) {
        const value = fn(t);
        expect(Number.isFinite(value)).toBe(true);
        expect(fn(t)).toBe(value);
      }
    }
  });

  it("preserva la identidad y no negatividad de la distancia", () => {
    for (const t of sampleTimes) {
      expect(model.distance(t)).toBeCloseTo(Math.abs(model.carlos(t) - model.fer(t)), 12);
      expect(model.distance(t)).toBeGreaterThanOrEqual(0);
    }
  });

  it("mantiene coupling dentro de [0, 1] y con la región baseline esperada", () => {
    for (const t of sampleTimes) {
      expect(model.coupling(t)).toBeGreaterThanOrEqual(0);
      expect(model.coupling(t)).toBeLessThanOrEqual(1);
    }
    expect(model.coupling(0.05)).toBeLessThan(model.coupling(0.5));
    expect(model.coupling(0.95)).toBeLessThan(model.coupling(0.5));
  });

  it("valida estrictamente el orden y el dominio de los milestones", () => {
    expectRejected((p) => { p.milestones.encounter = 0; });
    expectRejected((p) => { p.milestones.encounter = p.milestones.peak; });
    expectRejected((p) => { p.milestones.peak = p.milestones.divergence; });
    expectRejected((p) => { p.milestones.divergence = p.milestones.present; });
    expectRejected((p) => { p.milestones.present = 1; });
    expectRejected((p) => { p.milestones.encounter = -0.1; });
    expectRejected((p) => { p.milestones.present = 1.1; });
  });

  it("valida la envolvente de amplitud exigida por el modelo", () => {
    expectRejected((p) => { p.oscillation.minimumAmplitude = 0; });
    expectRejected((p) => { p.oscillation.minimumAmplitude = -0.1; });
    expectRejected((p) => { p.oscillation.initialAmplitude = p.oscillation.minimumAmplitude; });
    expectRejected((p) => { p.oscillation.initialAmplitude = p.oscillation.minimumAmplitude - 0.1; });
    expectRejected((p) => { p.oscillation.finalAmplitude = p.oscillation.minimumAmplitude; });
    expectRejected((p) => { p.oscillation.finalAmplitude = p.oscillation.minimumAmplitude - 0.1; });
  });

  it("implementa las tres regiones de memoria y su convergencia al residual", () => {
    const { encounter: te, present: tn } = historyParameters.milestones;
    const residual = historyParameters.memory.residual;
    for (const t of [0, 0.05, te - 0.0001]) {
      expect(model.memory(t)).toBe(0);
    }
    expect(model.memory(te)).toBe(0);
    for (const t of [te + 0.0001, 0.2, 0.5, tn]) {
      expect(Number.isFinite(model.memory(t))).toBe(true);
      expect(model.memory(t)).toBeGreaterThan(0);
    }
    expect(model.memory(tn)).toBeGreaterThan(residual);

    const nearPostInteraction = model.memory(tn + 0.001);
    const laterPostInteraction = model.memory(tn + 1);
    const veryLate = model.memory(tn + 100);
    expect(nearPostInteraction).toBeGreaterThan(residual);
    expect(laterPostInteraction).toBeLessThan(nearPostInteraction);
    expect(veryLate).toBeCloseTo(residual, 8);
  });

  it("mantiene continuidad numérica alrededor del encuentro y del final de interacción", () => {
    const { encounter: te, present: tn } = historyParameters.milestones;
    const epsilon = 0.00001;
    expect(model.memory(te - epsilon)).toBe(0);
    expect(model.memory(te)).toBe(0);
    expect(model.memory(te + epsilon)).toBeCloseTo(model.memory(te), 4);
    expect(model.memory(tn - epsilon)).toBeCloseTo(model.memory(tn + epsilon), 4);
  });

  it("rechaza invariantes de memoria no válidos", () => {
    expectRejected((p) => { p.memory.residual = 0; });
    expectRejected((p) => { p.memory.residual = -1; });
    expectRejected((p) => { p.memory.decay = 0; });
    expectRejected((p) => { p.memory.decay = -1; });
  });

  it("rechaza parámetros no finitos", () => {
    expectRejected((p) => { p.center.slope = Number.NaN; });
    expectRejected((p) => { p.oscillation.phase = Number.POSITIVE_INFINITY; });
    expectRejected((p) => { p.perturbations.carlos[0].frequency = Number.NEGATIVE_INFINITY; });
  });
});
