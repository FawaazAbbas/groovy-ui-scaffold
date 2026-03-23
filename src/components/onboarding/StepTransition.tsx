import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';

interface StepTransitionProps {
  stepKey: number;
  children: ReactNode;
}

export function StepTransition({ stepKey, children }: StepTransitionProps) {
  const [displayedKey, setDisplayedKey] = useState(stepKey);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');

  useEffect(() => {
    if (stepKey === displayedKey) return;

    setPhase('exiting');

    const exitTimer = setTimeout(() => {
      setDisplayedKey(stepKey);
      setDisplayedChildren(children);
      setPhase('entering');

      const enterTimer = setTimeout(() => {
        setPhase('visible');
      }, 300);

      return () => clearTimeout(enterTimer);
    }, 300);

    return () => clearTimeout(exitTimer);
  }, [stepKey, children, displayedKey]);

  useEffect(() => {
    if (stepKey === displayedKey) {
      setDisplayedChildren(children);
    }
  }, [children, stepKey, displayedKey]);

  const transitionStyles: Record<string, CSSProperties> = {
    visible: { opacity: 1, transform: 'translateY(0)' },
    exiting: { opacity: 0, transform: 'translateY(10px)' },
    entering: { opacity: 0, transform: 'translateY(-20px)' },
  };

  return (
    <div
      style={{
        ...transitionStyles[phase],
        transition: 'opacity 300ms cubic-bezier(0.25,0.1,0.25,1), transform 300ms cubic-bezier(0.25,0.1,0.25,1)',
      }}
    >
      {displayedChildren}
    </div>
  );
}
