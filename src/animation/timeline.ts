import { clamp } from "../math/utils";
import type { CurveTiming } from "./types";
export function localProgress(progress: number, timing: CurveTiming): number { if (!(timing.start >= 0 && timing.end <= 1 && timing.start < timing.end)) throw new Error("Invalid curve timing"); return clamp((progress - timing.start) / (timing.end - timing.start)); }
