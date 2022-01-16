import { createEffect, createSignal, onCleanup, Show, untrack } from "solid-js";

export function AnimatedText(props: { children: string }) {
  const [lastText, setLastText] = createSignal(props.children || "");
  let canvas: HTMLCanvasElement | undefined;
  const [initialised, setInitialised] = createSignal(false);

  createEffect(() => {
    const newText = props.children;
    const oldText = untrack(lastText);

    if (oldText === newText) return;

    const tick = () => {
      const oldText = untrack(lastText);
      if (newText === oldText) {
        clearInterval(interval);
        return;
      }
      if (newText.startsWith(oldText)) {
        setLastText(newText.slice(0, oldText.length + 1));
        return;
      }
      setLastText((text) => text.slice(0, -1));
    };

    const interval = setInterval(tick, 30);

    tick();

    onCleanup(() => {
      if (interval) {
        clearInterval(interval);
      }
    });
  });

  createEffect(() => {
    const promise =
      typeof document?.fonts?.ready === "object"
        ? document.fonts.ready
        : Promise.resolve();
    let cancelled = false;
    promise.then(() => {
      if (!cancelled) setInitialised(true);
    });
    onCleanup(() => {
      cancelled = true;
    });
  });

  createEffect(async () => {
    if (!initialised()) return;
    const newText = lastText();
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(2, 2);
    ctx.fillStyle = "#fff";
    ctx.font = '16px "Roboto"';
    const font = getNecessaryFontSize(ctx, newText);
    if (!font) {
      ctx.restore();
      return;
    }
    ctx.textBaseline = "middle";
    ctx.fillText(newText, 0, 17);
    ctx.restore();
  });

  const width = 270;
  const height = 30;

  return (
    <Show when={initialised()} fallback={props.children}>
      <canvas
        ref={canvas}
        width={width * 2}
        height={height * 2}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    </Show>
  );
}
function getNecessaryFontSize(ctx: CanvasRenderingContext2D, newText: string) {
  let font = 16;
  while (font > 0 && ctx.measureText(newText)?.width > 270) {
    font -= 0.5;
    ctx.font = `${font}px "Roboto"`;
  }
  return font;
}

