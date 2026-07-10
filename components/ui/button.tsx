import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * shadcn/ui Button — extended with dashboard sizes (xs, icon-sm)
 * and pill variants for toggles.
 *
 * Drop into `src/components/ui/button.tsx` in a new shadcn project,
 * or import from this kit after wiring path aliases.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-semibold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto active:scale-100",
        pill: "rounded-full bg-primary/10 text-primary hover:bg-primary/20",
        "pill-active": "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-9 px-4 text-sm rounded-md",
        xs: "h-7 px-2 text-[11px] rounded-md [&_svg]:size-3",
        sm: "h-8 px-3 text-xs rounded-md [&_svg]:size-3.5",
        lg: "h-10 px-6 text-sm rounded-md",
        icon: "h-9 w-9 rounded-md [&_svg]:size-4",
        "icon-sm": "h-7 w-7 rounded-md [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
