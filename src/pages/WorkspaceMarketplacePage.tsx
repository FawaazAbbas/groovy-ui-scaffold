import { useState } from 'react';
import { MarketplaceContent } from '@/components/marketplace/MarketplaceContent';
import { AgentSetupWizard } from '@/components/marketplace/AgentSetupWizard';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { type Agent } from '@/lib/mocks/agents';
import { useAgents } from '@/hooks/use-agents';

export default function WorkspaceMarketplacePage() {
  const [installedAgents, setInstalledAgents] = useState<Set<string>>(new Set());
  const [wizardAgent, setWizardAgent] = useState<Agent | null>(null);
  const { overlayPhase } = useOnboarding();
  const { agents } = useAgents();

  const handleInstallClick = (agentId: string) => {
    if (overlayPhase === 'tour') {
      // During tour, install directly — wizard would conflict with spotlight overlay
      setInstalledAgents(prev => new Set(prev).add(agentId));
    } else {
      const agent = agents.find(a => a.id === agentId);
      if (agent) setWizardAgent(agent);
    }
  };

  const handleInstallComplete = (agentId: string) => {
    setInstalledAgents(prev => new Set(prev).add(agentId));
    setWizardAgent(null);
  };

  return (
    <>
      <MarketplaceContent
        variant="workspace"
        onInstall={handleInstallClick}
        installedAgents={installedAgents}
      />
      {wizardAgent && (
        <AgentSetupWizard
          agent={wizardAgent}
          open={!!wizardAgent}
          onOpenChange={(open) => { if (!open) setWizardAgent(null); }}
          onInstallComplete={handleInstallComplete}
        />
      )}
    </>
  );
}
