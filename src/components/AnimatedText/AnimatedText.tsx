import { createEffect, createSignal, onCleanup, untrack } from "solid-js";

export function AnimatedText(props: { children: string }) {
  const [lastText, setLastText] = createSignal(props.children || "");

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

    const interval = setInterval(tick, 20);

    tick();

    onCleanup(() => {
      if (interval) {
        clearInterval(interval);
      }
    });
  });

  return <>{lastText()}</>;
}
