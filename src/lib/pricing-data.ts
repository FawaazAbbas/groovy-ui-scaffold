export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: 'mo' | 'trial';
  currency: string;
  agents: string;
  runsPerMonth: string;
  overageRate: string | null;
  overageCap: string | null;
  maxBill: string | null;
  features: string[];
  isPopular: boolean;
  trialDays: number | null;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: '5 AI agents',
    price: 99,
    period: 'mo',
    currency: '£',
    agents: '5 agents',
    runsPerMonth: '500/mo',
    overageRate: '£10 per 100 runs',
    overageCap: '£30/mo',
    maxBill: '£129',
    features: [
      '5 agents — Slack or Teams',
      '500 runs per month',
      'Unlimited storage',
      'Email support',
    ],
    isPopular: false,
    trialDays: 14,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: '10 AI agents',
    price: 179,
    period: 'mo',
    currency: '£',
    agents: '10 agents',
    runsPerMonth: '1,000/mo',
    overageRate: '£8 per 100 runs',
    overageCap: '£50/mo',
    maxBill: '£229',
    features: [
      '10 agents — Slack + Teams',
      '1,000 runs per month',
      'Unlimited storage',
      'Usage dashboard + priority support',
    ],
    isPopular: true,
    trialDays: 14,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: '20 AI agents',
    price: 349,
    period: 'mo',
    currency: '£',
    agents: '20 agents',
    runsPerMonth: '2,000/mo',
    overageRate: '£7 per 100 runs',
    overageCap: '£80/mo',
    maxBill: '£429',
    features: [
      '20 agents — all channels + API',
      '2,000 runs per month',
      'Unlimited storage',
      'Custom workflows + onboarding call',
    ],
    isPopular: false,
    trialDays: 14,
  },
];

export const COMPANY_SIZES = [
  'Just me',
  '2–5',
  '6–20',
  '21–50',
  '51–200',
  '200+',
] as const;

export type CompanySize = (typeof COMPANY_SIZES)[number];

export const INDUSTRIES = [
  'Technology',
  'Marketing & Advertising',
  'Finance & Accounting',
  'Healthcare',
  'Retail & E-commerce',
  'Education',
  'Professional Services',
  'Real Estate',
  'Other',
] as const;

export type Industry = (typeof INDUSTRIES)[number];
