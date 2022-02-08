import { createEffect, createSignal, For, onCleanup, untrack } from "solid-js";
import navigation from "../../config/navigation.json";
import png from "../../assets/portrait.png";
import s from "./MainInfo.module.scss";

export default function MainInfo() {
  const navLinks = navigation.map((obj) => {
    const [visible, setVisible] = createSignal(false);
    return { ...obj, visible, setVisible };
  });
  const [highlightedId, setHighlightedId] = createSignal<string | null>(null);
  createEffect(() => {
    const id = highlightedId();
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) return;
    element.classList.add("navigated");
    const timeout = setTimeout(() => {
      setHighlightedId(null);
      element.classList.remove("navigated");
    }, 1000);
    onCleanup(() => {
      clearTimeout(timeout);
      element.classList.remove("navigated");
    });
  });
  createEffect(() => {
    function toggleNextLink() {
      for (const link of navLinks) {
        if (!untrack(link.visible)) {
          link.setVisible(true);
          return;
        }
      }
      clearInterval(interval);
    }
    const interval = setInterval(toggleNextLink, 333);
    onCleanup(() => {
      clearInterval(interval);
    });
  });
  return (
    <header class={s.wrapper}>
      <img
        class={s.image}
        src={png}
        width="100px"
        height="100px"
        alt="my face"
      />
      <div>
        <h1>
          <span class={s.electro}>Электрик</span>
          <span class={s.name}>Влад Бессонов</span>
        </h1>
        <nav class={s.nav}>
          <For each={navLinks}>
            {(navLink) => (
              <a
                class={s.navlink}
                classList={{ [s.visible]: navLink.visible() }}
                href={`/#${navLink.headerId}`}
                onClick={() => setHighlightedId(navLink.headerId)}
              >
                {navLink.text}
              </a>
            )}
          </For>
        </nav>
      </div>
    </header>
  );
}
