import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getTourSteps } from '@/lib/onboarding-config';
import { SpotlightTooltip } from './SpotlightTooltip';

type TourPhase = 'visible' | 'navigating' | 'waiting-for-target';

const SPOTLIGHT_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MAX_POLL_FRAMES = 60; // ~1 second at 60fps

function rectsEqual(a: DOMRect | null, b: DOMRect | null, threshold = 1): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    Math.abs(a.top - b.top) < threshold &&
    Math.abs(a.left - b.left) < threshold &&
    Math.abs(a.width - b.width) < threshold &&
    Math.abs(a.height - b.height) < threshold
  );
}

export function GuidedSpotlight() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourStepIndex, osChoice, nextTourStep, prevTourStep, completeOnboarding } = useOnboarding();

  const [tourPhase, setTourPhase] = useState<TourPhase>('waiting-for-target');
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const lastRectRef = useRef<DOMRect | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number>(0);
  const pollCountRef = useRef(0);
  const nextTourStepRef = useRef(nextTourStep);
  nextTourStepRef.current = nextTourStep;

  // Lock tour steps at mount so they don't change mid-tour
  const tourSteps = useMemo(() => getTourSteps(osChoice), [osChoice]);
  const tourStepsRef = useRef(tourSteps);
  // Only update ref if osChoice actually changes (shouldn't during tour)
  tourStepsRef.current = tourSteps;

  const step = tourSteps[tourStepIndex] ?? null;
  const stepId = step?.id ?? null;

  // Memoized rect updater — only sets state if rect actually changed
  const updateRect = useCallback((el: Element) => {
    const rect = el.getBoundingClientRect();
    if (!rectsEqual(rect, lastRectRef.current)) {
      lastRectRef.current = rect;
      setTargetRect(rect);
    }
  }, []);

  // Clean up observers and polling
  const cleanup = useCallback(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    pollCountRef.current = 0;
  }, []);

  // Watch target element for size changes via ResizeObserver
  const watchTarget = useCallback((el: Element) => {
    resizeObserverRef.current = new ResizeObserver(() => {
      rafRef.current = requestAnimationFrame(() => updateRect(el));
    });
    resizeObserverRef.current.observe(el);
  }, [updateRect]);

  // Find target via rAF polling (max 60 frames ≈ 1sec)
  const findTarget = useCallback(
    (targetId: string | null) => {
      cleanup();

      if (targetId === null) {
        lastRectRef.current = null;
        setTargetRect(null);
        setTourPhase('visible');
        return;
      }

      // Try immediately
      const existing = document.querySelector(`[data-tour="${targetId}"]`);
      if (existing) {
        updateRect(existing);
        setTourPhase('visible');
        watchTarget(existing);
        return;
      }

      // rAF polling loop — capped at MAX_POLL_FRAMES
      pollCountRef.current = 0;
      const poll = () => {
        pollCountRef.current++;
        const el = document.querySelector(`[data-tour="${targetId}"]`);
        if (el) {
          updateRect(el);
          setTourPhase('visible');
          watchTarget(el);
          return;
        }
        if (pollCountRef.current >= MAX_POLL_FRAMES) {
          // Element never appeared — skip to next step
          nextTourStepRef.current();
          return;
        }
        rafRef.current = requestAnimationFrame(poll);
      };
      rafRef.current = requestAnimationFrame(poll);
    },
    [cleanup, watchTarget, updateRect],
  );

  // React to step/pathname changes
  useEffect(() => {
    if (!step) return;
    if (step.page !== location.pathname) {
      setTourPhase('navigating');
      navigate(step.page);
      return;
    }
    setTourPhase('waiting-for-target');
    findTarget(step.targetId);
    return cleanup;
  }, [stepId, location.pathname, findTarget, navigate, cleanup]);

  // Passive scroll listener with rAF throttle
  useEffect(() => {
    if (tourPhase !== 'visible' || !step?.targetId) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = document.querySelector(`[data-tour="${step.targetId}"]`);
        if (el) updateRect(el);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tourPhase, stepId, updateRect]);

  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  if (!step) return null;

  const totalSteps = tourStepsRef.current.length;

  const handleNext = () => {
    if (step.isFinal) {
      completeOnboarding();
      return;
    }
    nextTourStep();
    const next = tourSteps[tourStepIndex + 1];
    if (next && next.page !== location.pathname) {
      setTourPhase('navigating');
      navigate(next.page);
    }
  };

  const handleBack = () => {
    if (tourStepIndex === 0) return;
    prevTourStep();
    const prev = tourSteps[tourStepIndex - 1];
    if (prev && prev.page !== location.pathname) {
      setTourPhase('navigating');
      navigate(prev.page);
    }
  };

  // Loading/navigating state
  if (tourPhase !== 'visible') {
    return (
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          animation: 'onb-fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      />
    );
  }

  // Final step — centred modal (no spotlight cutout)
  if (step.targetId === null) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
        <SpotlightTooltip
          step={step}
          index={tourStepIndex}
          total={totalSteps}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={completeOnboarding}
          isFirst={tourStepIndex === 0}
          mode="center"
        />
      </div>
    );
  }

  // Spotlight cutout — use transform for GPU compositing
  const P = 8;
  const R = 12;
  const cx = (targetRect?.left ?? 0) - P;
  const cy = (targetRect?.top ?? 0) - P;
  const cw = (targetRect?.width ?? 0) + P * 2;
  const ch = (targetRect?.height ?? 0) + P * 2;

  const cutoutStyle = {
    position: 'fixed' as const,
    top: cy,
    left: cx,
    width: cw,
    height: ch,
    borderRadius: R,
  };

  return (
    <div className="fixed inset-0 z-[9999]" aria-modal="true" role="dialog">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <g
              className="tour-spotlight-cutout"
              style={{ transform: `translate3d(${cx}px, ${cy}px, 0)` }}
            >
              <rect
                width={cw}
                height={ch}
                rx={R}
                fill="black"
                style={{
                  transition: `width 350ms ${SPOTLIGHT_EASING}, height 350ms ${SPOTLIGHT_EASING}`,
                }}
              />
            </g>
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.4)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: 'all' }}
        />
      </svg>

      {/* Pulsing ring — signals "this is clickable" */}
      <div className="tour-pulse-ring" style={{ ...cutoutStyle, zIndex: 10001, pointerEvents: 'none' }} />

      {/* Transparent click-capture zone — intercepts clicks on the highlighted element */}
      <div
        className="tour-click-zone"
        style={{ ...cutoutStyle, zIndex: 10002, cursor: 'pointer' }}
        onClick={handleNext}
        aria-label="Click to continue tour"
      />

      <SpotlightTooltip
        step={step}
        index={tourStepIndex}
        total={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        onSkip={completeOnboarding}
        isFirst={tourStepIndex === 0}
        mode="positioned"
        anchorRect={targetRect!}
      />
    </div>
  );
}
