import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

const glassHighlight = {
  background: 'rgba(245,200,66,0.06)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(245,200,66,0.15)',
  boxShadow: 'inset 0 1px 0 rgba(245,200,66,0.1), 0 0 40px rgba(245,200,66,0.05)',
};

export default function BusinessModelSlide() {
  const tiers = [
    { name: 'Starter', price: '$49', period: '/mo', features: ['5 agents', '1,000 tasks/mo', 'Email support', 'Basic analytics'], highlight: false },
    { name: 'Growth', price: '$199', period: '/mo', features: ['25 agents', '10,000 tasks/mo', 'Priority support', 'Advanced analytics', 'Custom workflows'], highlight: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited agents', 'Unlimited tasks', 'Dedicated CSM', 'SLA guarantee', 'On-prem option', 'SSO & SCIM'], highlight: false },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0a0a12 0%, #0d0f18 50%, #0a0a0f 100%)' }}>
        <div className="absolute top-[40%] left-[50%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Business Model</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-16 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Simple, usage-based pricing.
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className="rounded-[28px] p-10 flex flex-col" style={tier.highlight ? glassHighlight : glass}>
                <span className="text-[18px] font-medium text-white/40 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tier.name}</span>
                <div className="mb-8">
                  <span className="text-[56px] font-bold leading-none text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: tier.highlight ? '#F5C842' : 'white' }}>{tier.price}</span>
                  <span className="text-[18px] text-white/30" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tier.period}</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="text-[14px]" style={{ color: tier.highlight ? '#F5C842' : 'rgba(255,255,255,0.25)' }}>✓</span>
                      <span className="text-[16px] text-white/45" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-[16px] text-white/25 mt-10" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            120% net revenue retention · $18K average contract value · 85% gross margin
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}
