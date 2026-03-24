export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'human' | 'agent';
  content: string;
  timestamp: string;
  toolUse?: { tool: string; input: string; output: string };
}

export interface Chat {
  id: string;
  type: 'agent' | 'dm' | 'channel';
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  members: string[];
  messages: ChatMessage[];
}

export function createAgentChat(agent: { id: string; name: string }): Chat {
  return {
    id: `chat_${agent.id}`,
    type: 'agent',
    name: agent.name,
    avatar: '',
    lastMessage: `Hey! I'm ${agent.name}, ready to help.`,
    lastMessageTime: new Date().toISOString(),
    unreadCount: 1,
    members: ['usr_001', agent.id],
    messages: [{
      id: `msg_${agent.id}_welcome`,
      senderId: agent.id,
      senderName: agent.name,
      senderType: 'agent',
      content: `Hey Sarah! I'm ${agent.name}. I'm all set up and ready to go. What can I help you with?`,
      timestamp: new Date().toISOString(),
    }],
  };
}

export const mockChats: Chat[] = [
  {
    id: 'chat_01', type: 'agent', name: 'Setup Engineer', avatar: '', lastMessage: "Hey Sarah! I'm your Setup Engineer...", lastMessageTime: '2026-03-17T09:45:00Z', unreadCount: 1, members: ['usr_001', 'agt_01'],
    messages: [
      { id: 'msg_setup_01', senderId: 'agt_01', senderName: 'Setup Engineer', senderType: 'agent', content: "Hey Sarah! I'm your Setup Engineer. I'll help you get your workspace configured \u2014 connect your tools, pick the right agents, and make sure everything's running smoothly. What would you like to start with?", timestamp: '2026-03-17T09:45:00Z' },
    ],
  },
  {
    id: 'chat_02', type: 'agent', name: 'TicketSolver', avatar: '', lastMessage: 'Resolved 8 tickets automatically in the last hour...', lastMessageTime: '2026-03-17T09:40:00Z', unreadCount: 1, members: ['usr_001', 'agt_03'],
    messages: [
      { id: 'msg_20', senderId: 'usr_001', senderName: 'Sarah Chen', senderType: 'human', content: 'How\'s the ticket queue looking?', timestamp: '2026-03-17T09:35:00Z' },
      { id: 'msg_21', senderId: 'agt_03', senderName: 'TicketSolver', senderType: 'agent', content: 'Current queue status: 14 open tickets, 3 high-priority, 8 auto-resolved in the last hour.', timestamp: '2026-03-17T09:35:10Z', toolUse: { tool: 'Ticket Dashboard', input: 'Get queue stats', output: 'Open: 14, High Priority: 3, Auto-resolved (1h): 8, CSAT: 94%' } },
      { id: 'msg_22', senderId: 'agt_03', senderName: 'TicketSolver', senderType: 'agent', content: 'The 3 high-priority tickets are all from enterprise accounts. I\'ve escalated them to James\'s team with full context. Average first response time today: 2.4 minutes.', timestamp: '2026-03-17T09:35:20Z' },
      { id: 'msg_23', senderId: 'usr_001', senderName: 'Sarah Chen', senderType: 'human', content: 'What\'s the most common issue today?', timestamp: '2026-03-17T09:36:00Z' },
      { id: 'msg_24', senderId: 'agt_03', senderName: 'TicketSolver', senderType: 'agent', content: 'API rate limiting errors — 5 tickets. Looks like it started after the 3am deployment. I\'ve flagged this to the engineering channel and created a tracking incident.', timestamp: '2026-03-17T09:36:10Z' },
      { id: 'msg_25', senderId: 'agt_03', senderName: 'TicketSolver', senderType: 'agent', content: 'Resolved 8 tickets automatically in the last hour. CSAT on auto-resolutions is 94%. 🎉', timestamp: '2026-03-17T09:40:00Z' },
    ],
  },
  {
    id: 'chat_03', type: 'dm', name: 'Marcus Johnson', avatar: '', lastMessage: 'Sure, let\'s sync at 2pm about the architecture review', lastMessageTime: '2026-03-17T09:20:00Z', unreadCount: 0, members: ['usr_001', 'usr_002'],
    messages: [
      { id: 'msg_30', senderId: 'usr_001', senderName: 'Sarah Chen', senderType: 'human', content: 'Hey Marcus, are you free this afternoon for a quick sync on the Q2 architecture review?', timestamp: '2026-03-17T09:15:00Z' },
      { id: 'msg_31', senderId: 'usr_002', senderName: 'Marcus Johnson', senderType: 'human', content: 'Sure, let\'s sync at 2pm about the architecture review. I\'ll bring the dependency diagram.', timestamp: '2026-03-17T09:20:00Z' },
      { id: 'msg_32', senderId: 'usr_001', senderName: 'Sarah Chen', senderType: 'human', content: 'Perfect, I\'ll book the room. Can you also pull the latest performance metrics?', timestamp: '2026-03-17T09:21:00Z' },
      { id: 'msg_33', senderId: 'usr_002', senderName: 'Marcus Johnson', senderType: 'human', content: 'Already on it. PerfGuard generated a report this morning, I\'ll share it.', timestamp: '2026-03-17T09:22:00Z' },
    ],
  },
  {
    id: 'chat_04', type: 'channel', name: '#general', avatar: '', lastMessage: 'Reminder: All-hands at 4pm today! 🎉', lastMessageTime: '2026-03-17T08:00:00Z', unreadCount: 5, members: ['usr_001', 'usr_002', 'usr_003', 'usr_005'],
    messages: [
      { id: 'msg_40', senderId: 'usr_005', senderName: 'Aisha Williams', senderType: 'human', content: 'Good morning team! 👋 Quick reminder that the Q2 planning kickoff is tomorrow.', timestamp: '2026-03-17T07:30:00Z' },
      { id: 'msg_41', senderId: 'usr_002', senderName: 'Marcus Johnson', senderType: 'human', content: 'Thanks Aisha! Engineering is prepping our roadmap deck now.', timestamp: '2026-03-17T07:35:00Z' },
      { id: 'msg_42', senderId: 'usr_003', senderName: 'Priya Patel', senderType: 'human', content: 'Sales has our targets ready too. Exciting quarter ahead!', timestamp: '2026-03-17T07:40:00Z' },
      { id: 'msg_43', senderId: 'usr_001', senderName: 'Sarah Chen', senderType: 'human', content: 'Love the energy! Let\'s make Q2 our best yet. 🚀', timestamp: '2026-03-17T07:45:00Z' },
      { id: 'msg_44', senderId: 'usr_005', senderName: 'Aisha Williams', senderType: 'human', content: 'Reminder: All-hands at 4pm today! 🎉', timestamp: '2026-03-17T08:00:00Z' },
      { id: 'msg_45', senderId: 'usr_002', senderName: 'Marcus Johnson', senderType: 'human', content: 'Will be there! Also, shout out to the team for shipping the new dashboard feature yesterday. 👏', timestamp: '2026-03-17T08:05:00Z' },
      { id: 'msg_46', senderId: 'usr_003', senderName: 'Priya Patel', senderType: 'human', content: 'That new dashboard is already getting great feedback from clients!', timestamp: '2026-03-17T08:10:00Z' },
    ],
  },
  {
    id: 'chat_05', type: 'dm', name: 'Priya Patel', avatar: '', lastMessage: 'The TechNova lead looks really promising, thanks for routing it!', lastMessageTime: '2026-03-17T09:50:00Z', unreadCount: 2, members: ['usr_001', 'usr_003'],
    messages: [
      { id: 'msg_50', senderId: 'usr_003', senderName: 'Priya Patel', senderType: 'human', content: 'Hey Sarah! Just got the LeadScout notification about TechNova Inc.', timestamp: '2026-03-17T09:48:00Z' },
      { id: 'msg_51', senderId: 'usr_003', senderName: 'Priya Patel', senderType: 'human', content: 'The TechNova lead looks really promising, thanks for routing it! I\'m setting up a discovery call for this afternoon.', timestamp: '2026-03-17T09:50:00Z' },
    ],
  },
];
