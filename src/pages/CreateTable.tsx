import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  For,
  Index,
  Match,
  Switch,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { transliterate } from "../packages/transliterate";
import Table from "../components/Table/Table";
import s from "./CreateTable.module.scss";
import { ICurrencyValue } from "../components/Table/types";

/*
{
    "type": "table",
    "title": "Монтаж Кабеля",
    "columns": [
      {
        "type": "text",
        "align": "left",
        "title": "Сечение кабеля"
      },
      {
        "type": "currency",
        "align": "left",
        "title": "Открытой проводкой"
      },
      {
        "type": "currency",
        "align": "right",
        "title": "В гофро"
      }
    ],
    "data": [
      [
        "до 4 мм^2",
        {
          "currency": "UAH",
          "plus": true,
          "value": 20
        },
        {
          "currency": "UAH",
          "plus": true,
          "value": 30
        }
      ],
      [
        "4-10 мм^2",
        {
          "currency": "UAH",
          "plus": true,
          "value": 30
        },
        {
          "currency": "UAH",
          "plus": true,
          "value": 40
        }
      ],
      [
        "больше 10 мм^2",
        {
          "currency": "UAH",
          "plus": true,
          "value": 40
        },
        null
      ]
    ]
  }
  */

function getTitleIdFromTableName(tableName: string): string {
  const res = [];
  for (const x of tableName.toLowerCase()) {
    if (/\s+/.test(x)) {
      if (res[res.length - 1] === "-") continue;
      res.push("-");
      continue;
    }
    if (/\d/.test(x)) {
      res.push(x);
      continue;
    }
    const translated = transliterate(x);
    if (translated === x) continue;
    res.push(translated);
  }
  return res.join("");
}

interface IColumn {
  type: "text" | "currency";
  align: "left" | "right";
  title: string;
}

interface ITableState {
  type: "table";
  title: string;
  columns: IColumn[];
  titleId: string;
  data: (string | ICurrencyValue)[][];
}

export default function CreateTable() {
  const [table, setTable] = createStore<ITableState>({
    type: "table",
    title: "Услуга",
    columns: [],
    data: [],
    titleId: "",
  });

  const addColumn = () => {
    setTable("columns", (cols) => {
      return [
        ...cols,
        {
          type: cols.length ? "currency" : "text",
          align: cols.length ? "right" : "left",
          title: `Колонка ${cols.length + 1}`,
        },
      ];
    });
  };

  function addData() {
    setTable(
      produce((table) => {
        const newData = table.columns.map(
          (col, ind): string | ICurrencyValue => {
            if (col.type === "text") {
              return `Услуга ${ind + 1}`;
            }
            if (col.type === "currency") {
              return {
                currency: "UAH",
                value: 50,
                plus: true,
              };
            }
            return "";
          }
        );
        table.data.push(newData);
      })
    );
  }

  const titleId = createMemo(
    () => table.titleId || getTitleIdFromTableName(table.title)
  );

  function copy() {
    const currentTable = { ...table };
    if (!currentTable.titleId) {
      currentTable.titleId = getTitleIdFromTableName(table.title);
    }
    const json = JSON.stringify(currentTable, null, 2);
    navigator.clipboard.writeText(json).catch((error) => {
      alert(error.message);
    });
  }

  return (
    <div class={s.wrapper}>
      <h1>Create Table</h1>
      <button class={s.copy} type="button" onClick={copy}>
        Copy
      </button>
      <br />
      <label>Название таблицы: </label>
      <input
        placeholder="Например: Монтаж"
        type="text"
        value={table.title}
        onInput={(event) => setTable("title", event.currentTarget.value)}
      />
      <label for="#id-input">Id: </label>
      <input
        id="id-input"
        placeholder="Например: Монтаж"
        type="text"
        value={titleId()}
        onInput={(event) => setTable("titleId", event.currentTarget.value)}
      />
      <h3>Колонки</h3>
      <div>
        <button type="button" onClick={addColumn}>
          Add
        </button>
        <div>
          <For each={table.columns}>
            {(column, index) => (
              <div class={s.columnSettings}>
                <div class={s.colNameSettings}>
                  <input
                    type="text"
                    value={column.title}
                    onInput={(event) =>
                      setTable(
                        "columns",
                        index(),
                        "title",
                        event.currentTarget.value
                      )
                    }
                  />
                </div>
                <div class={s.typeSettings}>
                  <label class={s.label}>Тип</label>
                  <select
                    class={s.typeInput}
                    onInput={(event) =>
                      setTable(
                        "columns",
                        index(),
                        "type",
                        event.currentTarget.value as "text" | "currency"
                      )
                    }
                  >
                    <option value="text" selected={column.type === "text"}>
                      Текст
                    </option>
                    <option
                      value="currency"
                      selected={column.type === "currency"}
                    >
                      Деньги
                    </option>
                  </select>
                </div>
                <div class={s.alignSettings}>
                  <label class={s.label}>Выровнять</label>
                  <select
                    class={s.alignInput}
                    onInput={(event) =>
                      setTable(
                        "columns",
                        index(),
                        "align",
                        event.currentTarget.value as "left" | "right"
                      )
                    }
                  >
                    <option value="left" selected={column.align === "left"}>
                      Влево
                    </option>
                    <option value="right" selected={column.align === "right"}>
                      Вправо
                    </option>
                  </select>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <div class={s.dataWrapper}>
        <h3>Данные</h3>
        <button type="button" onClick={addData}>
          Add Data
        </button>
        <Index each={table.data}>
          {(row, rowInd) => {
            return (
              <div class={s.row}>
                <For each={table.columns}>
                  {(col, colInd) => {
                    const cellData = table.data[rowInd][colInd()];
                    const cellId = `${rowInd}-${colInd()}`;
                    return (
                      <div class={s.cell}>
                        <Switch>
                          <Match when={col.type === "text"}>
                            <input
                              type="text"
                              value={
                                typeof cellData === "string" ? cellData : ""
                              }
                              onInput={(event) =>
                                setTable(
                                  "data",
                                  rowInd,
                                  colInd(),
                                  event.currentTarget.value
                                )
                              }
                            />
                          </Match>
                          <Match when={col.type === "currency"}>
                            <input
                              type="number"
                              value={(cellData as ICurrencyValue)?.value}
                              onInput={(event) =>
                                setTable(
                                  "data",
                                  rowInd,
                                  colInd(),
                                  "value",
                                  +event.currentTarget.value
                                )
                              }
                              min={1}
                            />
                            <input
                              type="checkbox"
                              checked={(cellData as ICurrencyValue)?.plus}
                              id={`${cellId}-plus`}
                              onInput={(event) =>
                                setTable(
                                  "data",
                                  rowInd,
                                  colInd(),
                                  "plus",
                                  event.currentTarget.checked
                                )
                              }
                            />
                            <label for={`${cellId}-plus`}>+</label>
                          </Match>
                        </Switch>
                      </div>
                    );
                  }}
                </For>
              </div>
            );
          }}
        </Index>
      </div>
      <div class={s.example}>
        <Table
          columns={table.columns}
          data={table.data}
          title={table.title}
          titleId={table.titleId}
        />
      </div>
    </div>
  );
}
