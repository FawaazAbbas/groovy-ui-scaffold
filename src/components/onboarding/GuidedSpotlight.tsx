import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getTourSteps } from '@/lib/onboarding-config';
import { SpotlightTooltip } from './SpotlightTooltip';

type TourPhase = 'visible' | 'navigating' | 'waiting-for-target';

const SPOTLIGHT_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const TIMEOUT_MS = 5000;

export function GuidedSpotlight() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourStepIndex, osChoice, nextTourStep, prevTourStep, completeOnboarding } = useOnboarding();

  const [tourPhase, setTourPhase] = useState<TourPhase>('waiting-for-target');
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);
  const nextTourStepRef = useRef(nextTourStep);
  nextTourStepRef.current = nextTourStep;

  const tourSteps = useMemo(() => getTourSteps(osChoice), [osChoice]);
  const step = tourSteps[tourStepIndex] ?? null;
  const stepId = step?.id ?? null;

  // Clean up all observers
  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  // Watch target element for size/position changes
  const watchTarget = useCallback((el: Element) => {
    // ResizeObserver for element size changes
    resizeObserverRef.current = new ResizeObserver(() => {
      rafRef.current = requestAnimationFrame(() => {
        setTargetRect(el.getBoundingClientRect());
      });
    });
    resizeObserverRef.current.observe(el);
  }, []);

  // Find target using MutationObserver instead of polling
  const findTarget = useCallback(
    (targetId: string | null) => {
      cleanup();

      if (targetId === null) {
        setTargetRect(null);
        setTourPhase('visible');
        return;
      }

      // Try immediately first
      const existing = document.querySelector(`[data-tour="${targetId}"]`);
      if (existing) {
        setTargetRect(existing.getBoundingClientRect());
        setTourPhase('visible');
        watchTarget(existing);
        return;
      }

      // Watch for DOM mutations
      observerRef.current = new MutationObserver(() => {
        rafRef.current = requestAnimationFrame(() => {
          const el = document.querySelector(`[data-tour="${targetId}"]`);
          if (el) {
            cleanup();
            setTargetRect(el.getBoundingClientRect());
            setTourPhase('visible');
            watchTarget(el);
          }
        });
      });

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // 5s timeout fallback — skip step if element never appears
      timeoutRef.current = setTimeout(() => {
        cleanup();
        nextTourStepRef.current();
      }, TIMEOUT_MS);
    },
    [cleanup, watchTarget],
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

  // Passive scroll listener with rAF throttle for position updates
  useEffect(() => {
    if (tourPhase !== 'visible' || !step?.targetId) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = document.querySelector(`[data-tour="${step.targetId}"]`);
        if (el) setTargetRect(el.getBoundingClientRect());
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tourPhase, stepId]);

  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  if (!step) return null;

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

  // Final step — centred modal
  if (step.targetId === null) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
        <SpotlightTooltip
          step={step}
          index={tourStepIndex}
          total={tourSteps.length}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={completeOnboarding}
          isFirst={tourStepIndex === 0}
          mode="center"
        />
      </div>
    );
  }

  // Spotlight cutout — animate via transform on SVG for GPU compositing
  const P = 8;
  const R = 12;
  const sx = (targetRect?.left ?? 0) - P;
  const sy = (targetRect?.top ?? 0) - P;
  const sw = (targetRect?.width ?? 0) + P * 2;
  const sh = (targetRect?.height ?? 0) + P * 2;

  return (
    <div className="fixed inset-0 z-[9999]" aria-modal="true" role="dialog">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={sx}
              y={sy}
              width={sw}
              height={sh}
              rx={R}
              fill="black"
              style={{
                transition: `x 350ms ${SPOTLIGHT_EASING}, y 350ms ${SPOTLIGHT_EASING}, width 350ms ${SPOTLIGHT_EASING}, height 350ms ${SPOTLIGHT_EASING}`,
              }}
            />
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
      <SpotlightTooltip
        step={step}
        index={tourStepIndex}
        total={tourSteps.length}
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
