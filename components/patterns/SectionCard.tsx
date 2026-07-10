import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { spacing, typography } from "../../lib/tokens"

const sectionCardVariants = cva("bg-card border border-border", {
  variants: {
    padding: {
      sm: "p-4",
      md: spacing.cardPadding.section,
      lg: "p-6",
    },
    rounded: {
      md: "rounded-lg",
      lg: "rounded-xl",
    },
  },
  defaultVariants: {
    padding: "md",
    rounded: "lg",
  },
})

export interface SectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionCardVariants> {
  /** Section heading */
  title: string
  /** Optional action slot (button, link, filter) aligned right */
  action?: React.ReactNode
  /** Subtitle below the title */
  subtitle?: string
}

/**
 * Titled content container for dashboard sections.
 * Prefer this over raw shadcn Card when you need a title + action row.
 *
 * @example
 * <SectionCard title="Priority Actions" action={<Button size="sm">View all</Button>}>
 *   <ul>...</ul>
 * </SectionCard>
 */
export function SectionCard({
  title,
  action,
  subtitle,
  padding,
  rounded,
  className,
  children,
  ...props
}: SectionCardProps) {
  return (
    <div className={cn(sectionCardVariants({ padding, rounded }), className)} {...props}>
      <div className={cn("flex items-center justify-between", spacing.sectionHeaderBottom)}>
        <div>
          <h2 className={typography.sectionTitle}>{title}</h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

export { sectionCardVariants }
