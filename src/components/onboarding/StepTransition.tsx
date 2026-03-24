import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

interface StepTransitionProps {
  stepKey: string;
  children: ReactNode;
}

const ENTER_DURATION = 250;
const EXIT_DURATION = 200;
const ENTER_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EXIT_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const FALLBACK_TIMEOUT = 500;

export function StepTransition({ stepKey, children }: StepTransitionProps) {
  const childrenRef = useRef(children);
  childrenRef.current = children;

  const [displayed, setDisplayed] = useState({ key: stepKey, children });
  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<{ key: string; children: ReactNode } | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFallback = useCallback(() => {
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  }, []);

  const handleAnimationEnd = useCallback(() => {
    clearFallback();
    if (phase === 'exiting' && pendingRef.current) {
      setDisplayed(pendingRef.current);
      pendingRef.current = null;
      setPhase('entering');
    } else if (phase === 'entering') {
      setPhase('idle');
      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
      }
    }
  }, [phase, clearFallback]);

  // Start fallback timer whenever phase changes to an animated state
  useEffect(() => {
    if (phase === 'exiting' || phase === 'entering') {
      clearFallback();
      fallbackRef.current = setTimeout(handleAnimationEnd, FALLBACK_TIMEOUT);
    }
    return clearFallback;
  }, [phase, handleAnimationEnd, clearFallback]);

  // Only react to stepKey changes — NOT children
  useEffect(() => {
    if (stepKey === displayed.key) {
      // Same step — update children in place without animation
      setDisplayed((d) => ({ ...d, children: childrenRef.current }));
      return;
    }

    // New step — begin exit
    pendingRef.current = { key: stepKey, children: childrenRef.current };
    if (containerRef.current) {
      containerRef.current.style.willChange = 'transform, opacity';
    }
    setPhase('exiting');
  }, [stepKey, displayed.key]);

  const animationStyle = (() => {
    switch (phase) {
      case 'exiting':
        return {
          animation: `onb-fade-out-down ${EXIT_DURATION}ms ${EXIT_EASING} forwards`,
        };
      case 'entering':
        return {
          animation: `onb-fade-in-up ${ENTER_DURATION}ms ${ENTER_EASING} forwards`,
        };
      default:
        return { opacity: 1, transform: 'translate3d(0, 0, 0)' };
    }
  })();

  return (
    <div
      ref={containerRef}
      onAnimationEnd={handleAnimationEnd}
      style={animationStyle}
    >
      {displayed.children}
    </div>
  );
}
