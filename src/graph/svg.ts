export const SVG_NS = "http://www.w3.org/2000/svg";
let svgId = 0;
export function createSvg(title: string, description: string, viewBox = "0 0 1000 600"): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg"); const id = `svg-${++svgId}`; svg.setAttribute("viewBox", viewBox); svg.setAttribute("role", "img"); svg.setAttribute("aria-labelledby", `${id}-title ${id}-desc`);
  const titleEl = document.createElementNS(SVG_NS, "title"); titleEl.id = `${id}-title`; titleEl.textContent = title;
  const descEl = document.createElementNS(SVG_NS, "desc"); descEl.id = `${id}-desc`; descEl.textContent = description; svg.append(titleEl, descEl); return svg;
}
export type SvgClassNames = string | readonly string[];

function normalizeClassNames(classNames: SvgClassNames): string[] {
  const names = typeof classNames === "string" ? classNames.trim().split(/\s+/) : classNames;
  return names.filter(Boolean);
}

export function createPath(d: string, classNames: SvgClassNames, label: string): SVGPathElement {
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.classList.add(...normalizeClassNames(classNames));
  path.setAttribute("role", "presentation");
  path.setAttribute("aria-label", label);
  return path;
}
