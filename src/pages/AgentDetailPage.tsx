import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, ArrowLeft, Check, MessageSquare as Slack, Users, Zap, Clock, Activity, Globe, Brain, Image } from 'lucide-react';
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
        <Link to="/marketplace" className="text-[#C800DF] hover:underline mt-2 inline-block">Back to Marketplace</Link>
      </div>
    );
  }

  const tabs = ['Overview', 'Capabilities', 'Reviews', 'Support'];
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
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="container mx-auto px-6 pt-6">
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Marketplace
        </Link>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header card */}
            <div className="card-glass p-8 mb-6">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-5">
                <span className="rounded-full bg-[#C800DF]/[0.08] px-3 py-1 text-xs font-medium text-[#C800DF]">
                  {agent.category}
                </span>
                <span className="rounded-full border border-[#16A34A]/20 bg-[#16A34A]/[0.06] px-3 py-1 text-xs font-medium text-[#16A34A]">
                  Active
                </span>
              </div>

              {/* Title row */}
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#C800DF]/[0.08] text-[#C800DF] text-3xl font-bold">
                  {agent.name[0]}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-text-primary">{agent.name}</h1>
                  <p className="text-base text-text-secondary mt-1">{agent.description}</p>
                  <p className="text-sm text-text-secondary mt-2">
                    Developed by <span className="text-[#C800DF] font-medium">{agent.publisher}</span>
                  </p>
                </div>
              </div>

              {/* Metrics row */}
              <div className="flex flex-wrap items-center gap-5 mt-6">
                <div className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-text-primary">{agent.rating}</span>
                  <span className="text-text-secondary">({agent.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-text-secondary">
                  <Download className="h-4 w-4" /> {agent.installCount.toLocaleString()} installs
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-text-secondary">
                  <Clock className="h-4 w-4" /> ~30s response
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <button
                  onClick={handleInstall}
                  className="btn-gradient px-8 py-3 text-sm font-medium"
                >
                  View My Workspace — {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} credits/use`}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-border mb-8">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'border-[#C800DF] text-[#C800DF]'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab} {tab === 'Reviews' ? `(${agent.reviewCount})` : ''}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Screenshots gallery */}
                <div className="card-glass p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Image className="h-5 w-5 text-[#C800DF]" />
                    <h2 className="text-lg font-bold text-text-primary">Screenshots</h2>
                    {agent.screenshots.length > 0 && (
                      <span className="text-xs text-text-secondary ml-1">({agent.screenshots.length})</span>
                    )}
                  </div>
                  {agent.screenshots.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {agent.screenshots.map((url, i) => (
                        <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border bg-surface-elevated">
                          <img src={url} alt={`${agent.name} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 rounded-xl border border-dashed border-border">
                      <Image className="h-8 w-8 text-text-secondary/30 mb-2" />
                      <p className="text-sm text-text-secondary">No images yet</p>
                    </div>
                  )}
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-[#C800DF]" />
                    <h2 className="text-lg font-bold text-text-primary">What This Agent Does</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{agent.longDescription}</p>
                </div>
                <div className="card-glass p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="h-5 w-5 text-[#C800DF]" />
                    <h2 className="text-lg font-bold text-text-primary">AI Intelligence</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    This agent leverages advanced AI models to understand context, generate intelligent responses, and automate complex tasks within your {agent.category.toLowerCase()} workflows.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'capabilities' && (
              <div className="card-glass p-6">
                <h2 className="text-lg font-bold text-text-primary mb-4">Key Capabilities</h2>
                <ul className="space-y-3">
                  {agent.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-primary">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/10">
                        <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                      </div>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {agent.reviews.map((review, i) => (
                  <div key={i} className="card-glass p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm text-text-primary">{review.user}</span>
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                        ))}
                      </span>
                      <span className="text-xs text-text-secondary ml-auto">{review.date}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'support' && (
              <div className="card-glass p-6 text-center">
                <p className="text-text-secondary mb-4">Need help with {agent.name}?</p>
                <p className="text-sm text-text-secondary">
                  Contact <span className="text-[#C800DF] font-medium">{agent.publisher}</span> for support.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-4">
            {/* Quick Info */}
            <div className="card-glass p-6">
              <h3 className="text-base font-bold text-text-primary mb-4">Quick Info</h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Category', value: agent.category },
                  { label: 'Rating', value: <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{agent.rating}</span> },
                  { label: 'Installs', value: agent.installCount.toLocaleString() },
                  { label: 'Response Time', value: '~30s' },
                  { label: 'Status', value: <span className="rounded-full border border-[#16A34A]/20 bg-[#16A34A]/[0.06] px-2.5 py-0.5 text-xs font-medium text-[#16A34A]">Active</span> },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="font-medium text-text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            {agent.requiredIntegrations.length > 0 && (
              <div className="card-glass p-6">
                <h3 className="text-base font-bold text-text-primary mb-4">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#C800DF]" /> Integrations
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.requiredIntegrations.map(int => (
                    <span key={int} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary">
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleInstall}
                className="w-full btn-gradient py-3 text-sm font-medium flex items-center justify-center gap-2"
              >
                View My Workspace
              </button>
              {targets.slice(0, 2).map(target => (
                <button
                  key={target.id}
                  onClick={handleInstall}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-text-primary hover:border-[#C800DF]/20 hover:bg-[#C800DF]/[0.02] transition-all"
                >
                  <target.icon className="h-4 w-4 text-text-secondary" /> Add to {target.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-surface-solid p-4 md:hidden">
        <button
          onClick={handleInstall}
          className="w-full btn-gradient py-3 text-sm font-medium"
        >
          Add to Workspace — {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} credits/use`}
        </button>
      </div>

      {/* Install Dialog */}
      <Dialog open={installOpen} onOpenChange={setInstallOpen}>
        <DialogContent className="max-w-md">
          {installStep === 'target' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Install {agent.name}</h2>
              <p className="text-sm text-text-secondary mb-6">Where would you like to deploy this agent?</p>
              <div className="space-y-3">
                {targets.map(target => (
                  <button
                    key={target.id}
                    onClick={() => { setSelectedTarget(target.id); setInstallStep('confirm'); }}
                    className="flex w-full items-center gap-3 rounded-xl border border-border p-4 text-left hover:border-[#C800DF]/20 hover:bg-[#C800DF]/[0.02] transition-all"
                  >
                    <target.icon className="h-5 w-5 text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">{target.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {installStep === 'confirm' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Confirm Installation</h2>
              <div className="rounded-xl bg-[#C800DF]/[0.04] border border-[#C800DF]/10 p-4 mb-6">
                <p className="text-sm text-text-primary"><strong>{agent.name}</strong> will be deployed to <strong>{targets.find(t => t.id === selectedTarget)?.label}</strong></p>
                <p className="text-xs text-text-secondary mt-1">Cost: {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} credits per use`}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setInstallStep('target')} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-text-secondary hover:bg-gray-50">
                  Back
                </button>
                <button onClick={() => setInstallStep('success')} className="flex-1 btn-gradient py-2.5 text-sm font-medium">
                  Install Agent
                </button>
              </div>
            </div>
          )}
          {installStep === 'success' && (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#16A34A]/10">
                <Check className="h-8 w-8 text-[#16A34A]" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Successfully Installed!</h2>
              <p className="text-sm text-text-secondary mb-6">{agent.name} is now active in your workspace.</p>
              <button onClick={() => setInstallOpen(false)} className="btn-gradient px-8 py-2.5 text-sm font-medium">
                Done
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
