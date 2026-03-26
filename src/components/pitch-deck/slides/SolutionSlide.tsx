import SlideLayout from '../SlideLayout';

export default function SolutionSlide() {
  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">The Solution</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-6 max-w-[1200px]">
          Integrate ready-made AI employees into your workspace with a <span className="text-electric-bright">2-click solution.</span>
        </h2>
        <p className="text-[26px] text-text-secondary leading-relaxed max-w-[900px] mb-16">
          No developers, no training, no overhead. Just plug in and go.
        </p>

        <div className="grid grid-cols-3 gap-10">
          {[
            {
              icon: '🔌',
              title: '2-Click Integration',
              desc: 'Connect to Slack, Teams, or Lark instantly. Or use Groovy Space, a workspace built for companies not yet on institutional systems.',
            },
            {
              icon: '🎯',
              title: 'Narrow-Spec Agents',
              desc: 'Purpose-built agents that fit the needs of specific tasks rather than broad workflows. Precision over generality.',
            },
            {
              icon: '🏠',
              title: 'Groovy Space',
              desc: 'A workspace built for companies that aren\'t on institutional systems. Everything they need, in one place.',
            },
          ].map((card) => (
            <div key={card.title} className="glass-elevated rounded-2xl p-10 neon-border">
              <span className="text-[48px] block mb-6">{card.icon}</span>
              <h3 className="text-[28px] font-semibold text-text-primary mb-3">{card.title}</h3>
              <p className="text-[20px] text-text-secondary leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
