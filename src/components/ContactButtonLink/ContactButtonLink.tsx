import { createEffect, createSignal, JSX, onCleanup } from "solid-js";
import phone from "../../assets/phone.svg";
import contacts from "../../config/contacts.json";
import { randomInt } from "../../packages/randomInt";
import s from "./ContactButtonLink.module.scss";

function scheduleLampBlim(cb: () => void): () => void {
  const timeout = setTimeout(cb, randomInt(200, 5000));
  return () => {
    clearTimeout(timeout);
  };
}

export default function ContactButtonLink(props: {
  children?: string;
  preset?: "small" | 'default';
}) {
  const [isDark, setIsDark] = createSignal(false);
  createEffect(() => {
    let unschedule: (() => void) | null = null;

    function tick() {
      setIsDark(true);
      unschedule = scheduleLampBlim(tick);
    }
    unschedule = scheduleLampBlim(tick);

    onCleanup(() => {
      if (unschedule) unschedule();
    });
  });

  createEffect(() => {
    if (!isDark()) return;
    const timeout = setTimeout(() => setIsDark(false), 100);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  const text = props.children || "Бесплатная консультация";

  return (
    <a
      class={s.link}
      classList={{
        [s.small]: props.preset === "small",
      }}
      href={`tel:${contacts.phone}`}
    >
      <img src={phone} classList={{ [s.dark]: isDark() }} />
      <div>{text}</div>
    </a>
  );
}
