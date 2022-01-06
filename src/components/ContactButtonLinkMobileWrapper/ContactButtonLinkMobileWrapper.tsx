import { children, PropsWithChildren } from "solid-js";
import s from "./ContactButtonLinkMobileWrapper.module.scss";

export default function ContactButtonLinkMobileWrapper(
  props: PropsWithChildren
) {
  const c = children(() => props.children);
  return <div class={s.wrapper}>{c()}</div>;
}
