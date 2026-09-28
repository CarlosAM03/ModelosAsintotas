import type { ExperienceController } from "../experience/experience.controller";
import { controlledScrollY } from "../experience/scroll";

export function bindManualIntent(experience: ExperienceController): () => void {
  let touchY: number | undefined;
  const cancel = () => { if (experience.isRunning()) experience.disable(); };
  const wheel = (event: WheelEvent) => {
    if (!event.isTrusted || Math.abs(event.deltaY) <= 2) return;
    requestAnimationFrame(() => { if (Math.abs(window.scrollY - controlledScrollY()) > 6) cancel(); });
  };
  const key = (event: KeyboardEvent) => {
    if (!event.isTrusted || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button, summary, input, textarea, select, [contenteditable]")) return;
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
      requestAnimationFrame(() => { if (Math.abs(window.scrollY - controlledScrollY()) > 6) cancel(); });
    }
  };
  const start = (event: TouchEvent) => { touchY = event.touches?.[0]?.clientY; };
  const move = (event: TouchEvent) => {
    const current = event.touches?.[0]?.clientY;
    if (touchY === undefined || current === undefined || Math.abs(current - touchY) < 18) return;
    requestAnimationFrame(() => { if (Math.abs(window.scrollY - controlledScrollY()) > 6) cancel(); });
  };
  const scroll = () => { if (Math.abs(window.scrollY - controlledScrollY()) > 8) cancel(); };
  const disclosure = (event: MouseEvent) => { if ((event.target as Element).closest("summary")) cancel(); };
  window.addEventListener("wheel", wheel, { passive: true });
  window.addEventListener("keydown", key);
  window.addEventListener("touchstart", start, { passive: true });
  window.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("click", disclosure);
  return () => {
    window.removeEventListener("wheel", wheel);
    window.removeEventListener("keydown", key);
    window.removeEventListener("touchstart", start);
    window.removeEventListener("touchmove", move);
    window.removeEventListener("scroll", scroll);
    document.removeEventListener("click", disclosure);
  };
}
