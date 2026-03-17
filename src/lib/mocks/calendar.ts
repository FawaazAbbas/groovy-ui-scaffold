export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  source: 'groovy' | 'google' | 'apple' | 'agent';
  attendees: string[];
  location?: string;
  agentId?: string;
}

const baseDate = new Date('2026-03-16');

function d(dayOffset: number, hour: number, min = 0) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, min, 0, 0);
  return date.toISOString();
}

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'evt_01', title: 'Q2 Planning Kickoff', description: 'Kick off Q2 planning across all departments', start: d(1, 10), end: d(1, 11, 30), source: 'groovy', attendees: ['usr_001', 'usr_002', 'usr_005'], location: 'Main Conference Room' },
  { id: 'evt_02', title: 'Engineering Standup', description: 'Daily standup for engineering team', start: d(1, 9), end: d(1, 9, 15), source: 'groovy', attendees: ['usr_002', 'usr_008'] },
  { id: 'evt_03', title: 'Sales Pipeline Review', description: 'Weekly pipeline review with sales team', start: d(1, 14), end: d(1, 15), source: 'google', attendees: ['usr_001', 'usr_003'] },
  { id: 'evt_04', title: 'LeadScout Performance Review', description: 'AI agent scheduled review of lead scoring accuracy', start: d(1, 16), end: d(1, 16, 30), source: 'agent', attendees: ['usr_001'], agentId: 'agt_01' },
  { id: 'evt_05', title: 'Dentist Appointment', description: 'Annual checkup', start: d(2, 8), end: d(2, 9), source: 'apple', attendees: ['usr_001'] },
  { id: 'evt_06', title: 'Marketing Sync', description: 'Weekly marketing team alignment', start: d(2, 11), end: d(2, 12), source: 'groovy', attendees: ['usr_005', 'usr_001'] },
  { id: 'evt_07', title: 'Architecture Review', description: 'Q2 system architecture review with engineering', start: d(2, 14), end: d(2, 15, 30), source: 'groovy', attendees: ['usr_001', 'usr_002'], location: 'Room B' },
  { id: 'evt_08', title: 'TicketSolver Weekly Report', description: 'AI-generated weekly support metrics review', start: d(2, 16), end: d(2, 16, 30), source: 'agent', attendees: ['usr_001', 'usr_004'], agentId: 'agt_03' },
  { id: 'evt_09', title: 'Board Meeting Prep', description: 'Prepare slides and talking points for board meeting', start: d(3, 9), end: d(3, 10, 30), source: 'groovy', attendees: ['usr_001'] },
  { id: 'evt_10', title: 'Customer Call — TechNova', description: 'Discovery call with TechNova Inc CTO', start: d(3, 11), end: d(3, 11, 45), source: 'google', attendees: ['usr_003', 'usr_001'] },
  { id: 'evt_11', title: 'Lunch with David', description: 'Finance team lunch', start: d(3, 12), end: d(3, 13), source: 'apple', attendees: ['usr_001', 'usr_006'] },
  { id: 'evt_12', title: 'Sprint Retrospective', description: 'Sprint 14 retrospective', start: d(3, 15), end: d(3, 16), source: 'groovy', attendees: ['usr_002', 'usr_008', 'usr_009'] },
  { id: 'evt_13', title: 'HR Policy Review', description: 'Quarterly HR policy review session', start: d(4, 10), end: d(4, 11), source: 'groovy', attendees: ['usr_007', 'usr_001'] },
  { id: 'evt_14', title: 'Investor Update Call', description: 'Monthly investor update', start: d(4, 14), end: d(4, 15), source: 'google', attendees: ['usr_001', 'usr_006'] },
  { id: 'evt_15', title: 'CodeReviewer Audit Summary', description: 'AI agent generated code quality audit results', start: d(4, 16), end: d(4, 16, 30), source: 'agent', attendees: ['usr_002'], agentId: 'agt_05' },
  { id: 'evt_16', title: 'Team All-Hands', description: 'Monthly all-hands meeting', start: d(5, 16), end: d(5, 17), source: 'groovy', attendees: ['usr_001', 'usr_002', 'usr_003', 'usr_004', 'usr_005'], location: 'Main Hall' },
  { id: 'evt_17', title: 'Yoga Class', description: 'Weekly yoga session', start: d(5, 7), end: d(5, 8), source: 'apple', attendees: ['usr_001'] },
  { id: 'evt_18', title: 'Design Review', description: 'Review new marketplace designs', start: d(6, 10), end: d(6, 11, 30), source: 'groovy', attendees: ['usr_009', 'usr_001'] },
  { id: 'evt_19', title: 'ComplianceBot Monthly Check', description: 'AI agent regulatory compliance check results', start: d(7, 9), end: d(7, 9, 30), source: 'agent', attendees: ['usr_001'], agentId: 'agt_19' },
  { id: 'evt_20', title: 'Customer Success Workshop', description: 'Workshop on improving customer onboarding experience', start: d(8, 13), end: d(8, 15), source: 'groovy', attendees: ['usr_004', 'usr_001', 'usr_003'] },
  { id: 'evt_21', title: 'Database Migration Window', description: 'Scheduled maintenance for database migration', start: d(3, 2), end: d(3, 4), source: 'groovy', attendees: ['usr_002'] },
  { id: 'evt_22', title: 'Candidate Interview — Senior Eng', description: 'Technical interview for senior engineer position', start: d(4, 11), end: d(4, 12), source: 'google', attendees: ['usr_002', 'usr_001'] },
];
