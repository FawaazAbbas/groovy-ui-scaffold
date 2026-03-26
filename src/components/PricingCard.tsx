import { Check, Sparkles } from 'lucide-react';
import type { PricingPlan } from '@/lib/pricing-data';

interface PricingCardProps {
  plan: PricingPlan;
  variant: 'marketing' | 'billing';
  currentPlanId?: string;
  onSelect?: (planId: string) => void;
}

export function PricingCard({ plan, variant, currentPlanId, onSelect }: PricingCardProps) {
  const isCurrent = variant === 'billing' && currentPlanId === plan.id;

  return (
    <div className={`relative card-glass p-6 flex flex-col ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}>
      {plan.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-caption font-semibold text-white shadow-glass-sm">
          <Sparkles className="h-3 w-3" /> Most Popular
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-body font-semibold text-text-primary">{plan.name}</h3>
        <p className="text-caption text-text-secondary mt-0.5">{plan.tagline}</p>
      </div>

      <div className="mb-4">
        <span className="text-display-sm font-bold text-text-primary">{plan.currency}{plan.price}</span>
        <span className="text-body-sm text-text-secondary">/{plan.period}</span>
      </div>

      {plan.trialDays && (
        <span className="inline-flex self-start rounded-full bg-comfort px-2.5 py-0.5 text-caption font-medium text-comfort-text mb-4">
          {plan.trialDays}-day free trial
        </span>
      )}

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-start gap-2 text-body-sm text-text-secondary">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {variant === 'marketing' && (
        <button
          onClick={() => onSelect?.(plan.id)}
          className={`w-full rounded-xl py-3 text-body-sm font-semibold transition-colors ${
            plan.isPopular
              ? 'bg-primary text-white hover:bg-primary-hover shadow-glass-sm'
              : 'border border-border-solid text-text-primary hover:bg-white/50'
          }`}
        >
          Start free trial
        </button>
      )}

      {variant === 'billing' && (
        isCurrent ? (
          <div className="w-full rounded-xl py-3 text-center text-body-sm font-semibold bg-comfort text-comfort-text">
            Current Plan
          </div>
        ) : (
          <button
            onClick={() => onSelect?.(plan.id)}
            className="w-full rounded-xl border border-primary py-3 text-body-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            {currentPlanId && plan.price > 0 ? 'Upgrade' : 'Select'}
          </button>
        )
      )}
    </div>
  );
}
