import SlideLayout from '../SlideLayout';

export default function ArchitectureSlide() {
  const layers = [
    { label: 'Integrations', items: ['Slack', 'Jira', 'Gmail', 'Notion', 'GitHub', 'Salesforce'], color: 'cyan' },
    { label: 'Orchestration Engine', items: ['Task Router', 'Priority Queue', 'Escalation Logic'], color: 'electric' },
    { label: 'Agent Runtime', items: ['Scheduling', 'Data Pipeline', 'Support', 'Analytics', 'Compliance'], color: 'electric' },
  ];

  return (
    <SlideLayout className="bg-gradient-to-b from-background to-cyan-muted">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-cyan mb-6">Architecture</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-20">
          Built for reliability at scale.
        </h2>

        <div className="flex flex-col gap-6">
          {layers.map((layer) => (
            <div key={layer.label} className="relative">
              <span className="text-[14px] font-mono uppercase tracking-widest text-text-secondary mb-3 block">{layer.label}</span>
              <div className={`flex gap-4 p-6 rounded-2xl ${layer.color === 'cyan' ? 'cyan-border bg-cyan-muted/30' : 'neon-border bg-comfort/30'}`}>
                {layer.items.map((item) => (
                  <div key={item} className="flex-1 terminal-block rounded-xl px-5 py-4 text-center">
                    <span className={`text-[18px] font-medium ${layer.color === 'cyan' ? 'text-cyan' : 'text-electric-bright'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-10">
          <div className="neon-dot" />
          <span className="text-[16px] text-text-secondary">SOC 2 Type II compliant · 99.99% SLA · End-to-end encryption</span>
        </div>
      </div>
    </SlideLayout>
  );
}
