export interface ArchNode {
  id: string;
  type: 'company' | 'department' | 'team' | 'human' | 'agent';
  label: string;
  title?: string;
  parentId?: string;
}

export interface ArchEdge {
  id: string;
  source: string;
  target: string;
  type: 'reporting' | 'permission' | 'context' | 'guardrail';
}

export const mockArchNodes: ArchNode[] = [
  { id: 'n_company', type: 'company', label: 'Acme Corp' },
  // Departments
  { id: 'n_eng', type: 'department', label: 'Engineering', parentId: 'n_company' },
  { id: 'n_sales', type: 'department', label: 'Sales', parentId: 'n_company' },
  { id: 'n_ops', type: 'department', label: 'Operations', parentId: 'n_company' },
  // Teams
  { id: 'n_platform', type: 'team', label: 'Platform Team', parentId: 'n_eng' },
  { id: 'n_frontend', type: 'team', label: 'Frontend Team', parentId: 'n_eng' },
  { id: 'n_sdr', type: 'team', label: 'SDR Team', parentId: 'n_sales' },
  { id: 'n_ae', type: 'team', label: 'Account Executives', parentId: 'n_sales' },
  { id: 'n_support', type: 'team', label: 'Customer Success', parentId: 'n_ops' },
  // Humans
  { id: 'n_h1', type: 'human', label: 'Marcus Johnson', title: 'Engineering Lead', parentId: 'n_platform' },
  { id: 'n_h2', type: 'human', label: 'Tom Brennan', title: 'Intern', parentId: 'n_platform' },
  { id: 'n_h3', type: 'human', label: 'Fatima Al-Rashid', title: 'Product Designer', parentId: 'n_frontend' },
  { id: 'n_h4', type: 'human', label: 'Priya Patel', title: 'Sales Manager', parentId: 'n_sdr' },
  { id: 'n_h5', type: 'human', label: 'Sarah Chen', title: 'Head of Operations', parentId: 'n_ops' },
  { id: 'n_h6', type: 'human', label: 'James O\'Brien', title: 'CS Lead', parentId: 'n_support' },
  { id: 'n_h7', type: 'human', label: 'Aisha Williams', title: 'Marketing Director', parentId: 'n_ops' },
  { id: 'n_h8', type: 'human', label: 'David Kim', title: 'Finance Analyst', parentId: 'n_ops' },
  // AI Agents
  { id: 'n_a1', type: 'agent', label: 'LeadScout', parentId: 'n_sdr' },
  { id: 'n_a2', type: 'agent', label: 'TicketSolver', parentId: 'n_support' },
  { id: 'n_a3', type: 'agent', label: 'CodeReviewer', parentId: 'n_platform' },
  { id: 'n_a4', type: 'agent', label: 'MeetingSynth', parentId: 'n_ops' },
];

export const mockArchEdges: ArchEdge[] = [
  // Reporting lines (solid)
  { id: 'e_01', source: 'n_company', target: 'n_eng', type: 'reporting' },
  { id: 'e_02', source: 'n_company', target: 'n_sales', type: 'reporting' },
  { id: 'e_03', source: 'n_company', target: 'n_ops', type: 'reporting' },
  { id: 'e_04', source: 'n_eng', target: 'n_platform', type: 'reporting' },
  { id: 'e_05', source: 'n_eng', target: 'n_frontend', type: 'reporting' },
  { id: 'e_06', source: 'n_sales', target: 'n_sdr', type: 'reporting' },
  { id: 'e_07', source: 'n_sales', target: 'n_ae', type: 'reporting' },
  { id: 'e_08', source: 'n_ops', target: 'n_support', type: 'reporting' },
  { id: 'e_09', source: 'n_platform', target: 'n_h1', type: 'reporting' },
  { id: 'e_10', source: 'n_platform', target: 'n_h2', type: 'reporting' },
  { id: 'e_11', source: 'n_frontend', target: 'n_h3', type: 'reporting' },
  { id: 'e_12', source: 'n_sdr', target: 'n_h4', type: 'reporting' },
  { id: 'e_13', source: 'n_ops', target: 'n_h5', type: 'reporting' },
  { id: 'e_14', source: 'n_support', target: 'n_h6', type: 'reporting' },
  { id: 'e_15', source: 'n_ops', target: 'n_h7', type: 'reporting' },
  { id: 'e_16', source: 'n_ops', target: 'n_h8', type: 'reporting' },
  { id: 'e_17', source: 'n_sdr', target: 'n_a1', type: 'reporting' },
  { id: 'e_18', source: 'n_support', target: 'n_a2', type: 'reporting' },
  { id: 'e_19', source: 'n_platform', target: 'n_a3', type: 'reporting' },
  { id: 'e_20', source: 'n_ops', target: 'n_a4', type: 'reporting' },
  // Permission lines (dashed electric)
  { id: 'e_21', source: 'n_a1', target: 'n_h4', type: 'permission' },
  { id: 'e_22', source: 'n_a2', target: 'n_h6', type: 'permission' },
  { id: 'e_23', source: 'n_a3', target: 'n_h1', type: 'permission' },
  { id: 'e_24', source: 'n_a4', target: 'n_h5', type: 'permission' },
  // Context sharing lines (dotted cyan)
  { id: 'e_25', source: 'n_a1', target: 'n_sales', type: 'context' },
  { id: 'e_26', source: 'n_a2', target: 'n_ops', type: 'context' },
  { id: 'e_27', source: 'n_a3', target: 'n_eng', type: 'context' },
  // Guardrail lines (solid red)
  { id: 'e_28', source: 'n_company', target: 'n_a1', type: 'guardrail' },
  { id: 'e_29', source: 'n_company', target: 'n_a2', type: 'guardrail' },
];
