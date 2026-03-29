import { useState, useEffect, useCallback } from 'react';

type ThemePreference = 'light' | 'dark' | 'system';

function getSystemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveIsDark(pref: ThemePreference): boolean {
  if (pref === 'system') return getSystemDark();
  return pref === 'dark';
}

export function useDarkMode() {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'system';
  });

  const [isDark, setIsDark] = useState(() => resolveIsDark(
    typeof window !== 'undefined'
      ? (localStorage.getItem('theme') as ThemePreference) || 'system'
      : 'system'
  ));

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Listen for OS preference changes (only matters when preference is 'system')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (preference === 'system') {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [preference]);

  // When preference changes, resolve and persist
  useEffect(() => {
    setIsDark(resolveIsDark(preference));
    if (preference === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', preference);
    }
  }, [preference]);

  const toggle = useCallback(() => {
    setPreference(prev => {
      const currentlyDark = resolveIsDark(prev);
      // Toggle to the opposite, as an explicit override
      return currentlyDark ? 'light' : 'dark';
    });
  }, []);

  const setSystem = useCallback(() => {
    setPreference('system');
  }, []);

  return { isDark, preference, toggle, setSystem };
}
