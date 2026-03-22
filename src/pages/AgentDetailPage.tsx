import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, ArrowLeft, Check, MessageSquare as Slack, Users, Zap } from 'lucide-react';
import { mockAgents } from '@/lib/mocks/agents';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function AgentDetailPage() {
  const { agentId } = useParams();
  const agent = mockAgents.find(a => a.id === agentId);
  const [activeTab, setActiveTab] = useState('overview');
  const [installOpen, setInstallOpen] = useState(false);
  const [installStep, setInstallStep] = useState<'target' | 'confirm' | 'success'>('target');
  const [selectedTarget, setSelectedTarget] = useState('');

  if (!agent) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-text-secondary">Agent not found.</p>
        <Link to="/marketplace" className="text-primary hover:underline mt-2 inline-block">Back to Marketplace</Link>
      </div>
    );
  }

  const tabs = ['Overview', 'Capabilities', 'Reviews', 'Changelog'];
  const targets = [
    { id: 'slack', label: 'Slack', icon: Slack },
    { id: 'teams', label: 'Microsoft Teams', icon: Users },
    { id: 'groovy', label: 'Groovy Workspace', icon: Zap },
  ];

  const handleInstall = () => {
    setInstallStep('target');
    setSelectedTarget('');
    setInstallOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-border glass">
        <div className="container mx-auto px-6 py-8">
          <Link to="/marketplace" className="inline-flex items-center gap-1 text-body-sm text-text-secondary hover:text-text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Link>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-electric-muted text-electric-bright text-2xl font-bold">
              {agent.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-display-sm text-text-primary">{agent.name}</h1>
                  <p className="text-body text-text-secondary mt-1">by {agent.publisher}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="rounded-full bg-white/50 px-3 py-1 text-body-sm text-text-secondary">{agent.category}</span>
                    <span className="flex items-center gap-1 text-body-sm">
                      <Star className="h-4 w-4 fill-warning text-warning" /> {agent.rating}
                      <span className="text-text-secondary">({agent.reviewCount} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1 text-body-sm text-text-secondary">
                      <Download className="h-4 w-4" /> {agent.installCount.toLocaleString()} installs
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <button
                    onClick={handleInstall}
                    className="rounded-xl bg-primary px-6 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors"
                  >
                    Add to Workspace — {agent.creditCost} credits/use
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-6 mt-8 border-t border-border pt-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`border-b-2 py-3 text-body-sm font-medium transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="max-w-3xl">
            <p className="text-body text-text-primary leading-relaxed">{agent.longDescription}</p>
          </div>
        )}
        {activeTab === 'capabilities' && (
          <div className="max-w-3xl">
            <ul className="space-y-3">
              {agent.capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-3 text-body text-text-primary">
                  <Check className="h-5 w-5 text-comfort-text" /> {cap}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="max-w-3xl space-y-4">
            {agent.reviews.map((review, i) => (
              <div key={i} className="card-glass p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-body-sm text-text-primary">{review.user}</span>
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? 'fill-warning text-warning' : 'text-border'}`} />
                    ))}
                  </span>
                  <span className="text-caption text-text-secondary">{review.date}</span>
                </div>
                <p className="text-body-sm text-text-secondary">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'changelog' && (
          <div className="max-w-3xl space-y-4">
            {agent.changelog.map((entry, i) => (
              <div key={i} className="card-glass p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full bg-comfort px-2.5 py-0.5 text-caption font-medium text-comfort-text">v{entry.version}</span>
                  <span className="text-caption text-text-secondary">{entry.date}</span>
                </div>
                <p className="text-body-sm text-text-primary">{entry.notes}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-surface p-4 md:hidden">
          <button
            onClick={handleInstall}
            className="w-full rounded-lg bg-primary py-3 text-body-sm font-medium text-white hover:bg-primary-hover"
          >
            Add to Workspace — {agent.creditCost} credits/use
          </button>
        </div>
      </div>

      {/* Install Dialog */}
      <Dialog open={installOpen} onOpenChange={setInstallOpen}>
        <DialogContent className="max-w-md">
          {installStep === 'target' && (
            <div>
              <h2 className="text-heading-sm font-semibold text-text-primary mb-2">Install {agent.name}</h2>
              <p className="text-body-sm text-text-secondary mb-6">Where would you like to deploy this agent?</p>
              <div className="space-y-3">
                {targets.map(target => (
                  <button
                    key={target.id}
                    onClick={() => { setSelectedTarget(target.id); setInstallStep('confirm'); }}
                    className="flex w-full items-center gap-3 rounded-2xl border border-border p-4 text-left hover:border-primary/20 hover:bg-white/40 transition-all duration-200"
                  >
                    <target.icon className="h-5 w-5 text-text-secondary" />
                    <span className="text-body-sm font-medium text-text-primary">{target.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {installStep === 'confirm' && (
            <div>
              <h2 className="text-heading-sm font-semibold text-text-primary mb-2">Confirm Installation</h2>
              <div className="rounded-2xl bg-white/40 p-4 mb-6">
                <p className="text-body-sm text-text-primary"><strong>{agent.name}</strong> will be deployed to <strong>{targets.find(t => t.id === selectedTarget)?.label}</strong></p>
                <p className="text-caption text-text-secondary mt-1">Cost: {agent.creditCost} credits per use</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setInstallStep('target')} className="flex-1 rounded-lg border border-border py-2.5 text-body-sm font-medium text-text-secondary hover:bg-surface-elevated">
                  Back
                </button>
                <button onClick={() => setInstallStep('success')} className="flex-1 rounded-lg bg-primary py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover">
                  Install Agent
                </button>
              </div>
            </div>
          )}
          {installStep === 'success' && (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-comfort">
                <Check className="h-8 w-8 text-comfort-text" />
              </div>
              <h2 className="text-heading-sm font-semibold text-text-primary mb-2">Successfully Installed!</h2>
              <p className="text-body-sm text-text-secondary mb-6">{agent.name} is now active in your workspace.</p>
              <button onClick={() => setInstallOpen(false)} className="rounded-xl bg-primary px-6 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover">
                Done
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
