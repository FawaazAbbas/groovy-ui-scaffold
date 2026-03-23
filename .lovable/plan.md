

# Pitch Deck Presentation Viewer

## What we're building

A new `/pitch-deck` route inside the WorkspaceLayout that displays a pre-built pitch deck as a fullscreen slide viewer. Users can navigate slides with arrows/keyboard, enter fullscreen presentation mode, and see a thumbnail strip for quick navigation.

## Slide content (base scaffold — 6 slides)

1. **Title** — "Groovy" tagline + logo
2. **Problem** — Pain point statement
3. **Solution** — What Groovy does
4. **How it works** — 3-step visual flow
5. **Traction** — Key metrics
6. **Call to action** — Contact / next steps

All content will be placeholder text so we can iterate on it together.

## Technical approach

### 1. New route + nav entry

- Add `{ label: 'Pitch Deck', icon: Presentation, path: '/pitch-deck' }` to `WorkspaceLayout.tsx` nav items
- Add route in `App.tsx` under WorkspaceLayout
- Create `src/pages/PitchDeckPage.tsx`

### 2. Slide viewer architecture

- Fixed 16:9 slide canvas (1920×1080) scaled via `transform: scale()` to fit the viewport
- Parent container with `overflow: hidden`, slide centered with absolute positioning
- Bottom thumbnail strip (horizontal scroll) showing all slides as mini previews
- Keyboard navigation: Left/Right arrows, Escape exits fullscreen
- Fullscreen mode via Fullscreen API with hidden UI chrome

### 3. Slide components

- `src/components/pitch-deck/SlideLayout.tsx` — wrapper that renders children at 1920×1080
- `src/components/pitch-deck/slides/` — individual slide components (TitleSlide, ProblemSlide, etc.)
- Each slide uses the existing token system (amber accents, Plus Jakarta Sans)
- Dark slide backgrounds using `--sidebar-solid` / `--comfort` tokens for contrast

### 4. Visual style

- Slides use a dark-on-warm aesthetic: deep charcoal backgrounds with amber/gold accents
- Large typography (Plus Jakarta Sans 700 for headlines, 400 for body)
- Generous whitespace, left-aligned text, asymmetric layouts
- Subtle gradient backgrounds per slide for variety
- No glassmorphism on slides — clean, editorial feel

### Files

| File | Action |
|------|--------|
| `src/pages/PitchDeckPage.tsx` | Create — viewer with nav, thumbnails, fullscreen |
| `src/components/pitch-deck/SlideLayout.tsx` | Create — 1920×1080 scaled wrapper |
| `src/components/pitch-deck/slides/index.ts` | Create — slide registry |
| `src/components/pitch-deck/slides/*.tsx` | Create — 6 individual slide components |
| `src/layouts/WorkspaceLayout.tsx` | Edit — add nav item |
| `src/App.tsx` | Edit — add route |

