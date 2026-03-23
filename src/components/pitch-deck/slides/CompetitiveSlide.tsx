import SlideLayout from '../SlideLayout';

export default function CompetitiveSlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-background to-electric-dark">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Competitive Landscape</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Where we stand.
        </h2>

        <div className="relative w-[900px] h-[500px] mx-auto">
          {/* Axes */}
          <div className="absolute inset-0 border-l-2 border-b-2 border-border-solid/30">
            {/* Y axis label */}
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[14px] text-text-secondary font-mono tracking-widest uppercase whitespace-nowrap">Autonomy Level</span>
            {/* X axis label */}
            <span className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 text-[14px] text-text-secondary font-mono tracking-widest uppercase">Integration Depth</span>
          </div>

          {/* Quadrant labels */}
          <span className="absolute top-4 left-8 text-[13px] text-text-secondary/50">Narrow Automation</span>
          <span className="absolute top-4 right-4 text-[13px] text-text-secondary/50">Full Orchestration</span>
          <span className="absolute bottom-8 left-8 text-[13px] text-text-secondary/50">Manual Tools</span>
          <span className="absolute bottom-8 right-4 text-[13px] text-text-secondary/50">Connected but Manual</span>

          {/* Competitors */}
          {[
            { name: 'Zapier', x: '70%', y: '75%', size: 'w-16 h-16' },
            { name: 'UiPath', x: '35%', y: '35%', size: 'w-14 h-14' },
            { name: 'AutoGPT', x: '25%', y: '20%', size: 'w-12 h-12' },
            { name: 'Make', x: '55%', y: '65%', size: 'w-12 h-12' },
          ].map((c) => (
            <div key={c.name} className="absolute flex flex-col items-center" style={{ left: c.x, bottom: c.y }}>
              <div className={`${c.size} rounded-full bg-text-secondary/10 border border-border-solid/30 flex items-center justify-center`}>
                <span className="text-[12px] font-medium text-text-secondary">{c.name}</span>
              </div>
            </div>
          ))}

          {/* Groovy */}
          <div className="absolute flex flex-col items-center" style={{ right: '10%', top: '10%' }}>
            <div className="w-24 h-24 rounded-full bg-electric-bright/20 border-2 border-electric-bright flex items-center justify-center neon-glow-lg">
              <span className="text-[18px] font-bold text-electric-bright">Groovy</span>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
