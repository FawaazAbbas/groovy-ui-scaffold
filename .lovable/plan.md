

# Unified Color Scheme Overhaul

## Problem

The color system has leftover violet references, hardcoded hex values, and inconsistent accent usage scattered across the app. Key issues:

1. **Stale violet rgba values** in WorkspaceLayout (`rgba(167,139,250,...)`) and BillingPage
2. **Hardcoded hex `#005BB5`** used for avatar gradients in 4 places (WorkspaceLayout, TasksPage)
3. **Hardcoded `#1a0f33`** (old violet dark) in ChatsPage
4. **Hardcoded `#E8EAF0` / `#EDE8F5`** (lavender tints) in WorkspaceLayout background gradient
5. **No `--primary-dark` token** — avatar gradients use a raw hex instead of a token

## Plan

### 1. Add missing tokens to `src/styles/tokens.css`

Add `--primary-dark: #005299` (derived from primary blue, amber-neutral) so avatar gradients use tokens. Add `--electric-dark: #2A1F0A` as the text-on-electric color (replacing `#1a0f33`).

### 2. Fix `src/layouts/WorkspaceLayout.tsx` (5 fixes)

- Replace background gradient hex values `#E8EAF0`, `#EDE8F5` with warm neutral tints (`#F0EDE8`, `#EDE8E0`) that complement amber
- Replace all `to-[#005BB5]` with `to-primary/80` or the new `--primary-dark` token
- Replace `rgba(167,139,250,0.5)` drop-shadow with `rgba(245,200,66,0.5)` (amber)
- Replace `text-shadow-[0_0_8px_rgba(167,139,250,0.3)]` with amber equivalent
- Replace `text-[#1a0f33]` on notification badge with `text-electric-muted`

### 3. Fix `src/pages/ChatsPage.tsx` (1 fix)

- Replace `hover:text-[#1a0f33]` with `hover:text-electric-muted`

### 4. Fix `src/pages/TasksPage.tsx` (2 fixes)

- Replace `to-[#005BB5]` avatar gradients with token-based value

### 5. Fix `src/pages/BillingPage.tsx` (1 fix)

- Replace `rgba(167,139,250,0.3)` gauge glow with `rgba(245,200,66,0.3)` (amber)

### 6. Fix `src/pages/LoginPage.tsx` (1 fix)

- Replace `to-[#000000]` with `to-sidebar-solid` (already a token)

### Summary

| File | Hardcoded values removed |
|------|------------------------|
| tokens.css | +2 new tokens |
| WorkspaceLayout.tsx | 7 hex/rgba fixes |
| ChatsPage.tsx | 1 hex fix |
| TasksPage.tsx | 2 hex fixes |
| BillingPage.tsx | 1 rgba fix |
| LoginPage.tsx | 1 hex fix |

**Result**: Every color in the app will trace back to the token system. No more violet remnants, no hardcoded hex values outside of tokens.css and third-party SVGs (Google logo is fine as-is).

