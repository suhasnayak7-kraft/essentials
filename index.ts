/**
 * Template reference barrel — for browsing the kit in this repo only.
 * New projects: use setup/init.mjs → import from @/components/* (not from ./essentials).
 */

export * from "./components"
/** All 33 motion-primitives — use `Motion.TextScramble` or import from `./components/motion-primitives/*` */
export * as Motion from "./components/motion-primitives"
export { cn } from "./lib/utils"
export {
  spacing,
  surface,
  typography,
  toneBadge,
  toneDot,
  control,
  interaction,
  buttonBehavior,
} from "./lib/tokens"
export { springPanel, springDock, fadeSlide, pageEnter } from "./lib/motion"
export { useClickOutside } from "./hooks/useClickOutside"
export type { Tone, TrendDirection, ComponentSize } from "./types/components"
