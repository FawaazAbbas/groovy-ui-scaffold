export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeIds: string[];
  labels: string[];
  dueDate: string | null;
  commentCount: number;
  createdAt: string;
  agentId?: string;
}

export const mockTasks: Task[] = [
  { id: 'tsk_01', title: 'Update API rate limiting configuration', description: 'Increase rate limits for enterprise tier customers from 1000 to 5000 req/min', status: 'todo', priority: 'high', assigneeIds: ['usr_002'], labels: ['backend', 'infrastructure'], dueDate: '2026-03-20', commentCount: 3, createdAt: '2026-03-15T10:00:00Z' },
  { id: 'tsk_02', title: 'Design new onboarding email sequence', description: 'Create 5-email drip campaign for new workspace signups', status: 'todo', priority: 'medium', assigneeIds: ['usr_005'], labels: ['marketing', 'design'], dueDate: '2026-03-22', commentCount: 7, createdAt: '2026-03-14T14:00:00Z' },
  { id: 'tsk_03', title: 'Fix calendar sync timezone bug', description: 'Events from Google Calendar showing in UTC instead of user timezone', status: 'todo', priority: 'urgent', assigneeIds: ['usr_002', 'usr_008'], labels: ['bug', 'calendar'], dueDate: '2026-03-18', commentCount: 5, createdAt: '2026-03-16T09:00:00Z' },
  { id: 'tsk_04', title: 'Write Q1 retrospective report', description: 'Compile team achievements, metrics, and areas for improvement', status: 'todo', priority: 'low', assigneeIds: ['usr_001'], labels: ['operations'], dueDate: '2026-03-25', commentCount: 1, createdAt: '2026-03-15T11:00:00Z' },
  { id: 'tsk_05', title: 'Implement SSO for enterprise accounts', description: 'Add SAML 2.0 support for enterprise workspace authentication', status: 'in_progress', priority: 'high', assigneeIds: ['usr_002'], labels: ['backend', 'security', 'enterprise'], dueDate: '2026-03-21', commentCount: 12, createdAt: '2026-03-10T10:00:00Z', agentId: 'agt_05' },
  { id: 'tsk_06', title: 'Build agent performance dashboard', description: 'Create analytics dashboard showing agent usage, cost, and effectiveness metrics', status: 'in_progress', priority: 'medium', assigneeIds: ['usr_009'], labels: ['frontend', 'analytics'], dueDate: '2026-03-24', commentCount: 8, createdAt: '2026-03-12T09:00:00Z' },
  { id: 'tsk_07', title: 'Migrate database to new cluster', description: 'Zero-downtime migration of primary database to upgraded cluster', status: 'in_progress', priority: 'urgent', assigneeIds: ['usr_002', 'usr_008'], labels: ['backend', 'infrastructure', 'critical'], dueDate: '2026-03-19', commentCount: 15, createdAt: '2026-03-13T08:00:00Z' },
  { id: 'tsk_08', title: 'Create customer success playbook', description: 'Document best practices for onboarding new enterprise customers', status: 'in_progress', priority: 'medium', assigneeIds: ['usr_004'], labels: ['documentation', 'support'], dueDate: '2026-03-23', commentCount: 4, createdAt: '2026-03-14T10:00:00Z' },
  { id: 'tsk_09', title: 'Review and update privacy policy', description: 'Annual review of privacy policy for GDPR and CCPA compliance', status: 'in_review', priority: 'high', assigneeIds: ['usr_001'], labels: ['legal', 'compliance'], dueDate: '2026-03-20', commentCount: 6, createdAt: '2026-03-08T10:00:00Z' },
  { id: 'tsk_10', title: 'Optimize image compression pipeline', description: 'Reduce file storage costs by implementing better compression for uploaded images', status: 'in_review', priority: 'medium', assigneeIds: ['usr_002'], labels: ['backend', 'optimization'], dueDate: '2026-03-21', commentCount: 9, createdAt: '2026-03-11T14:00:00Z' },
  { id: 'tsk_11', title: 'A/B test new pricing page', description: 'Run test comparing current pricing layout vs. new card-based design', status: 'in_review', priority: 'medium', assigneeIds: ['usr_005', 'usr_009'], labels: ['marketing', 'design', 'growth'], dueDate: '2026-03-22', commentCount: 11, createdAt: '2026-03-09T11:00:00Z' },
  { id: 'tsk_12', title: 'Ship marketplace search improvements', description: 'Launched fuzzy search, category filters, and sort options', status: 'done', priority: 'high', assigneeIds: ['usr_002'], labels: ['frontend', 'marketplace'], dueDate: '2026-03-15', commentCount: 14, createdAt: '2026-03-05T10:00:00Z' },
  { id: 'tsk_13', title: 'Complete SOC 2 audit preparation', description: 'Gathered all required documentation and controls evidence', status: 'done', priority: 'urgent', assigneeIds: ['usr_001', 'usr_002'], labels: ['security', 'compliance'], dueDate: '2026-03-14', commentCount: 20, createdAt: '2026-03-01T09:00:00Z' },
  { id: 'tsk_14', title: 'Launch email notification preferences', description: 'Users can now choose which email notifications they receive', status: 'done', priority: 'medium', assigneeIds: ['usr_009'], labels: ['frontend', 'ux'], dueDate: '2026-03-16', commentCount: 7, createdAt: '2026-03-07T10:00:00Z' },
  { id: 'tsk_15', title: 'Integrate Slack notification agent', description: 'Connected TicketSolver to Slack for real-time escalation notifications', status: 'done', priority: 'high', assigneeIds: ['usr_002'], labels: ['integration', 'support'], dueDate: '2026-03-13', commentCount: 5, createdAt: '2026-03-06T14:00:00Z', agentId: 'agt_03' },
  { id: 'tsk_16', title: 'Prepare investor update deck', description: 'Monthly investor update with key metrics and highlights', status: 'todo', priority: 'medium', assigneeIds: ['usr_001', 'usr_006'], labels: ['finance', 'reporting'], dueDate: '2026-03-28', commentCount: 2, createdAt: '2026-03-17T08:00:00Z' },
];
