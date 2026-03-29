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
    <div className="container mx-auto max-w-5xl px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
          Simple, <span className="text-primary">transparent</span> pricing
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Every plan includes a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>

      {/* Plans */}
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
      <div className="max-w-2xl mx-auto pb-8">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card glass-shimmer rounded-2xl overflow-hidden">
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
  );
}
