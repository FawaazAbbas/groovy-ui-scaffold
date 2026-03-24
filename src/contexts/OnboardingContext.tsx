import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { OnboardingState, OnboardingStepId, OSChoice, SignUpFormData } from '@/types/onboarding';

function getStepSequence(osChoice: OSChoice | null): OnboardingStepId[] {
  const common: OnboardingStepId[] = ['hey', 'intro', 'os-choice', 'pricing'];
  if (osChoice === 'groovy-space') {
    return [...common, 'workspace-setup', 'tour'];
  }
  return [...common, 'two-click', 'explore-marketplace', 'tour'];
}

interface OnboardingContextValue extends OnboardingState {
  stepSequence: OnboardingStepId[];
  currentStepIndex: number;
  totalSteps: number;
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setOSChoice: (os: OSChoice) => void;
  setSignUpData: (data: SignUpFormData) => void;
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
      // Migrate from old numeric state shape
      if ('currentStep' in parsed && !('currentStepId' in parsed)) {
        localStorage.removeItem(STORAGE_KEY);
        return defaultState();
      }
      const state = parsed as OnboardingState;
      // Reset locked OS choice from stale localStorage
      if (state.osChoice === 'groovy-space') {
        state.osChoice = null;
      }
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
    tourStepIndex: 0,
    isOnboardingComplete: false,
    userName: 'Sarah',
    signUpData: null,
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

  const stepSequence = useMemo(
    () => getStepSequence(state.osChoice),
    [state.osChoice],
  );

  const currentStepIndex = stepSequence.indexOf(state.currentStepId);
  // Don't count 'tour' in the progress dots — it's a separate phase
  const totalSteps = stepSequence.filter((s) => s !== 'tour').length;

  const startOnboarding = useCallback(() => {
    setState((s) => ({
      ...s,
      currentStepId: 'hey',
      overlayPhase: 'intro',
      osChoice: null,
      tourStepIndex: 0,
      isOnboardingComplete: false,
      signUpData: null,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((s) => {
      const seq = getStepSequence(s.osChoice);
      const idx = seq.indexOf(s.currentStepId);
      if (idx < 0 || idx >= seq.length - 1) return s;

      const nextId = seq[idx + 1];
      // If the next step is 'tour', transition to tour phase
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
      const seq = getStepSequence(s.osChoice);
      const idx = seq.indexOf(s.currentStepId);
      if (idx <= 0) return s;
      return { ...s, currentStepId: seq[idx - 1] };
    });
  }, []);

  const setOSChoice = useCallback((os: OSChoice) => {
    if (os === 'groovy-space') return; // Locked for MVP
    setState((s) => ({ ...s, osChoice: os }));
  }, []);

  const setSignUpData = useCallback((data: SignUpFormData) => {
    setState((s) => ({ ...s, signUpData: data }));
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
    setState({
      currentStepId: 'hey',
      overlayPhase: 'idle',
      osChoice: null,
      tourStepIndex: 0,
      isOnboardingComplete: false,
      userName: 'Sarah',
      signUpData: null,
    });
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
        setSignUpData,
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
