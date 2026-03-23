import { ArrowRight, Mail, BarChart3, FileText, Calendar, ShoppingCart, Headphones } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';

const AGENT_CATEGORIES = [
  { icon: Mail, label: 'Email', color: 'bg-blue-50 text-blue-600' },
  { icon: BarChart3, label: 'Analytics', color: 'bg-violet-50 text-violet-600' },
  { icon: FileText, label: 'Documents', color: 'bg-amber-50 text-amber-600' },
  { icon: Calendar, label: 'Scheduling', color: 'bg-emerald-50 text-emerald-600' },
  { icon: ShoppingCart, label: 'Commerce', color: 'bg-rose-50 text-rose-600' },
  { icon: Headphones, label: 'Support', color: 'bg-cyan-50 text-cyan-600' },
];

export function ExploreMarketplaceContent() {
  const { nextStep, osChoice } = useOnboarding();

  const platformName =
    osChoice === 'slack' ? 'Slack' : osChoice === 'teams' ? 'Teams' : osChoice === 'lark' ? 'Lark' : 'your workspace';

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      <AnimatedEntry delay={0}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Meet your AI team
          </h2>
          <p className="mt-2 text-base text-text-secondary max-w-md mx-auto">
            Browse specialist agents in the marketplace. Install any agent and it goes live in {platformName} instantly.
          </p>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={150}>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {AGENT_CATEGORIES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-4 shadow-sm"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-text-primary">{label}</span>
            </div>
          ))}
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={300}>
        <button
          onClick={nextStep}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 px-8 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm"
        >
          Explore the marketplace
          <ArrowRight className="h-4 w-4" />
        </button>
      </AnimatedEntry>
    </div>
  );
}
