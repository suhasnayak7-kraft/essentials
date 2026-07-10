# Setup Instructions

Portable UI kit — **move this `essentials/` folder anywhere** and use it to bootstrap new projects.

---

## What this is

- Template source for **Vite + React + TypeScript + Tailwind + shadcn/ui + Motion**
- **Do not** copy the whole folder into your app
- Run the installer → only chosen files land in your project's `src/`
- After setup, import from `@/components/*` like a normal shadcn project

---

## Move this folder

```bash
# Example: keep templates outside any single project
mv essentials ~/Developer/templates/essentials

# Or clone/copy to a shared drive, another machine, etc.
# The folder is fully self-contained — no parent project required.
```

When starting a new app, copy it in temporarily:

```bash
cp -R ~/Developer/templates/essentials ./essentials
```

Delete `./essentials` from the new project after install (optional).

---

## Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

---

## Step 1 — Create the app

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

---

## Step 2 — Tailwind + shadcn

```bash
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p

npx shadcn@latest init
```

Recommended prompts: Style **Default**, Base **Slate**, CSS variables **Yes**.

---

## Step 3 — Copy essentials into the project (temporary)

```bash
cp -R /path/to/essentials ./essentials
```

Use your actual path — wherever you moved this folder.

---

## Step 4 — Selective install

### List available components

```bash
node essentials/setup/init.mjs --list
```

### Presets

```bash
# SaaS / dashboard (recommended)
node essentials/setup/init.mjs --preset dashboard

# Forms only
node essentials/setup/init.mjs --preset minimal

# Landing / marketing
node essentials/setup/init.mjs --preset marketing
```

### Pick individually

```bash
node essentials/setup/init.mjs \
  --ui button,dialog,tabs,table,input \
  --primitives status-badge,metric-tile \
  --patterns page-header,section-card \
  --motion text-scramble,in-view
```

| Preset | What you get |
|--------|----------------|
| `minimal` | utils + tokens + button, input, label |
| `dashboard` | common shadcn + KPI patterns + light motion |
| `marketing` | hero motion + minimal shadcn |
| `full-ui` | all 21 shadcn components |
| `full-motion` | all 33 motion primitives |

**Run the `npm install …` command** the installer prints — only deps for your selection.

---

## Step 5 — Vite alias

`vite.config.ts`:

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

`tsconfig.json` (or `tsconfig.app.json`):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Step 6 — Tailwind

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // From essentials/setup/tailwind.snippet.js
        brand: {
          DEFAULT: "#0056c1",
          foreground: "#ffffff",
          navy: "#1B2B4B",
        },
        success: {
          DEFAULT: "#00B37E",
          foreground: "#00875A",
          muted: "#00B37E1A",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#92670B",
          muted: "#F59E0B1A",
        },
        danger: {
          DEFAULT: "#EF4444",
          foreground: "#C92A2A",
          muted: "#EF44441A",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

Optional: paste `essentials/setup/css-variables.snippet.css` into `src/index.css`.

---

## Step 7 — Use in your app

```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PageHeader } from "@/components/patterns/PageHeader"
import { MetricTile } from "@/components/primitives/MetricTile"
import { TextScramble } from "@/components/motion-primitives/text-scramble"
import { spacing } from "@/lib/tokens"

export function App() {
  return (
    <div className={spacing.sectionStack}>
      <PageHeader title="Dashboard" subtitle="My App" />
      <MetricTile label="Users" value="1,240" delta="+12%" trend="up" tone="green" />
      <TextScramble className="text-2xl font-bold">Welcome</TextScramble>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>Hello</DialogContent>
      </Dialog>
    </div>
  )
}
```

---

## Step 8 — Clean up

```bash
rm -rf essentials
```

Your app lives in `src/` only.

---

## Add more later

Re-copy essentials (or keep a permanent template path), then:

```bash
node essentials/setup/init.mjs --ui checkbox
node essentials/setup/init.mjs --motion dock
npx shadcn@latest add sonner
npx motion-primitives@latest add text-scramble
```

---

## Component catalog

### shadcn (`--ui`)

`button` `badge` `card` `input` `textarea` `label` `checkbox` `switch` `select` `dropdown-menu` `popover` `tooltip` `dialog` `sheet` `tabs` `avatar` `scroll-area` `separator` `alert` `skeleton` `table`

### Primitives (`--primitives`)

`status-badge` `metric-tile`

### Patterns (`--patterns`)

`page-header` `section-card` `metric-card` `announcement-mic`

### Motion (`--motion`)

`accordion` `animated-background` `animated-group` `animated-number` `border-trail` `carousel` `cursor` `dialog` `disclosure` `dock` `glow-effect` `image-comparison` `in-view` `infinite-slider` `magnetic` `morphing-dialog` `morphing-popover` `progressive-blur` `scroll-progress` `sliding-number` `spinning-text` `spotlight` `text-effect` `text-loop` `text-morph` `text-roll` `text-scramble` `text-shimmer` `text-shimmer-wave` `tilt` `toolbar-dynamic` `toolbar-expandable` `transition-panel`

Full deps: `setup/manifest.json`

---

## Notes

1. Motion `Dialog` ≠ shadcn `Dialog` — import motion from `@/components/motion-primitives/dialog`
2. Edit `src/lib/tokens.ts` for your brand after install
3. Design rules: `FRAMEWORK.md`
4. Motion docs: https://motion-primitives.com/docs

---

## File map (after install)

```
my-app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── primitives/
│   │   ├── patterns/
│   │   └── motion-primitives/
│   ├── lib/utils.ts
│   ├── lib/tokens.ts
│   ├── lib/motion.ts
│   ├── hooks/
│   └── types/
├── vite.config.ts
└── tailwind.config.js
```

---

## Related files in this folder

| File | Purpose |
|------|---------|
| `setup/init.mjs` | Selective installer |
| `setup/manifest.json` | Files + npm deps per component |
| `FRAMEWORK.md` | Component conventions |
| `MOTION-PRIMITIVES.md` | Motion reference |
