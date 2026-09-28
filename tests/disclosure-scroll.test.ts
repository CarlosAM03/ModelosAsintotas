import { readDisclosure } from "../src/experience/scroll";

describe("long mathematical disclosure", () => {
  it("visits the full height in readable steps and ends at the final portion", async () => {
    const details = document.createElement("details");
    const content = document.createElement("div");
    content.className = "equations";
    details.append(content);
    content.getBoundingClientRect = () => ({ top: 120, bottom: 2800, height: 2680, left: 0, right: 320, width: 320, x: 0, y: 120, toJSON: () => undefined });
    const visited: number[] = [];
    let waited = 0;
    await readDisclosure(details, 7000, new AbortController().signal,
      async target => { visited.push(target as number); },
      async ms => { waited += ms; });
    expect(visited.length).toBeGreaterThan(2);
    expect(visited[0]).toBe(40);
    expect(visited.at(-1)).toBe(2800 - window.innerHeight + 80);
    expect(waited).toBeGreaterThan(4000);
  });
});
