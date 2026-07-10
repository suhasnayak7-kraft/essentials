# New project — selective install

**Do not copy the entire `essentials/` folder into your app.**

The essentials is a **template source**. New projects pull only the files they need into `src/` via the installer.

**Boilerplate path:**

```
/Users/suhasanayak/Developer/Projects/AI_CHRO_dashboard-main/essentials
```

---

## Step 1 — Create app

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## Step 2 — Tailwind + shadcn

```bash
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p

npx shadcn@latest init
# Style: default | Base: slate | CSS variables: yes
```

## Step 3 — Copy essentials as template source only

```bash
cp -R /path/to/essentials ./essentials
```

You can delete `essentials/` after install (Step 4).

## Step 4 — Selective install (pick what you need)

```bash
# See presets and all component names
node essentials/setup/init.mjs --list

# Recommended for dashboards
node essentials/setup/init.mjs --preset dashboard

# Or pick individually
node essentials/setup/init.mjs \
  --ui button,dialog,tabs,table \
  --patterns page-header,section-card \
  --motion text-scramble,in-view

# Forms-only starter
node essentials/setup/init.mjs --preset minimal
```

The installer prints an `npm install …` command with **only the deps you need**. Run it:

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react motion ...
```

### Presets

| Preset | What you get |
|--------|----------------|
| `minimal` | core + tokens + button, input, label |
| `dashboard` | common shadcn + StatusBadge, MetricTile, PageHeader, SectionCard, MetricCard + text-loop, in-view |
| `marketing` | button + hero motion (text-scramble, glow-effect, scroll-progress, …) |
| `full-ui` | all 21 shadcn components in the kit |
| `full-motion` | all 33 motion primitives (large — prefer picking individually) |

Manifest (full catalog + deps): `setup/manifest.json`

## Step 5 — Vite alias (`vite.config.ts`)

```ts
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
```

## Step 6 — Tailwind

In `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{ts,tsx}"],
```

Merge colors from `essentials/setup/tailwind.snippet.js` into `theme.extend.colors`.

Add plugin: `require("tailwindcss-animate")`.

## Step 7 — CSS variables (optional brand)

Paste `essentials/setup/css-variables.snippet.css` into `src/index.css` `:root` block.

## Step 8 — Use components

```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PageHeader } from "@/components/patterns/PageHeader"
import { MetricTile } from "@/components/primitives/MetricTile"
import { TextScramble } from "@/components/motion-primitives/text-scramble"
import { spacing } from "@/lib/tokens"
```

Import **per file** (shadcn style). No need for a giant barrel import.

## Step 9 — Remove template (optional)

```bash
rm -rf essentials
```

Your app lives entirely in `src/`. Add more later by re-running init or copying single files from the template repo.

---

## Add more later

```bash
# One more shadcn component from the kit
node essentials/setup/init.mjs --ui checkbox

# One motion primitive
node essentials/setup/init.mjs --motion dock

# Or use official CLIs
npx shadcn@latest add sonner
npx motion-primitives@latest add text-scramble
```

---

## What's available (catalog)

See `setup/manifest.json` or run `--list`. Docs:

- shadcn rules: `FRAMEWORK.md`
- Motion catalog: `MOTION-PRIMITIVES.md`

### Layers (always pulled when needed)

| Layer | Files | When |
|-------|-------|------|
| `core` | `lib/utils.ts`, `types/components.ts` | Any component |
| `tokens` | `lib/tokens.ts` | Primitives, patterns |
| `motion-lib` | `lib/motion.ts` | Motion + AnnouncementMic |
| `hooks` | `hooks/useClickOutside.ts` | AnnouncementMic, some motion |

### shadcn/ui (`--ui`)

button, badge, card, input, textarea, label, checkbox, switch, select, dropdown-menu, popover, tooltip, dialog, sheet, tabs, avatar, scroll-area, separator, alert, skeleton, table

### Kit (`--primitives`, `--patterns`)

- Primitives: status-badge, metric-tile
- Patterns: page-header, section-card, metric-card, announcement-mic

### Motion (`--motion`)

All 33 at `components/motion-primitives/` — pick only what you use.

---

## After setup

1. Read `FRAMEWORK.md` for rules
2. Edit `src/lib/tokens.ts` for your brand
3. Add more anytime via `init.mjs` or shadcn/motion CLIs
