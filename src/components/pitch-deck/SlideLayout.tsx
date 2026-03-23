import { useRef, useEffect, useState, type ReactNode } from 'react';

const SLIDE_W = 1920;
const SLIDE_H = 1080;

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function SlideLayout({ children, className = '' }: SlideLayoutProps) {
  return (
    <div className={`relative w-[1920px] h-[1080px] overflow-hidden ${className}`}>
      <div className="slide-content w-full h-full">
        {children}
      </div>
    </div>
  );
}

interface ScaledSlideProps {
  children: ReactNode;
  className?: string;
}

export function ScaledSlide({ children, className = '' }: ScaledSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / SLIDE_W, height / SLIDE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className="absolute"
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          left: '50%',
          top: '50%',
          marginLeft: -SLIDE_W / 2,
          marginTop: -SLIDE_H / 2,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
