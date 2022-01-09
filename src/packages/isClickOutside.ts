
export function isClickOutside(e: MouseEvent, el: HTMLElement): boolean {
  return !el.contains(e.target as Node | null)
}

