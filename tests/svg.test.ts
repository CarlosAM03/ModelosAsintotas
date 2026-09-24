import { createPath } from "../src/graph/svg";

describe("SVG utilities", () => {
  it("accepts a space-separated list of CSS classes", () => {
    expect(() => createPath("M0 0 L1 1", "curve curve-limit", "Limit")).not.toThrow();

    const path = createPath("M0 0 L1 1", "curve curve-limit", "Limit");
    expect(path.classList.contains("curve")).toBe(true);
    expect(path.classList.contains("curve-limit")).toBe(true);
  });

  it("accepts an explicit class-name array", () => {
    const path = createPath("M0 0", ["curve", "curve-center"], "Center");
    expect(Array.from(path.classList)).toEqual(["curve", "curve-center"]);
  });
});
