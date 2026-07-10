/* ── shadcn/ui primitives ── */
export { Button, buttonVariants } from "./ui/button"
export type { ButtonProps } from "./ui/button"

export { Badge, badgeVariants } from "./ui/badge"
export type { BadgeProps } from "./ui/badge"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card"

export { Input } from "./ui/input"
export type { InputProps } from "./ui/input"

export { Textarea } from "./ui/textarea"
export type { TextareaProps } from "./ui/textarea"

export { Label } from "./ui/label"

export { Checkbox } from "./ui/checkbox"

export { Switch } from "./ui/switch"

export { Separator } from "./ui/separator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./ui/select"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./ui/dropdown-menu"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./ui/popover"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet"

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"

export { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

export { ScrollArea, ScrollBar } from "./ui/scroll-area"

export { Alert, AlertTitle, AlertDescription } from "./ui/alert"

export { Skeleton } from "./ui/skeleton"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table"

/* ── Kit primitives ── */
export { StatusBadge, statusBadgeVariants } from "./primitives/StatusBadge"
export type { StatusBadgeProps } from "./primitives/StatusBadge"

export { MetricTile, metricTileVariants } from "./primitives/MetricTile"
export type { MetricTileProps } from "./primitives/MetricTile"

/* ── Kit patterns ── */
export { SectionCard, sectionCardVariants } from "./patterns/SectionCard"
export type { SectionCardProps } from "./patterns/SectionCard"

export { PageHeader } from "./patterns/PageHeader"
export type { PageHeaderProps } from "./patterns/PageHeader"

export { MetricCard } from "./patterns/MetricCard"
export type { MetricCardProps } from "./patterns/MetricCard"

export { AnnouncementMic } from "./patterns/AnnouncementMic"
export type { AnnouncementItem } from "./patterns/AnnouncementMic"

/* ── Motion primitives (motion/react) — full set in ./motion-primitives/ ── */
/** Namespace avoids clashing with shadcn `Dialog`. Or import directly: `./motion-primitives/text-scramble` */
export * as Motion from "./motion-primitives"

/* ── Shared types ── */
export type { Tone, TrendDirection, ComponentSize } from "../types/components"
