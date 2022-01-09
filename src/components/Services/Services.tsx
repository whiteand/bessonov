import { For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import services from "../../config/services.json";
import { createIsMobile } from "../../packages/createIsMobile";
import Table from "../Table/Table";
import { TColumn, TData } from "../Table/types";
import DesktopServices from "./DesktopServices";
import MobileServices from "./MobileServices";
import s from "./Services.module.scss";

export default function Services() {
  const isMobile = createIsMobile();

  return <Dynamic component={isMobile() ? MobileServices : DesktopServices} />;
}
