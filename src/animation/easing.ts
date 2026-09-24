export function linear(value: number): number { return value; }
export function easeInOut(value: number): number { return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2; }
