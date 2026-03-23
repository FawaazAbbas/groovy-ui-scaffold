import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { ScaledSlide } from '@/components/pitch-deck/SlideLayout';
import { slides } from '@/components/pitch-deck/slides';

export default function PitchDeckPage() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(Math.max(0, Math.min(i, slides.length - 1)));
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'Escape' && isFullscreen) toggleFullscreen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, isFullscreen]);

  // Fullscreen API
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

  // Scroll active thumbnail into view
  useEffect(() => {
    const strip = thumbStripRef.current;
    const active = strip?.children[current] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  const SlideComponent = slides[current].component;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-full ${isFullscreen ? 'bg-[#0a0a0a]' : 'bg-transparent'}`}
    >
      {/* Main canvas */}
      <div className="flex-1 relative min-h-0">
        <ScaledSlide>
          <SlideComponent />
        </ScaledSlide>

        {/* Nav arrows */}
        {!isFullscreen && (
          <>
            <button
              onClick={prev}
              disabled={current === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 disabled:opacity-0 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={current === slides.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 disabled:opacity-0 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide counter + fullscreen toggle */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="text-xs font-mono text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-md">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-md bg-black/30 backdrop-blur-sm text-white/50 hover:text-white transition-colors flex items-center justify-center"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      {!isFullscreen && (
        <div className="shrink-0 border-t border-border bg-black/5 backdrop-blur-sm px-4 py-3">
          <div ref={thumbStripRef} className="flex gap-3 overflow-x-auto scrollbar-hide">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                className={`shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                  i === current
                    ? 'ring-2 ring-[#F5C842] ring-offset-2 ring-offset-background scale-[1.02]'
                    : 'opacity-60 hover:opacity-90'
                }`}
                style={{ width: 160, height: 90 }}
              >
                <div className="w-[1920px] h-[1080px] origin-top-left" style={{ transform: `scale(${160 / 1920})` }}>
                  <slide.component />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
