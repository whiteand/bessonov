import { createSignal, For, Match, Show, Switch } from "solid-js";
import services from "../../config/services.json";
import { usePinnedElement } from "../../packages/usePinnedElement";
import { TColumn, TData } from "../../types/Table";
import { getZIndex } from "../../utils/getZIndex";
import ContactButtonLink from "../ContactButtonLink/ContactButtonLink";
import Table from "../Table/Table";
import s from "./DesktopServices.module.scss";
import PlusDescription from "./PlusDescription";
import { useSyncCurrentTableWithContext } from "./useSyncCurrentTableWithContext";

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
