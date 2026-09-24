export function clamp(value: number, min = 0, max = 1): number { return Math.min(max, Math.max(min, value)); }
export function validateDomain(start: number, end: number): void {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) throw new Error("Invalid domain");
}
