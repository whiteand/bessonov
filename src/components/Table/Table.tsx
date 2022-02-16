import createClipboard from "@solid-primitives/clipboard";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import LinkSvg from "../../assets/link.svg";
import { createIsMobile } from "../../packages/createIsMobile";
import { ITable } from "../../types/Table";
import { ColumnsHeaders } from "./ColumnsHeaders";
import { Row } from "./Row";
import s from "./Table.module.scss";

interface ITableProps
  extends Pick<ITable, "title" | "titleId" | "columns" | "data"> {
  ref?: HTMLDivElement | ((element: HTMLDivElement) => void);
}

export default function Table(props: ITableProps) {
  const someColumnHasTitle = createMemo(() =>
    props.columns.some((column) => column.title)
  );

  const titleUrl = createMemo(() => {
    const url = new URL(`/`, window.location.origin);
    url.hash = props.titleId;
    return url.toString();
  });

  onMount(() => {
    const h = window.location.hash;
    if (!h) return;
  });

  const columnHasPlus = createMemo(() => {
    return props.columns.map(
      (column, ind) =>
        column.type === "currency" &&
        props.data.some((row) => {
          const d = row[ind];
          if (typeof d === "string") return false;
          return d.plus || false;
        })
    );
  });

  let tableHeader: HTMLDivElement | undefined;

  const isMobile = createIsMobile();

  createEffect(() => {
    if (!isMobile()) return;
    if (!tableHeader) return;
    if (typeof navigator.share !== "function") return;
    if (
      typeof navigator.canShare === "function" &&
      !navigator.canShare({ url: titleUrl() })
    )
      return;

    const dom = tableHeader;

    function commit() {
      navigator.share({
        url: titleUrl(),
      });
    }

    dom.addEventListener("click", commit);

    onCleanup(() => {
      dom.removeEventListener("click", commit);
    });
  });

  const [setClipboard] = createClipboard();
  const [copied, setCopied] = createSignal(false);

  const onHeaderLinkButtonClick = () => {
    window.history.replaceState(null, document.title, titleUrl());
    setClipboard(titleUrl());
    setCopied(false);
    setCopied(true);
  };

  createEffect(() => {
    if (!copied()) return;
    const timeoutHandle = setTimeout(() => {
      setCopied(false);
    }, 500);
    onCleanup(() => clearTimeout(timeoutHandle));
  });

  return (
    <div ref={props.ref} class={s.wrapper}>
      <Show when={props.title}>
        <h3 class={s.header} id={props.titleId}>
          <div class={s.headerText} ref={tableHeader}>
            <button
              class={s.copyButton}
              classList={{
                [s.clicked]: copied(),
              }}
              type="button"
              onClick={onHeaderLinkButtonClick}
            >
              <img width="18" height="18" src={LinkSvg} />
            </button>
            {props.title}
          </div>
        </h3>
      </Show>
      <div class={s.table}>
        <Show when={someColumnHasTitle()}>
          <ColumnsHeaders columns={props.columns} />
        </Show>
        <For each={props.data}>
          {(row, index) => (
            <Row
              columnHasPlus={columnHasPlus()}
              columns={props.columns}
              data={row}
              index={index}
            />
          )}
        </For>
      </div>
    </div>
  );
}
