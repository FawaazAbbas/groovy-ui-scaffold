import { Check, ArrowRight } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PRICING_PLANS, type PricingPlan } from '@/lib/pricing-data';

function PricingCard({
  plan,
  selected,
  onSelect,
}: {
  plan: PricingPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative flex flex-col rounded-2xl p-5 text-left transition-all duration-200
        border backdrop-blur-sm
        ${
          selected
            ? 'border-primary bg-primary/[0.06] shadow-md ring-2 ring-primary/20'
            : 'border-border bg-white/60 hover:bg-white/80 hover:shadow-sm'
        }
        ${plan.isPopular ? 'md:scale-[1.02]' : ''}
      `}
    >
      {(plan.isPopular || plan.trialDays) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {plan.isPopular && (
            <span className="rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-white tracking-wide whitespace-nowrap">
              Most Popular
            </span>
          )}
          {plan.trialDays && (
            <span className="rounded-full bg-emerald-500 px-3 py-0.5 text-[11px] font-semibold text-white tracking-wide whitespace-nowrap">
              {plan.trialDays}-day free trial
            </span>
          )}
        </div>
      )}

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-text-primary">
          {plan.price === 0 ? 'Free' : `${plan.currency}${plan.price}`}
        </span>
        {plan.period === 'mo' && (
          <span className="text-sm text-text-secondary">/mo</span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-text-primary">{plan.name}</h3>
      <p className="text-xs text-text-secondary mb-3">{plan.tagline}</p>

      <div className="space-y-1.5 flex-1">
        {plan.features.slice(0, 3).map((f) => (
          <div key={f} className="flex items-start gap-1.5">
            <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <span className="text-xs text-text-secondary leading-snug">{f}</span>
          </div>
        ))}
      </div>

      <div
        className={`
          mt-3 flex items-center justify-center rounded-lg py-1.5 text-xs font-medium transition-all duration-200
          ${selected ? 'bg-primary text-white' : 'bg-black/[0.04] text-text-secondary'}
        `}
      >
        {selected ? 'Selected' : 'Select'}
      </div>
    </button>
  );
}

export function PricingContent() {
  const { nextStep, selectedPlanId, setSelectedPlan } = useOnboarding();

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4">
      <AnimatedEntry delay={0}>
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Choose your plan
          </h2>
          <p className="mt-2 text-base text-text-secondary max-w-lg mx-auto">
            Start free for 14 days. No credit card needed. Upgrade or downgrade anytime.
          </p>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              selected={selectedPlanId === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={250}>
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-body font-semibold text-white transition-all duration-200"
            style={{
              background: 'var(--primary)',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
            }}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </AnimatedEntry>
    </div>
  );
}
