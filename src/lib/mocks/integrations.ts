export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'Communication' | 'Calendar' | 'Storage' | 'Developer' | 'Custom';
  icon: string; // lucide icon name
  connected: boolean;
  connectedAt?: string;
  connectedBy?: string;
}

export const mockIntegrations: Integration[] = [
  { id: 'int_01', name: 'Slack', description: 'Send notifications, create channels, and manage team communication', category: 'Communication', icon: 'MessageSquare', connected: true, connectedAt: '2026-02-01T10:00:00Z', connectedBy: 'usr_001' },
  { id: 'int_02', name: 'Microsoft Teams', description: 'Chat, video calls, and collaboration hub integration', category: 'Communication', icon: 'Users', connected: true, connectedAt: '2026-02-15T14:00:00Z', connectedBy: 'usr_001' },
  { id: 'int_03', name: 'Discord', description: 'Community management and team chat integration', category: 'Communication', icon: 'Headphones', connected: false },
  { id: 'int_04', name: 'Google Calendar', description: 'Sync events, schedule meetings, and manage availability', category: 'Calendar', icon: 'Calendar', connected: true, connectedAt: '2026-02-01T10:00:00Z', connectedBy: 'usr_001' },
  { id: 'int_05', name: 'Apple Calendar', description: 'iCloud calendar sync for events and reminders', category: 'Calendar', icon: 'CalendarDays', connected: true, connectedAt: '2026-02-05T09:00:00Z', connectedBy: 'usr_001' },
  { id: 'int_06', name: 'Outlook Calendar', description: 'Microsoft 365 calendar integration', category: 'Calendar', icon: 'CalendarCheck', connected: false },
  { id: 'int_07', name: 'Google Drive', description: 'File storage, sharing, and collaboration', category: 'Storage', icon: 'HardDrive', connected: true, connectedAt: '2026-02-01T10:00:00Z', connectedBy: 'usr_001' },
  { id: 'int_08', name: 'Dropbox', description: 'Cloud file storage and synchronization', category: 'Storage', icon: 'Box', connected: false },
  { id: 'int_09', name: 'GitHub', description: 'Code repositories, issues, and pull request management', category: 'Developer', icon: 'GitBranch', connected: true, connectedAt: '2026-02-10T11:00:00Z', connectedBy: 'usr_002' },
  { id: 'int_10', name: 'Jira', description: 'Project tracking, sprint management, and issue tracking', category: 'Developer', icon: 'LayoutGrid', connected: true, connectedAt: '2026-02-12T09:00:00Z', connectedBy: 'usr_002' },
  { id: 'int_11', name: 'Salesforce', description: 'CRM, pipeline management, and customer data sync', category: 'Custom', icon: 'Database', connected: true, connectedAt: '2026-02-08T14:00:00Z', connectedBy: 'usr_003' },
  { id: 'int_12', name: 'HubSpot', description: 'Marketing automation and CRM platform', category: 'Custom', icon: 'Target', connected: false },
];
