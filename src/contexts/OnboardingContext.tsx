import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { OnboardingState, OnboardingStepId, OSChoice } from '@/types/onboarding';

function getStepSequence(): OnboardingStepId[] {
  return ['hey', 'value-props', 'pricing', 'sign-up', 'workspace-setup', 'os-choice', 'connect-integration', 'tour'];
}

interface OnboardingContextValue extends OnboardingState {
  stepSequence: OnboardingStepId[];
  currentStepIndex: number;
  totalSteps: number;
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setOSChoice: (os: OSChoice) => void;
  setSelectedPlan: (planId: string) => void;
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
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate from old state shapes
      if ('currentStep' in parsed && !('currentStepId' in parsed)) {
        localStorage.removeItem(STORAGE_KEY);
        return defaultState();
      }
      // Migrate from old step IDs
      if (parsed.currentStepId === 'intro' || parsed.currentStepId === 'two-click' || parsed.currentStepId === 'explore-marketplace') {
        localStorage.removeItem(STORAGE_KEY);
        return defaultState();
      }
      const state = parsed as OnboardingState;
      if (state.isOnboardingComplete) {
        return { ...state, overlayPhase: 'complete' };
      }
      return state;
    }
  } catch { /* ignore */ }
  return defaultState();
}

function defaultState(): OnboardingState {
  return {
    currentStepId: 'hey',
    overlayPhase: 'idle',
    osChoice: null,
    selectedPlanId: 'growth',
    tourStepIndex: 0,
    isOnboardingComplete: false,
  };
}

function saveState(state: OnboardingState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const stepSequence = useMemo(() => getStepSequence(), []);

  const currentStepIndex = stepSequence.indexOf(state.currentStepId);
  // Don't count 'hey' or 'tour' in the progress dots
  const totalSteps = stepSequence.filter((s) => s !== 'hey' && s !== 'tour').length;

  const startOnboarding = useCallback(() => {
    setState((s) => ({
      ...s,
      currentStepId: 'hey',
      overlayPhase: 'intro',
      osChoice: null,
      selectedPlanId: 'growth',
      tourStepIndex: 0,
      isOnboardingComplete: false,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((s) => {
      const seq = getStepSequence();
      const idx = seq.indexOf(s.currentStepId);
      if (idx < 0 || idx >= seq.length - 1) return s;

      const nextId = seq[idx + 1];
      if (nextId === 'tour') {
        return {
          ...s,
          currentStepId: 'tour',
          overlayPhase: 'tour',
          tourStepIndex: 0,
        };
      }
      return { ...s, currentStepId: nextId };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((s) => {
      const seq = getStepSequence();
      const idx = seq.indexOf(s.currentStepId);
      if (idx <= 0) return s;
      return { ...s, currentStepId: seq[idx - 1] };
    });
  }, []);

  const setOSChoice = useCallback((os: OSChoice) => {
    setState((s) => ({ ...s, osChoice: os }));
  }, []);

  const setSelectedPlan = useCallback((planId: string) => {
    setState((s) => ({ ...s, selectedPlanId: planId }));
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
      overlayPhase: 'complete',
      isOnboardingComplete: true,
    }));
  }, []);

  const skipOnboarding = useCallback(() => {
    setState((s) => ({
      ...s,
      overlayPhase: 'complete',
      isOnboardingComplete: true,
    }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setState(defaultState());
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        stepSequence,
        currentStepIndex,
        totalSteps,
        startOnboarding,
        nextStep,
        prevStep,
        setOSChoice,
        setSelectedPlan,
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
