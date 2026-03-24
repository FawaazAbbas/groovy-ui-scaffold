import type { Agent } from './agents';

export interface AgentPermission {
  integrationId: string;
  scopes: ('read' | 'write' | 'execute')[];
}

export interface AgentCapability {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface AgentPermissions {
  agentId: string;
  integrationAccess: AgentPermission[];
  capabilities: AgentCapability[];
  rateLimit: number; // max actions per hour
  requireApproval: boolean; // human-in-the-loop
  lastAudit: string;
}

const defaultCapabilities: (overrides?: Partial<Record<string, boolean>>) => AgentCapability[] = (overrides = {}) => [
  { id: 'send_messages', label: 'Send messages', description: 'Send messages to team members and channels', enabled: overrides.send_messages ?? true },
  { id: 'create_tasks', label: 'Create tasks', description: 'Create and assign tasks in the workspace', enabled: overrides.create_tasks ?? true },
  { id: 'access_files', label: 'Access files', description: 'Read and write files in connected storage', enabled: overrides.access_files ?? false },
  { id: 'external_api', label: 'External API calls', description: 'Make requests to third-party APIs', enabled: overrides.external_api ?? false },
  { id: 'modify_settings', label: 'Modify settings', description: 'Change workspace or integration settings', enabled: overrides.modify_settings ?? false },
  { id: 'manage_agents', label: 'Manage other agents', description: 'Start, stop, or configure other agents', enabled: overrides.manage_agents ?? false },
];

export const mockAgentPermissions: AgentPermissions[] = [
  {
    agentId: 'agt_01',
    integrationAccess: [],
    capabilities: defaultCapabilities({ send_messages: true, create_tasks: true, modify_settings: true, manage_agents: true }),
    rateLimit: 200,
    requireApproval: false,
    lastAudit: '2026-03-17T08:00:00Z',
  },
  {
    agentId: 'agt_02',
    integrationAccess: [
      { integrationId: 'int_11', scopes: ['read', 'write'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true, create_tasks: true, external_api: true }),
    rateLimit: 100,
    requireApproval: false,
    lastAudit: '2026-03-16T14:00:00Z',
  },
  {
    agentId: 'agt_03',
    integrationAccess: [
      { integrationId: 'int_01', scopes: ['read', 'write'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true, create_tasks: true }),
    rateLimit: 150,
    requireApproval: false,
    lastAudit: '2026-03-17T09:00:00Z',
  },
  {
    agentId: 'agt_04',
    integrationAccess: [
      { integrationId: 'int_01', scopes: ['read'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true }),
    rateLimit: 80,
    requireApproval: false,
    lastAudit: '2026-03-15T11:00:00Z',
  },
  {
    agentId: 'agt_05',
    integrationAccess: [
      { integrationId: 'int_09', scopes: ['read', 'write', 'execute'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true, create_tasks: true, external_api: true }),
    rateLimit: 120,
    requireApproval: true,
    lastAudit: '2026-03-17T07:30:00Z',
  },
  {
    agentId: 'agt_06',
    integrationAccess: [
      { integrationId: 'int_10', scopes: ['read', 'write'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true, create_tasks: true }),
    rateLimit: 60,
    requireApproval: false,
    lastAudit: '2026-03-16T16:00:00Z',
  },
  {
    agentId: 'agt_10',
    integrationAccess: [
      { integrationId: 'int_01', scopes: ['read', 'write'] },
      { integrationId: 'int_12', scopes: ['read', 'write', 'execute'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true, create_tasks: true, external_api: true, access_files: true }),
    rateLimit: 100,
    requireApproval: false,
    lastAudit: '2026-03-17T10:00:00Z',
  },
  {
    agentId: 'agt_16',
    integrationAccess: [
      { integrationId: 'int_04', scopes: ['read'] },
    ],
    capabilities: defaultCapabilities({ send_messages: true, access_files: true }),
    rateLimit: 50,
    requireApproval: false,
    lastAudit: '2026-03-16T12:00:00Z',
  },
];
