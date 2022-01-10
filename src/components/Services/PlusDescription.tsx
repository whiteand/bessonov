import s from "./PlusDescription.module.scss";

export default function PlusDescription() {
  return (
    <div class={s.wrapper}>
      <svg viewBox="0 0 40 33" class={s.line}>
        <path d="M40,0L0,33" stroke="white" />
      </svg>
      <p>Со значком «+» указана минимальная стоимость.</p>
      <p>Узнать точную стоимость можно во время консультации.</p>
    </div>
  );
}
