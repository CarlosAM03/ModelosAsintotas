import { createAnimationController } from "../animation/animator";
import { localProgress } from "../animation/timeline";
import type { AnimationConfig, AnimationController, CurveTiming } from "../animation/types";
import { createPath, createSvg } from "../graph/svg";
import { pointsToPath } from "../graph/path";
import { temporalPrefix } from "../graph/temporal-reveal";
import { transformPoints, type Viewport } from "../graph/viewport";
import type { MathematicalPoint } from "../math/types";
import type { Bounds } from "../graph/bounds";
export function mountGraph(container: HTMLElement, title: string, description: string, series: Array<{ points: MathematicalPoint[]; className: string; label: string; timing: CurveTiming }>, bounds: Bounds, viewport: Viewport, config: AnimationConfig): { controller: AnimationController; svg: SVGSVGElement } {
  const svg = createSvg(title, description);
  const paths = series.map(item => {
    const shared = item.className.split(/\s+/).some(name => name === "curve-limit" || name === "curve-center");
    const halo = shared ? createPath("", "curve curve-halo") : undefined;
    const path = createPath("", item.className);
    if (halo) svg.append(halo);
    svg.append(path);
    return { path, halo, points: item.points, timing: item.timing };
  });
  container.replaceChildren(svg);
  const controller = createAnimationController({
    config,
    update: progress => paths.forEach(({ path, halo, points, timing }) => {
      const visible = temporalPrefix(points, localProgress(progress, timing));
      const geometry = pointsToPath(transformPoints(visible, bounds, viewport));
      path.setAttribute("d", geometry);
      halo?.setAttribute("d", geometry);
    })
  });
  return { controller, svg };
}
