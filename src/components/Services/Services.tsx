import { For, Match, Switch } from "solid-js";
import services from "../../config/services.json";
import Table from "../Table/Table";
import { TColumn, TData } from "../Table/types";
import s from "./Services.module.scss";

export default function Services() {
  return (
    <div class={s.wrapper}>
      <h2>Услуги</h2>
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
  );
}
