interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isComplete = stepNum < currentStep;

        return (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              width: isActive ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: isActive
                ? 'var(--onb-electric-neon)'
                : isComplete
                  ? 'var(--onb-charcoal)'
                  : 'var(--onb-parchment-dark)',
            }}
          />
        );
      })}
    </div>
  );
}
