import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';

export function HeyContent() {
  const { userName, nextStep } = useOnboarding();

  return (
    <div className="text-center">
      <AnimatedEntry delay={0}>
        <div className="mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-primary to-primary-dark shadow-glass-sm">
            <span className="text-[24px] font-bold text-white">G</span>
          </div>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={150}>
        <h1 className="text-[44px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
          Hey {userName || 'there'},
        </h1>
      </AnimatedEntry>

      <AnimatedEntry delay={300}>
        <p className="mt-4 text-[17px] md:text-[20px] leading-[1.6] text-text-secondary">
          Welcome to Groovy.
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
