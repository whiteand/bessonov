import { createEffect, createSignal, onCleanup } from "solid-js";

export function AnimatedText(props: { children: string }) {
  const [lastText, setLastText] = createSignal(props.children || "");

  createEffect(() => {
    const newText = props.children;
    const oldText = lastText();
    if (oldText === newText) return;
    const timeout = setTimeout(() => {
      if (newText.startsWith(oldText)) {
        setLastText(newText.slice(0, oldText.length + 1));
        return;
      }
      setLastText((text) => text.slice(0, -1));
    }, 20);

    onCleanup(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  });

  return <>{lastText()}</>;
}
