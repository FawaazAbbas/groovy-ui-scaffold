import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/pricing-data';
import { PricingCard } from '@/components/PricingCard';
import { useOnboarding } from '@/contexts/OnboardingContext';

const faqs = [
  {
    q: 'What counts as a "run"?',
    a: 'A run is one complete agent action — for example, sending an email, resolving a ticket, or generating a report. Multi-step workflows count as one run.',
  },
  {
    q: 'What happens if I hit my run limit?',
    a: 'You\'ll get a notification before you reach your limit. You can upgrade your plan anytime to get more runs — changes take effect immediately.',
  },
  {
    q: 'Can I change plans mid-cycle?',
    a: 'Yes. Upgrades take effect immediately with prorated billing. Downgrades apply at the start of your next billing cycle.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. Every plan includes a 14-day free trial with no card required. You\'ll only be asked for payment when the trial ends.',
  },
];

export default function PricingPage() {
  const { startOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSelect = (_planId: string) => {
    startOnboarding();
    navigate('/signup');
  };

  return (
    <div className="min-h-screen">
      {/* Fixed parallax background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full opacity-25 bg-[radial-gradient(circle,rgba(200,0,223,0.15)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full opacity-25 bg-[radial-gradient(circle,rgba(0,183,255,0.12)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply" />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            fontFamily: '"Monoton", display',
            fontSize: '35em',
            lineHeight: 1,
            color: 'rgba(200, 0, 223, 0.18)',
            filter: 'blur(30px)',
          }}
        >
          G
        </span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20 z-10">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase">Pricing</span>
          </div>
          <h1 className="text-[32px] md:text-[44px] font-bold leading-[1.1] tracking-tight text-text-primary mb-4">
            Simple, <span className="text-primary">transparent</span> pricing
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Every plan includes a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PRICING_PLANS.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              variant="marketing"
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto pb-24">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-medium text-text-primary">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-text-secondary shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
