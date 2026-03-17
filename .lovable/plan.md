

# Groovy — Phase 1 UI Scaffold

## Overview
Build a pixel-perfect, fully navigable front-end skeleton for the Groovy AI agent platform with mock data. No real backend, auth, or WebSocket connections — everything is mocked.

---

## 1. Design System Foundation
- **`src/styles/tokens.css`** — All colour tokens exactly as spec (parchment background, charcoal sidebar, warm brown primary, electric green, etc.)
- **`tailwind.config.ts`** — Full theme extension mapping CSS variables to Tailwind classes, plus typography scale (display-lg through code)
- **Fonts** — DM Sans (primary) + JetBrains Mono (code) loaded via Google Fonts
- **`src/components/ui/`** — Build all spec components: Button (4 variants, 3 sizes, loading state), Input, Textarea, Select, Dialog, Sheet, Popover, Tooltip, DropdownMenu, Tabs, Avatar (with status dot), Badge (5 variants), Card, Skeleton, Toast, Command (cmdk), DataTable

## 2. Mock Data Layer
Create typed fixture files in `src/lib/mocks/`:
- **agents.ts** — 24+ marketplace agents across all categories
- **chats.ts** — 4+ conversations with 10+ messages each (AI agent, DM, channel)
- **tasks.ts** — 15+ tasks across 4 Kanban columns
- **calendar.ts** — 20+ events across 2 weeks, colour-coded by source
- **files.ts** — 15+ files, 3+ folders with nested structure
- **activity.ts** — 25+ entries covering all 7 action types
- **billing.ts** — 30 days usage data, 5+ invoices, 3+ active agents
- **integrations.ts** — 10+ integrations across all categories
- **architecture.ts** — Company → Departments → Teams → Humans → AI Agents with edges
- **users.ts** — 8+ workspace members with varied roles
- **session.ts** — Hardcoded admin user session

## 3. Routing & Layouts
Adapt Next.js route groups to React Router layout wrappers:
- **Marketing layout** — Public navbar (logo, search, Sign In/Get Started)
- **Auth layout** — Minimal centered layout
- **Workspace layout** — Sidebar + top bar shell (the main workspace chrome)

### Routes:
| Path | Page |
|------|------|
| `/marketplace` | Marketplace Home |
| `/marketplace/:agentId` | Agent Product Page |
| `/login` | Login Page |
| `/onboard` | Onboarding Wizard |
| `/chats` | Chat List + Thread |
| `/tasks` | Kanban Board |
| `/calendar` | Calendar View |
| `/billing` | Credits & Billing |
| `/files` | Shared File Hub |
| `/architecture` | Company Hierarchy Viz |
| `/activity` | AI Activity Log |
| `/integrations` | Integrations Manager |

## 4. Workspace Shell
- **Sidebar** (260px → 64px collapse): Workspace logo/name, nav items (Chats, Tasks, Calendar, Files, Activity, Architecture, Integrations, Billing), active state with comfort-green bg + warm-brown left border, user avatar + role at bottom, mobile overlay mode
- **Top Bar**: Breadcrumbs, Cmd+K search trigger, notification bell with badge, user avatar dropdown
- **Command Palette** (cmdk): Sections for Recent, Chats, Agents, Tasks, Files, Actions

## 5. Marketplace Home
- Hero section with search bar and typewriter placeholder
- Horizontally scrollable category pills (All, Sales, Support, Engineering, HR, Marketing, Finance, Custom)
- Featured agents carousel (4 agents, auto-advance)
- Agent grid (responsive 4→2→1 col) with avatar, name, category badge, description, rating, install count, credit cost
- Filter sidebar (desktop) / bottom sheet (mobile)

## 6. Agent Product Page
- Agent header (avatar, name, publisher, category, rating, installs, cost)
- Tab bar: Overview, Capabilities, Reviews, Changelog
- Sticky CTA panel ("Add to Workspace")
- Two-Click Install dialog: workspace target selector (Slack/Teams/Groovy) → confirmation panel → success animation

## 7. Onboarding Wizard (7 steps)
1. Welcome — Logo + "Get Started" CTA
2. Company Profile — Name, industry, size, logo upload
3. Your Role — Name, email, title, department
4. Invite Team — Email input + role selector
5. Pick Agents — Mini marketplace grid (6 agents)
6. Connect Tools — OAuth buttons for Slack, Teams, Google, Apple
7. Review & Launch — Summary with edit buttons

Progress bar, slide-left transitions, inline validation, localStorage persistence

## 8. Chats
- Left panel: grouped chat list (Agents, DMs, Channels) with avatars, previews, timestamps, unread badges
- Right panel: message thread with bubbles (left/right aligned), AI messages with electric-green border + AI badge, tool-use collapsible cards, typing indicator
- Composer: multiline textarea, attach, emoji, mention, markdown toggle

## 9. Tasks (Kanban)
- View toggle (Kanban/List/Table — Kanban functional, others placeholder)
- 4 columns: To Do, In Progress, In Review, Done
- Task cards: title, priority colour border, label badges, assignee avatars, due date, comment count
- **Working drag-and-drop** via @dnd-kit between columns
- Task detail sheet (slide-over) on card click

## 10. Calendar
- Week view default, Month/Week/Day toggle
- Left mini-calendar for navigation
- Events colour-coded: Groovy (warm brown), Google (blue), Apple (pink), AI Agent (electric green)
- Click empty slot → quick-create popover
- Click event → detail popover

## 11. Credits & Billing
- Circular credit gauge (green → amber → red)
- Usage area chart (recharts) — 30 days mock data
- Active agents table
- Plan & subscription card
- Invoice history table
- Alerts panel

## 12. Shared File Hub
- Grid/list view toggle
- Mock folders and files with thumbnails
- Breadcrumb folder navigation
- Right-click context menu with "Manage Permissions"
- Permission badges on cards/rows

## 13. Architecture Visualization
- React Flow canvas with styled node types (Company, Department, Team, Human, AI Agent)
- Solid edges (reporting) + dashed edges (permissions)
- Minimap, zoom controls, fit-to-view
- Click node → side panel with mock details

## 14. AI Activity Log
- DataTable: Timestamp, Agent, Action Type (badge), Target, Status, Cost, expandable Details
- Filter bar: agent selector, action type, date range, status
- 25+ mock entries covering all action types

## 15. Integrations
- Grid of integration cards grouped by category (Communication, Calendar, Storage, Developer, Custom)
- Status badges (Connected/Not Connected)
- Click → detail sheet
- "Add Integration" → searchable modal

## 16. Login Page
- Email input for magic link
- Google + Microsoft SSO buttons (styled, non-functional)
- Groovy logo + branding

## Additional Packages Needed
- `@dnd-kit/core` + `@dnd-kit/sortable` — Kanban drag-and-drop
- `reactflow` — Architecture visualization
- `@tanstack/react-table` — DataTable component

