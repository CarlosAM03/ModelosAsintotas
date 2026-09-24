export interface AsymptoteParameters {
  domain: { start: number; end: number };
  limit: { slope: number; intercept: number };
  carlos: { amplitude: number; decay: number; frequency: number; phase: number };
  fer: { amplitude: number; decay: number; frequency: number; phase: number };
}
export interface AsymptoteModel {
  limit(t: number): number; carlos(t: number): number; fer(t: number): number;
  carlosDistanceToLimit(t: number): number; ferDistanceToLimit(t: number): number;
  interpersonalDistance(t: number): number;
}
