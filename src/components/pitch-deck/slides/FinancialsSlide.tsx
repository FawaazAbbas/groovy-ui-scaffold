import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

export default function FinancialsSlide() {
  const projections = [
    { year: '2023', arr: '$0.3M', bar: 5 },
    { year: '2024', arr: '$4.2M', bar: 20 },
    { year: '2025E', arr: '$12M', bar: 50 },
    { year: '2026E', arr: '$35M', bar: 85 },
    { year: '2027E', arr: '$80M', bar: 100 },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #0d0a12 0%, #10101a 40%, #0a0a0f 100%)' }}>
        <div className="absolute bottom-[30%] left-[40%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Financials</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-16 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Path to $80M ARR.
          </h2>

          <div className="flex flex-col gap-4 mb-14">
            {projections.map((p) => (
              <div key={p.year} className="flex items-center gap-5">
                <span className="w-[80px] text-[18px] font-medium text-white/40" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{p.year}</span>
                <div className="flex-1 h-10 rounded-[12px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="h-full rounded-[12px]" style={{ width: `${p.bar}%`, background: 'linear-gradient(90deg, rgba(245,200,66,0.3), rgba(245,200,66,0.6))', boxShadow: '0 0 20px rgba(245,200,66,0.1)' }} />
                </div>
                <span className="w-[90px] text-[20px] font-bold text-right" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{p.arr}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-5">
            {[
              { label: 'Gross Margin', value: '85%' },
              { label: 'Net Revenue Retention', value: '120%' },
              { label: 'CAC Payback', value: '8 months' },
              { label: 'LTV:CAC', value: '6.2x' },
            ].map((m) => (
              <div key={m.label} className="rounded-[20px] p-6 text-center" style={glass}>
                <span className="text-[30px] font-bold block" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.value}</span>
                <span className="text-[14px] text-white/30 mt-2 block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
