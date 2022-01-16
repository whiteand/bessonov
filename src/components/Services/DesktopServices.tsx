import { createViewportObserver } from "@solid-primitives/intersection-observer";
import {
  createEffect,
  createSignal,
  For,
  Match,
  onCleanup,
  Show,
  Switch,
  useContext,
} from "solid-js";
import services from "../../config/services.json";
import { doNothing } from "../../packages/doNothing";
import { usePinnedElement } from "../../packages/usePinnedElement";
import { ITable, TColumn, TData } from "../../types/Table";
import { getZIndex } from "../../utils/getZIndex";
import ContactButtonLink from "../ContactButtonLink/ContactButtonLink";
import { CurrentTableContext } from "../CurrentTableContext/CurrentTableContext";
import Table from "../Table/Table";
import s from "./DesktopServices.module.scss";
import PlusDescription from "./PlusDescription";

function useSyncCurrentTableWithContext() {
  const tableElements: Record<string, HTMLDivElement> = {};
  const [add, { remove }] = createViewportObserver([], doNothing, {
    threshold: [1],
  });

  createEffect(() => {
    const titleIds = Object.keys(tableElements);
    const setCurrentTable = useContext(CurrentTableContext)[1];
    for (const titleId of titleIds) {
      const item = tableElements[titleId];
      if (typeof item !== "object") continue;
      add(item, (element) => {
        console.log(titleId, element.isIntersecting);
        if (element.isIntersecting) {
          const table = services.find((table) => table.titleId === titleId) as
            | ITable
            | undefined;
          if (table) {
            setCurrentTable(table);
          }
        }
      });
    }
    onCleanup(() => {
      for (const titleId of titleIds) {
        const item = tableElements[titleId];
        if (typeof item !== "object") continue;
        remove(item);
      }
    });
  });

  return tableElements;
}

export default function DesktopServices() {
  const [pinnedElement, setPinnedElement] = createSignal<HTMLDivElement | null>(
    null
  );

  const [{ isPinned }] = usePinnedElement(pinnedElement);

  const tableElements: Record<string, HTMLDivElement> =
    useSyncCurrentTableWithContext();

  return (
    <>
      <div
        ref={setPinnedElement}
        class={s.pinned}
        style={{
          "z-index": getZIndex("pinned"),
        }}
        classList={{
          [s.isPinned]: isPinned(),
        }}
      >
        <div class={s.header}>
          <h2>Услуги</h2>
          <ContactButtonLink />
        </div>
      </div>
      <div
        class={s.wrapper}
        classList={{
          [s.isPinned]: isPinned(),
        }}
      >
        <For each={services}>
          {(service, ind) => (
            <Switch>
              <Match when={service.type === "table"}>
                <div class={s.tableWrapper}>
                  <Show when={ind() <= 0}>
                    <PlusDescription />
                  </Show>
                  <Table
                    ref={(tableElement) => {
                      tableElements[service.titleId] = tableElement;
                    }}
                    titleId={service.titleId}
                    title={service.title}
                    columns={service.columns as TColumn[]}
                    data={service.data as TData[]}
                  />
                </div>
              </Match>
            </Switch>
          )}
        </For>
      </div>
    </>
  );
}
