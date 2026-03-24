import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { mockIntegrations } from '@/lib/mocks/integrations';
import type { Agent } from '@/lib/mocks/agents';

interface AgentSetupWizardProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInstallComplete: (agentId: string) => void;
}

export function AgentSetupWizard({ agent, open, onOpenChange, onInstallComplete }: AgentSetupWizardProps) {
  const navigate = useNavigate();
  const hasIntegrations = agent.requiredIntegrations.length > 0;
  const [step, setStep] = useState<'integrations' | 'ready'>(hasIntegrations ? 'integrations' : 'ready');
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [localConnected, setLocalConnected] = useState<Set<string>>(new Set());
  const [showCheck, setShowCheck] = useState(false);

  // Animate checkmark on ready step
  useEffect(() => {
    if (step === 'ready') {
      const t = setTimeout(() => setShowCheck(true), 100);
      return () => clearTimeout(t);
    }
    setShowCheck(false);
  }, [step]);

  const requiredIntegrations = agent.requiredIntegrations.map(id =>
    mockIntegrations.find(i => i.id === id)
  ).filter(Boolean) as typeof mockIntegrations;

  const connectedCount = requiredIntegrations.filter(
    i => i.connected || localConnected.has(i.id)
  ).length;

  const handleConnect = (integrationId: string) => {
    setConnectingId(integrationId);
    setTimeout(() => {
      setLocalConnected(prev => new Set(prev).add(integrationId));
      setConnectingId(null);
    }, 800);
  };

  const handleContinue = () => {
    setStep('ready');
  };

  const handleStartChatting = () => {
    onInstallComplete(agent.id);
    onOpenChange(false);
    navigate(`/space/chats?agent=${agent.id}`);
  };

  const handleSkip = () => {
    onInstallComplete(agent.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 gap-0 overflow-hidden rounded-2xl border-border bg-background">
        <DialogTitle className="sr-only">
          {step === 'integrations' ? `Setting up ${agent.name}` : `${agent.name} is ready`}
        </DialogTitle>

        {step === 'integrations' ? (
          <div className="p-6">
            {/* Agent header */}
            <div className="flex items-start gap-3 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-electric-muted text-electric-bright font-bold text-lg font-mono">
                {agent.name[0]}
              </div>
              <div className="min-w-0">
                <h3 className="text-body font-semibold text-text-primary">{agent.name}</h3>
                <p className="text-body-sm text-text-secondary mt-0.5">{agent.description}</p>
              </div>
            </div>

            {/* Integration list */}
            <div className="mb-6">
              <p className="text-body-sm font-medium text-text-primary mb-3">Required Integrations</p>
              <div className="space-y-2">
                {requiredIntegrations.map(integration => {
                  const isConnected = integration.connected || localConnected.has(integration.id);
                  const isConnecting = connectingId === integration.id;

                  return (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-white/40 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          isConnected ? 'bg-success/10 text-success' : 'bg-surface-elevated text-text-secondary'
                        }`}>
                          {isConnected ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span className="text-body-sm font-medium">{integration.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-body-sm font-medium text-text-primary">{integration.name}</p>
                        </div>
                      </div>

                      {isConnected ? (
                        <span className="text-caption font-medium text-success">Connected</span>
                      ) : isConnecting ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <button
                          onClick={() => handleConnect(integration.id)}
                          className="rounded-lg bg-primary px-3 py-1.5 text-caption font-medium text-white hover:bg-primary-hover transition-colors"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleContinue}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-body-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Continue
            </button>
            <button
              onClick={handleSkip}
              className="mt-3 w-full text-center text-caption text-text-secondary hover:text-text-primary transition-colors"
            >
              Skip for now
            </button>
          </div>
        ) : (
          <div className="p-6 text-center">
            {/* Animated checkmark */}
            <div className="flex justify-center mb-5">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 transition-all duration-500 ease-out"
                style={{
                  transform: showCheck ? 'scale(1)' : 'scale(0.5)',
                  opacity: showCheck ? 1 : 0,
                }}
              >
                <Check className="h-8 w-8 text-success" strokeWidth={2.5} />
              </div>
            </div>

            <h3 className="text-heading-sm font-semibold text-text-primary mb-2">
              {agent.name} is ready
            </h3>

            {hasIntegrations && (
              <p className="text-body-sm text-text-secondary mb-1">
                Connected to {connectedCount} integration{connectedCount !== 1 ? 's' : ''}
              </p>
            )}

            <p className="text-body-sm text-text-secondary mb-6">
              {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} credits per use`}
            </p>

            <button
              onClick={handleStartChatting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-body-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Start chatting &rarr;
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
