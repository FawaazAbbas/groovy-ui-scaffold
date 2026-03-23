import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getTourSteps } from '@/lib/onboarding-config';
import { SpotlightTooltip } from './SpotlightTooltip';

type TourPhase = 'visible' | 'navigating' | 'waiting-for-target';

export function GuidedSpotlight() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourStepIndex, osChoice, nextTourStep, prevTourStep, completeOnboarding } = useOnboarding();

  const [tourPhase, setTourPhase] = useState<TourPhase>('waiting-for-target');
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Use ref for nextTourStep to avoid re-creating pollForTarget
  const nextTourStepRef = useRef(nextTourStep);
  nextTourStepRef.current = nextTourStep;

  const tourSteps = getTourSteps(osChoice);
  const step = tourSteps[tourStepIndex] ?? null;

  const pollForTarget = useCallback(
    (targetId: string | null) => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (targetId === null) {
        setTargetRect(null);
        setTourPhase('visible');
        return;
      }

      let attempts = 0;
      pollRef.current = setInterval(() => {
        attempts++;
        const el = document.querySelector(`[data-tour="${targetId}"]`);
        if (el) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          setTargetRect(el.getBoundingClientRect());
          setTourPhase('visible');
        } else if (attempts >= 50) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          // Skip this step if target never appears
          nextTourStepRef.current();
        }
      }, 100);
    },
    [] // no dependencies — uses ref for nextTourStep
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
    pollForTarget(step.targetId);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [step, location.pathname, pollForTarget, navigate]);

  // Update rect on scroll/resize
  useEffect(() => {
    if (tourPhase !== 'visible' || !step?.targetId) return;
    const update = () => {
      const el = document.querySelector(`[data-tour="${step.targetId}"]`);
      if (el) setTargetRect(el.getBoundingClientRect());
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [tourPhase, step]);

  useEffect(
    () => () => {
      if (pollRef.current) clearInterval(pollRef.current);
    },
    []
  );

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

  // Loading state
  if (tourPhase !== 'visible') {
    return <div className="fixed inset-0 z-[9998] bg-black/40 transition-opacity duration-300" />;
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

  // Spotlight cutout
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
              style={{ transition: 'all 400ms cubic-bezier(0.25,0.1,0.25,1)' }}
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
