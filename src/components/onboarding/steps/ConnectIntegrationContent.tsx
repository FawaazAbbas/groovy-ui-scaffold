import { ArrowRight } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatedEntry } from '../AnimatedEntry';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

const platformDetails: Record<string, { name: string; color: string; description: string; icon: React.ReactNode }> = {
  slack: {
    name: 'Slack',
    color: 'bg-[#4A154B]',
    description: 'Your agents will appear as teammates in your Slack workspace — send messages, respond to threads, and run tasks.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
        <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/>
      </svg>
    ),
  },
  teams: {
    name: 'Microsoft Teams',
    color: 'bg-[#ECEEF8]',
    description: 'Your agents will appear in your Teams channels — collaborate, respond, and execute tasks alongside your team.',
    icon: <img src="/logos/teams.svg" alt="Microsoft Teams" className="h-7 w-7" />,
  },
  lark: {
    name: 'Lark',
    color: 'bg-white border border-black/[0.08]',
    description: 'Your agents will join your Lark workspace — handle messages, documents, and tasks seamlessly.',
    icon: <img src="/logos/lark.png" alt="Lark" className="h-7 w-7 object-contain" />,
  },
  'groovy-space': {
    name: 'Groovy Space',
    color: 'bg-primary/10',
    description: "You're all set — Groovy Space is our built-in workspace. No external connections needed.",
    icon: <GroovyLogo className="h-7 w-7 text-primary" />,
  },
};

export function ConnectIntegrationContent() {
  const { osChoice, nextStep } = useOnboarding();

  const platform = osChoice ? platformDetails[osChoice] : null;
  const isGroovySpace = osChoice === 'groovy-space';

  const handleConnect = () => {
    // In a real implementation, this would trigger an OAuth flow
    // For now, just advance to next step
    nextStep();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      <AnimatedEntry delay={0}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {isGroovySpace ? "You're all set" : 'Connect your workspace'}
          </h2>
          <p className="mt-2 text-base text-text-secondary max-w-md mx-auto">
            {isGroovySpace
              ? 'Groovy Space is ready to go — no setup needed.'
              : 'Your AI employees need access to where your team works.'}
          </p>
        </div>
      </AnimatedEntry>

      {platform && (
        <AnimatedEntry delay={150} className="w-full">
          <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-8 shadow-sm text-center">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${platform.color}`}>
              {platform.icon}
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {platform.name}
            </h3>
            <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
              {platform.description}
            </p>

            <button
              onClick={handleConnect}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm"
            >
              {isGroovySpace ? 'Continue' : `Connect ${platform.name}`}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </AnimatedEntry>
      )}

      {!isGroovySpace && (
        <AnimatedEntry delay={300} className="w-full">
          <button
            onClick={nextStep}
            className="mt-4 w-full text-center text-sm text-text-secondary hover:text-primary transition-colors"
          >
            Skip for now
          </button>
        </AnimatedEntry>
      )}
    </div>
  );
}
