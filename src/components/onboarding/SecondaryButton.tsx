import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SecondaryButton({ children, className = '', ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-1.5
        text-[14px] font-medium tracking-[-0.01em]
        transition-colors duration-200
        ${className}
      `}
      style={{ color: 'var(--onb-warm-brown)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--onb-charcoal)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--onb-warm-brown)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
