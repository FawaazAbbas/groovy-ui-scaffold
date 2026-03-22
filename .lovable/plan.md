

# Three Changes: Dark Mode, Font Unification, Tool-Use Block Contrast

## 1. Unify fonts to Plus Jakarta Sans

**Files changed**: `src/index.css`, `tailwind.config.ts`

- Replace the Google Fonts import: swap `Inter` for `Plus Jakarta Sans` (weights 400-700)
- Update `body` font-family in `src/index.css` to `'Plus Jakarta Sans'`
- Update `tailwind.config.ts` `fontFamily.sans` to `'"Plus Jakarta Sans"'`
- JetBrains Mono stays as the mono font (no change)

## 2. Fix tool-use blocks in chat for better contrast

**File changed**: `src/pages/ChatsPage.tsx` (lines 110-118)

The tool-use `<details>` block currently uses `bg-surface-elevated` with `text-text-secondary` for the output area. On light mode this is low-contrast because the elevated surface is near-white and the secondary text is gray.

Changes:
- Give the expanded content area a light warm tint (`bg-electric/[0.04]`) so it visually separates from the message
- Use `text-text-primary` for the output line (already done) and bump the input line from `text-primary/60` to `text-electric` for the `$` prefix
- Add a subtle left border accent (`border-l-2 border-l-electric/20`) to the details block for visual distinction

## 3. Add dark mode toggle

### 3a. Dark mode tokens (`src/styles/tokens.css`)

Add a `.dark` selector block with inverted tokens:

| Token | Light value | Dark value |
|-------|------------|------------|
| `--background` | `#F5F5F7` | `#1C1C1E` |
| `--surface` | `rgba(255,255,255,0.72)` | `rgba(44,44,46,0.72)` |
| `--surface-solid` | `#FFFFFF` | `#2C2C2E` |
| `--surface-elevated` | `rgba(255,255,255,0.9)` | `rgba(58,58,60,0.9)` |
| `--text-primary` | `#1D1D1F` | `#F5F5F7` |
| `--text-secondary` | `#86868B` | `#98989D` |
| `--border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` |
| `--border-solid` | `#E5E5EA` | `#3A3A3C` |
| `--sidebar` | `rgba(28,28,30,0.82)` | `rgba(0,0,0,0.6)` |
| `--sidebar-solid` | `#1C1C1E` | `#000000` |
| `--liquid-glass` | white-based | `rgba(44,44,46,0.45)` |
| `--liquid-glass-border` | white-based | `rgba(255,255,255,0.1)` |
| `--liquid-glass-inner` | white-based | `rgba(255,255,255,0.06)` |
| Shadows | low opacity black | slightly higher opacity black |

Amber/electric tokens stay the same (they work on both light and dark).

### 3b. Dark mode hook (`src/hooks/use-dark-mode.ts`)

Create a small hook that:
- Reads initial preference from `localStorage` (key: `theme`) or falls back to system preference via `prefers-color-scheme`
- Toggles `.dark` class on `<html>` element
- Persists choice to `localStorage`
- Returns `{ isDark, toggle }`

### 3c. Toggle in WorkspaceLayout (`src/layouts/WorkspaceLayout.tsx`)

- Add a Sun/Moon icon button in the top-right header bar (next to search/bell icons)
- Uses the `useDarkMode` hook
- Simple icon swap with smooth transition

### 3d. Tailwind config already has `darkMode: ["class"]` — no change needed

---

## Summary of files

| File | Change |
|------|--------|
| `src/index.css` | Font import swap |
| `tailwind.config.ts` | Font family update |
| `src/styles/tokens.css` | Add `.dark` token block |
| `src/hooks/use-dark-mode.ts` | New file — dark mode hook |
| `src/layouts/WorkspaceLayout.tsx` | Add toggle button |
| `src/pages/ChatsPage.tsx` | Tool-use block contrast fix |

