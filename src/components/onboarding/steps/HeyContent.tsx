import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

export function HeyContent() {
  const { nextStep } = useOnboarding();

  return (
    <div className="text-center">
      <AnimatedEntry delay={0}>
        <div className="mb-10 flex justify-center">
          <GroovyLogo className="text-primary" style={{ fontSize: '6em' }} />
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={150}>
        <h1 className="text-[44px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
          Welcome to Groovy.
        </h1>
      </AnimatedEntry>

      <AnimatedEntry delay={300}>
        <p className="mt-4 text-[17px] md:text-[20px] leading-[1.6] text-text-secondary">
          AI employees, but better.
        </p>
      </AnimatedEntry>

      <AnimatedEntry delay={500}>
        <div className="mt-10">
          <button
            onClick={nextStep}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-body font-semibold text-white transition-all duration-200"
            style={{
              background: 'var(--primary)',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-hover)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            Let's get started
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
