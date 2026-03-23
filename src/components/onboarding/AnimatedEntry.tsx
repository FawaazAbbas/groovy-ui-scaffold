import { type ReactNode, type CSSProperties } from 'react';

interface AnimatedEntryProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedEntry({ children, delay = 0, className = '' }: AnimatedEntryProps) {
  const style: CSSProperties = {
    opacity: 0,
    animation: `onb-fade-in-up 400ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms forwards`,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
