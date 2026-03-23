import { useRef, useEffect, useState } from 'react';
import type { TourStep } from '@/types/onboarding';

interface SpotlightTooltipProps {
  step: TourStep;
  index: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  isFirst: boolean;
  mode: 'center' | 'positioned';
  anchorRect?: DOMRect;
}

function calcPosition(
  anchor: DOMRect,
  preferred: string,
  tw: number,
  th: number,
  vw: number,
  vh: number,
  gap = 16
) {
  const pos: Record<string, { top: number; left: number }> = {
    bottom: { top: anchor.bottom + gap, left: anchor.left + anchor.width / 2 - tw / 2 },
    top: { top: anchor.top - gap - th, left: anchor.left + anchor.width / 2 - tw / 2 },
    right: { top: anchor.top + anchor.height / 2 - th / 2, left: anchor.right + gap },
    left: { top: anchor.top + anchor.height / 2 - th / 2, left: anchor.left - gap - tw },
  };
  for (const p of [preferred, 'bottom', 'right', 'top', 'left']) {
    const c = pos[p];
    if (c && c.left >= 8 && c.left + tw <= vw - 8 && c.top >= 8 && c.top + th <= vh - 8) return c;
  }
  return {
    top: Math.min(anchor.bottom + gap, vh - th - 8),
    left: Math.max(8, Math.min(anchor.left, vw - tw - 8)),
  };
}

function TooltipBody({
  step,
  index,
  total,
  onNext,
  onBack,
  onSkip,
  isFirst,
}: Omit<SpotlightTooltipProps, 'mode' | 'anchorRect'>) {
  return (
    <div>
      <p className="text-caption font-semibold text-electric" style={{ letterSpacing: '0.05em' }}>
        {index + 1} of {total}
      </p>
      <h3 className="mt-1 text-body font-semibold tracking-tight text-text-primary">
        {step.title}
      </h3>
      <p className="mt-1.5 text-body-sm leading-relaxed text-text-secondary">
        {step.description}
      </p>
      <div className="flex items-center gap-3 mt-4">
        {!isFirst && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-body-sm font-semibold text-white transition-all duration-200"
          style={{
            background: 'var(--primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
          }}
        >
          {step.isFinal ? "Let's go!" : 'Next →'}
        </button>
      </div>
      <button
        onClick={onSkip}
        className="mt-3 text-caption text-text-secondary hover:text-text-primary transition-colors duration-200"
      >
        Skip tour
      </button>
    </div>
  );
}

export function SpotlightTooltip({
  step,
  index,
  total,
  onNext,
  onBack,
  onSkip,
  isFirst,
  mode,
  anchorRect,
}: SpotlightTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (mode !== 'positioned' || !anchorRect || !ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    setPos(
      calcPosition(anchorRect, step.position, rect.width, rect.height, window.innerWidth, window.innerHeight)
    );
  }, [anchorRect, step.position, mode, isMobile]);

  const tooltipStyle = {
    background: 'var(--surface-solid)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--border-solid)',
  };

  const bodyProps = { step, index, total, onNext, onBack, onSkip, isFirst };

  // Mobile bottom sheet
  if (isMobile && mode === 'positioned') {
    return (
      <div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-[10000] rounded-t-2xl p-5 pb-8"
        style={{ ...tooltipStyle, borderRadius: '16px 16px 0 0' }}
      >
        <TooltipBody {...bodyProps} />
      </div>
    );
  }

  // Center mode
  if (mode === 'center') {
    return (
      <div ref={ref} className="w-[360px] p-6" style={tooltipStyle}>
        <TooltipBody {...bodyProps} />
      </div>
    );
  }

  // Positioned mode
  return (
    <div
      ref={ref}
      className="fixed z-[10001] w-[320px] p-5"
      style={{
        ...tooltipStyle,
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        transition: 'top 400ms cubic-bezier(0.25,0.1,0.25,1), left 400ms cubic-bezier(0.25,0.1,0.25,1)',
      }}
    >
      <TooltipBody {...bodyProps} />
    </div>
  );
}
