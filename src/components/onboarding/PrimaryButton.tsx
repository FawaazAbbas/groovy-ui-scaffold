import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, disabled, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5
        text-[16px] font-semibold tracking-[-0.01em]
        transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        background: disabled ? '#86868B' : 'var(--onb-electric-neon)',
        color: '#FFFFFF',
        boxShadow: disabled ? 'none' : '0 2px 12px rgba(0,113,227,0.3)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.background = '#0077ED';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,113,227,0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.background = 'var(--onb-electric-neon)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,113,227,0.3)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
