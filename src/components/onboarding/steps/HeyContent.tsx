import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PrimaryButton } from '../PrimaryButton';

export function HeyContent() {
  const { userName, nextStep } = useOnboarding();

  return (
    <div className="text-center">
      {/* Logo */}
      <AnimatedEntry delay={0}>
        <div className="mb-10">
          <span
            className="text-[28px] font-bold"
            style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--onb-charcoal)' }}
          >
            G
          </span>
        </div>
      </AnimatedEntry>

      {/* Greeting */}
      <AnimatedEntry delay={150}>
        <h1
          className="text-[72px] leading-[1.1] tracking-[-0.02em] md:text-[72px]"
          style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--onb-charcoal)' }}
        >
          <span className="block text-[44px] md:text-[72px]">
            Hey {userName || 'there'},
          </span>
        </h1>
      </AnimatedEntry>

      {/* Subtext */}
      <AnimatedEntry delay={300}>
        <p
          className="mt-4 text-[17px] md:text-[20px] leading-[1.6]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--onb-warm-brown)' }}
        >
          Welcome to Groovy.
        </p>
      </AnimatedEntry>

      {/* CTA */}
      <AnimatedEntry delay={500}>
        <div className="mt-10">
          <PrimaryButton onClick={nextStep}>
            Let's get started
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
