# Essentials — Portable UI Kit

**Move this entire folder anywhere.** It is self-contained.

Vite + React + TypeScript + Tailwind + shadcn/ui + Motion Primitives + dashboard patterns.

---

## Quick start

```bash
# 1. Move essentials wherever you keep templates
mv essentials ~/Developer/templates/essentials

# 2. In your NEW project (after vite + shadcn init):
cp -R ~/Developer/templates/essentials ./essentials

# 3. Install only what you need
node essentials/setup/init.mjs --list
node essentials/setup/init.mjs --preset dashboard

# 4. Run the npm install command it prints
# 5. Configure vite + tailwind (see INSTRUCTIONS.md)
# 6. rm -rf essentials   # optional — app lives in src/
```

**Full guide:** [INSTRUCTIONS.md](./INSTRUCTIONS.md)

---

## What's inside

```
essentials/
├── INSTRUCTIONS.md          ← Start here (step-by-step)
├── README.md                ← This file
├── FRAMEWORK.md             ← Component rules
├── MOTION-PRIMITIVES.md     ← Motion catalog
├── setup/
│   ├── init.mjs             ← Selective installer
│   ├── init.sh
│   └── manifest.json        ← Files + deps per component
├── components/
│   ├── ui/                  ← 21 shadcn components
│   ├── motion-primitives/   ← 33 motion components
│   ├── primitives/          ← StatusBadge, MetricTile
│   └── patterns/            ← PageHeader, SectionCard, …
├── lib/                     ← utils, tokens, motion presets
├── hooks/
└── types/
```

---

## Presets

| Preset | Use |
|--------|-----|
| `minimal` | Forms: button, input, label |
| `dashboard` | SaaS app with tables, KPIs, dialogs |
| `marketing` | Landing page with motion hero |
| `full-ui` | All shadcn in kit |
| `full-motion` | All motion primitives |

```bash
node essentials/setup/init.mjs --preset dashboard
node essentials/setup/init.mjs --ui button,dialog --motion text-scramble
```

---

## After install

```tsx
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/patterns/PageHeader"
import { TextScramble } from "@/components/motion-primitives/text-scramble"
```

**Do not** copy the whole `essentials/` folder into `src/`. Use `init.mjs` to pull only what you need.

---

## Origin

Extracted from the AI CHRO dashboard project. The live app uses its own `src/components/` — this kit is for **new** projects only.
