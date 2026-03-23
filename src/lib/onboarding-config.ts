import type { TourStep, OSChoice } from '@/types/onboarding';

const externalOSTourSteps: TourStep[] = [
  {
    id: 'integration-status',
    targetId: 'integration-status-card',
    title: "You're connected",
    description: 'Your [OS] workspace is live. This is where you manage all your integrations.',
    position: 'bottom',
    page: '/integrations',
  },
  {
    id: 'marketplace-nav',
    targetId: 'nav-marketplace',
    title: 'The Agent Marketplace',
    description: "This is where you find and install AI employees. Let's go take a look.",
    position: 'right',
    page: '/integrations',
  },
  {
    id: 'agent-card',
    targetId: 'featured-agent-card',
    title: 'Meet your first agent',
    description: 'Each agent has a specific role. Browse by category or search for what you need.',
    position: 'bottom',
    page: '/marketplace',
  },
  {
    id: 'install-button',
    targetId: 'agent-install-button',
    title: 'One click to install',
    description: 'Hit install and this agent goes live in your [OS] workspace. That\'s it.',
    position: 'left',
    page: '/marketplace',
  },
  {
    id: 'chats-nav',
    targetId: 'nav-chats',
    title: 'Chat with your agents',
    description: 'Talk to your agents directly. Ask questions, give tasks, get updates.',
    position: 'right',
    page: '/chats',
  },
  {
    id: 'tour-complete',
    targetId: null,
    title: "You're all set",
    description: 'Your workspace is connected and you know your way around. Go hire some agents.',
    position: 'center',
    page: '/chats',
    isFinal: true,
  },
];

const groovySpaceTourSteps: TourStep[] = [
  {
    id: 'integrations-page',
    targetId: 'integration-status-card',
    title: 'Your Integrations Hub',
    description: 'This is where you manage all your connected tools and services.',
    position: 'bottom',
    page: '/integrations',
  },
  {
    id: 'chats-nav',
    targetId: 'nav-chats',
    title: 'Team Chat + Agent Chat',
    description: 'Talk to your agents and your team in one place. Your workspace command centre.',
    position: 'right',
    page: '/integrations',
  },
  {
    id: 'calendar-nav',
    targetId: 'nav-calendar',
    title: 'Your Calendar',
    description: 'Agents can schedule, remind, and manage events for your team — all in one place.',
    position: 'right',
    page: '/integrations',
  },
  {
    id: 'tasks-nav',
    targetId: 'nav-tasks',
    title: 'Task Management',
    description: 'Track tasks across your team. Agents can create, update, and complete tasks for you.',
    position: 'right',
    page: '/integrations',
  },
  {
    id: 'tour-complete',
    targetId: null,
    title: "You're all set",
    description: 'Your Groovy Space is ready. Agents, calendar, chat — all here. Go explore.',
    position: 'center',
    page: '/chats',
    isFinal: true,
  },
];

export function getTourSteps(osChoice: OSChoice | null): TourStep[] {
  if (osChoice === 'groovy-space') return groovySpaceTourSteps;
  const label =
    osChoice === 'slack' ? 'Slack' : osChoice === 'teams' ? 'Teams' : osChoice === 'lark' ? 'Lark' : 'your';
  return externalOSTourSteps.map((s) => ({
    ...s,
    description: s.description.replace('[OS]', label),
  }));
}
