import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

export default function UseCasesSlide() {
  const cases = [
    { vertical: 'Financial Services', desc: 'Automate compliance checks, client onboarding, and regulatory reporting.', stat: '60% faster onboarding' },
    { vertical: 'Healthcare', desc: 'Streamline patient scheduling, insurance verification, and record management.', stat: '40% reduction in admin time' },
    { vertical: 'E-Commerce', desc: 'Handle customer support, inventory tracking, and order fulfillment workflows.', stat: '3x support throughput' },
    { vertical: 'Legal', desc: 'Automate document review, case research, and client communication.', stat: '80% less manual review' },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0d0a1a 0%, #100d18 40%, #0a0a0f 100%)' }}>
        <div className="absolute top-[50%] right-[20%] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(160,100,255,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Use Cases</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-16 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Built for every industry.
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {cases.map((c) => (
              <div key={c.vertical} className="rounded-[28px] p-10" style={glass}>
                <h3 className="text-[32px] font-semibold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.vertical}</h3>
                <p className="text-[18px] text-white/40 leading-relaxed mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.desc}</p>
                <span className="text-[16px] font-semibold" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
