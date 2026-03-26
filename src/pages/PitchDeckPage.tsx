import { useState, useEffect, useCallback, useRef } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { ScaledSlide } from '@/components/pitch-deck/SlideLayout';
import { slides } from '@/components/pitch-deck/slides';

export default function PitchDeckPage() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(Math.max(0, Math.min(i, slides.length - 1)));
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'Escape' && isFullscreen) toggleFullscreen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const SlideComponent = slides[current].component;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* Slide canvas */}
      <div className="absolute inset-0">
        <ScaledSlide>
          <SlideComponent />
        </ScaledSlide>
      </div>

      {/* Invisible click zones */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full cursor-w-resize z-10"
        onClick={prev}
      />
      <div
        className="absolute right-0 top-0 w-1/2 h-full cursor-e-resize z-10"
        onClick={next}
      />

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            onMouseEnter={() => setHoveredDot(i)}
            onMouseLeave={() => setHoveredDot(null)}
            className="relative p-1 group"
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
            {hoveredDot === i && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-xl text-white/90 text-[11px] font-medium tracking-wide whitespace-nowrap">
                {slide.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-8 right-8 z-20 w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl text-white/40 hover:text-white/80 hover:bg-white/20 transition-all flex items-center justify-center"
      >
        {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
