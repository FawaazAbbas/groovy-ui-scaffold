import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
};

export default function SolutionSlide() {
  const cards = [
    { title: '2-Click Integration', desc: 'Connect to Slack, Teams, or Lark instantly. Or use Groovy Space for teams not yet on institutional systems.' },
    { title: 'Narrow-Spec Agents', desc: 'Purpose-built agents that fit specific tasks rather than broad workflows. Precision over generality.' },
    { title: 'Groovy Space', desc: 'A workspace built for companies that aren\'t on institutional systems. Everything they need, in one place.' },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #0a1a1a 0%, #0d1520 40%, #0a0a12 100%)' }}>
        <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,200,180,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>The Solution</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-4 max-w-[1100px] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Ready-made AI employees, <span style={{ color: '#F5C842' }}>2 clicks away.</span>
          </h2>
          <p className="text-[24px] text-white/40 leading-relaxed max-w-[700px] mb-16" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            No developers, no training, no overhead. Just plug in and go.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="rounded-[28px] p-10 flex flex-col" style={glass}>
                <h3 className="text-[28px] font-semibold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{card.title}</h3>
                <p className="text-[18px] text-white/40 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
