import SlideLayout from '../SlideLayout';

export default function GoToMarketSlide() {
  const channels = [
    { label: 'Product-Led Growth', desc: 'Free tier → self-serve upgrade. Marketplace discovery drives organic adoption.', pct: '45%' },
    { label: 'Outbound Sales', desc: 'Enterprise-focused sales team targeting Fortune 2000 operations leaders.', pct: '35%' },
    { label: 'Partnerships', desc: 'SI and consulting partnerships for enterprise deployment and customization.', pct: '20%' },
  ];

  return (
    <SlideLayout className="bg-gradient-to-br from-background via-background to-cyan-muted">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-cyan mb-6">Go-to-Market</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Multi-channel growth engine.
        </h2>

        <div className="flex flex-col gap-8 mb-16">
          {channels.map((ch) => (
            <div key={ch.label} className="flex items-start gap-8">
              <div className="w-[80px] shrink-0">
                <span className="text-[36px] font-bold text-cyan">{ch.pct}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[28px] font-semibold text-text-primary mb-2">{ch.label}</h3>
                <p className="text-[20px] text-text-secondary leading-relaxed">{ch.desc}</p>
              </div>
              <div className="flex-1 h-3 rounded-full bg-cyan-muted/50 self-center">
                <div className="h-full rounded-full bg-cyan/60 cyan-glow-sm" style={{ width: ch.pct }} />
              </div>
            </div>
          ))}
        </div>

        <div className="terminal-block rounded-2xl p-8 cyan-border">
          <span className="text-[16px] font-mono text-cyan block mb-2">// Growth Flywheel</span>
          <span className="text-[20px] text-text-secondary">
            Agent deployed → Delivers value → Team invites colleagues → More agents deployed → Network effects compound
          </span>
        </div>
      </div>
    </SlideLayout>
  );
}
