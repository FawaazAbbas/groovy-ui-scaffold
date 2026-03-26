import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

export default function HowItWorksSlide() {
  const steps = [
    { num: '01', title: 'Browse & Deploy', desc: 'Pick agents from the marketplace. Configure permissions and connect your tools.' },
    { num: '02', title: 'Orchestrate', desc: 'Chain agents together into workflows. Set triggers, conditions, and escalation rules.' },
    { num: '03', title: 'Monitor & Scale', desc: 'Track performance in real-time. Scale up agents as your team grows.' },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0d0d1a 0%, #0a1020 50%, #080810 100%)' }}>
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(100,140,255,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>How It Works</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-20 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Three steps to an autonomous team.
          </h2>

          {/* Horizontal glass timeline strip */}
          <div className="rounded-[32px] p-12 flex gap-0" style={glass}>
            {steps.map((step, i) => (
              <div key={step.num} className="flex-1 flex flex-col" style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingLeft: i > 0 ? '48px' : '0', paddingRight: i < 2 ? '48px' : '0' }}>
                <span className="text-[48px] font-bold text-white/10 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{step.num}</span>
                <h3 className="text-[30px] font-semibold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{step.title}</h3>
                <p className="text-[20px] text-white/40 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
