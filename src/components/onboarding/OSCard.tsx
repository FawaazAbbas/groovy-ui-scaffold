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

const brandColors: Record<OSChoice, string> = {
  slack: '#4A154B',
  teams: '#464EB8',
  lark: '#1456F0',
  'groovy-space': 'var(--primary)',
};

const brandLetters: Record<OSChoice, string> = {
  slack: 'S',
  teams: 'T',
  lark: 'L',
  'groovy-space': 'G',
};

export function OSCard({ os, title, description, selected, onSelect, disabled }: OSCardProps) {
  const isGroovy = os === 'groovy-space';

  return (
    <button
      onClick={disabled ? undefined : onSelect}
      role="radio"
      aria-checked={disabled ? false : selected}
      aria-disabled={disabled}
      className={`relative text-left rounded-2xl p-5 transition-all duration-200 ${
        disabled
          ? 'opacity-50 cursor-not-allowed border border-border-solid bg-surface-solid'
          : selected
            ? 'border-2 border-primary bg-primary/[0.04]'
            : 'border border-border-solid bg-surface-solid hover:shadow-md'
      }`}
    >
      {selected && !disabled && (
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

      {os === 'groovy-space' ? (
        <GroovyLogo className="h-10 w-10 text-primary" />
      ) : (
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: brandColors[os] }}
        >
          <span className="text-sm font-bold text-white">{brandLetters[os]}</span>
        </div>
      )}

      <p className="mt-3 text-body font-semibold text-text-primary">
        {title}
      </p>

      <p className="mt-1 text-body-sm text-text-secondary">
        {description}
      </p>

      {isGroovy && (
        disabled ? (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium bg-text-secondary/10 text-text-secondary">
            <Lock className="h-3 w-3" /> Coming Soon
          </span>
        ) : (
          <span className="mt-3 inline-block rounded-full px-3 py-1 text-caption font-medium bg-comfort text-primary">
            No setup needed
          </span>
        )
      )}
    </button>
  );
}
