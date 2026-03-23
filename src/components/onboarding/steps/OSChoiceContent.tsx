import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PrimaryButton } from '../PrimaryButton';
import { OSCard } from '../OSCard';
import type { OSChoice } from '@/types/onboarding';

const osOptions: { os: OSChoice; title: string; description: string }[] = [
  { os: 'slack', title: 'Slack', description: 'Connect your existing Slack workspace' },
  { os: 'teams', title: 'Microsoft Teams', description: 'Connect your existing Teams workspace' },
  { os: 'lark', title: 'Lark', description: 'Connect your existing Lark workspace' },
  { os: 'groovy-space', title: 'Groovy Space', description: "Use Groovy's built-in workspace — start now" },
];

export function OSChoiceContent() {
  const { osChoice, setOSChoice, nextStep } = useOnboarding();

  return (
    <div>
      {/* Title */}
      <AnimatedEntry delay={0}>
        <h2
          className="text-[32px] md:text-[48px] leading-[1.2] tracking-[-0.01em]"
          style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--onb-charcoal)' }}
        >
          Where does your team work?
        </h2>
      </AnimatedEntry>

      {/* Subtitle */}
      <AnimatedEntry delay={100}>
        <p
          className="mt-3 text-[15px] md:text-[17px] leading-[1.6]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--onb-warm-brown)' }}
        >
          Pick where your AI employees will show up.
        </p>
      </AnimatedEntry>

      {/* OS Cards */}
      <AnimatedEntry delay={200}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4" role="radiogroup" aria-label="Choose your workspace">
          {osOptions.map((opt) => (
            <OSCard
              key={opt.os}
              os={opt.os}
              title={opt.title}
              description={opt.description}
              selected={osChoice === opt.os}
              onSelect={() => setOSChoice(opt.os)}
            />
          ))}
        </div>
      </AnimatedEntry>

      {/* CTA */}
      <AnimatedEntry delay={400}>
        <div className="mt-8">
          <PrimaryButton onClick={nextStep} disabled={!osChoice}>
            Continue
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="9,4.5 12.5,8 9,11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </PrimaryButton>
        </div>
      </AnimatedEntry>
    </div>
  );
}
