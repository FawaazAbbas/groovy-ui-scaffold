import type { OSChoice } from '@/types/onboarding';

interface OSCardProps {
  os: OSChoice;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
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

export function OSCard({ os, title, description, selected, onSelect }: OSCardProps) {
  const isGroovy = os === 'groovy-space';

  return (
    <button
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      className={`relative text-left rounded-2xl p-5 transition-all duration-200 ${
        selected
          ? 'border-2 border-primary bg-primary/[0.04]'
          : 'border border-border-solid bg-surface-solid hover:shadow-md'
      }`}
    >
      {selected && (
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

      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: brandColors[os] }}
      >
        <span className="text-sm font-bold text-white">{brandLetters[os]}</span>
      </div>

      <p className="mt-3 text-body font-semibold text-text-primary">
        {title}
      </p>

      <p className="mt-1 text-body-sm text-text-secondary">
        {description}
      </p>

      {isGroovy && (
        <span className="mt-3 inline-block rounded-full px-3 py-1 text-caption font-medium bg-comfort text-electric-bright">
          No setup needed
        </span>
      )}
    </button>
  );
}
