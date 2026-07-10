import * as React from "react"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { interaction, spacing, surface, toneDot, typography } from "../../lib/tokens"
import type { Tone, TrendDirection } from "../../types/components"

const metricTileVariants = cva(
  cn(surface.cardTile, "text-left group w-full"),
  {
    variants: {
      size: {
        sm: "p-3",
        md: spacing.cardPadding.tile,
        lg: spacing.cardPadding.metric,
      },
      interactive: {
        true: cn(interaction.cardHover, interaction.focusRing, interaction.press),
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      interactive: false,
    },
  }
)

const trendIcons = {
  up: ArrowUp,
  down: ArrowDown,
  flat: Minus,
} as const

function resolveTrendColor(tone: Tone | undefined, trend: TrendDirection): string {
  if (tone === "red") return "text-danger"
  if (tone === "amber") return "text-warning"
  if (tone === "green") return "text-success"
  if (trend === "up") return "text-success"
  if (trend === "down") return "text-danger"
  return "text-muted-foreground"
}

function resolveDotColor(tone: Tone | undefined): string {
  if (tone === "red") return toneDot.red
  if (tone === "amber") return toneDot.amber
  if (tone === "green") return toneDot.green
  return "bg-muted-foreground"
}

export interface MetricTileProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof metricTileVariants> {
  /** Metric label shown above the value */
  label: string
  /** Primary metric value */
  value: string
  /** Change indicator text (e.g. "12%", "+4 pts") */
  delta?: string
  /** Trend direction for icon and default coloring */
  trend?: TrendDirection
  /** Override trend color with semantic tone */
  tone?: Tone
  /** Show status dot in top-right corner */
  showDot?: boolean
}

/**
 * Reusable KPI / metric tile. Renders as `<button>` only when interactive.
 *
 * @example
 * <MetricTile label="Attendance" value="89%" delta="4%" trend="up" tone="green" onClick={...} />
 */
export const MetricTile = React.forwardRef<HTMLButtonElement, MetricTileProps>(
  (
    {
      label,
      value,
      delta,
      trend = "flat",
      tone,
      showDot = true,
      size,
      interactive,
      className,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const TrendIcon = trendIcons[trend]
    const trendColor = resolveTrendColor(tone, trend)
    const dotColor = resolveDotColor(tone)
    const isInteractive = interactive ?? !!onClick

    const content = (
      <>
        <div className="flex items-center justify-between mb-1.5">
          <span className={cn(typography.microLabel, "leading-tight pr-2")}>
            {label}
          </span>
          {showDot && (
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />
          )}
        </div>
        <div className="flex items-baseline justify-between">
          <span className={cn(typography.metricValue, "group-hover:text-primary transition-colors")}>
            {value}
          </span>
          {delta && (
            <span className={cn("flex items-center gap-0.5 text-[10.5px] font-semibold", trendColor)}>
              <TrendIcon className="w-3 h-3" />
              {delta.replace(/^[↑↓→]\s*/, "")}
            </span>
          )}
        </div>
      </>
    )

    if (!isInteractive) {
      return (
        <div className={cn(metricTileVariants({ size, interactive: false }), className)}>
          {content}
        </div>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={cn(metricTileVariants({ size, interactive: true }), className)}
        {...props}
      >
        {content}
      </button>
    )
  }
)
MetricTile.displayName = "MetricTile"

export { metricTileVariants }
