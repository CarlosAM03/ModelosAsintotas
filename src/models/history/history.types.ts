export interface HistoryParameters {
  domain: { start: number; end: number };
  milestones: { encounter: number; peak: number; divergence: number; present: number };
  center: { slope: number; intercept: number; amplitude: number; frequency: number; phase: number };
  oscillation: { initialAmplitude: number; minimumAmplitude: number; finalAmplitude: number; frequency: number; phase: number };
  drift: { initial: number; final: number };
  transitions: { encounterSharpness: number; peakSharpness: number; divergenceSharpness: number; presentSharpness: number };
  memory: { decay: number; residual: number };
  perturbations: { carlos: NoiseTerm[]; fer: NoiseTerm[] };
}
export interface NoiseTerm { amplitude: number; frequency: number; phase: number; }
export interface HistoryEvent { id: string; t: number; significance?: number; }
export interface HistoryModel { center(t: number): number; amplitude(t: number): number; drift(t: number): number; separation(t: number): number; carlos(t: number): number; fer(t: number): number; distance(t: number): number; coupling(t: number): number; memory(t: number): number; }
