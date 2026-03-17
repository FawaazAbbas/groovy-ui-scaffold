export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'member' | 'viewer';
  title: string;
  department: string;
  status: 'online' | 'offline' | 'away';
  lastActive: string;
}

export const mockUsers: User[] = [
  { id: 'usr_001', name: 'Sarah Chen', email: 'sarah@acme.com', avatar: '', role: 'admin', title: 'Head of Operations', department: 'Operations', status: 'online', lastActive: '2026-03-17T10:00:00Z' },
  { id: 'usr_002', name: 'Marcus Johnson', email: 'marcus@acme.com', avatar: '', role: 'manager', title: 'Engineering Lead', department: 'Engineering', status: 'online', lastActive: '2026-03-17T09:45:00Z' },
  { id: 'usr_003', name: 'Priya Patel', email: 'priya@acme.com', avatar: '', role: 'member', title: 'Sales Manager', department: 'Sales', status: 'away', lastActive: '2026-03-17T08:30:00Z' },
  { id: 'usr_004', name: 'James O\'Brien', email: 'james@acme.com', avatar: '', role: 'member', title: 'Customer Success Lead', department: 'Support', status: 'offline', lastActive: '2026-03-16T18:00:00Z' },
  { id: 'usr_005', name: 'Aisha Williams', email: 'aisha@acme.com', avatar: '', role: 'manager', title: 'Marketing Director', department: 'Marketing', status: 'online', lastActive: '2026-03-17T09:50:00Z' },
  { id: 'usr_006', name: 'David Kim', email: 'david@acme.com', avatar: '', role: 'member', title: 'Finance Analyst', department: 'Finance', status: 'offline', lastActive: '2026-03-16T17:30:00Z' },
  { id: 'usr_007', name: 'Elena Rodriguez', email: 'elena@acme.com', avatar: '', role: 'member', title: 'HR Coordinator', department: 'HR', status: 'online', lastActive: '2026-03-17T09:55:00Z' },
  { id: 'usr_008', name: 'Tom Brennan', email: 'tom@acme.com', avatar: '', role: 'viewer', title: 'Intern', department: 'Engineering', status: 'away', lastActive: '2026-03-17T07:00:00Z' },
  { id: 'usr_009', name: 'Fatima Al-Rashid', email: 'fatima@acme.com', avatar: '', role: 'member', title: 'Product Designer', department: 'Design', status: 'online', lastActive: '2026-03-17T10:05:00Z' },
];
