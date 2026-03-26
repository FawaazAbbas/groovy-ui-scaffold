import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

const glassCurrent = {
  background: 'rgba(245,200,66,0.05)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(245,200,66,0.15)',
  boxShadow: 'inset 0 1px 0 rgba(245,200,66,0.08), 0 0 30px rgba(245,200,66,0.05)',
};

export default function RoadmapSlide() {
  const quarters = [
    { q: 'Q1 2025', status: 'done', items: ['Multi-agent orchestration', 'Marketplace v2 launch', '40+ integrations'] },
    { q: 'Q2 2025', status: 'current', items: ['Custom agent builder', 'Enterprise SSO/SCIM', 'SOC 2 Type II cert'] },
    { q: 'Q3 2025', status: 'upcoming', items: ['Voice & video agents', 'On-premise deployment', 'Advanced analytics'] },
    { q: 'Q4 2025', status: 'upcoming', items: ['Agent-to-agent comms', 'Vertical-specific suites', 'International expansion'] },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0a0d15 0%, #0d1020 50%, #0a0a10 100%)' }}>
        <div className="absolute top-[50%] left-[40%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(80,140,255,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Roadmap</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-20 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            What's ahead.
          </h2>

          <div className="flex gap-5">
            {quarters.map((q) => (
              <div key={q.q} className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full" style={{
                    background: q.status === 'done' ? '#F5C842' : q.status === 'current' ? 'rgba(245,200,66,0.5)' : 'rgba(255,255,255,0.15)',
                    boxShadow: q.status === 'done' ? '0 0 10px rgba(245,200,66,0.4)' : 'none',
                  }} />
                  <span className="text-[18px] font-semibold text-white/60" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: q.status === 'current' ? '#F5C842' : undefined }}>{q.q}</span>
                </div>
                <div className="flex-1 rounded-[24px] p-7" style={q.status === 'current' ? glassCurrent : glass}>
                  <ul className="flex flex-col gap-4">
                    {q.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[13px] mt-1" style={{ color: q.status === 'done' ? '#F5C842' : 'rgba(255,255,255,0.2)' }}>{q.status === 'done' ? '✓' : '→'}</span>
                        <span className="text-[17px] text-white/40 leading-snug" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
