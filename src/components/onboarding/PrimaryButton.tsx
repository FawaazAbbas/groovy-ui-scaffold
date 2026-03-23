import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, disabled, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5
        text-[16px] font-medium tracking-[0.01em]
        transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: disabled ? 'var(--onb-charcoal)' : 'var(--onb-charcoal)',
        color: 'var(--onb-parchment)',
        boxShadow: disabled ? 'none' : '0 2px 8px rgba(0,0,0,0.12)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 4px 16px rgba(57, 255, 20, 0.2), 0 2px 8px rgba(0,0,0,0.12)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
