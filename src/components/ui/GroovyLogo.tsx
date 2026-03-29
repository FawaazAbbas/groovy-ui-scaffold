interface GroovyLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function GroovyLogo({ className, style }: GroovyLogoProps) {
  return (
    <span
      className={`font-monoton text-inherit ${className || ''}`}
      style={style}
    >
      G
    </span>
  );
}
