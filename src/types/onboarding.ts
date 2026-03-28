export type OSChoice = 'slack' | 'teams' | 'lark' | 'groovy-space';

export type OnboardingStepId =
  | 'hey'
  | 'value-props'
  | 'pricing'
  | 'sign-up'
  | 'workspace-setup'
  | 'os-choice'
  | 'connect-integration'
  | 'tour';

export type OverlayPhase = 'idle' | 'intro' | 'transitioning' | 'tour' | 'complete';

export interface OnboardingState {
  currentStepId: OnboardingStepId;
  overlayPhase: OverlayPhase;
  osChoice: OSChoice | null;
  selectedPlanId: string;
  tourStepIndex: number;
  isOnboardingComplete: boolean;
}

export interface TourStep {
  id: string;
  targetId: string | null;
  title: string;
  description: string;
  instruction?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  page: string;
  isFinal?: boolean;
  passthrough?: boolean;
  showContinue?: boolean;
}
