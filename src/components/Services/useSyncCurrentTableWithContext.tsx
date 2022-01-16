import { createViewportObserver } from "@solid-primitives/intersection-observer";
import { createEffect, onCleanup, useContext } from "solid-js";
import services from "../../config/services.json";
import { doNothing } from "../../packages/doNothing";
import { ITable } from "../../types/Table";
import { CurrentTableContext } from "../CurrentTableContext/CurrentTableContext";

export function useSyncCurrentTableWithContext(): Record<
  string,
  HTMLDivElement
> {
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
