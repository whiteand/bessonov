import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import ContactButtonLink from "../components/ContactButtonLink/ContactButtonLink";
import ContactButtonLinkMobileWrapper from "../components/ContactButtonLinkMobileWrapper/ContactButtonLinkMobileWrapper";
import { CurrentTableContextProvider } from "../components/CurrentTableContext/Provider";
import MainInfo from "../components/MainInfo";
import Services from "../components/Services/Services";
import Copyright from '../components/Copyright'
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

const Homepage: Component = () => {
  const [copyrightVisible, setCopyrighVisible] = createSignal(false)
  let copyrightRef: HTMLAnchorElement | undefined;
  createEffect(() => {
    if (!copyrightRef) return
    let element = copyrightRef
    const [visible, { stop }] = createVisibilityObserver(() => element, {
      threshold: 0,
      initialValue: false
    })
    createEffect(() => {
      setCopyrighVisible(visible())
    })
    onCleanup(() => stop())
  })

  return (
    <CurrentTableContextProvider>
      <MainInfo />
      <Services />
      <Copyright ref={copyrightRef} />
      <ContactButtonLinkMobileWrapper copyrightVisible={copyrightVisible()}>
        <ContactButtonLink />
      </ContactButtonLinkMobileWrapper>
    </CurrentTableContextProvider>
  );
};

export default Homepage;
