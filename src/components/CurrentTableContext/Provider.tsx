import { createSignal, JSX } from "solid-js";
import { ITable } from "../../types/Table";
import { CurrentTableContext } from "./CurrentTableContext";

export function CurrentTableContextProvider(props: { children?: JSX.Element }) {
  const currentTableContextValue = createSignal<ITable | null>(null);
  return (
    <CurrentTableContext.Provider value={currentTableContextValue}>
      {props.children}
    </CurrentTableContext.Provider>
  );
}
