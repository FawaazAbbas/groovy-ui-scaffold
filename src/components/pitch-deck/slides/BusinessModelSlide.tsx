import SlideLayout from '../SlideLayout';

export default function BusinessModelSlide() {
  const tiers = [
    { name: 'Starter', price: '$49', period: '/mo', features: ['5 agents', '1,000 tasks/mo', 'Email support', 'Basic analytics'], highlight: false },
    { name: 'Growth', price: '$199', period: '/mo', features: ['25 agents', '10,000 tasks/mo', 'Priority support', 'Advanced analytics', 'Custom workflows'], highlight: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited agents', 'Unlimited tasks', 'Dedicated CSM', 'SLA guarantee', 'On-prem option', 'SSO & SCIM'], highlight: false },
  ];

  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Business Model</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Simple, usage-based pricing.
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`rounded-2xl p-10 flex flex-col ${tier.highlight ? 'terminal-block neon-border-strong neon-glow-md' : 'glass-elevated neon-border'}`}>
              <span className="text-[22px] font-semibold text-text-secondary mb-4">{tier.name}</span>
              <div className="mb-8">
                <span className={`text-[56px] font-bold leading-none ${tier.highlight ? 'text-electric-bright' : 'text-text-primary'}`}>{tier.price}</span>
                <span className="text-[20px] text-text-secondary">{tier.period}</span>
              </div>
              <ul className="flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className={`text-[16px] ${tier.highlight ? 'text-electric-bright' : 'text-text-secondary'}`}>✓</span>
                    <span className="text-[18px] text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-[18px] text-text-secondary mt-10">
          120% net revenue retention · $18K average contract value · 85% gross margin
        </p>
      </div>
    </SlideLayout>
  );
}
