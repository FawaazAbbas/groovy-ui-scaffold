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
          <div
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: 'var(--onb-charcoal)' }}
          >
            <span className="text-[24px] font-bold text-white">G</span>
          </div>
        </div>
      </AnimatedEntry>

      {/* Greeting */}
      <AnimatedEntry delay={150}>
        <h1
          className="text-[44px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em]"
          style={{ color: 'var(--onb-charcoal)' }}
        >
          Hey {userName || 'there'},
        </h1>
      </AnimatedEntry>

      {/* Subtext */}
      <AnimatedEntry delay={300}>
        <p
          className="mt-4 text-[17px] md:text-[20px] leading-[1.6] font-normal"
          style={{ color: 'var(--onb-warm-brown)' }}
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
