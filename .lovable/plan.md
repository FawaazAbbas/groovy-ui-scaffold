

# Spec Compliance Audit — Remaining Gaps

The scaffold is about 90% complete. Here are the remaining items that need attention:

---

## 1. Color System Violations (Spec: "Do NOT introduce colours outside this system")

The spec explicitly says: "If you need a shade variant, derive it with Tailwind opacity modifiers (e.g., bg-primary/10) — do not create new hex values." Several files use default Tailwind colors not in the token system:

- **CalendarPage.tsx**: Uses `bg-blue-100`, `text-blue-700`, `border-blue-200`, `bg-pink-100`, `text-pink-700`, `border-pink-200`, `bg-blue-500`, `bg-pink-500`
- **ActivityPage.tsx**: Uses `bg-blue-100`, `text-blue-700`

**Fix**: Replace Google calendar colors with `bg-primary/10 text-primary` (or similar token-derived), Apple with `bg-comfort text-comfort-text`, and integration_called badge with a token-based color.

---

## 2. Cleanup Stale Files

- **`src/App.css`** — Contains default Vite/CRA boilerplate CSS (logo spin, card padding, etc.) that is not part of the design system and shouldn't exist.
- **`src/pages/Index.tsx`** — Still the Lovable placeholder page. The root `/` redirects to `/marketplace` so this file is dead code.
- **`src/components/NavLink.tsx`** — Check if this is used anywhere; if not, remove.

---

## 3. Files Page — Missing Right-Click Context Menu

The spec requires: "Right-click context menu with 'Manage Permissions' option." Currently the FilesPage has `onContextMenu={e => e.preventDefault()}` which suppresses the default menu but doesn't show a custom one.

**Fix**: Add a custom context menu (using Radix ContextMenu or a positioned popover) with options like "Manage Permissions", "Rename", "Delete", "Download".

---

## 4. Calendar — Missing Quick-Create Popover

The spec says: "Click empty slot → quick-create popover." Need to verify this is implemented. The Calendar currently shows event detail popovers but may be missing the empty-slot creation flow.

**Fix**: Add an onClick handler to empty time slots that shows a quick-create popover with title + time fields.

---

## 5. Chats — Missing Typing Indicator

The spec requires a "typing indicator" in the chat thread. Currently the chat page renders messages and a composer but no typing indicator animation.

**Fix**: Add a simple "LeadScout is typing..." indicator with animated dots below the last message in agent chats.

---

## 6. Onboarding — Missing localStorage Persistence

The spec requires "localStorage persistence" for the onboarding wizard so form state survives page refresh. Currently all state is in `useState` only.

**Fix**: Sync onboarding form state to/from `localStorage`.

---

## Summary of Changes

| Item | Effort |
|------|--------|
| Fix color violations (Calendar, Activity) | Small |
| Remove App.css, Index.tsx, NavLink.tsx | Trivial |
| Add right-click context menu to Files | Medium |
| Add empty-slot quick-create to Calendar | Medium |
| Add typing indicator to Chats | Small |
| Add localStorage persistence to Onboard | Small |

Total: ~6 focused edits across existing files, no new pages or routes needed.

