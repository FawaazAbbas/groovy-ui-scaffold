

# Fix Amber Contrast on Light Backgrounds

## Problem

`#F5C842` (current `--electric`) has a contrast ratio of ~1.6:1 against the light background (`#F5F5F7`). WCAG requires 4.5:1 for text. Every instance of `text-electric`, `text-comfort-text`, `text-agent` on a light surface is unreadable.

## Strategy

Split the amber accent into two tiers:

| Token | Value | Use |
|-------|-------|-----|
| `--electric` | `#946800` (dark amber) | Text on light backgrounds — passes 4.5:1 on white |
| `--electric-bright` | `#F5C842` (current) | Glows, decorative dots, backgrounds, text on dark surfaces |
| `--agent` | `#946800` | Agent icon color (always on light surfaces) |
| `--comfort-text` | `#F5C842` | Kept for text on `--comfort` (dark bg `#2A1F0A`) where bright amber is readable |

## Changes

### 1. `src/styles/tokens.css`
- Change `--electric: #946800` (dark, accessible amber)
- Add `--electric-bright: #F5C842` (decorative/glow amber)
- Change `--agent: #946800`
- Keep `--comfort-text: #F5C842` (used on dark `--comfort` backgrounds, already readable)

### 2. `tailwind.config.ts`
- Add `bright` variant under `electric`: `bright: 'var(--electric-bright)'`

### 3. `src/index.css`
- Update glow/decorative references to use `--electric-bright` where they reference `var(--electric)` in text-shadow, box-shadow, and decorative classes
- `.neon-text` color stays `var(--electric)` (now dark, readable) but text-shadow uses `--electric-bright`
- `.neon-dot` background switches to `var(--electric-bright)` (decorative, no text contrast needed)
- Glow utilities keep using the bright amber rgba values (purely decorative)

### 4. Component files — targeted swaps
Where bright amber is needed on dark surfaces (sidebar items, dark badges, agent badges on dark bg), swap `text-electric` → `text-electric-bright`:
- **WorkspaceLayout.tsx**: Sidebar nav labels, notification badge — these sit on dark glass, need bright amber
- **ChatsPage.tsx**: Agent badge "AI" label on dark bg, typing indicator
- **ActivityPage.tsx**: Agent initials on `bg-electric-muted` (dark)
- **BillingPage.tsx**: Feature badges on `bg-comfort` (dark)

Everything on light surfaces (most instances) keeps `text-electric` which is now the darker, readable `#946800`.

## Result

- All amber text on light backgrounds passes WCAG AA (4.5:1+)
- Amber on dark backgrounds stays vibrant with `text-electric-bright`
- Glows and decorative elements stay bright and warm
- No visual personality lost — the amber identity is preserved, just made accessible

