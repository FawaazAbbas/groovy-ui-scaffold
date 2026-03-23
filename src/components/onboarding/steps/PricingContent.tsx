import { useState, type FormEvent } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PRICING_PLANS, COMPANY_SIZES, INDUSTRIES, type PricingPlan } from '@/lib/pricing-data';
import type { SignUpFormData } from '@/types/onboarding';

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
      {plan.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-white tracking-wide">
          Most Popular
        </span>
      )}
      {plan.trialDays && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[11px] font-semibold text-white tracking-wide">
          {plan.trialDays}-day free
        </span>
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

      {plan.overageCap && (
        <p className="mt-3 text-[10px] text-text-secondary/70 font-mono">
          Max bill: {plan.maxBill}
        </p>
      )}

      {/* Selection indicator */}
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

function SignUpForm({
  selectedPlan,
  onSubmit,
}: {
  selectedPlan: string;
  onSubmit: (data: SignUpFormData) => void;
}) {
  const [form, setForm] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    companySize: '',
    industry: '',
    roleTitle: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = 'Required';
    if (!form.businessEmail.trim()) next.businessEmail = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail))
      next.businessEmail = 'Enter a valid email';
    if (!form.companyName.trim()) next.companyName = 'Required';
    if (!form.companySize) next.companySize = 'Required';
    if (!form.industry) next.industry = 'Required';
    if (!form.roleTitle.trim()) next.roleTitle = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, selectedPlan });
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white/60 px-3.5 py-2.5 text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all ${
      errors[field] ? 'border-destructive' : 'border-border-solid'
    }`;

  const selectClass = (field: string) =>
    `w-full rounded-xl border bg-white/60 px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none ${
      errors[field] ? 'border-destructive' : 'border-border-solid'
    }`;

  const planLabel = PRICING_PLANS.find((p) => p.id === selectedPlan)?.name ?? selectedPlan;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Full name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Jane Smith"
            className={inputClass('fullName')}
          />
          {errors.fullName && <p className="mt-1 text-[11px] text-destructive">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Business email</label>
          <input
            type="email"
            value={form.businessEmail}
            onChange={(e) => update('businessEmail', e.target.value)}
            placeholder="jane@company.com"
            className={inputClass('businessEmail')}
          />
          {errors.businessEmail && <p className="mt-1 text-[11px] text-destructive">{errors.businessEmail}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Company name</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            placeholder="Acme Ltd"
            className={inputClass('companyName')}
          />
          {errors.companyName && <p className="mt-1 text-[11px] text-destructive">{errors.companyName}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Your role</label>
          <input
            type="text"
            value={form.roleTitle}
            onChange={(e) => update('roleTitle', e.target.value)}
            placeholder="Founder, Marketing Manager..."
            className={inputClass('roleTitle')}
          />
          {errors.roleTitle && <p className="mt-1 text-[11px] text-destructive">{errors.roleTitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Company size</label>
          <select
            value={form.companySize}
            onChange={(e) => update('companySize', e.target.value)}
            className={selectClass('companySize')}
          >
            <option value="" disabled>Select...</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>{s} people</option>
            ))}
          </select>
          {errors.companySize && <p className="mt-1 text-[11px] text-destructive">{errors.companySize}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Industry</label>
          <select
            value={form.industry}
            onChange={(e) => update('industry', e.target.value)}
            className={selectClass('industry')}
          >
            <option value="" disabled>Select...</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          {errors.industry && <p className="mt-1 text-[11px] text-destructive">{errors.industry}</p>}
        </div>
      </div>

      {/* Selected plan indicator */}
      <div className="flex items-center gap-2 rounded-xl bg-primary/[0.06] border border-primary/10 px-3.5 py-2.5">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm text-text-primary">
          Selected plan: <strong>{planLabel}</strong>
        </span>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm"
      >
        Create Account
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export function PricingContent() {
  const { nextStep, setSignUpData } = useOnboarding();
  const [selectedPlanId, setSelectedPlanId] = useState('growth');

  const handleSignUp = (data: SignUpFormData) => {
    setSignUpData(data);
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

      {/* Pricing cards */}
      <AnimatedEntry delay={100}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              selected={selectedPlanId === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>
      </AnimatedEntry>

      {/* Sign-up form */}
      <AnimatedEntry delay={250}>
        <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Create your account</h3>
          <SignUpForm selectedPlan={selectedPlanId} onSubmit={handleSignUp} />
        </div>
      </AnimatedEntry>
    </div>
  );
}
