import { useState } from 'react';
import { MarketplaceContent } from '@/components/marketplace/MarketplaceContent';

export default function WorkspaceMarketplacePage() {
  const [installedAgents, setInstalledAgents] = useState<Set<string>>(new Set());

  const handleInstall = (agentId: string) => {
    setInstalledAgents(prev => new Set(prev).add(agentId));
  };

  return (
    <MarketplaceContent
      variant="workspace"
      onInstall={handleInstall}
      installedAgents={installedAgents}
    />
  );
}
