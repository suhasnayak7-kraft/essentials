/**
 * Merge these into your project's tailwind.config.js → theme.extend.colors
 * after initializing shadcn (`npx shadcn@latest init`).
 *
 * Required for StatusBadge, MetricTile, MetricCard tone tokens.
 *
 * Also add to content so kit classes are not purged:
 *   './essentials/**/*.{ts,tsx}'
 * or whatever path you copy the kit into.
 */
module.exports = {
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
}
