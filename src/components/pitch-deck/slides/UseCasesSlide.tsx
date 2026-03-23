import SlideLayout from '../SlideLayout';

export default function UseCasesSlide() {
  const cases = [
    { icon: '🏦', vertical: 'Financial Services', desc: 'Automate compliance checks, client onboarding, and regulatory reporting.', stat: '60% faster onboarding' },
    { icon: '🏥', vertical: 'Healthcare', desc: 'Streamline patient scheduling, insurance verification, and record management.', stat: '40% reduction in admin time' },
    { icon: '🛒', vertical: 'E-Commerce', desc: 'Handle customer support, inventory tracking, and order fulfillment workflows.', stat: '3x support throughput' },
    { icon: '⚖️', vertical: 'Legal', desc: 'Automate document review, case research, and client communication.', stat: '80% less manual review' },
  ];

  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Use Cases</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Built for every industry.
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {cases.map((c) => (
            <div key={c.vertical} className="glass-elevated rounded-2xl p-10 neon-border retro-corners">
              <span className="text-[48px] block mb-4">{c.icon}</span>
              <h3 className="text-[28px] font-semibold text-text-primary mb-3">{c.vertical}</h3>
              <p className="text-[20px] text-text-secondary leading-relaxed mb-4">{c.desc}</p>
              <span className="text-[18px] font-semibold text-electric-bright">{c.stat}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
