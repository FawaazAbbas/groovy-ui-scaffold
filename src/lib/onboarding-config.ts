import type { TourStep, OSChoice } from '@/types/onboarding';

const externalOSTourSteps: TourStep[] = [
  {
    id: 'agent-card',
    targetId: 'featured-agent-card',
    title: 'Meet your first agent',
    description: 'Each agent specialises in a business function. Click one to see what it can do.',
    instruction: 'Click the agent card',
    position: 'bottom',
    page: '/marketplace',
  },
  {
    id: 'chats-nav',
    targetId: 'nav-chats',
    title: 'Chat with your agents',
    description: 'Talk to agents directly inside [OS]. Give tasks, ask questions, get updates.',
    instruction: 'Click Chats in the sidebar',
    position: 'right',
    page: '/chats',
  },
  {
    id: 'tasks-nav',
    targetId: 'nav-tasks',
    title: 'Task Management',
    description: 'Track work across your team and agents. Drag tasks between columns.',
    instruction: 'Click Tasks in the sidebar',
    position: 'right',
    page: '/chats',
  },
  {
    id: 'tour-complete',
    targetId: null,
    title: "You're all set",
    description: 'Your [OS] workspace is connected. Go hire some agents from the marketplace.',
    position: 'center',
    page: '/chats',
    isFinal: true,
  },
];

const groovySpaceTourSteps: TourStep[] = [
  {
    id: 'chats-nav',
    targetId: 'nav-chats',
    title: 'Team Chat + Agent Chat',
    description: 'Talk to your agents and your team in one place.',
    instruction: 'Click Chats in the sidebar',
    position: 'right',
    page: '/chats',
  },
  {
    id: 'tasks-nav',
    targetId: 'nav-tasks',
    title: 'Task Management',
    description: 'Track tasks across your team. Agents create and complete tasks for you.',
    instruction: 'Click Tasks in the sidebar',
    position: 'right',
    page: '/chats',
  },
  {
    id: 'calendar-nav',
    targetId: 'nav-calendar',
    title: 'Your Calendar',
    description: 'Agents schedule, remind, and manage events for your team.',
    instruction: 'Click Calendar in the sidebar',
    position: 'right',
    page: '/chats',
  },
  {
    id: 'agent-card',
    targetId: 'featured-agent-card',
    title: 'The Marketplace',
    description: 'Find specialist agents to grow your AI team.',
    instruction: 'Click the agent card',
    position: 'bottom',
    page: '/marketplace',
  },
  {
    id: 'tour-complete',
    targetId: null,
    title: "You're all set",
    description: 'Your Groovy Space is ready. Agents, calendar, chat — all here. Go explore.',
    position: 'center',
    page: '/marketplace',
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
