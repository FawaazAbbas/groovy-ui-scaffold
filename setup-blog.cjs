const https = require('https');

const mockBlogPosts = [
  {
    id: 'post_01',
    title: 'The Future of AI Agents in Sales',
    slug: 'future-of-ai-agents-sales',
    excerpt: 'How leading enterprise teams are using autonomous agents to close deals faster and increase win rates by 40%.',
    content: `
The sales landscape is changing rapidly. What used to require hours of manual research, drafting, and follow-ups can now be largely automated by intelligent AI agents.

## Why Autonomous Agents?

Autonomous agents are fundamentally different from standard chatbots. They don't just answer questions; they operate workflows. Instead of asking "what should I say to this prospect?", agents can:
1. Analyze the prospect's recent company news.
2. Draft a highly personalized outreach email.
3. Schedule the email for optimal send time.
4. Auto-respond to simple queries or escalate complex ones to a human.

## The Groovy Advantage

With Groovy's new **DealCloser** agent, beta customers have seen incredible results. The agent integrates directly with Salesforce and Slack, ensuring that account executives are only brought in when human intuition is truly needed.

*Welcome to the future of sales.*
    `.trim(),
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600',
    author_name: 'Sarah Chen',
    author_avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=C800DF',
    read_time: 4,
    published_at: '2026-03-20T10:00:00Z'
  },
  {
    id: 'post_02',
    title: 'How TicketSolver Reduces Support Load by 60%',
    slug: 'ticketsolver-reduces-support-load',
    excerpt: 'A deep dive into how our flagship support agent uses semantic understanding to instantly resolve complex customer tickets.',
    content: `
Customer support teams are overwhelmed. The modern consumer expects near-instant resolution, a feat impossible to achieve with human agents alone when dealing with peak-hour ticket spikes.

## Enter TicketSolver

TicketSolver is our most popular marketplace agent for a reason. Built on advanced LLMs, it doesn't just look for keywords; it parses the *intent* and *context* of the user's issue.

### The Breakdown
- **Triage**: Instantly categorizes inbound tickets by urgency and topic.
- **Resolution**: Consults internal documentation to auto-reply to known issues (e.g., password resets, billing disputes).
- **Escalation**: Routes truly complex or high-emotion tickets directly to a senior support specialist.

HelpStack implemented TicketSolver last month and saw a **60% reduction in first-response times**. Your team could be next.
    `.trim(),
    cover_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&h=600',
    author_name: 'Marcus Thorne',
    author_avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=16A34A',
    read_time: 5,
    published_at: '2026-03-15T14:30:00Z'
  },
  {
    id: 'post_03',
    title: 'Building a Trustworthy AI Workspace',
    slug: 'building-trustworthy-ai-workspace',
    excerpt: 'Security isn\'t an afterthought. Learn how Groovy implements strict guardrails and role-based access control for enterprise AI.',
    content: `
Deploying AI in the enterprise comes with valid concerns: Data leaks, hallucinated commitments, and unauthorized access. That's why Groovy was built from the ground up prioritizing **trust**.

## The Guardrails Framework

Our Guardrails system acts as an immune system for your AI workspace:
1. **Pll redaction**: Automatically detects and masks sensitive customer data before it ever hits an external LLM API.
2. **Budget caps**: Ensure rogue agents can't rack up infinite compute costs.
3. **Execution approval**: Force a "Human in the Loop" step for high-stakes actions like issuing refunds or sending mass emails.

By combining these explicit, determinisic rules with probabilistic AI, Groovy offers the best of both worlds: unprecedented speed, wrapped in unbreakable safety.
    `.trim(),
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200&h=600',
    author_name: 'David Kim',
    author_avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=David&backgroundColor=2563EB',
    read_time: 6,
    published_at: '2026-03-05T09:15:00Z'
  }
];

const generateValuesStr = (posts) => {
  return posts.map(p => {
    return `(
      '${p.id}', '${p.title.replace(/'/g, "''")}', '${p.slug}', 
      '${p.excerpt.replace(/'/g, "''")}', '${p.content.replace(/'/g, "''")}', 
      '${p.cover_image}', '${p.author_name}', '${p.author_avatar}', 
      ${p.read_time}, '${p.published_at}'::timestamptz
    )`;
  }).join(',\n');
};

const query = `
BEGIN;

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON public.blog_posts;
CREATE POLICY "Blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (true);

-- Insert dummy data
INSERT INTO public.blog_posts (
  id, title, slug, excerpt, content, cover_image, author_name, author_avatar, read_time, published_at
) VALUES 
${generateValuesStr(mockBlogPosts)}
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image = EXCLUDED.cover_image,
  author_name = EXCLUDED.author_name,
  author_avatar = EXCLUDED.author_avatar,
  read_time = EXCLUDED.read_time,
  published_at = EXCLUDED.published_at;

-- Grant permissions to anon and authenticated
GRANT SELECT ON public.blog_posts TO anon, authenticated;

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
