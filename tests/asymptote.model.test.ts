import { asymptoteParameters } from "../src/models/asymptote/asymptote.parameters";
import { createAsymptoteModel } from "../src/models/asymptote/asymptote.model";
import type { AsymptoteParameters } from "../src/models/asymptote/asymptote.types";

const model = createAsymptoteModel(asymptoteParameters);
const sampleTimes = [0, 0.5, 1, 5, 10];

function parametersWith(mutator: (parameters: AsymptoteParameters) => void): AsymptoteParameters {
  const parameters: AsymptoteParameters = {
    ...asymptoteParameters,
    domain: { ...asymptoteParameters.domain },
    limit: { ...asymptoteParameters.limit },
    carlos: { ...asymptoteParameters.carlos },
    fer: { ...asymptoteParameters.fer },
  };
  mutator(parameters);
  return parameters;
}

describe("Modelo B", () => {
  it("mantiene determinismo y valores finitos en todo el dominio baseline", () => {
    for (const t of sampleTimes) {
      const values = [
        model.limit(t), model.carlos(t), model.fer(t),
        model.carlosDistanceToLimit(t), model.ferDistanceToLimit(t), model.interpersonalDistance(t),
      ];
      const repeatedValues = [
        model.limit(t), model.carlos(t), model.fer(t),
        model.carlosDistanceToLimit(t), model.ferDistanceToLimit(t), model.interpersonalDistance(t),
      ];
      expect(values.every(Number.isFinite)).toBe(true);
      expect(repeatedValues).toEqual(values);
    }
  });

  it("expone las identidades matemáticas de distancia y su no negatividad", () => {
    for (const t of sampleTimes) {
      expect(model.carlosDistanceToLimit(t)).toBeCloseTo(Math.abs(model.carlos(t) - model.limit(t)), 12);
      expect(model.ferDistanceToLimit(t)).toBeCloseTo(Math.abs(model.fer(t) - model.limit(t)), 12);
      expect(model.interpersonalDistance(t)).toBeCloseTo(Math.abs(model.carlos(t) - model.fer(t)), 12);
      expect(model.carlosDistanceToLimit(t)).toBeGreaterThanOrEqual(0);
      expect(model.ferDistanceToLimit(t)).toBeGreaterThanOrEqual(0);
      expect(model.interpersonalDistance(t)).toBeGreaterThanOrEqual(0);
    }
  });

  it("converge asintóticamente hacia la línea límite", () => {
    const early = model.interpersonalDistance(1);
    const late = model.interpersonalDistance(100);
    expect(model.carlosDistanceToLimit(100)).toBeLessThan(1e-9);
    expect(model.ferDistanceToLimit(100)).toBeLessThan(1e-9);
    expect(late).toBeLessThan(early);
    expect(late).toBeLessThan(1e-8);
  });

  it("acepta frecuencia cero y conserva finitud y asintoticidad", () => {
    const zeroFrequencyModel = createAsymptoteModel(parametersWith((parameters) => {
      parameters.carlos.frequency = 0;
      parameters.fer.frequency = 0;
    }));
    for (const t of [0, 1, 10, 100]) {
      expect(Number.isFinite(zeroFrequencyModel.carlos(t))).toBe(true);
      expect(Number.isFinite(zeroFrequencyModel.fer(t))).toBe(true);
      expect(Number.isFinite(zeroFrequencyModel.interpersonalDistance(t))).toBe(true);
    }
    expect(zeroFrequencyModel.carlosDistanceToLimit(100)).toBeLessThan(1e-8);
    expect(zeroFrequencyModel.ferDistanceToLimit(100)).toBeLessThan(1e-8);
    expect(zeroFrequencyModel.interpersonalDistance(100)).toBeLessThan(1e-8);
  });

  it("rechaza amplitudes y decaimientos no positivos", () => {
    expect(() => createAsymptoteModel(parametersWith((p) => { p.carlos.amplitude = 0; }))).toThrow();
    expect(() => createAsymptoteModel(parametersWith((p) => { p.fer.amplitude = -1; }))).toThrow();
    expect(() => createAsymptoteModel(parametersWith((p) => { p.carlos.decay = 0; }))).toThrow();
    expect(() => createAsymptoteModel(parametersWith((p) => { p.fer.decay = -1; }))).toThrow();
  });

  it("rechaza parámetros no finitos y dominios inválidos", () => {
    expect(() => createAsymptoteModel(parametersWith((p) => { p.limit.slope = Number.NaN; }))).toThrow();
    expect(() => createAsymptoteModel(parametersWith((p) => { p.carlos.phase = Number.POSITIVE_INFINITY; }))).toThrow();
    expect(() => createAsymptoteModel(parametersWith((p) => { p.domain.start = 1; p.domain.end = 1; }))).toThrow();
    expect(() => createAsymptoteModel(parametersWith((p) => { p.domain.start = 2; p.domain.end = 1; }))).toThrow();
  });
});
