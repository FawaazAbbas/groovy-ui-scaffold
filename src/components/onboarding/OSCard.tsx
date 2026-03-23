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
  'groovy-space': '#39FF14',
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
      className="relative text-left rounded-2xl p-6 transition-all duration-200"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: selected ? '#FAFFF5' : '#FFFFFF',
        border: selected ? '2px solid var(--onb-electric-neon)' : '1px solid var(--onb-parchment-dark)',
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          const el = e.currentTarget;
          el.style.transform = 'scale(1.02)';
          el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
          el.style.borderColor = 'var(--onb-warm-brown)';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'scale(1)';
        el.style.boxShadow = 'none';
        if (!selected) el.style.borderColor = 'var(--onb-parchment-dark)';
      }}
    >
      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-3 right-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="var(--onb-electric-neon)" />
            <polyline
              points="6,10 9,13 14,7"
              stroke="var(--onb-charcoal)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          background: brandColors[os],
        }}
      >
        <span
          className="text-sm font-bold"
          style={{ color: isGroovy ? 'var(--onb-charcoal)' : '#FFFFFF' }}
        >
          {brandLetters[os]}
        </span>
      </div>

      {/* Title */}
      <p
        className="mt-3 text-[18px] font-medium"
        style={{ color: 'var(--onb-charcoal)' }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        className="mt-1 text-[14px]"
        style={{ color: 'var(--onb-warm-brown)' }}
      >
        {description}
      </p>

      {/* Groovy Space badge */}
      {isGroovy && (
        <span
          className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: 'var(--onb-charcoal)',
            color: 'var(--onb-electric-neon)',
          }}
        >
          No setup needed
        </span>
      )}
    </button>
  );
}
