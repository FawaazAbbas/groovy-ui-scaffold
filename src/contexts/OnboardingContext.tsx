import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { OnboardingState, OnboardingStep, OSChoice, OverlayPhase } from '@/types/onboarding';

interface OnboardingContextValue extends OnboardingState {
  nextStep: () => void;
  prevStep: () => void;
  setOSChoice: (os: OSChoice) => void;
  beginTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
}

const STORAGE_KEY = 'groovy_onboarding';

function loadState(): OnboardingState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    currentStep: 1,
    overlayPhase: 'intro',
    osChoice: null,
    tourStepIndex: 0,
    isOnboardingComplete: false,
    userName: 'Sarah',
  };
}

function saveState(state: OnboardingState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const nextStep = useCallback(() => {
    setState((s) => {
      if (s.currentStep >= 4) return s;
      return { ...s, currentStep: (s.currentStep + 1) as OnboardingStep };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((s) => {
      if (s.currentStep <= 1) return s;
      return { ...s, currentStep: (s.currentStep - 1) as OnboardingStep };
    });
  }, []);

  const setOSChoice = useCallback((os: OSChoice) => {
    setState((s) => ({ ...s, osChoice: os }));
  }, []);

  const beginTour = useCallback(() => {
    setState((s) => ({ ...s, overlayPhase: 'transitioning' as OverlayPhase }));
    setTimeout(() => {
      setState((s) => ({
        ...s,
        overlayPhase: 'tour' as OverlayPhase,
        currentStep: 5 as OnboardingStep,
        tourStepIndex: 0,
      }));
    }, 600);
  }, []);

  const nextTourStep = useCallback(() => {
    setState((s) => ({ ...s, tourStepIndex: s.tourStepIndex + 1 }));
  }, []);

  const prevTourStep = useCallback(() => {
    setState((s) => ({
      ...s,
      tourStepIndex: Math.max(0, s.tourStepIndex - 1),
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState((s) => ({
      ...s,
      overlayPhase: 'complete' as OverlayPhase,
      isOnboardingComplete: true,
    }));
  }, []);

  const skipOnboarding = useCallback(() => {
    setState((s) => ({
      ...s,
      overlayPhase: 'complete' as OverlayPhase,
      isOnboardingComplete: true,
    }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setState({
      currentStep: 1,
      overlayPhase: 'intro',
      osChoice: null,
      tourStepIndex: 0,
      isOnboardingComplete: false,
      userName: 'Sarah',
    });
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        nextStep,
        prevStep,
        setOSChoice,
        beginTour,
        nextTourStep,
        prevTourStep,
        completeOnboarding,
        skipOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
