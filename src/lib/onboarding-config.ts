import type { TourStep, OSChoice } from '@/types/onboarding';

const tourSteps: TourStep[] = [
  // Step 1 — Spotlight Setup Engineer card
  {
    id: 'marketplace-agent',
    targetId: 'featured-agent-card',
    title: 'Meet your Setup Engineer',
    description: "This is your first AI agent. It'll help you configure your workspace and get everything connected. Let's install it.",
    position: 'right',
    page: '/space/marketplace',
    showContinue: true,
  },
  // Step 2 — Spotlight Install button → user clicks → installs
  {
    id: 'marketplace-install',
    targetId: 'featured-install-btn',
    title: 'Install your first agent',
    description: 'Click Install to add the Setup Engineer to your workspace.',
    instruction: 'Click Install',
    position: 'bottom',
    page: '/space/marketplace',
    passthrough: true,
  },
  // Step 3 — Nav to Integrations
  {
    id: 'nav-to-integrations',
    targetId: 'nav-integrations',
    title: 'Connect your tools',
    description: 'Your agents need access to the apps you already use.',
    instruction: 'Click Integrations in the sidebar',
    position: 'right',
    page: '/space/marketplace',
  },
  // Step 4 — Spotlight a connected integration
  {
    id: 'integration-card',
    targetId: 'integration-status-card',
    title: 'Your integrations',
    description: 'This is where you connect the tools your AI agents use — Gmail, Slack, Salesforce, and more. Agents can only access what you explicitly authorise here.',
    position: 'right',
    page: '/space/integrations',
    showContinue: true,
  },
  // Step 5 — Nav to Activity
  {
    id: 'nav-to-activity',
    targetId: 'nav-activity',
    title: "See what's happening",
    description: 'Every action your agents take is logged in real time.',
    instruction: 'Click Activity in the sidebar',
    position: 'right',
    page: '/space/integrations',
  },
  // Step 6a — Click activity row (passthrough expands)
  {
    id: 'activity-row',
    targetId: 'first-activity-row',
    title: 'Live activity feed',
    description: 'Every tool call, decision, and task your agents perform appears here.',
    instruction: 'Click an entry to inspect it',
    position: 'bottom',
    page: '/space/activity',
    passthrough: true,
  },
  // Step 6b — Spotlight expanded row
  {
    id: 'activity-expanded',
    targetId: 'expanded-activity-row',
    title: 'Full visibility, always',
    description: 'You can see exactly what each agent did, why, and what changed. Nothing happens in a black box.',
    position: 'bottom',
    page: '/space/activity',
    showContinue: true,
  },
  // Step 7 — Nav to Chats
  {
    id: 'nav-to-chats',
    targetId: 'nav-chats',
    title: 'Talk to your agents',
    description: 'Your agents are conversational — ask them anything, delegate tasks, or get updates.',
    instruction: 'Click Chats in the sidebar',
    position: 'right',
    page: '/space/activity',
  },
  // Step 8 — Click Setup Engineer chat → overlay disappears + toast
  {
    id: 'chats-open',
    targetId: 'setup-engineer-chat',
    title: 'Start chatting',
    description: "Your Setup Engineer is ready. Click to open the conversation — it'll help you finish configuring your workspace.",
    instruction: 'Click Setup Engineer to start chatting',
    position: 'right',
    page: '/space/chats',
    passthrough: true,
    isFinal: true,
  },
];

export function getTourSteps(_osChoice: OSChoice | null): TourStep[] {
  return tourSteps;
}
