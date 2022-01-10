import s from "./PlusDescription.module.scss";

export default function PlusDescription() {
  return (
    <div class={s.wrapper}>
      <p>Со значком «+» указана минимальная стоимость.</p>
      <p>Узнать точную стоимость можно во время консультации.</p>
    </div>
  );
}
