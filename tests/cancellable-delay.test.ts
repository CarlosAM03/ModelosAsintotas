import { cancellableDelay } from "../src/experience/cancellable-delay";

describe("cancellable delays", () => {
  it("removes pending reading time on abort", async () => {
    vi.useFakeTimers();
    try {
      const aborter = new AbortController();
      const pending = cancellableDelay(5000, aborter.signal);
      aborter.abort();
      await expect(pending).rejects.toBeDefined();
      expect(vi.getTimerCount()).toBe(0);
    } finally { vi.useRealTimers(); }
  });
});
