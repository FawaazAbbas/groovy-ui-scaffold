

# Align Pitch Deck with App Aesthetic + Add 10 Slides

## Current State

The 6 existing slides use hardcoded hex colors (`#1C1C1E`, `#F5C842`, `#98989D`, etc.) that roughly match the app's dark mode but don't use the token system. The app has a rich glassmorphism + warm amber identity with liquid glass surfaces, retro grid overlays, and neon glow utilities.

## Visual Direction

Bring the deck into the app's world: dark charcoal backgrounds using token values, liquid glass card surfaces, retro grid overlays on select slides, amber/gold accents via `--electric-bright` and `--electric`, and the `--cyan` secondary accent for variety. Use the existing CSS utility classes (`glass`, `neon-glow-*`, `retro-grid`, `retro-corners`, `terminal-block`) directly in slide components.

## Changes to Existing 6 Slides

Update all slides to use CSS custom properties instead of hardcoded hex:
- Backgrounds: `bg-background` (dark) or `bg-surface-solid` with gradients using token colors
- Text: `text-text-primary`, `text-text-secondary`, `text-electric-bright` (accent on dark)
- Cards/surfaces: Use `glass` or `glass-elevated` classes, `border-border` 
- Accent elements: `neon-glow-*`, `neon-border`, `retro-corners` where appropriate
- Slide section labels: keep uppercase tracking-widest style but use `text-electric-bright`

## 10 New Slides (16 total)

| # | Slide | Content |
|---|-------|---------|
| 5 | **Market Opportunity** | TAM/SAM/SOM concentric circles, market size numbers |
| 6 | **Product Demo** | Screenshot placeholder with feature callout annotations |
| 7 | **Architecture** | System diagram — agents, orchestrator, integrations |
| 8 | **Use Cases** | 4 industry verticals with icons and descriptions |
| 9 | **Competitive Landscape** | Positioning matrix (2×2 grid) |
| 10 | **Business Model** | Pricing tiers and revenue model |
| 11 | **Go-to-Market** | Channel strategy and growth flywheel |
| 12 | **Team** | Founder/team grid with roles |
| 13 | **Roadmap** | Timeline with milestones Q1–Q4 |
| 14 | **Financials** | Revenue projections, key metrics |

Final order: Title → Problem → Solution → How It Works → Market → Product Demo → Architecture → Use Cases → Competitive → Business Model → Go-to-Market → Traction → Team → Roadmap → Financials → CTA

## Files

| File | Action |
|------|--------|
| `src/components/pitch-deck/slides/TitleSlide.tsx` | Rewrite — token colors, add retro-grid overlay |
| `src/components/pitch-deck/slides/ProblemSlide.tsx` | Rewrite — token colors, neon accents |
| `src/components/pitch-deck/slides/SolutionSlide.tsx` | Rewrite — glass cards, token colors |
| `src/components/pitch-deck/slides/HowItWorksSlide.tsx` | Rewrite — token colors, neon-glow step circles |
| `src/components/pitch-deck/slides/TractionSlide.tsx` | Rewrite — token colors |
| `src/components/pitch-deck/slides/CTASlide.tsx` | Rewrite — token colors, gradient from comfort |
| `src/components/pitch-deck/slides/MarketSlide.tsx` | Create |
| `src/components/pitch-deck/slides/ProductDemoSlide.tsx` | Create |
| `src/components/pitch-deck/slides/ArchitectureSlide.tsx` | Create |
| `src/components/pitch-deck/slides/UseCasesSlide.tsx` | Create |
| `src/components/pitch-deck/slides/CompetitiveSlide.tsx` | Create |
| `src/components/pitch-deck/slides/BusinessModelSlide.tsx` | Create |
| `src/components/pitch-deck/slides/GoToMarketSlide.tsx` | Create |
| `src/components/pitch-deck/slides/TeamSlide.tsx` | Create |
| `src/components/pitch-deck/slides/RoadmapSlide.tsx` | Create |
| `src/components/pitch-deck/slides/FinancialsSlide.tsx` | Create |
| `src/components/pitch-deck/slides/index.ts` | Update — register all 16 slides |

