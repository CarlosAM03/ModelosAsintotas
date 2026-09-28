import { AudioController } from "../src/audio/audio.controller";

function setup(play: () => Promise<void> = () => Promise.resolve()) {
  const element = document.createElement("audio");
  const pause = vi.spyOn(element, "pause").mockImplementation(() => undefined);
  const playSpy = vi.spyOn(element, "play").mockImplementation(play);
  const controller = new AudioController(element);
  return { element, pause, playSpy, controller };
}

describe("AudioController", () => {
  it("requests playback synchronously from zero and supports pause/reset", async () => {
    const { element, pause, playSpy, controller } = setup();
    element.currentTime = 18;
    const started = controller.startFromBeginning();
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(element.currentTime).toBe(0);
    await started;
    expect(controller.getState()).toBe("playing");
    controller.pause();
    expect(controller.getState()).toBe("paused");
    element.currentTime = 4;
    controller.reset();
    expect(element.currentTime).toBe(0);
    expect(controller.getState()).toBe("idle");
    expect(pause).toHaveBeenCalled();
  });

  it("contains rejected playback and ignores a stale late resolution", async () => {
    const denied = setup(() => Promise.reject(new DOMException("Blocked", "NotAllowedError")));
    await expect(denied.controller.startFromBeginning()).resolves.toBeUndefined();
    expect(denied.controller.getState()).toBe("blocked");
    let release!: () => void;
    const late = setup(() => new Promise<void>(resolve => { release = resolve; }));
    const pending = late.controller.startFromBeginning();
    late.controller.pause();
    release();
    await pending;
    expect(late.controller.getState()).not.toBe("playing");
  });

  it("records decode errors without throwing", async () => {
    const element = document.createElement("audio");
    vi.spyOn(element, "pause").mockImplementation(() => undefined);
    vi.spyOn(element, "play").mockResolvedValue(undefined);
    const failed = vi.fn();
    const controller = new AudioController(element, failed);
    await controller.startFromBeginning();
    element.dispatchEvent(new Event("error"));
    element.dispatchEvent(new Event("error"));
    expect(controller.getState()).toBe("error");
    expect(failed).toHaveBeenCalledOnce();
  });
});
