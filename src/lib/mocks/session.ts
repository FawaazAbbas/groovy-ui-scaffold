export const mockSession = {
  user: {
    id: 'usr_001',
    name: 'Sarah Chen',
    email: 'sarah@groovy.work',
    avatar: '',
    role: 'admin' as const,
    title: 'Head of Operations',
    department: 'Operations',
  },
  workspace: {
    id: 'ws_001',
    name: 'Acme Corp',
    plan: 'business' as const,
    creditsRemaining: 7420,
    creditsTotal: 10000,
  },
};
