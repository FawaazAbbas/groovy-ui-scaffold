

# Swap Accent Colors to Warm Amber/Gold

## What changes

Replace the current violet/purple accent system (`#A78BFA`) with a warm amber/gold (`#D4A017`) across the entire app. This is a token-level change that cascades everywhere, plus updating hardcoded `rgba(167, 139, 250, ...)` values in CSS.

---

## 1. Update `src/styles/tokens.css`

Replace accent-related tokens:

| Token | Current (violet) | New (amber/gold) |
|-------|------------------|-------------------|
| `--comfort` | `#1E1533` | `#2A1F0A` (dark amber bg) |
| `--comfort-text` | `#A78BFA` | `#D4A017` (amber text) |
| `--electric` | `#A78BFA` | `#D4A017` |
| `--electric-muted` | `#1E1533` | `#2A1F0A` |
| `--agent` | `#A78BFA` | `#D4A017` |

Update all glow/decorative tokens to use amber `rgba(212, 160, 23, ...)` instead of violet `rgba(167, 139, 250, ...)`:
- `--neon-glow-sm` through `--neon-glow-xl`
- `--grid-color`
- `--cyan` stays as-is (secondary accent, soft blue — still works with amber)

## 2. Update `src/index.css`

Replace all hardcoded `rgba(167, 139, 250, ...)` references in:
- `.glass-liquid-item-active` background and border
- `.retro-corners` border color
- `.terminal-block` border and shadow
- `.neon-border`, `.neon-border-strong`
- `.neon-text` text-shadow
- `.retro-divider` gradient

All swap to equivalent `rgba(212, 160, 23, ...)` values.

## 3. No component file changes needed

Components use token classes (`text-electric`, `bg-electric-muted`, `neon-glow-sm`, etc.) which will pick up the new values automatically.

---

## Result

The app keeps its current structure and glass aesthetic but shifts from "AI purple neon" to a warm, premium amber/gold accent that feels more distinctive and intentional.

