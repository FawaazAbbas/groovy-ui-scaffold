import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { PrimaryButton } from '../PrimaryButton';

const valueProps = [
  {
    num: '01',
    headline: 'AI employees, not workflows.',
    description:
      "Groovy agents aren't scripts or dumb parsers. They think, adapt, and handle tasks the way a capable team member would.",
  },
  {
    num: '02',
    headline: 'They work with your tools, not inside them.',
    description:
      'Your agents plug into the platforms your team already uses — Slack, Teams, Lark — without replacing anything.',
  },
  {
    num: '03',
    headline: 'One marketplace, every role you need.',
    description:
      'Browse, install, and manage agents from a single marketplace. Marketing, finance, content — covered.',
  },
];

export function IntroContent() {
  const { nextStep } = useOnboarding();

  return (
    <div>
      {/* Title */}
      <AnimatedEntry delay={0}>
        <h2
          className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em]"
          style={{ color: 'var(--onb-charcoal)' }}
        >
          This is what Groovy does for you.
        </h2>
      </AnimatedEntry>

      {/* Value props */}
      <div className="mt-12 space-y-10">
        {valueProps.map((prop, i) => (
          <AnimatedEntry key={prop.num} delay={100 + i * 150}>
            <div>
              <span
                className="text-[12px] font-semibold tracking-widest uppercase"
                style={{ color: 'var(--onb-electric-neon)' }}
              >
                {prop.num}
              </span>
              <h3
                className="mt-2 text-[22px] md:text-[26px] font-semibold leading-[1.3] tracking-[-0.02em]"
                style={{ color: 'var(--onb-charcoal)' }}
              >
                {prop.headline}
              </h3>
              <p
                className="mt-2 text-[15px] md:text-[17px] leading-[1.6] max-w-[540px]"
                style={{ color: 'var(--onb-warm-brown)' }}
              >
                {prop.description}
              </p>
            </div>
          </AnimatedEntry>
        ))}
      </div>

      {/* CTA */}
      <AnimatedEntry delay={600}>
        <div className="mt-8">
          <PrimaryButton onClick={nextStep}>
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
