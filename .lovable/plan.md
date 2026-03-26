

# Pitch Deck — Complete Liquid Glass Redesign

## Design Direction

The current deck is a generic "dark mode with amber accents and card grids" — every slide follows the same formula (section label → big heading → glass-elevated cards). The new design will be a **liquid glass presentation** — translucent layered panels floating over rich gradient backgrounds, with depth created through blur, refraction, and layered transparency rather than borders and card outlines.

**Core aesthetic**: Apple WWDC keynote meets frosted glass UI. Soft white/translucent panels, deep blurred backgrounds with color gradients, typographic hierarchy doing the heavy lifting. No retro-grid, no neon-glow, no terminal-block.

## Viewer Redesign (PitchDeckPage.tsx)

- Remove the thumbnail strip entirely — it renders 16 full slide components and dominates the experience
- Replace with a minimal **dot indicator** row at the bottom (like iOS page dots)
- Invisible click zones: left half = prev, right half = next (no arrow buttons cluttering the slide)
- Subtle slide label appears on hover near the dots
- Background: `#000000` with no chrome — the slides ARE the experience
- Keep fullscreen toggle (minimal, bottom-right corner)
- Keep keyboard navigation

## SlideLayout.tsx

- Keep the 1920×1080 canvas and ScaledSlide scaling logic (it works)
- Remove all class-based styling from SlideLayout — slides own their own backgrounds

## Slide Visual Language

Each slide uses a unique gradient background (not `bg-background` everywhere). Content sits inside **liquid glass panels** — `backdrop-filter: blur(40px) saturate(1.8)`, semi-transparent white/dark fills, subtle inner highlights via `inset box-shadow`, rounded-[32px] corners.

**Typography**: Plus Jakarta Sans. Massive display headings (96–120px, weight 700), generous letter-spacing. Section labels are small (14px), uppercase, tracking-[0.2em], in a muted tone — not screaming amber.

**Color strategy per slide** — each slide has its own gradient palette rather than a uniform dark theme:
- Title: deep indigo → black
- Problem: warm dark red-brown → charcoal
- Solution: deep teal → black
- Market: deep purple → navy
- etc.

Gold/amber accent used sparingly — only for key numbers and the logo.

## 16 Slides — Content Preserved, Layout Rethought

All business content stays the same. Layouts rebuilt:

| Slide | Layout Change |
|-------|--------------|
| **Title** | Centered logo + wordmark, no card. Gradient bg with floating glass orbs |
| **Problem** | Single large glass panel, stats as oversized typography inline — not separate bordered blocks |
| **Solution** | Three glass columns with frosted backgrounds, no emoji icons — use simple line icons or just bold text |
| **How It Works** | Horizontal glass timeline strip — numbered steps flow left-to-right inside one long panel |
| **Market** | Concentric circles rebuilt with glass fills and blur, cleaner labels |
| **Product Demo** | Full-bleed glass panel simulating a browser window with frosted chrome |
| **Architecture** | Stacked horizontal glass layers — each layer is a frosted bar |
| **Use Cases** | 2×2 glass cards but with more padding, no emoji, industry name as the hero element |
| **Competitive** | Split panel — glass left panel (our strengths), frosted right panel (competitors) |
| **Business Model** | Three glass pricing columns, featured tier has brighter glass fill |
| **Go-to-Market** | Left narrative + right channel cards, all in glass |
| **Traction** | Four oversized metric numbers with subtle glass backing |
| **Team** | Two large glass cards with initials, centered layout |
| **Roadmap** | Horizontal glass timeline, current quarter highlighted |
| **Financials** | Glass bar chart + metric cards below |
| **CTA** | Minimal — logo, one line, domain. Maximum whitespace |

## Files Changed

| File | Action |
|------|--------|
| `src/pages/PitchDeckPage.tsx` | Rewrite — dot nav, click zones, no thumbnails |
| `src/components/pitch-deck/SlideLayout.tsx` | Minimal cleanup |
| `src/components/pitch-deck/slides/TitleSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/ProblemSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/SolutionSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/HowItWorksSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/MarketSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/ProductDemoSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/ArchitectureSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/UseCasesSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/CompetitiveSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/BusinessModelSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/GoToMarketSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/TractionSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/TeamSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/RoadmapSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/FinancialsSlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/CTASlide.tsx` | Rewrite |
| `src/components/pitch-deck/slides/index.ts` | No change (slide order stays) |

