interface IElement {
  offsetTop?: number;
  parentNode?: unknown;
}

export function getElementOffsetTop(dom: IElement | null | undefined): number {
  let s = 0;
  while (dom) {
    if (dom.offsetTop) {
      s += dom.offsetTop;
    }
    dom = dom.parentNode as IElement | null;
  }
  return s;
}
