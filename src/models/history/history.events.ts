import type { HistoryEvent } from "./history.types";
export const historyEvents: HistoryEvent[] = [
  { id: "encounter", t: 0.12, significance: 1 }, { id: "first-separation", t: 0.24, significance: 0.8 },
  { id: "reconnection", t: 0.31, significance: 0.9 }, { id: "peak-entry", t: 0.40, significance: 1 },
  { id: "divergence", t: 0.70, significance: 1 }, { id: "present", t: 0.90, significance: 1 }
];
