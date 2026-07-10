import * as React from "react"

import { cn } from "../../lib/utils"
import { spacing, surface, toneBadge, typography } from "../../lib/tokens"
import type { Tone } from "../../types/components"

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label */
  label: string
  /** Primary value */
  value: string
  /** Delta / change text */
  delta: string
  /** Semantic tone for the delta chip */
  tone: Exclude<Tone, "neutral">
}

/**
 * Static metric card (non-clickable). For interactive KPIs use MetricTile.
 *
 * @example
 * <MetricCard label="Compliance" value="76%" delta="-6%" tone="red" />
 */
export function MetricCard({
  label,
  value,
  delta,
  tone,
  className,
  ...props
}: MetricCardProps) {
  return (
    <div className={cn(surface.cardTile, spacing.cardPadding.metric, className)} {...props}>
      <p className={cn(typography.microLabel, "mb-1.5")}>{label}</p>
      <div className="flex items-baseline justify-between">
        <span className={typography.metricValue}>{value}</span>
        <span className={cn("text-[10.5px] font-semibold px-1.5 py-0.5 rounded", toneBadge[tone])}>
          {delta}
        </span>
      </div>
    </div>
  )
}
