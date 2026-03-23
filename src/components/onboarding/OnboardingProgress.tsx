interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const isActive = i === currentStep;
        const isComplete = i < currentStep;

        return (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: isActive ? 24 : 8,
              height: 8,
              background: isActive
                ? 'var(--primary)'
                : isComplete
                  ? 'var(--text-primary)'
                  : 'var(--border-solid)',
              transition: 'width 300ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        );
      })}
    </div>
  );
}
