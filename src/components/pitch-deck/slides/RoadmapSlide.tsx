import SlideLayout from '../SlideLayout';

export default function RoadmapSlide() {
  const quarters = [
    { q: 'Q1 2025', status: 'done', items: ['Multi-agent orchestration', 'Marketplace v2 launch', '40+ integrations'] },
    { q: 'Q2 2025', status: 'current', items: ['Custom agent builder', 'Enterprise SSO/SCIM', 'SOC 2 Type II cert'] },
    { q: 'Q3 2025', status: 'upcoming', items: ['Voice & video agents', 'On-premise deployment', 'Advanced analytics'] },
    { q: 'Q4 2025', status: 'upcoming', items: ['Agent-to-agent comms', 'Vertical-specific suites', 'International expansion'] },
  ];

  return (
    <SlideLayout className="bg-background retro-grid">
      <div className="relative z-10 flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Roadmap</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-20">
          What's ahead.
        </h2>

        <div className="flex gap-6">
          {quarters.map((q) => (
            <div key={q.q} className="flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-4 h-4 rounded-full ${q.status === 'done' ? 'bg-electric-bright neon-glow-sm' : q.status === 'current' ? 'bg-electric-bright/50 animate-retro-pulse' : 'bg-text-secondary/20'}`} />
                <span className={`text-[20px] font-semibold ${q.status === 'done' ? 'text-electric-bright' : q.status === 'current' ? 'text-text-primary' : 'text-text-secondary'}`}>{q.q}</span>
              </div>
              <div className={`flex-1 rounded-2xl p-6 ${q.status === 'current' ? 'terminal-block neon-border' : 'glass-elevated neon-border'}`}>
                <ul className="flex flex-col gap-4">
                  {q.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`text-[14px] mt-1 ${q.status === 'done' ? 'text-electric-bright' : 'text-text-secondary'}`}>{q.status === 'done' ? '✓' : '→'}</span>
                      <span className="text-[18px] text-text-secondary leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
