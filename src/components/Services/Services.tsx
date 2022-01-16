import { createEffect, onCleanup, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createIsMobile } from "../../packages/createIsMobile";
import { CurrentTableContext } from "../CurrentTableContext/CurrentTableContext";
import DesktopServices from "./DesktopServices";
import MobileServices from "./MobileServices";

export default function Services() {
  const isMobile = createIsMobile();
  createEffect(() => {
    const currentTableContextValue = useContext(CurrentTableContext);
    console.log(currentTableContextValue[0]());
  });

  createEffect(() => {
    if (!window.location.hash.startsWith("#")) return;
    const titleId = window.location.hash.slice(1);
    const element = document.getElementById(titleId);

    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
    });
    element.classList.add("navigated");
    const timeout = setTimeout(
      () => element.classList.remove("navigated"),
      1000
    );
    onCleanup(() => {
      clearTimeout(timeout);
      element.classList.remove("navigated");
    });
  });

  return <Dynamic component={isMobile() ? MobileServices : DesktopServices} />;
}
