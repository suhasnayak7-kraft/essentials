# Motion Primitives

Official docs: **[motion-primitives.com/docs](https://motion-primitives.com/docs)**

Open-source animated UI kit by [@ibelick](https://github.com/ibelick/motion-primitives). Same philosophy as shadcn: **copy-paste components** built with **Motion** (`motion/react`) + **Tailwind CSS**.

This template ships **all 33 official components** as source files. New projects pick only what they need via `init.mjs --motion <name>`.

---

## Prerequisites (same as shadcn)

```bash
npm install motion lucide-react clsx tailwind-merge
```

You need `lib/utils.ts` with `cn()` — installed via `init.mjs` (core layer).

---

## Install motion components (selective)

Pick only what you need — do not install all 33 unless required:

```bash
node essentials/setup/init.mjs --motion text-scramble,in-view,dock
```

Or use a preset:

```bash
node essentials/setup/init.mjs --preset marketing
```

Official CLI (alternative — downloads into your project):

```bash
npx motion-primitives@latest list
npx motion-primitives@latest add text-scramble
```

---

## Available in template (pick via --motion)

All files live in `components/motion-primitives/`. After `init.mjs`, import from your app:

```tsx
import { TextScramble } from "@/components/motion-primitives/text-scramble"
import { InView } from "@/components/motion-primitives/in-view"
```

Motion `Dialog` is separate from shadcn `Dialog` — import by file path to avoid clashes.

| Component | File | Docs |
|-----------|------|------|
| Accordion | `accordion.tsx` | [Accordion](https://motion-primitives.com/docs/accordion) |
| Animated Background | `animated-background.tsx` | [Animated Background](https://motion-primitives.com/docs/animated-background) |
| Animated Group | `animated-group.tsx` | [Animated Group](https://motion-primitives.com/docs/animated-group) |
| Animated Number | `animated-number.tsx` | [Animated Number](https://motion-primitives.com/docs/animated-number) |
| Border Trail | `border-trail.tsx` | [Border Trail](https://motion-primitives.com/docs/border-trail) |
| Carousel | `carousel.tsx` | [Carousel](https://motion-primitives.com/docs/carousel) |
| Cursor | `cursor.tsx` | [Cursor](https://motion-primitives.com/docs/cursor) |
| Dialog | `dialog.tsx` | [Dialog](https://motion-primitives.com/docs/dialog) — use `Motion.Dialog` or direct import |
| Disclosure | `disclosure.tsx` | [Disclosure](https://motion-primitives.com/docs/disclosure) |
| Dock | `dock.tsx` | [Dock](https://motion-primitives.com/docs/dock) |
| Glow Effect | `glow-effect.tsx` | [Glow Effect](https://motion-primitives.com/docs/glow-effect) |
| Image Comparison | `image-comparison.tsx` | [Image Comparison](https://motion-primitives.com/docs/image-comparison) |
| In View | `in-view.tsx` | [In View](https://motion-primitives.com/docs/in-view) |
| Infinite Slider | `infinite-slider.tsx` | [Infinite Slider](https://motion-primitives.com/docs/infinite-slider) |
| Magnetic | `magnetic.tsx` | [Magnetic](https://motion-primitives.com/docs/magnetic) |
| Morphing Dialog | `morphing-dialog.tsx` | [Morphing Dialog](https://motion-primitives.com/docs/morphing-dialog) |
| Morphing Popover | `morphing-popover.tsx` | [Morphing Popover](https://motion-primitives.com/docs/morphing-popover) |
| Progressive Blur | `progressive-blur.tsx` | [Progressive Blur](https://motion-primitives.com/docs/progressive-blur) |
| Scroll Progress | `scroll-progress.tsx` | [Scroll Progress](https://motion-primitives.com/docs/scroll-progress) |
| Sliding Number | `sliding-number.tsx` | [Sliding Number](https://motion-primitives.com/docs/sliding-number) |
| Spotlight | `spotlight.tsx` | [Spotlight](https://motion-primitives.com/docs/spotlight) |
| Spinning Text | `spinning-text.tsx` | [Spinning Text](https://motion-primitives.com/docs/spinning-text) |
| Text Effect | `text-effect.tsx` | [Text Effect](https://motion-primitives.com/docs/text-effect) |
| Text Loop | `text-loop.tsx` | [Text Loop](https://motion-primitives.com/docs/text-loop) |
| Text Morph | `text-morph.tsx` | [Text Morph](https://motion-primitives.com/docs/text-morph) |
| Text Roll | `text-roll.tsx` | [Text Roll](https://motion-primitives.com/docs/text-roll) |
| Text Scramble | `text-scramble.tsx` | [Text Scramble](https://motion-primitives.com/docs/text-scramble) |
| Text Shimmer | `text-shimmer.tsx` | [Text Shimmer](https://motion-primitives.com/docs/text-shimmer) |
| Text Shimmer Wave | `text-shimmer-wave.tsx` | [Text Shimmer Wave](https://motion-primitives.com/docs/text-shimmer-wave) |
| Tilt | `tilt.tsx` | [Tilt](https://motion-primitives.com/docs/tilt) |
| Toolbar Dynamic | `toolbar-dynamic.tsx` | [Toolbar Dynamic](https://motion-primitives.com/docs/toolbar-dynamic) |
| Toolbar Expandable | `toolbar-expandable.tsx` | [Toolbar Expandable](https://motion-primitives.com/docs/toolbar-expandable) |
| Transition Panel | `transition-panel.tsx` | [Transition Panel](https://motion-primitives.com/docs/transition-panel) |

Plus pattern example: **AnnouncementMic** (`components/patterns/AnnouncementMic.tsx`) — combines motion + `react-use-measure` + `useClickOutside`.

Motion presets: `lib/motion.ts` (`springPanel`, `springDock`, `fadeSlide`, `pageEnter`).

---

## Full component catalog

All components below are **already in the kit**. Use the CLI only to pull newer upstream versions:

### Layout & containers
| Component | CLI name | Use |
|-----------|----------|-----|
| Accordion | `accordion` | ✓ Animated expand/collapse |
| Animated Background | `animated-background` | ✓ Moving gradient backgrounds |
| Animated Group | `animated-group` | ✓ Stagger children on mount |
| Carousel | `carousel` | ✓ Image/content carousel |
| Disclosure | `disclosure` | ✓ Show/hide content |
| Infinite Slider | `infinite-slider` | ✓ Looping horizontal slider |
| Transition Panel | `transition-panel` | ✓ Animated panel transitions |

### Text effects
| Component | CLI name | Use |
|-----------|----------|-----|
| Text Effect | `text-effect` | ✓ General text animations |
| Text Loop | `text-loop` | ✓ included |
| Text Morph | `text-morph` | ✓ Morph between strings |
| Text Roll | `text-roll` | ✓ Rolling text |
| Text Scramble | `text-scramble` | ✓ Matrix-style decode |
| Text Shimmer | `text-shimmer` | ✓ Shimmer highlight |
| Text Shimmer Wave | `text-shimmer-wave` | ✓ Wave shimmer |
| Spinning Text | `spinning-text` | ✓ Decorative orbit text |

### Numbers
| Component | CLI name | Use |
|-----------|----------|-----|
| Animated Number | `animated-number` | ✓ Count-up numbers |
| Sliding Number | `sliding-number` | ✓ Slot-machine digits |

### Interactive
| Component | CLI name | Use |
|-----------|----------|-----|
| Dock | `dock` | ✓ included |
| Glow Effect | `glow-effect` | ✓ included |
| Cursor | `cursor` | ✓ Custom cursor |
| Magnetic | `magnetic` | ✓ Magnetic hover pull |
| Tilt | `tilt` | ✓ 3D tilt on hover |
| Spotlight | `spotlight` | ✓ Cursor-following spotlight |
| Image Comparison | `image-comparison` | ✓ Before/after slider |
| Scroll Progress | `scroll-progress` | ✓ Page scroll indicator |
| In View | `in-view` | ✓ Viewport-triggered animation |
| Border Trail | `border-trail` | ✓ Animated border |

### Overlays & toolbars
| Component | CLI name | Use |
|-----------|----------|-----|
| Dialog | `dialog` | ✓ Motion dialog — import as `Motion.Dialog` |
| Morphing Dialog | `morphing-dialog` | ✓ Morphing modal |
| Morphing Popover | `morphing-popover` | ✓ Morphing popover |
| Toolbar Dynamic | `toolbar-dynamic` | ✓ Dynamic toolbar |
| Toolbar Expandable | `toolbar-expandable` | ✓ Expandable toolbar |
| Progressive Blur | `progressive-blur` | ✓ Blur fade effect |

---

## Usage

```tsx
import { TextScramble } from "@/components/motion-primitives/text-scramble"
import { TextLoop } from "@/components/motion-primitives/text-loop"
import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import { Dock, DockItem, DockIcon } from "@/components/motion-primitives/dock"
import { Home } from "lucide-react"

<TextLoop interval={3}>
  <span>Attendance up 4%</span>
  <span>Compliance needs attention</span>
</TextLoop>

<TextScramble className="text-2xl font-bold">Dashboard</TextScramble>

<Dock>
  <DockItem onClick={() => navigate("/")}>
    <DockIcon><Home className="w-full h-full" /></DockIcon>
  </DockItem>
</Dock>

<div className="relative rounded-xl overflow-hidden">
  <GlowEffect mode="rotate" colors={["#0056c1", "#00B37E"]} />
  <div className="relative p-6">Content</div>
</div>
```

---

## shadcn + Motion Primitives together

| Layer | Tool | Folder |
|-------|------|--------|
| Static UI | shadcn/ui | `components/ui/` |
| Animated UI | Motion Primitives | `components/motion-primitives/` |
| Dashboard patterns | This kit | `components/patterns/` |

Use **shadcn Button/Dialog** for forms and accessibility. Use **Motion Primitives** for marketing animations, hero sections, and micro-interactions.

---

## Attribution

Components adapted from [motion-primitives](https://github.com/ibelick/motion-primitives) (MIT).  
When adding via CLI, you get the latest upstream version from [motion-primitives.com](https://motion-primitives.com/docs).
