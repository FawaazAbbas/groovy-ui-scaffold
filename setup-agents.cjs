const https = require('https');
const fs = require('fs');

// Because the mock data is TS, we just stringify the mock data inline for SQL. 
// or read it if we compiled it. Let's just stringify the mock data inline for SQL.

const mockAgentsData = [
  { id: 'agt_01', name: 'Setup Engineer', description: 'Helps you configure your workspace, connect integrations, and get your AI team running', long_description: 'Setup Engineer walks you through your new workspace step by step — connecting the tools you already use, recommending the right agents for your business, and making sure everything is configured correctly before you go live.', category: 'Custom', publisher: 'Groovy Labs', avatar: '', rating: 5.0, review_count: 843, install_count: 31200, credit_cost: 0, featured: true, capabilities: ['Workspace configuration', 'Integration setup', 'Agent recommendations', 'Onboarding guidance'], screenshots: [], required_integrations: [], changelog: [{ version: '1.0.0', date: '2026-03-15', notes: 'Initial release' }], reviews: [{ user: 'Jamie R.', rating: 5, comment: 'Had everything set up in 10 minutes', date: '2026-03-10' }] },
  { id: 'agt_02', name: 'DealCloser', description: 'Negotiation assistant that drafts proposals and tracks deal stages', long_description: 'DealCloser monitors your pipeline and provides real-time negotiation coaching, auto-generates proposals, and tracks competitor mentions in calls.', category: 'Sales', publisher: 'Groovy Labs', avatar: '', rating: 4.6, review_count: 189, install_count: 8200, credit_cost: 8, featured: true, capabilities: ['Proposal generation', 'Deal tracking', 'Competitor analysis', 'Call summarization'], screenshots: [], required_integrations: ['int_11'], changelog: [{ version: '1.8.0', date: '2026-02-20', notes: 'Improved proposal templates' }], reviews: [{ user: 'Rachel T.', rating: 4, comment: 'Proposals are solid but could use more customization', date: '2026-02-10' }] },
  { id: 'agt_03', name: 'TicketSolver', description: 'Auto-resolves common support tickets with smart routing', long_description: 'TicketSolver reads incoming tickets, classifies urgency, attempts auto-resolution for common issues, and escalates complex cases with full context.', category: 'Support', publisher: 'HelpStack', avatar: '', rating: 4.9, review_count: 567, install_count: 23100, credit_cost: 3, featured: true, capabilities: ['Ticket classification', 'Auto-resolution', 'Smart routing', 'CSAT prediction'], screenshots: [], required_integrations: ['int_01'], changelog: [{ version: '3.0.0', date: '2026-03-10', notes: 'Major rewrite with GPT-4 backend' }], reviews: [{ user: 'Jake P.', rating: 5, comment: 'Reduced our response time by 60%', date: '2026-03-05' }] },
  { id: 'agt_04', name: 'SentimentPulse', description: 'Real-time customer sentiment tracking across all channels', long_description: 'SentimentPulse monitors customer interactions across email, chat, social media, and calls to provide a unified sentiment dashboard.', category: 'Support', publisher: 'HelpStack', avatar: '', rating: 4.5, review_count: 211, install_count: 9800, credit_cost: 4, featured: true, capabilities: ['Sentiment analysis', 'Multi-channel monitoring', 'Trend detection', 'Alert system'], screenshots: [], required_integrations: ['int_01'], changelog: [{ version: '2.3.0', date: '2026-02-28', notes: 'Added social media monitoring' }], reviews: [{ user: 'Lisa K.', rating: 5, comment: 'Finally, a single view of customer happiness', date: '2026-02-22' }] },
  { id: 'agt_05', name: 'CodeReviewer', description: 'Automated code review with security scanning and style checks', long_description: 'CodeReviewer integrates with your git workflow to provide instant code reviews, security vulnerability scanning, and style enforcement.', category: 'Engineering', publisher: 'DevForge', avatar: '', rating: 4.7, review_count: 423, install_count: 15600, credit_cost: 6, featured: false, capabilities: ['Code review', 'Security scanning', 'Style checking', 'Performance analysis'], screenshots: [], required_integrations: ['int_09'], changelog: [{ version: '4.1.0', date: '2026-03-05', notes: 'Added Rust and Go support' }], reviews: [{ user: 'Chen W.', rating: 5, comment: 'Catches bugs our team misses', date: '2026-03-01' }] }
];

const generateValuesStr = (agents) => {
  return agents.map(a => {
    return `(
      '${a.id}', '${a.name.replace(/'/g, "''")}', '${a.description.replace(/'/g, "''")}', 
      '${a.long_description.replace(/'/g, "''")}', '${a.category}', '${a.publisher}', '${a.avatar}', 
      ${a.rating}, ${a.review_count}, ${a.install_count}, ${a.credit_cost}, ${a.featured},
      '${JSON.stringify(a.capabilities).replace(/'/g, "''")}'::jsonb, 
      '${JSON.stringify(a.required_integrations).replace(/'/g, "''")}'::jsonb, 
      '${JSON.stringify(a.screenshots).replace(/'/g, "''")}'::jsonb, 
      '${JSON.stringify(a.changelog).replace(/'/g, "''")}'::jsonb, 
      '${JSON.stringify(a.reviews).replace(/'/g, "''")}'::jsonb
    )`;
  }).join(',\n');
};

const query = `
BEGIN;

CREATE TABLE IF NOT EXISTS public.agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  category TEXT NOT NULL,
  publisher TEXT NOT NULL,
  avatar TEXT,
  rating NUMERIC(3, 1),
  review_count INTEGER DEFAULT 0,
  install_count INTEGER DEFAULT 0,
  credit_cost INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  capabilities JSONB DEFAULT '[]'::jsonb,
  required_integrations JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  changelog JSONB DEFAULT '[]'::jsonb,
  reviews JSONB DEFAULT '[]'::jsonb
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Agents are viewable by everyone" ON public.agents;
CREATE POLICY "Agents are viewable by everyone" ON public.agents FOR SELECT USING (true);

-- Insert dummy data
INSERT INTO public.agents (
  id, name, description, long_description, category, publisher, avatar, 
  rating, review_count, install_count, credit_cost, featured, 
  capabilities, required_integrations, screenshots, changelog, reviews
) VALUES 
${generateValuesStr(mockAgentsData)}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  category = EXCLUDED.category,
  publisher = EXCLUDED.publisher,
  avatar = EXCLUDED.avatar,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  install_count = EXCLUDED.install_count,
  credit_cost = EXCLUDED.credit_cost,
  featured = EXCLUDED.featured,
  capabilities = EXCLUDED.capabilities,
  required_integrations = EXCLUDED.required_integrations,
  screenshots = EXCLUDED.screenshots,
  changelog = EXCLUDED.changelog,
  reviews = EXCLUDED.reviews;

-- Grant permissions to anon and authenticated
GRANT SELECT ON public.agents TO anon, authenticated;

COMMIT;
`;

const data = JSON.stringify({ query });

const options = {
  hostname: 'groovy-pg-meta-xy3ttffdpq-nw.a.run.app',
  port: 443,
  path: '/query',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', responseBody);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
