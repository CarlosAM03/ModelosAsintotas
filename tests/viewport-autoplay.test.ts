import { observeAutoplay } from "../src/sections/shared";
import type { AnimationController } from "../src/animation/types";

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  readonly callback: IntersectionObserverCallback;
  readonly disconnect = vi.fn();
  readonly observe = vi.fn();
  constructor(callback: IntersectionObserverCallback) { this.callback = callback; FakeIntersectionObserver.instances.push(this); }
  emit(isIntersecting: boolean, intersectionRatio: number): void { this.callback([{ isIntersecting, intersectionRatio, target: document.createElement("div") } as unknown as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
}

function controller(): AnimationController & { play: ReturnType<typeof vi.fn> } {
  return { play: vi.fn(), restart: vi.fn(), stop: vi.fn(), getProgress: () => 0, getState: () => "idle", };
}

describe("viewport autoplay", () => {
  beforeEach(() => { FakeIntersectionObserver.instances = []; vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver); });
  afterEach(() => { vi.unstubAllGlobals(); });

  it("does not play below the configured threshold", () => {
    const graph = controller();
    observeAutoplay(document.createElement("section"), graph, 0.35, { autoplay: true });
    expect(FakeIntersectionObserver.instances).toHaveLength(1);
    FakeIntersectionObserver.instances[0].emit(true, 0.2);
    expect(graph.play).not.toHaveBeenCalled();
  });

  it("plays exactly at the configured threshold and only once", () => {
    const graph = controller();
    observeAutoplay(document.createElement("section"), graph, 0.35, { autoplay: true });
    const observer = FakeIntersectionObserver.instances[0];
    observer.emit(true, 0.35);
    observer.emit(true, 0.8);
    expect(graph.play).toHaveBeenCalledTimes(1);
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it("plays above the configured threshold", () => {
    const graph = controller();
    observeAutoplay(document.createElement("section"), graph, 0.35, { autoplay: true });
    FakeIntersectionObserver.instances[0].emit(true, 0.8);
    expect(graph.play).toHaveBeenCalledTimes(1);
  });

  it("does not observe or play when autoplay is false", () => {
    const graph = controller();
    observeAutoplay(document.createElement("section"), graph, 0.35, { autoplay: false });
    expect(FakeIntersectionObserver.instances).toHaveLength(0);
    expect(graph.play).not.toHaveBeenCalled();
  });

  it("keeps viewport activation independent between graphs", () => {
    const first = controller();
    const second = controller();
    observeAutoplay(document.createElement("section"), first, 0.35, { autoplay: true });
    observeAutoplay(document.createElement("section"), second, 0.35, { autoplay: true });
    FakeIntersectionObserver.instances[0].emit(true, 0.8);
    expect(first.play).toHaveBeenCalledTimes(1);
    expect(second.play).not.toHaveBeenCalled();
  });

  it("uses the autoplay fallback when IntersectionObserver is unavailable", () => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(window, "IntersectionObserver");
    Reflect.deleteProperty(globalThis, "IntersectionObserver");
    const graph = controller();
    observeAutoplay(document.createElement("section"), graph, 0.35, { autoplay: true });
    expect(graph.play).toHaveBeenCalledTimes(1);
  });
});
