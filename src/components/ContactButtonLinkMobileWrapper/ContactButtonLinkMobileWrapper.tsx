import { children, PropsWithChildren } from "solid-js";
import { getZIndex } from "../../utils/getZIndex";
import s from "./ContactButtonLinkMobileWrapper.module.scss";

export default function ContactButtonLinkMobileWrapper(
  props: PropsWithChildren
) {
  const c = children(() => props.children);
  return (
    <div
      class={s.wrapper}
      style={{ "z-index": getZIndex("mobile-contact-button") }}
    >
      {c()}
    </div>
  );
}
