import { Dynamic } from "solid-js/web";
import { createIsMobile } from "../../packages/createIsMobile";
import DesktopServices from "./DesktopServices";
import MobileServices from "./MobileServices";

export default function Services() {
  const isMobile = createIsMobile();

  return <Dynamic component={isMobile() ? MobileServices : DesktopServices} />;
}
