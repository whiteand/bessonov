import type { Component } from "solid-js";
import ContactButtonLink from "../components/ContactButtonLink/ContactButtonLink";
import ContactButtonLinkMobileWrapper from "../components/ContactButtonLinkMobileWrapper/ContactButtonLinkMobileWrapper";
import MainInfo from "../components/MainInfo";
import Services from "../components/Services/Services";

const Homepage: Component = () => {
  return (
    <>
      <MainInfo />
      <Services />
      <ContactButtonLinkMobileWrapper>
        <ContactButtonLink />
      </ContactButtonLinkMobileWrapper>
    </>
  );
};

export default Homepage;
