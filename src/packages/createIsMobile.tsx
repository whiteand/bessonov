import { createEffect, createSignal, onCleanup } from "solid-js";

export function createIsMobile() {
  const [isMobile, setIsMobile] = createSignal(window.innerWidth < 850);
  createEffect(() => {
    const handler = () => {
      const newIsMobile = window.innerWidth < 850;
      if (newIsMobile !== isMobile()) {
        setIsMobile(newIsMobile);
      }
    };
    window.addEventListener("resize", handler);
    onCleanup(() => {
      window.removeEventListener("resize", handler);
    });
  });
  return isMobile;
}
