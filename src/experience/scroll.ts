import { cancellableDelay } from "./cancellable-delay";

let lastControlledY = 0;
export function controlledScrollY(): number { return lastControlledY; }
function moveTo(y: number): void { lastControlledY = y; window.scrollTo(0, y); }
export function returnHome(): void { moveTo(0); }

export function scrollTargetY(target: Element | number): number {
  if (typeof target === "number") return target;
  const rect = target.getBoundingClientRect();
  const centerOffset = Math.max(24, (window.innerHeight - Math.min(rect.height, window.innerHeight * 0.74)) / 2);
  return Math.max(0, window.scrollY + rect.top - centerOffset);
}

export function cinematicScroll(target: Element | number, duration: number, signal: AbortSignal): Promise<void> {
  const destination = scrollTargetY(target);
  const origin = window.scrollY;
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(signal.reason); return; }
    if (duration <= 0 || Math.abs(destination - origin) < 1) { moveTo(destination); resolve(); return; }
    let frame = 0;
    let started: number | undefined;
    const abort = () => { cancelAnimationFrame(frame); reject(signal.reason); };
    signal.addEventListener("abort", abort, { once: true });
    const tick = (time: number) => {
      if (started === undefined) started = time;
      const p = Math.min(1, (time - started) / duration);
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      moveTo(origin + (destination - origin) * ease);
      if (p < 1) frame = requestAnimationFrame(tick);
      else { signal.removeEventListener("abort", abort); resolve(); }
    };
    frame = requestAnimationFrame(tick);
  });
}

/** Moves through tall disclosures in readable viewport-sized steps. */
export async function readDisclosure(
  element: HTMLDetailsElement,
  minimumMs: number,
  signal: AbortSignal,
  scroll: typeof cinematicScroll = cinematicScroll,
  wait: typeof cancellableDelay = cancellableDelay
): Promise<void> {
  const content = element.querySelector<HTMLElement>(".equations");
  if (!content) { await wait(minimumMs, signal); return; }
  const first = Math.max(0, window.scrollY + content.getBoundingClientRect().top - 80);
  const last = Math.max(first, window.scrollY + content.getBoundingClientRect().bottom - window.innerHeight + 80);
  const step = Math.max(180, window.innerHeight * 0.65);
  const count = Math.max(1, Math.ceil((last - first) / step) + 1);
  const perStep = Math.max(1800, minimumMs / count);
  for (let i = 0; i < count; i++) {
    const position = i === count - 1 ? last : Math.min(last, first + i * step);
    await scroll(position, Math.min(900, perStep * 0.35), signal);
    await wait(perStep - Math.min(900, perStep * 0.35), signal);
  }
}
