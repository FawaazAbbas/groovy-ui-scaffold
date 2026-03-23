import SlideLayout from '../SlideLayout';

export default function FinancialsSlide() {
  const projections = [
    { year: '2023', revenue: '$0.3M', arr: '$0.3M', customers: '18', bar: '5%' },
    { year: '2024', revenue: '$1.8M', arr: '$4.2M', customers: '85', bar: '20%' },
    { year: '2025E', revenue: '$8.5M', arr: '$12M', customers: '340', bar: '50%' },
    { year: '2026E', revenue: '$28M', arr: '$35M', customers: '1,200', bar: '85%' },
    { year: '2027E', revenue: '$65M', arr: '$80M', customers: '3,500', bar: '100%' },
  ];

  return (
    <SlideLayout className="bg-gradient-to-br from-background to-electric-dark">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Financials</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Path to $80M ARR.
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          {projections.map((p) => (
            <div key={p.year} className="flex items-center gap-6">
              <span className="w-[80px] text-[20px] font-mono font-semibold text-text-secondary">{p.year}</span>
              <div className="flex-1 h-10 rounded-lg bg-comfort/30 overflow-hidden">
                <div className="h-full rounded-lg bg-gradient-to-r from-electric to-electric-bright neon-glow-sm" style={{ width: p.bar }} />
              </div>
              <span className="w-[100px] text-[22px] font-bold text-electric-bright text-right">{p.arr}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8">
          {[
            { label: 'Gross Margin', value: '85%' },
            { label: 'Net Revenue Retention', value: '120%' },
            { label: 'CAC Payback', value: '8 months' },
            { label: 'LTV:CAC', value: '6.2x' },
          ].map((m) => (
            <div key={m.label} className="terminal-block rounded-xl p-6 text-center neon-border">
              <span className="text-[32px] font-bold text-electric-bright block">{m.value}</span>
              <span className="text-[16px] text-text-secondary mt-2 block">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
