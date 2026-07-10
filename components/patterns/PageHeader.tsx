import * as React from "react"

import { cn } from "../../lib/utils"
import { spacing, typography } from "../../lib/tokens"

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title: string
  /** Optional badge or status element beside the title */
  badge?: React.ReactNode
  /** Supporting description below the title */
  subtitle?: string
  /** Right-side actions (buttons, filters) */
  actions?: React.ReactNode
}

/**
 * Standard page header with title, optional badge, subtitle, and actions.
 *
 * @example
 * <PageHeader
 *   title="Executive Overview"
 *   subtitle="Tezo Manufacturing Ltd · June 2026"
 *   badge={<StatusBadge value="Live" tone="green" />}
 *   actions={<Button size="sm">Export</Button>}
 * />
 */
export function PageHeader({
  title,
  badge,
  subtitle,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between", spacing.pageHeaderBottom, className)}
      {...props}
    >
      <div>
        <div className="flex items-center gap-2">
          <h1 className={typography.pageTitle}>{title}</h1>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions}
    </div>
  )
}
