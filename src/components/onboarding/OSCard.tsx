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
  'groovy-space': '#0071E3',
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
      className="relative text-left rounded-2xl p-5 transition-all duration-200"
      style={{
        background: selected ? 'rgba(0,113,227,0.04)' : '#FFFFFF',
        border: selected ? '2px solid var(--onb-electric-neon)' : '1px solid var(--onb-parchment-dark)',
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          const el = e.currentTarget;
          el.style.transform = 'scale(1.01)';
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
          el.style.borderColor = '#86868B';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'scale(1)';
        el.style.boxShadow = 'none';
        if (!selected) el.style.borderColor = 'var(--onb-parchment-dark)';
      }}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="var(--onb-electric-neon)" />
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

      <p className="mt-3 text-[16px] font-semibold" style={{ color: 'var(--onb-charcoal)' }}>
        {title}
      </p>

      <p className="mt-1 text-[14px]" style={{ color: 'var(--onb-warm-brown)' }}>
        {description}
      </p>

      {isGroovy && (
        <span
          className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: 'var(--onb-comfort-green)',
            color: 'var(--onb-electric-neon)',
          }}
        >
          No setup needed
        </span>
      )}
    </button>
  );
}
