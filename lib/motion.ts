import type { Transition } from "motion/react"

/** Default spring for panels, drawers, expandable UI */
export const springPanel: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
}

/** Snappy spring for dock magnification */
export const springDock = {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
} as const

/** Standard fade/slide for text and content swaps */
export const fadeSlide: Transition = {
  duration: 0.3,
  ease: "easeOut",
}

/** Page/section enter */
export const pageEnter: Transition = {
  duration: 0.2,
  ease: "easeOut",
}
