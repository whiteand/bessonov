import { createEffect, createSignal, For, onCleanup, untrack } from "solid-js";
import navigation from "../../config/navigation.json";
import png from "../../assets/portrait.png";
import s from "./MainInfo.module.scss";

export default function MainInfo() {
  const navLinks = navigation.map((obj) => {
    const [visible, setVisible] = createSignal(false);
    return { ...obj, visible, setVisible };
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
      <img class={s.image} src={png} width="100px" />
      <div>
        <h1>
          <span class={s.electro}>Електрик</span>
          <span class={s.name}>Влад Бессонов</span>
        </h1>
        <nav class={s.nav}>
          <For each={navLinks}>
            {(navLink) => (
              <a
                class={s.navlink}
                classList={{ [s.visible]: navLink.visible() }}
                href={`/#${navLink.headerId}`}
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
