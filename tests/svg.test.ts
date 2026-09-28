import { createPath } from "../src/graph/svg";

describe("SVG utilities", () => {
  it("accepts a space-separated list of CSS classes", () => {
    expect(() => createPath("M0 0 L1 1", "curve curve-limit")).not.toThrow();

    const path = createPath("M0 0 L1 1", "curve curve-limit");
    expect(path.classList.contains("curve")).toBe(true);
    expect(path.classList.contains("curve-limit")).toBe(true);
    expect(path.hasAttribute("aria-label")).toBe(false);
  });

  it("accepts an explicit class-name array", () => {
    const path = createPath("M0 0", ["curve", "curve-center"]);
    expect(Array.from(path.classList)).toEqual(["curve", "curve-center"]);
  });
});
