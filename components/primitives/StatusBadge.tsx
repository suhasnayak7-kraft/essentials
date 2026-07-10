import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { toneBadge } from "../../lib/tokens"
import type { Tone } from "../../types/components"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full",
  {
    variants: {
      tone: {
        green: toneBadge.green,
        amber: toneBadge.amber,
        red: toneBadge.red,
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
)

const tonePrefix: Record<Tone, string> = {
  green: "✓ ",
  amber: "● ",
  red: "⚠ ",
  neutral: "",
}

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  /** Display text inside the badge */
  value: string
  /** Show tone icon prefix (✓, ●, ⚠) */
  showPrefix?: boolean
}

/**
 * Semantic status badge for health, compliance, and alert states.
 * Built on the same tone tokens as the rest of the kit.
 *
 * @example
 * <StatusBadge value="Compliant" tone="green" />
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ value, tone = "neutral", showPrefix = true, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusBadgeVariants({ tone }), className)}
      {...props}
    >
      {showPrefix && tonePrefix[tone ?? "neutral"]}
      {value}
    </span>
  )
)
StatusBadge.displayName = "StatusBadge"

export { statusBadgeVariants }
