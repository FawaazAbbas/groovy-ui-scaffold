import { useState, useEffect } from 'react';

interface AnimatedGroovyLogoProps {
  className?: string;
}

const FULL_TEXT = 'Groovy';
const CHARS_TO_REMOVE = 5; // remove 'roovy', leaving 'G'
const INITIAL_DELAY_MS = 1500; // show full word for 1.5s before backspacing
const INTERVAL_MS = 100; // 500ms total / 5 chars

// Applied directly so we don't inherit the global .font-monoton font-size
const monotonStyle: React.CSSProperties = {
  fontFamily: '"Monoton", display',
  fontSize: '2em',
  lineHeight: 1,
};

export function AnimatedGroovyLogo({ className }: AnimatedGroovyLogoProps) {
  const [text, setText] = useState(FULL_TEXT);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      let count = 0;
      interval = setInterval(() => {
        count++;
        setText(FULL_TEXT.slice(0, FULL_TEXT.length - count));
        if (count >= CHARS_TO_REMOVE) {
          clearInterval(interval);
        }
      }, INTERVAL_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    // Wrapper is always the width of a single 'G' — layout never shifts
    <span className="relative inline-block">
      {/* Invisible G — permanently reserves the final resting space */}
      <span style={{ ...monotonStyle, visibility: 'hidden' }} aria-hidden="true">
        G
      </span>
      {/* Animated text — absolutely positioned, grows right, never pushes siblings */}
      <span
        className={className ?? ''}
        style={{
          ...monotonStyle,
          position: 'absolute',
          left: 0,
          top: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </span>
  );
}
