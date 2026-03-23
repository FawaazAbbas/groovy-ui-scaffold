import type { OSChoice } from '@/types/onboarding';

interface PlatformMockupProps {
  osChoice: OSChoice;
  className?: string;
}

function RobotFace({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="var(--primary)" />
      <circle cx="11" cy="14" r="2" fill="#FFFFFF" />
      <circle cx="21" cy="14" r="2" fill="#FFFFFF" />
      <line x1="11" y1="20" x2="21" y2="20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WindowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[480px] mx-auto overflow-hidden rounded-2xl border border-border-solid"
      style={{ boxShadow: 'var(--shadow-lg)', background: 'var(--surface-solid)' }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-solid" style={{ background: 'var(--background)' }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
        </div>
      </div>
      {children}
    </div>
  );
}

function SlackMockup() {
  return (
    <WindowFrame>
      <div className="flex">
        <div className="w-12 flex flex-col items-center gap-2 py-3" style={{ background: '#4A154B' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start gap-2.5">
            <RobotFace size={32} />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-body-sm font-semibold text-text-primary">Groovy Agent</span>
                <span className="text-caption text-text-secondary">2:34 PM</span>
              </div>
              <p className="text-body-sm mt-1 text-text-primary">
                Your Q1 ad spend report is ready. ROAS improved 23% vs last quarter.
              </p>
              <div className="inline-block mt-2 rounded-lg px-3 py-1.5 text-caption font-medium bg-primary/10 text-primary">
                📊 View Report
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function TeamsMockup() {
  return (
    <WindowFrame>
      <div className="p-4">
        <div className="rounded-xl p-4 border border-border-solid">
          <div className="flex items-start gap-2.5">
            <RobotFace size={28} />
            <div className="flex-1">
              <span className="text-body-sm font-semibold text-text-primary">Groovy Agent</span>
              <p className="text-body-sm mt-1 text-text-primary">
                Your Q1 ad spend report is ready. ROAS improved 23% vs last quarter.
              </p>
              <span className="text-caption mt-2 inline-block font-medium text-primary">
                View Report →
              </span>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function LarkMockup() {
  return (
    <WindowFrame>
      <div className="p-4">
        <div className="flex items-start gap-2.5">
          <RobotFace size={28} />
          <div className="flex-1">
            <span className="text-caption font-medium text-text-secondary">Groovy Agent</span>
            <div className="mt-1 rounded-2xl rounded-tl-sm p-3 bg-background">
              <p className="text-body-sm text-text-primary">
                Your Q1 ad spend report is ready. ROAS improved 23% vs last quarter.
              </p>
            </div>
            <div className="inline-block mt-2 rounded-lg px-3 py-1.5 text-caption font-medium bg-primary/10 text-primary">
              📊 View Report
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export function PlatformMockup({ osChoice, className = '' }: PlatformMockupProps) {
  return (
    <div className={className}>
      {osChoice === 'slack' && <SlackMockup />}
      {osChoice === 'teams' && <TeamsMockup />}
      {osChoice === 'lark' && <LarkMockup />}
    </div>
  );
}
