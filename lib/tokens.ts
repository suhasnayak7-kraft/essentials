/**
 * Design tokens — single source for spacing, typography, surfaces, and interaction.
 * Mirror of src/lib/tokens.ts for portable essentials usage.
 */

export const spacing = {
  page: "px-6 py-5",
  pageMax: "max-w-[1600px] mx-auto",
  sectionStack: "flex flex-col gap-5",
  gridKpi: "gap-3",
  gridSection: "gap-5",
  cardPadding: {
    tile: "p-3.5",
    metric: "p-4",
    section: "p-5",
  },
  pageHeaderBottom: "mb-5",
  sectionLabelBottom: "mb-3",
  sectionHeaderBottom: "mb-3",
  filterBottom: "mb-4",
  stackSm: "gap-2",
  stackMd: "gap-3",
  stackLg: "gap-5",
} as const

export const surface = {
  card: "bg-card border border-border",
  cardTile: "bg-card border border-border rounded-lg",
  cardSection: "bg-card border border-border rounded-xl",
  insight: "bg-[#EAF2FF] border border-primary/15 rounded-lg p-3",
  insightBorder: "border-[#0056c1]/20",
  alert: "bg-[#FFF7E6] border border-warning/40 rounded-lg",
} as const

export const typography = {
  pageTitle: "text-lg font-bold text-brand-navy",
  sectionTitle: "text-sm font-bold text-brand-navy",
  sectionLabel: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
  microLabel: "text-[11px] font-medium text-muted-foreground",
  microBold: "text-[11px] font-semibold",
  bodySm: "text-[12.5px] text-brand-navy leading-relaxed",
  bodyXs: "text-[12px] text-brand-navy leading-relaxed",
  metricValue: "text-xl font-bold text-brand-navy",
  heroMetric: "text-[36px] font-extrabold text-brand-navy leading-none",
} as const

export const toneBadge = {
  green: "bg-success-muted text-success-foreground",
  amber: "bg-warning-muted text-warning-foreground",
  red: "bg-danger-muted text-danger-foreground",
} as const

export const toneDot = {
  green: "bg-success",
  amber: "bg-warning",
  red: "bg-danger",
} as const

export const control = {
  select:
    "text-[11.5px] border border-border rounded-md px-2.5 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow",
  input:
    "px-3 py-1.5 text-[12px] rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow",
  inputBrand:
    "px-3 py-1.5 text-[12px] rounded-md border border-primary/25 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow",
} as const

export const interaction = {
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  cardHover:
    "hover:shadow-md hover:border-primary/30 transition-all duration-150",
  press: "active:scale-[0.98] transition-transform duration-100",
  transition: "transition-colors duration-150",
} as const

/** Button size & variant reference (implement via cva in ui/button) */
export const buttonBehavior = {
  sizes: {
    xs: "h-7 px-2 text-[11px]",
    sm: "h-8 px-3 text-xs",
    default: "h-9 px-4 text-sm",
    lg: "h-10 px-6 text-sm",
    icon: "h-9 w-9",
    iconSm: "h-7 w-7",
  },
  variants: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border hover:bg-muted",
    ghost: "hover:bg-muted",
    link: "text-primary hover:underline",
    pill: "rounded-full bg-primary/10 text-primary hover:bg-primary/20",
    pillActive: "rounded-full bg-primary text-primary-foreground",
  },
  motion: "active:scale-[0.98] transition-all duration-150",
  focus: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
} as const
