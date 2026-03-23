import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PrimaryButton } from '../PrimaryButton';
import { PlatformMockup } from '../PlatformMockup';

export function TwoClickContent() {
  const { osChoice, beginTour } = useOnboarding();

  const isGroovySpace = osChoice === 'groovy-space';
  const osLabel =
    osChoice === 'slack' ? 'Slack' : osChoice === 'teams' ? 'Teams' : osChoice === 'lark' ? 'Lark' : 'Groovy Space';

  if (isGroovySpace) {
    return (
      <div>
        <AnimatedEntry delay={0}>
          <h2
            className="text-[32px] md:text-[48px] leading-[1.2] tracking-[-0.01em]"
            style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--onb-charcoal)' }}
          >
            Your workspace is ready.
          </h2>
        </AnimatedEntry>

        <AnimatedEntry delay={150}>
          <p
            className="mt-4 text-[17px] md:text-[20px] leading-[1.6]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--onb-warm-brown)' }}
          >
            Groovy Space is your all-in-one workspace with agents, calendar, and team chat built in. No external tools
            needed.
          </p>
        </AnimatedEntry>

        {/* Feature pills */}
        <AnimatedEntry delay={300}>
          <div className="flex flex-wrap gap-3 mt-8">
            {['🤖 Agents', '📅 Calendar', '💬 Chats'].map((pill) => (
              <span
                key={pill}
                className="rounded-full px-4 py-2 text-[13px] font-medium"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: 'var(--onb-comfort-green)',
                  color: 'var(--onb-charcoal)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </AnimatedEntry>

        <AnimatedEntry delay={450}>
          <div className="mt-8">
            <PrimaryButton onClick={beginTour}>
              Enter Groovy Space
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="3" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <polyline
                  points="9,4.5 12.5,8 9,11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </PrimaryButton>
          </div>
        </AnimatedEntry>
      </div>
    );
  }

  return (
    <div>
      <AnimatedEntry delay={0}>
        <h2
          className="text-[32px] md:text-[48px] leading-[1.2] tracking-[-0.01em]"
          style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--onb-charcoal)' }}
        >
          Two clicks. That's it.
        </h2>
      </AnimatedEntry>

      <AnimatedEntry delay={150}>
        <p
          className="mt-4 text-[17px] md:text-[20px] leading-[1.6]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--onb-warm-brown)' }}
        >
          You're about to connect your {osLabel} workspace. No code, no IT department, no configuration files. Just
          authorise and go.
        </p>
      </AnimatedEntry>

      {/* Platform mockup */}
      {osChoice && (
        <AnimatedEntry delay={300}>
          <div className="mt-10">
            <PlatformMockup osChoice={osChoice} />
          </div>
        </AnimatedEntry>
      )}

      <AnimatedEntry delay={450}>
        <div className="mt-8">
          <PrimaryButton onClick={beginTour}>
            Connect {osLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <polyline
                points="9,4.5 12.5,8 9,11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </PrimaryButton>
        </div>
      </AnimatedEntry>
    </div>
  );
}
