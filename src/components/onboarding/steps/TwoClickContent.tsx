import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PlatformMockup } from '../PlatformMockup';

export function TwoClickContent() {
  const { osChoice, nextStep } = useOnboarding();

  const osLabel =
    osChoice === 'slack' ? 'Slack' : osChoice === 'teams' ? 'Teams' : osChoice === 'lark' ? 'Lark' : 'Groovy Space';

  const ctaButton = (label: string) => (
    <button
      onClick={nextStep}
      className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-body font-semibold text-white transition-all duration-200"
      style={{
        background: 'var(--primary)',
        boxShadow: 'var(--shadow-md)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--primary-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--primary)';
      }}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="3" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="9,4.5 12.5,8 9,11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  );

  return (
    <div>
      <AnimatedEntry delay={0}>
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Two clicks. That's it.
        </h2>
      </AnimatedEntry>

      <AnimatedEntry delay={150}>
        <p className="mt-4 text-[17px] md:text-[20px] leading-[1.6] text-text-secondary">
          You're about to connect your {osLabel} workspace. No code, no IT department, no configuration files. Just authorise and go.
        </p>
      </AnimatedEntry>

      {osChoice && (
        <AnimatedEntry delay={300}>
          <div className="mt-10">
            <PlatformMockup osChoice={osChoice} />
          </div>
        </AnimatedEntry>
      )}

      <AnimatedEntry delay={450}>
        <div className="mt-8">
          {ctaButton(`Connect ${osLabel}`)}
        </div>
      </AnimatedEntry>
    </div>
  );
}
