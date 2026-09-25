import { createAnimationController } from "../animation/animator";
import { localProgress } from "../animation/timeline";
import type { AnimationConfig, AnimationController, CurveTiming } from "../animation/types";
import { createPath, createSvg } from "../graph/svg";
import { pointsToPath } from "../graph/path";
import { transformPoints, type Viewport } from "../graph/viewport";
import type { MathematicalPoint, ScreenPoint } from "../math/types";
import type { Bounds } from "../graph/bounds";
export function mountGraph(container: HTMLElement, title: string, description: string, series: Array<{ points: MathematicalPoint[]; className: string; label: string; timing: CurveTiming }>, bounds: Bounds, viewport: Viewport, config: AnimationConfig): { controller: AnimationController; svg: SVGSVGElement } {
  const svg = createSvg(title, description); const paths = series.map(item => { const d = pointsToPath(transformPoints(item.points, bounds, viewport)); const path = createPath(d, item.className, item.label); svg.append(path); const length = path.getTotalLength ? path.getTotalLength() : 1000; path.style.strokeDasharray = `${length}`; path.style.strokeDashoffset = `${length}`; return { path, timing: item.timing }; }); container.replaceChildren(svg);
  const controller = createAnimationController({ config, reducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false, update: progress => paths.forEach(({ path, timing }) => { const length = Number(path.style.strokeDasharray) || 1000; path.style.strokeDashoffset = `${length * (1 - localProgress(progress, timing))}`; }) }); return { controller, svg };
}
export function observeAutoplay(element: HTMLElement, controller: AnimationController, threshold: number, config: Pick<AnimationConfig, "autoplay">): void {
  if (!config.autoplay) return;
  if (!("IntersectionObserver" in window)) { controller.play(); return; }
  let activated = false;
  const observer = new IntersectionObserver(entries => { if (!activated && entries.some(e => e.isIntersecting && e.intersectionRatio >= threshold)) { activated = true; controller.play(); observer.disconnect(); } }, { threshold });
  observer.observe(element);
}
