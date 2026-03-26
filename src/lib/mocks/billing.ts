export interface DailyUsage {
  date: string;
  credits: number;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export interface ActiveAgent {
  agentId: string;
  agentName: string;
  creditsUsedToday: number;
  creditsUsedMonth: number;
  lastActive: string;
}

export const mockDailyUsage: DailyUsage[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date('2026-02-16');
  date.setDate(date.getDate() + i);
  return {
    date: date.toISOString().split('T')[0],
    credits: Math.floor(Math.random() * 200) + 80,
  };
});

export const mockInvoices: Invoice[] = [
  { id: 'inv_01', date: '2026-03-01', amount: 499.00, status: 'paid', description: 'Business Plan — March 2026' },
  { id: 'inv_02', date: '2026-02-01', amount: 499.00, status: 'paid', description: 'Business Plan — February 2026' },
  { id: 'inv_03', date: '2026-01-01', amount: 499.00, status: 'paid', description: 'Business Plan — January 2026' },
  { id: 'inv_04', date: '2025-12-01', amount: 299.00, status: 'paid', description: 'Pro Plan — December 2025' },
  { id: 'inv_05', date: '2025-11-01', amount: 299.00, status: 'paid', description: 'Pro Plan — November 2025' },
  { id: 'inv_06', date: '2026-03-15', amount: 120.00, status: 'pending', description: 'Credit top-up — 2,000 credits' },
];

export const mockActiveAgents: ActiveAgent[] = [
  { agentId: 'agt_01', agentName: 'LeadScout', creditsUsedToday: 45, creditsUsedMonth: 890, lastActive: '2026-03-17T09:45:00Z' },
  { agentId: 'agt_03', agentName: 'TicketSolver', creditsUsedToday: 32, creditsUsedMonth: 720, lastActive: '2026-03-17T09:40:00Z' },
  { agentId: 'agt_05', agentName: 'CodeReviewer', creditsUsedToday: 18, creditsUsedMonth: 450, lastActive: '2026-03-17T09:20:00Z' },
  { agentId: 'agt_16', agentName: 'MeetingSynth', creditsUsedToday: 12, creditsUsedMonth: 340, lastActive: '2026-03-17T08:15:00Z' },
];

export const mockPlan = {
  id: 'growth',
  name: 'Growth',
  price: 499,
  billingCycle: 'monthly' as const,
  creditsIncluded: 10000,
  creditsUsed: 2580,
  nextBillingDate: '2026-04-01',
  features: ['Unlimited workspace members', 'Priority support', '10,000 credits/month', 'Custom agent deployment', 'SSO & SAML', 'Audit logs'],
};
