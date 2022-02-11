import { children, createMemo, PropsWithChildren } from "solid-js";
import { getZIndex } from "../../utils/getZIndex";
import s from "./ContactButtonLinkMobileWrapper.module.scss";

interface IContactButtonLinkMobileWrapperProps {
  copyrightVisible: boolean
}

export default function ContactButtonLinkMobileWrapper(
  props: PropsWithChildren<IContactButtonLinkMobileWrapperProps>
) {
  const c = children(() => props.children);
  const classList = createMemo(() => ({
    [s.copyrightVisible]: props.copyrightVisible
  }))
  return (
    <div
      class={s.wrapper}
      style={{ "z-index": getZIndex("mobile-contact-button") }}
      classList={classList()}
    >
      {c()}
    </div>
  );
}
