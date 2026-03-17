export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size?: number;
  parentId: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  permission: 'owner' | 'editor' | 'viewer';
  children?: string[];
}

export const mockFiles: FileItem[] = [
  // Root folders
  { id: 'fld_01', name: 'Marketing', type: 'folder', parentId: null, createdBy: 'usr_005', createdAt: '2026-02-01T10:00:00Z', updatedAt: '2026-03-15T14:00:00Z', permission: 'editor', children: ['fld_04', 'file_01', 'file_02', 'file_03'] },
  { id: 'fld_02', name: 'Engineering', type: 'folder', parentId: null, createdBy: 'usr_002', createdAt: '2026-01-15T09:00:00Z', updatedAt: '2026-03-16T11:00:00Z', permission: 'editor', children: ['file_04', 'file_05', 'file_06'] },
  { id: 'fld_03', name: 'Finance', type: 'folder', parentId: null, createdBy: 'usr_006', createdAt: '2026-02-10T10:00:00Z', updatedAt: '2026-03-14T16:00:00Z', permission: 'viewer', children: ['file_07', 'file_08'] },
  // Nested folder
  { id: 'fld_04', name: 'Campaign Assets', type: 'folder', parentId: 'fld_01', createdBy: 'usr_005', createdAt: '2026-02-15T11:00:00Z', updatedAt: '2026-03-12T09:00:00Z', permission: 'editor', children: ['file_09', 'file_10'] },
  // Files in Marketing
  { id: 'file_01', name: 'Q1 Marketing Report.pdf', type: 'file', mimeType: 'application/pdf', size: 2450000, parentId: 'fld_01', createdBy: 'usr_005', createdAt: '2026-03-10T14:00:00Z', updatedAt: '2026-03-10T14:00:00Z', permission: 'editor' },
  { id: 'file_02', name: 'Brand Guidelines v3.pdf', type: 'file', mimeType: 'application/pdf', size: 8900000, parentId: 'fld_01', createdBy: 'usr_005', createdAt: '2026-02-20T10:00:00Z', updatedAt: '2026-03-05T16:00:00Z', permission: 'editor' },
  { id: 'file_03', name: 'Social Media Calendar.xlsx', type: 'file', mimeType: 'application/xlsx', size: 450000, parentId: 'fld_01', createdBy: 'usr_005', createdAt: '2026-03-01T09:00:00Z', updatedAt: '2026-03-15T11:00:00Z', permission: 'editor' },
  // Files in Engineering
  { id: 'file_04', name: 'Architecture Diagram.png', type: 'file', mimeType: 'image/png', size: 1200000, parentId: 'fld_02', createdBy: 'usr_002', createdAt: '2026-03-08T10:00:00Z', updatedAt: '2026-03-16T11:00:00Z', permission: 'editor' },
  { id: 'file_05', name: 'API Documentation.md', type: 'file', mimeType: 'text/markdown', size: 340000, parentId: 'fld_02', createdBy: 'usr_002', createdAt: '2026-02-28T14:00:00Z', updatedAt: '2026-03-14T09:00:00Z', permission: 'editor' },
  { id: 'file_06', name: 'Sprint Velocity Report.pdf', type: 'file', mimeType: 'application/pdf', size: 1800000, parentId: 'fld_02', createdBy: 'usr_002', createdAt: '2026-03-12T15:00:00Z', updatedAt: '2026-03-12T15:00:00Z', permission: 'editor' },
  // Files in Finance
  { id: 'file_07', name: 'Q1 Financial Summary.xlsx', type: 'file', mimeType: 'application/xlsx', size: 670000, parentId: 'fld_03', createdBy: 'usr_006', createdAt: '2026-03-14T16:00:00Z', updatedAt: '2026-03-14T16:00:00Z', permission: 'viewer' },
  { id: 'file_08', name: 'Budget Forecast 2026.xlsx', type: 'file', mimeType: 'application/xlsx', size: 890000, parentId: 'fld_03', createdBy: 'usr_006', createdAt: '2026-02-01T10:00:00Z', updatedAt: '2026-03-10T14:00:00Z', permission: 'viewer' },
  // Files in Campaign Assets
  { id: 'file_09', name: 'Hero Banner.png', type: 'file', mimeType: 'image/png', size: 3400000, parentId: 'fld_04', createdBy: 'usr_009', createdAt: '2026-03-12T09:00:00Z', updatedAt: '2026-03-12T09:00:00Z', permission: 'editor' },
  { id: 'file_10', name: 'Product Demo Video.mp4', type: 'file', mimeType: 'video/mp4', size: 45000000, parentId: 'fld_04', createdBy: 'usr_005', createdAt: '2026-03-05T14:00:00Z', updatedAt: '2026-03-05T14:00:00Z', permission: 'editor' },
  // Root files
  { id: 'file_11', name: 'Team Photo.jpg', type: 'file', mimeType: 'image/jpeg', size: 5600000, parentId: null, createdBy: 'usr_001', createdAt: '2026-03-01T12:00:00Z', updatedAt: '2026-03-01T12:00:00Z', permission: 'owner' },
  { id: 'file_12', name: 'Meeting Notes — March.md', type: 'file', mimeType: 'text/markdown', size: 120000, parentId: null, createdBy: 'usr_001', createdAt: '2026-03-15T10:00:00Z', updatedAt: '2026-03-17T09:00:00Z', permission: 'owner' },
  { id: 'file_13', name: 'Onboarding Checklist.pdf', type: 'file', mimeType: 'application/pdf', size: 560000, parentId: null, createdBy: 'usr_007', createdAt: '2026-02-10T11:00:00Z', updatedAt: '2026-03-08T14:00:00Z', permission: 'editor' },
];
