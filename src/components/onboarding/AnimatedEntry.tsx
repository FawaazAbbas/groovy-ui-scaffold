import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';

interface AnimatedEntryProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedEntry({ children, delay = 0, className = '' }: AnimatedEntryProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const style: CSSProperties = prefersReduced
    ? { opacity: 1 }
    : {
        opacity: 0,
        willChange: 'transform, opacity',
        animation: `onb-fade-in-up 350ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
      };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
