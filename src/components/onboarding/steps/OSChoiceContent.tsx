import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { OSCard } from '../OSCard';
import type { OSChoice } from '@/types/onboarding';

const osOptions: { os: OSChoice; title: string; description: string; disabled?: boolean }[] = [
  { os: 'slack', title: 'Slack', description: 'Connect your existing Slack workspace' },
  { os: 'teams', title: 'Microsoft Teams', description: 'Connect your existing Teams workspace' },
  { os: 'lark', title: 'Lark', description: 'Connect your existing Lark workspace' },
  { os: 'groovy-space', title: 'Groovy Space', description: "Use Groovy's built-in workspace" },
];

export function OSChoiceContent() {
  const { osChoice, setOSChoice, nextStep } = useOnboarding();

  return (
    <div>
      <AnimatedEntry delay={0}>
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Where does your team work?
        </h2>
      </AnimatedEntry>

      <AnimatedEntry delay={100}>
        <p className="mt-3 text-[15px] md:text-[17px] leading-[1.6] text-text-secondary">
          Pick where your AI employees will show up.
        </p>
      </AnimatedEntry>

      <AnimatedEntry delay={200}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Choose your workspace">
          {osOptions.map((opt) => (
            <OSCard
              key={opt.os}
              os={opt.os}
              title={opt.title}
              description={opt.description}
              selected={osChoice === opt.os}
              onSelect={() => setOSChoice(opt.os)}
              disabled={opt.disabled}
            />
          ))}
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={400}>
        <div className="mt-8">
          <button
            onClick={nextStep}
            disabled={!osChoice}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-body font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: !osChoice ? 'var(--text-secondary)' : 'var(--primary)',
              boxShadow: !osChoice ? 'none' : 'var(--shadow-md)',
            }}
            onMouseEnter={(e) => {
              if (osChoice) e.currentTarget.style.background = 'var(--primary-hover)';
            }}
            onMouseLeave={(e) => {
              if (osChoice) e.currentTarget.style.background = 'var(--primary)';
            }}
          >
            Continue
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="9,4.5 12.5,8 9,11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </AnimatedEntry>
    </div>
  );
}
