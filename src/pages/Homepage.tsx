import type { Component } from "solid-js";
import ContactButtonLink from "../components/ContactButtonLink/ContactButtonLink";
import ContactButtonLinkMobileWrapper from "../components/ContactButtonLinkMobileWrapper/ContactButtonLinkMobileWrapper";
import { CurrentTableContextProvider } from "../components/CurrentTableContext/Provider";
import MainInfo from "../components/MainInfo";
import Services from "../components/Services/Services";

const Homepage: Component = () => {
  return (
    <CurrentTableContextProvider>
      <MainInfo />
      <Services />
      <ContactButtonLinkMobileWrapper>
        <ContactButtonLink />
      </ContactButtonLinkMobileWrapper>
    </CurrentTableContextProvider>
  );
};

export default Homepage;
