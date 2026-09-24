export function sigmoid(t: number, center: number, sharpness: number): number {
  if (![t, center, sharpness].every(Number.isFinite)) throw new Error("Sigmoid arguments must be finite");
  return 1 / (1 + Math.exp(-sharpness * (t - center)));
}
