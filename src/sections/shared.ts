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
    const path = createPath("", item.className);
    svg.append(path);
    return { path, points: item.points, timing: item.timing };
  });
  container.replaceChildren(svg);
  const controller = createAnimationController({
    config,
    update: progress => paths.forEach(({ path, points, timing }) => {
      const visible = temporalPrefix(points, localProgress(progress, timing));
      path.setAttribute("d", pointsToPath(transformPoints(visible, bounds, viewport)));
    })
  });
  return { controller, svg };
}
