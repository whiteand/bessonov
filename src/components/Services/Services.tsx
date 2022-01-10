import { createEffect, onCleanup } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createIsMobile } from "../../packages/createIsMobile";
import DesktopServices from "./DesktopServices";
import MobileServices from "./MobileServices";

export default function Services() {
  const isMobile = createIsMobile();

  createEffect(() => {
    if (!window.location.hash.startsWith("#")) return;
    const id = window.location.hash.slice(1);
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
    });
    element.classList.add("navigated");
    const timeout = setTimeout(() => element.classList.remove("navigated"), 1000);
    onCleanup(() => {
      clearTimeout(timeout);
      element.classList.remove("navigated");
    });
  });

  return <Dynamic component={isMobile() ? MobileServices : DesktopServices} />;
}
