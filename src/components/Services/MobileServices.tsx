import { For, Match, Switch } from "solid-js";
import services from "../../config/services.json";
import Table from "../Table/Table";
import { TColumn, TData } from "../../types/Table";
import s from "./Services.module.scss";
import { useSyncCurrentTableWithContext } from "./useSyncCurrentTableWithContext";

export default function MobileServices() {
  const tableElements = useSyncCurrentTableWithContext({
    rootMargin: '0px'
  });
  return (
    <div class={s.wrapper}>
      <h2>Услуги</h2>
      <For each={services}>
        {(service) => (
          <Switch>
            <Match when={service.type === "table"}>
              <div class={s.tableWrapper}>
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
  );
}
