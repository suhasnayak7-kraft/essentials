# Reusable Component Framework

> **Living document** — edit this file as your team standards evolve.
> Use it as the source of truth for component design, then promote sections into Cursor rules (`.cursor/rules/`) when ready.

---

## 1. Philosophy

- **Built on shadcn/ui.** Base primitives live in `components/ui/` (copy-paste Radix + Tailwind). Extend with `npx shadcn@latest add …`.
- **Reuse through composition, not inheritance.** shadcn → kit primitives → patterns → pages.
- **Data-agnostic by default.** Kit components accept props; they do not fetch data or read global state.
- **Token-driven styling.** Use `lib/tokens.ts` + CSS variables — not hardcoded hex in reusable code.
- **One component, one job.** If a component does layout + data fetching + formatting, split it.
- **Portable for new projects.** Use `setup/init.mjs` to copy **only required files** into `src/` — do not copy the whole `essentials/` folder (see `README.md` + `setup/NEW-PROJECT.md`).

---

## 2. Folder structure

```
essentials/
├── FRAMEWORK.md              # This file — rules & conventions
├── README.md                 # New-project setup (shadcn)
├── index.ts                  # Root barrel
├── components/
│   ├── ui/                   # shadcn: Button, Badge, Card, …
│   ├── motion-primitives/    # All 33 Motion Primitives (use Motion namespace)
│   ├── primitives/           # StatusBadge, MetricTile
│   ├── patterns/             # PageHeader, SectionCard, AnnouncementMic
│   └── index.ts
├── hooks/                    # useClickOutside
├── lib/                      # cn(), tokens, motion presets
├── lib/                      # cn(), tokens
├── types/                    # Tone, TrendDirection, ComponentSize
└── setup/                    # components.json, deps, Tailwind/CSS snippets
```

### What belongs where

| Layer | Criteria | Stays out if… |
|-------|----------|---------------|
| **shadcn/ui** | Official / extended shadcn components | Custom product semantics |
| **Primitive** | Single visual unit, no business meaning | It knows about KPIs, vendors, payroll |
| **Pattern** | Composes ui + primitives, still generic | It imports from `@/data/` or page state |
| **Domain** | App-specific semantics | — lives in your app’s `src/components/` |

### shadcn workflow

1. `npx shadcn@latest init` in the new project
2. Run `node essentials/setup/init.mjs --preset dashboard` (or pick `--ui`, `--patterns`, `--motion`)
3. Install only the printed npm deps
4. Add more anytime: `init.mjs --ui checkbox` or `npx shadcn@latest add sonner`
5. Add motion: `init.mjs --motion text-scramble` — see [MOTION-PRIMITIVES.md](../MOTION-PRIMITIVES.md)
6. Merge `setup/tailwind.snippet.js` colors into `theme.extend.colors`
7. Prefer kit `Button` for all actions — never raw `<button className="…">`

---

## 3. Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| File | PascalCase, matches export | `MetricTile.tsx` |
| Component | PascalCase, noun | `StatusBadge` |
| Props interface | `{Component}Props` | `MetricTileProps` |
| Variants (cva) | `{component}Variants` | `statusBadgeVariants` |
| Hooks | `use` prefix, camelCase | `useClickOutside` |
| Types | PascalCase, descriptive | `Tone`, `TrendDirection` |

**Avoid:** `Shared.tsx`, `Utils.tsx`, `Common.tsx` — name by what it does.

---

## 4. Component API design

### Required patterns

```tsx
// 1. Extend native HTML attributes where possible
export interface MetricTileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  value: string
}

// 2. Always accept className for override
className?: string

// 3. Use forwardRef for interactive / focusable elements
const MetricTile = React.forwardRef<HTMLButtonElement, MetricTileProps>(...)

// 4. Set displayName
MetricTile.displayName = "MetricTile"
```

### Props checklist

- [ ] `className` accepted and merged with `cn()`
- [ ] Required vs optional props are intentional
- [ ] Variants use `cva` when there are 2+ visual states
- [ ] `children` only when the component is a true container
- [ ] No `any` — export shared types from `types/`

### Variant design

Prefer **semantic variants** over boolean flags:

```tsx
// Good
<StatusBadge tone="amber" />

// Avoid
<StatusBadge isWarning isActive />
```

---

## 5. Styling rules

### Use design tokens

```tsx
// Good — semantic tokens
className="bg-card border-border text-muted-foreground"

// Avoid in essentials — hardcoded brand hex
className="text-[#1B2B4B] bg-[#0056c1]"
```

> **Exception:** Domain components in `src/components/` may use brand hex until promoted.

### Always merge classes with `cn()`

```tsx
import { cn } from "../lib/utils"

<div className={cn("base-classes", toneClasses[tone], className)} />
```

### Use `cva` for multi-variant components

See `components/primitives/StatusBadge.tsx` for the canonical pattern.

### Spacing & typography scale

| Use case | Size |
|----------|------|
| Micro label | `text-[11px]` |
| Body small | `text-xs` |
| Section title | `text-sm font-bold` |
| Page title | `text-lg font-bold` |
| Metric value | `text-xl font-bold` |

---

## 6. Composition patterns

### Compound components

For multi-part UI (card with header/footer), export named parts:

```tsx
<SectionCard title="KPIs">
  <SectionCard.Content>...</SectionCard.Content>
</SectionCard>
```

Or export siblings: `Card`, `CardHeader`, `CardContent` (shadcn style).

### Slot / `asChild`

Use `@radix-ui/react-slot` when the component should render as a child element (link-styled button, etc.).

### Render props & icons

Accept `icon?: React.ReactNode` or `leading?: React.ReactNode` instead of hardcoding Lucide icons in primitives.

---

## 7. Accessibility

- [ ] Interactive elements use `<button>` or `<a>`, not `<div onClick>`
- [ ] Icon-only buttons have `aria-label`
- [ ] Focus ring visible: `focus-visible:ring-2 focus-visible:ring-ring`
- [ ] Color is not the only signal — pair with icon or text
- [ ] Dialogs trap focus (use `@radix-ui/react-dialog`)

---

## 8. Exports & imports

### Barrel file (`components/index.ts`)

Only export the **public API**. Keep internals private.

```tsx
// Prefer root barrel
import { Button, StatusBadge, MetricTile, PageHeader, spacing } from "./essentials"
```

### Cross-project usage (shadcn)

See **`README.md`** and **`setup/`** for the full flow:

1. Vite + React + TS → `npx shadcn@latest init`
2. Copy `essentials/` (or merge `ui/` + `lib/` into `src/`)
3. Merge `setup/tailwind.snippet.js` colors
4. Install deps from `setup/package.deps.json`

---

## 9. Promotion workflow

When extracting a domain component → essentials:

1. **Strip domain types** — replace `KPI` with generic `label`, `value`, `delta`
2. **Replace hex with tokens** — map brand colors to CSS variables
3. **Remove data imports** — no `@/data/*` in essentials
4. **Add variants** — generalize one-off styles into `cva`
5. **Document props** — add JSDoc on exported interfaces
6. **Update this file** — note the new component and its intended use

---

## 10. Anti-patterns

| Don't | Do instead |
|-------|------------|
| `Shared.tsx` junk drawer | Split into named primitives/patterns |
| Props drilling 5 levels | Context or composition |
| `style={{}}` inline | Tailwind + `cn()` |
| Copy-paste from shadcn without adapting | Align with your tokens |
| Export everything | Curate public API in `index.ts` |
| Business logic in UI | Keep formatting in `lib/`, data in `data/` |

---

## 11. Testing checklist

- [ ] Renders with minimum required props
- [ ] `className` override works
- [ ] Variants render distinct styles
- [ ] Keyboard accessible (if interactive)
- [ ] Works in light/dark mode (if theming enabled)

---

## 12. Dependency & UI stack inventory

> Audited against `package.json` and actual imports in `src/`. Update when deps change.

### Core framework

| Package | Version | Role |
|---------|---------|------|
| `react` / `react-dom` | ^19 | UI runtime |
| `vite` | ^5.4 | Dev server & build |
| `typescript` | ~5.5 | Type safety |
| `tailwindcss` | ^3.4 | Utility CSS |
| `tailwindcss-animate` | ^1.0 | Accordion/keyframe animations |
| `postcss` + `autoprefixer` | ^8 / ^10 | CSS pipeline |

### Styling utilities (required everywhere)

| Package | Used in | Purpose |
|---------|---------|---------|
| `clsx` | `src/lib/utils.ts`, `essentials/lib/utils.ts` | Conditional classes |
| `tailwind-merge` | `cn()` helper | Prevent Tailwind conflicts |
| `class-variance-authority` | `ui/button`, `ui/badge`, essentials primitives | Variant APIs |

### UI library pattern — shadcn/ui (copy-paste, not npm)

Configured via `components.json`. Components live in `src/components/ui/` and wrap **Radix UI** primitives.

| shadcn component | Radix dependency | Used in active app? |
|------------------|------------------|---------------------|
| `button.tsx` | `@radix-ui/react-slot` | No |
| `dialog.tsx` | `@radix-ui/react-dialog` | No — `NLQModal` is custom overlay |
| `tabs.tsx` | `@radix-ui/react-tabs` | No |
| `avatar.tsx` | `@radix-ui/react-avatar` | No |
| `scroll-area.tsx` | `@radix-ui/react-scroll-area` | No |
| `badge.tsx` | none (pure Tailwind) | Only orphaned sales pages |
| `card.tsx` | none (pure Tailwind) | Only orphaned sales pages |

**Active dashboard (`App.tsx`)** uses custom `beeforce/` components + `lucide-react` — not shadcn `ui/*`.

### Icons

| Package | Usage |
|---------|-------|
| `lucide-react` | App shell, KPIs, modals, essentials `MetricTile` |

### Charts — custom SVG (no chart library)

All charts in `src/components/beeforce/charts/` are **hand-rolled SVG**. No Recharts, Chart.js, D3, Visx, or Nivo.

| Component | Type | Used on |
|-----------|------|---------|
| `BarChart` | Vertical bars | Executive, CFO, CIO, CDO pages |
| `HorizontalBarChart` | Horizontal bars | Attendance, Digital Health |
| `LineChart` | Multi-series lines | Most persona pages |
| `DonutChart` | Ring + legend | Compliance, Adoption, Grievance |
| `Gauge` | Semi-circle gauge | Cost, Productivity, Engagement |
| `ScatterChart` | XY plot | Vendor Risk, Productivity, Financials |
| `Sparkline` | Mini line | `WEICard` |
| `Heatmap` | Grid heatmap | Attendance |
| `MonthHeatmap` | Calendar heatmap | Attendance |
| `HeatmapLegend` | Color scale legend | Heatmaps |
| `heatColor.ts` | Color helper | Heatmaps |

**Boilerplate status:** charts not yet promoted — candidate for `essentials/charts/`.

### Motion & animation

| Package | Used in | Active in App? |
|---------|---------|----------------|
| `motion` (v12, `motion/react`) | `motion-primitives/*`, `AnnouncementMic` | **No** — not imported in `App.tsx` |
| `react-use-measure` | `AnnouncementMic` only | **No** |

Motion primitives available but unused in the live dashboard:

- `src/components/motion-primitives/dock.tsx`
- `src/components/motion-primitives/glow-effect.tsx`
- `src/components/motion-primitives/text-loop.tsx`
- `src/components/custom/AnnouncementMic.tsx`

### Hooks

| Hook | Location | Used in active app? |
|------|----------|---------------------|
| `useClickOutside` | `src/hooks/useClickOutside.ts` | Only `AnnouncementMic` (unused) |
| `useClickOutside` | `essentials/hooks/useClickOutside.ts` | Boilerplate copy |
| `useCompany` | `src/state/CompanyContext.tsx` | Yes — dashboard state |

### Fonts & tokens

| Asset | Source |
|-------|--------|
| DM Sans | Google Fonts (`index.html`) |
| CSS variables | `src/index.css` (`--primary`, `--card`, etc.) |
| Brand hex | Hardcoded in beeforce/charts and domain components |

### Boilerplate minimum deps

To copy `essentials/` into a new project:

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react
# Optional if using Radix-based primitives:
npm install @radix-ui/react-slot
```

Also copy: `tailwind.config.js` color tokens, `src/index.css` CSS variables.

### Orphan / dead code (not in `App.tsx` routing)

| Path | Uses | Notes |
|------|------|-------|
| `src/pages/WhyBuyFromMeNow.tsx` etc. (12 sales pages) | `ui/card`, `ui/badge` | Legacy harness pages |
| `src/components/ui/*` (5 of 7) | Radix | Installed but unused in dashboard |
| `src/components/motion-primitives/*` | `motion` | Built but not wired |
| `src/components/custom/AnnouncementMic.tsx` | `motion`, `react-use-measure` | Built but not wired |

### Recommended decisions

| Question | Current state | Options |
|----------|---------------|---------|
| Chart library | Custom SVG only | Keep lightweight SVG **or** add Recharts for interactivity |
| shadcn components | 5/7 unused | Remove unused **or** migrate `NLQModal` → `Dialog`, nav → `Tabs` |
| Motion | Installed, unused | Wire into dashboard **or** remove to shrink bundle |
| Charts in essentials | Not extracted | Promote `charts/` to `essentials/charts/` with token colors |

---

## 13. Spacing, typography & interaction behavior

> Source of truth: `src/lib/tokens.ts` (app) and `essentials/lib/tokens.ts` (portable copy).

### Spacing scale

| Token | Class | Use |
|-------|-------|-----|
| `spacing.page` | `px-6 py-5` | Main content area |
| `spacing.pageMax` | `max-w-[1600px] mx-auto` | Content width cap |
| `spacing.sectionStack` | `flex flex-col gap-5` | Vertical page sections |
| `spacing.gridSection` | `gap-5` | Two/three column layouts |
| `spacing.gridKpi` | `gap-3` | KPI tile grids |
| `spacing.pageHeaderBottom` | `mb-5` | Below page title |
| `spacing.sectionHeaderBottom` | `mb-3` | Below section card title |
| `spacing.sectionLabelBottom` | `mb-3` | Below uppercase labels |
| `spacing.filterBottom` | `mb-4` | Below filter bars / alerts |

### Card padding tiers

| Tier | Padding | Radius | Example |
|------|---------|--------|---------|
| Tile | `p-3.5` | `rounded-lg` | KPI tile, clickable metric |
| Metric | `p-4` | `rounded-lg` / `rounded-xl` | MetricCard, PredictionCard |
| Section | `p-5` | `rounded-xl` | SectionCard, WEICard |

### Typography scale

| Token | Size | Use |
|-------|------|-----|
| `typography.pageTitle` | `text-lg` bold | Page headers |
| `typography.sectionTitle` | `text-sm` bold | Card section titles |
| `typography.sectionLabel` | `text-xs` uppercase | "Workforce KPIs", "Priority Actions" |
| `typography.microLabel` | `11px` | Metric labels, filter text |
| `typography.bodySm` | `12.5px` | Body copy, narratives |
| `typography.metricValue` | `text-xl` bold | KPI numbers |
| `typography.heroMetric` | `36px` extrabold | WEI score |

Use `text-brand-navy` instead of hardcoded `#1B2B4B`.

### Button behavior (`ui/button`)

| Size | Height | Text | Use |
|------|--------|------|-----|
| `xs` | 28px | 11px | Inline links, card actions |
| `sm` | 32px | 12px | AI insight toggle, form submit |
| `default` | 36px | 14px | Primary actions |
| `icon-sm` | 28×28 | — | Dismiss, close icons |

| Variant | Behavior |
|---------|----------|
| `default` | Primary fill, hover 90% opacity, subtle shadow |
| `outline` | Border only, hover muted bg |
| `ghost` | No border, hover muted bg |
| `link` | Text only, underline on hover, no press scale |
| `pill` | Rounded-full, primary/10 bg — inactive toggle |
| `pill-active` | Rounded-full, primary fill — active toggle |

**All buttons:** `active:scale-[0.98]`, `focus-visible:ring-2`, `disabled:opacity-50`.

**Rule:** Never use raw `<button className="...">` in dashboard components — use `<Button>` from `@/components/ui/button`.

### Interactive card behavior

| Component | Interactive when | Hover | Focus |
|-----------|------------------|-------|-------|
| `KPITile` | `onClick` provided | shadow + primary border | ring |
| `MetricTile` | `onClick` or `interactive` | shadow + primary border | ring |
| `SectionCard` | never | none | — |

Non-interactive KPI tiles render as `<div>`, not `<button>`.

### Form controls

| Token | Use |
|-------|-----|
| `control.select` | FilterBar dropdowns |
| `control.input` | Standard text inputs |
| `control.inputBrand` | AI insight follow-up field |

All controls: `focus:ring-2 focus:ring-ring/30`, consistent `rounded-md`.

### Tone colors

| Semantic | Tailwind | Hex |
|----------|----------|-----|
| Success | `text-success`, `bg-success-muted` | `#00B37E` |
| Warning | `text-warning`, `bg-warning-muted` | `#F59E0B` |
| Danger | `text-danger`, `bg-danger-muted` | `#EF4444` |
| Brand navy | `text-brand-navy` | `#1B2B4B` |

---

## 14. Your rules (edit below)

> Add team-specific decisions here. When a section is stable, promote it to `.cursor/rules/essentials-components.mdc`.

### Brand tokens

- Primary blue: `#0056c1` → `--primary`
- Success green: `#00B37E`
- Warning amber: `#F59E0B`
- Danger red: `#EF4444`
- Navy text: `#1B2B4B`

### Component ownership

| Component | Layer | Deps | Status |
|-----------|-------|------|--------|
| Button / Badge / Card | shadcn ui | Radix, cva | kit-ready |
| StatusBadge | kit primitive | cva, tokens | kit-ready |
| MetricTile | kit primitive | cva, lucide, tokens | kit-ready |
| PageHeader / SectionCard / MetricCard | kit pattern | tokens | kit-ready |
| Dialog / Tabs / Avatar | shadcn (add via CLI) | Radix | optional |
| KPITile / charts | domain (this app) | — | not in kit |

### Decisions pending

- [ ] Dark mode support in all kit primitives?
- [ ] Promote custom SVG charts into `essentials/charts/`?
- [ ] Add more shadcn pieces to kit (`dialog`, `tabs`, `input`)?
- [ ] Storybook or Ladle for visual docs?

### Notes

<!-- Add your own conventions, links to Figma, ADRs, etc. -->
