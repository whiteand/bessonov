import { createSignal, For, Match, Switch } from "solid-js";
import services from "../../config/services.json";
import ContactButtonLink from "../ContactButtonLink/ContactButtonLink";
import Table from "../Table/Table";
import { TColumn, TData } from "../Table/types";
import s from "./DesktopServices.module.scss";
import { usePinnedElement } from "../../packages/usePinnedElement";

export default function DesktopServices() {
  const [pinnedElement, setPinnedElement] = createSignal<HTMLDivElement | null>(
    null
  );

  const [{ isPinned }] = usePinnedElement(pinnedElement);
  return (
    <>
      <div
        ref={setPinnedElement}
        class={s.pinned}
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
          {(service) => (
            <Switch>
              <Match when={service.type === "table"}>
                <div class={s.tableWrapper}>
                  <Table
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
