import { audiovisualConfig } from "../src/audio/audio.config";
import { experienceTiming } from "../src/experience/experience.config";
import { bindEntry } from "../src/presentation/entry";
import { mountGraph } from "../src/sections/shared";
import { initializeAsymptoteSection } from "../src/sections/asymptote.section";
import { initializeHistorySection } from "../src/sections/history.section";
import type { ExperienceController } from "../src/experience/experience.controller";

describe("audiovisual presentation", () => {
  it("keeps the approved landmarks and fixed graph durations", () => {
    const t = experienceTiming;
    const aStart = t.intro + t.scrollB + t.settle + 30_000 + t.graphHoldB + t.disclosureOpen + t.readB + t.transitionTravel + t.transitionHold + t.scrollA + t.settleA;
    const end = aStart + 30_000 + t.graphHoldA + t.disclosureOpen + t.readA + t.scrollClosing + t.closing + t.returnHome;
    expect(aStart).toBe(audiovisualConfig.landmarks.modelAStartTarget);
    expect(audiovisualConfig.landmarks.musicalKnotReference - aStart).toBe(3_500);
    expect(end).toBeLessThan(audiovisualConfig.landmarks.journeyMaximum);
    expect(end).toBe(audiovisualConfig.landmarks.journeyTarget);
    expect(audiovisualConfig.audio.src).toBe("/audio/background.mp3");
  });

  it("waits for the entry gesture; reduced motion never starts autoplay", () => {
    document.body.innerHTML = '<section><h1 id="intro-title" tabindex="-1">Carta</h1><button data-open-letter>Abrir carta</button></section><button data-autoplay hidden>Autoplay</button>';
    const enable = vi.fn();
    const experience = { enable } as unknown as ExperienceController;
    bindEntry(experience, () => false);
    expect(enable).not.toHaveBeenCalled();
    document.querySelector<HTMLButtonElement>("[data-open-letter]")!.click();
    expect(enable).toHaveBeenCalledOnce();
    expect(document.querySelector<HTMLButtonElement>("[data-open-letter]")!.hidden).toBe(true);
    expect(document.querySelector<HTMLButtonElement>("[data-autoplay]")!.hidden).toBe(false);
    document.body.innerHTML = '<h1 id="intro-title" tabindex="-1">Carta</h1><button data-open-letter>Abrir carta</button><button data-autoplay hidden>Autoplay</button>';
    bindEntry(experience, () => true);
    document.querySelector<HTMLButtonElement>("[data-open-letter]")!.click();
    expect(enable).toHaveBeenCalledOnce();
  });

  it("uses exactly the sharp shared path geometry for the halo at partial and full progress", () => {
    const frames: FrameRequestCallback[] = [];
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.push(callback); return frames.length; });
    const caf = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
    const now = vi.spyOn(performance, "now").mockReturnValue(0);
    const container = document.createElement("div");
    const points = [{ t: 0, y: 0 }, { t: 1, y: 1 }, { t: 2, y: 0 }];
    const { controller } = mountGraph(container, "Title", "Description", [
      { points, className: "curve curve-limit", label: "Shared", timing: { start: 0, end: 1 } }
    ], { xMin: 0, xMax: 2, yMin: 0, yMax: 1 }, { width: 100, height: 100, padding: 10 }, { duration: 30_000 });
    const sharp = container.querySelector<SVGPathElement>(".curve-limit")!;
    const halo = container.querySelector<SVGPathElement>(".curve-halo")!;
    controller.play();
    frames.shift()!(15_000);
    const partial = sharp.getAttribute("d");
    expect(halo.getAttribute("d")).toBe(partial);
    controller.showComplete();
    expect(halo.getAttribute("d")).toBe(sharp.getAttribute("d"));
    expect(sharp.getAttribute("d")).not.toBe(partial);
    controller.reset();
    expect(halo.getAttribute("d")).toBe(sharp.getAttribute("d"));
    raf.mockRestore(); caf.mockRestore(); now.mockRestore();
  });

  it("preserves 30-second graph clocks and the approved sample counts", () => {
    const frames: FrameRequestCallback[] = [];
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.push(callback); return frames.length; });
    const caf = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
    const now = vi.spyOn(performance, "now").mockReturnValue(0);
    document.body.innerHTML = '<div data-graph="asymptote"></div><div data-graph="history"></div>';
    const graphs = [
      { controller: initializeAsymptoteSection(), selector: '[data-graph="asymptote"] .curve-limit', samples: 700 },
      { controller: initializeHistorySection(), selector: '[data-graph="history"] .curve-center', samples: 900 }
    ];
    for (const { controller, selector, samples } of graphs) {
      controller.play();
      frames.shift()!(29_999);
      expect(controller.getState()).toBe("playing");
      frames.shift()!(30_000);
      expect(controller.getState()).toBe("completed");
      const geometry = document.querySelector<SVGPathElement>(selector)!.getAttribute("d")!;
      expect((geometry.match(/L/g) ?? []).length + 1).toBe(samples);
    }
    raf.mockRestore(); caf.mockRestore(); now.mockRestore();
  });
});
