import { useEffect, type RefObject } from "react"

/**
 * Close popovers, menus, or modals when clicking outside the ref element.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * useClickOutside(ref, () => setOpen(false))
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) return
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
