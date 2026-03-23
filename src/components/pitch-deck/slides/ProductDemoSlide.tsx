import SlideLayout from '../SlideLayout';

export default function ProductDemoSlide() {
  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Product</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          One command center for all your agents.
        </h2>

        <div className="relative">
          {/* Mock product screenshot */}
          <div className="terminal-block rounded-2xl p-8 h-[480px] relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-electric-bright/40" />
              <span className="text-[14px] text-text-secondary ml-4 font-mono">groovy.ai/dashboard</span>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {['Active Agents', 'Tasks Completed', 'Avg Response', 'Uptime'].map((label) => (
                <div key={label} className="glass-elevated rounded-xl p-5 neon-border">
                  <span className="text-[14px] text-text-secondary block mb-2">{label}</span>
                  <span className="text-[28px] font-bold text-electric-bright">{label === 'Uptime' ? '99.9%' : label === 'Active Agents' ? '24' : label === 'Tasks Completed' ? '1,847' : '1.2s'}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['Scheduling Agent', 'Data Pipeline Agent', 'Support Agent'].map((agent) => (
                <div key={agent} className="glass rounded-xl p-4 neon-border flex items-center gap-3">
                  <div className="neon-dot" />
                  <div>
                    <span className="text-[16px] font-medium text-text-primary block">{agent}</span>
                    <span className="text-[13px] text-text-secondary">Running · 4 tasks queued</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Callout annotations */}
          <div className="absolute -right-4 top-16 bg-electric-bright text-background px-4 py-2 rounded-lg text-[14px] font-semibold">
            Real-time monitoring
          </div>
          <div className="absolute -left-4 bottom-24 bg-cyan text-background px-4 py-2 rounded-lg text-[14px] font-semibold">
            One-click deploy
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
