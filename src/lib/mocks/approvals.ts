export interface TaskApproval {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  description: string;
  category: 'financial' | 'data' | 'external' | 'system' | 'communication';
  risk: 'low' | 'medium' | 'high';
  triggeredGuardrail: string | null; // guardrail name that triggered this
  requestedAt: string;
  context: Record<string, string | number>;
}

export const mockApprovals: TaskApproval[] = [
  {
    id: 'apr_01',
    agentId: 'agt_13',
    agentName: 'ExpenseGuard',
    action: 'Process refund',
    description: 'Refund $2,400 to customer account #C-9821 for duplicate billing on invoice #INV-4521.',
    category: 'financial',
    risk: 'high',
    triggeredGuardrail: 'Financial transaction limit',
    requestedAt: '2026-03-17T10:15:00Z',
    context: { amount: 2400, currency: 'USD', customer: 'TechNova Inc' },
  },
  {
    id: 'apr_02',
    agentId: 'agt_15',
    agentName: 'InvoiceBot',
    action: 'Send invoice',
    description: 'Issue invoice #INV-4590 for $18,500 to NexGen Solutions for Q1 consulting services.',
    category: 'financial',
    risk: 'high',
    triggeredGuardrail: 'Financial transaction limit',
    requestedAt: '2026-03-17T09:45:00Z',
    context: { amount: 18500, currency: 'USD', client: 'NexGen Solutions' },
  },
  {
    id: 'apr_03',
    agentId: 'agt_05',
    agentName: 'CodeReviewer',
    action: 'Merge pull request',
    description: 'Merge PR #903 (auth middleware refactor) into main branch. All checks passed, 2 approvals received.',
    category: 'system',
    risk: 'medium',
    triggeredGuardrail: null,
    requestedAt: '2026-03-17T09:30:00Z',
    context: { pr: 903, branch: 'main', approvals: 2 },
  },
  {
    id: 'apr_04',
    agentId: 'agt_10',
    agentName: 'CampaignGenius',
    action: 'Launch email campaign',
    description: 'Deploy Q2 product launch email to 24,000 subscribers. A/B test with 2 subject line variants.',
    category: 'communication',
    risk: 'medium',
    triggeredGuardrail: null,
    requestedAt: '2026-03-17T08:20:00Z',
    context: { recipients: 24000, campaign: 'Q2 Product Launch' },
  },
  {
    id: 'apr_05',
    agentId: 'agt_01',
    agentName: 'LeadScout',
    action: 'Export lead data',
    description: 'Export 340 qualified leads with contact info to external CRM sync via Salesforce API.',
    category: 'data',
    risk: 'high',
    triggeredGuardrail: 'PII detection',
    requestedAt: '2026-03-17T07:50:00Z',
    context: { records: 340, destination: 'Salesforce' },
  },
  {
    id: 'apr_06',
    agentId: 'agt_19',
    agentName: 'ComplianceBot',
    action: 'Archive records',
    description: 'Archive 2,100 data processing records older than 12 months per retention policy.',
    category: 'data',
    risk: 'low',
    triggeredGuardrail: null,
    requestedAt: '2026-03-17T06:30:00Z',
    context: { records: 2100, retentionMonths: 12 },
  },
  {
    id: 'apr_07',
    agentId: 'agt_14',
    agentName: 'ForecastPro',
    action: 'Update board report',
    description: 'Push updated Q2 revenue forecast ($4.2M) to the shared board deck in Google Drive.',
    category: 'external',
    risk: 'medium',
    triggeredGuardrail: 'Confidential file access',
    requestedAt: '2026-03-17T06:00:00Z',
    context: { forecast: '$4.2M', destination: 'Google Drive' },
  },
];
