import { Lock } from 'lucide-react';
import type { OSChoice } from '@/types/onboarding';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

interface OSCardProps {
  os: OSChoice;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const slackLogo = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/>
  </svg>
);

function LogoIcon({ os }: { os: OSChoice }) {
  switch (os) {
    case 'slack':
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A154B]">
          {slackLogo}
        </div>
      );
    case 'teams':
      return <img src="/logos/teams.svg" alt="Microsoft Teams" className="h-10 w-10 rounded-lg" />;
    case 'lark':
      return <img src="/logos/lark.svg" alt="Lark" className="h-10 w-10 rounded-lg" />;
    case 'groovy-space':
      return <GroovyLogo className="h-8 w-8 text-text-secondary" />;
    default:
      return null;
  }
}

export function OSCard({ os, title, description, selected, onSelect, disabled }: OSCardProps) {
  const isGroovy = os === 'groovy-space';
  const isDisabled = disabled || isGroovy;

  return (
    <button
      onClick={isDisabled ? undefined : onSelect}
      role="radio"
      aria-checked={isDisabled ? false : selected}
      aria-disabled={isDisabled}
      className={`relative text-left rounded-2xl p-5 transition-all duration-200 ${
        isDisabled
          ? 'opacity-50 cursor-not-allowed border border-border-solid bg-surface-solid grayscale'
          : selected
            ? 'border-2 border-primary bg-primary/[0.04]'
            : 'border border-border-solid bg-surface-solid hover:shadow-md'
      }`}
    >
      {selected && !isDisabled && (
        <div className="absolute top-3 right-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="var(--primary)" />
            <polyline
              points="6,10 9,13 14,7"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      <LogoIcon os={os} />

      <p className="mt-3 text-body font-semibold text-text-primary">
        {title}
      </p>

      <p className="mt-1 text-body-sm text-text-secondary">
        {description}
      </p>

      {isGroovy && (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium bg-text-secondary/10 text-text-secondary">
          <Lock className="h-3 w-3" /> Coming Soon
        </span>
      )}
    </button>
  );
}
