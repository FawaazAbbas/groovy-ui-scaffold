import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

export default function TractionSlide() {
  const metrics = [
    { label: 'Clients', value: '2 won, 3 engaged', detail: 'Two paying clients onboarded. Three more engaged as early testers.' },
    { label: 'Waitlist', value: '5,343', detail: 'Acquired via Reddit and paid marketing at $0.14 per lead.' },
    { label: 'Architecture', value: 'Nearly complete', detail: 'Core orchestration built. First client fully onboarded by next week.' },
    { label: 'MVP', value: '2 weeks out', detail: 'Marketplace, agent deployment, and workspace integrations ready soon.' },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0a0a12 0%, #0d1018 50%, #0a0a0f 100%)' }}>
        <div className="absolute top-[30%] right-[30%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.25) 0%, transparent 70%)', filter: 'blur(100px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Progress</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-16 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Building fast, validating faster.
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-[28px] p-10" style={glass}>
                <span className="text-[14px] font-medium tracking-[0.15em] uppercase mb-4 block" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.label}</span>
                <span className="text-[48px] font-bold text-white leading-none block mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.value}</span>
                <span className="text-[17px] text-white/35 leading-relaxed block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
