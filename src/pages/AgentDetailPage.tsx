import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, ArrowLeft, Check, Zap, Clock, Activity, Globe, Brain, Image, Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAgents } from '@/hooks/use-agents';

const SlackLogo = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/>
  </svg>
);

const TeamsLogo = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 2228.833 2073.333">
    <path fill="#5059C9" d="M1554.637 777.5h575.713c54.391 0 98.483 44.092 98.483 98.483v524.398c0 199.901-162.051 361.952-361.952 361.952h-1.711c-199.901.028-361.975-161.996-362.004-361.897V828.971c0-28.427 23.044-51.471 51.471-51.471z"/>
    <circle fill="#5059C9" cx="1943.75" cy="440.583" r="233.25"/>
    <circle fill="#7B83EB" cx="1218.083" cy="336.917" r="336.917"/>
    <path fill="#7B83EB" d="M1667.323 777.5H717.01c-53.743 1.33-96.257 45.931-95.01 99.676v598.105c-7.505 322.519 247.657 590.16 570.167 598.053 322.51-7.893 577.671-275.534 570.167-598.053V877.176c1.245-53.745-41.268-98.346-95.011-99.676z"/>
    <path opacity=".1" d="M1244.167 777.5v838.145c-.258 38.435-23.549 72.964-59.09 87.598a91.856 91.856 0 0 1-35.765 7.257H783.876c-3.087-6.639-5.918-13.534-8.492-20.429-15.655-40.478-23.679-83.522-23.679-126.909V877.176c-1.245-53.745 41.267-98.347 95.01-99.676h397.452z"/>
    <path opacity=".2" d="M1192.167 777.5v890.145c0 19.32-6.218 38.124-17.727 53.568a91.576 91.576 0 0 1-41.363 33.83c-11.652 4.882-24.233 7.397-36.977 7.413H810.107c-8.748-17.966-16.735-36.443-23.679-55.682a466.69 466.69 0 0 1-10.404-21.153c-15.655-40.478-23.679-83.522-23.679-126.909V877.176c-1.245-53.745 41.267-98.347 95.01-99.676h345.452c.656.004 1.31.085 1.36.085z"/>
    <path opacity=".2" d="M1192.167 777.5v786.145c.395 52.054-41.263 94.665-93.318 95.398H786.428a466.69 466.69 0 0 1-10.404-21.153c-15.655-40.478-23.679-83.522-23.679-126.909V877.176c-1.245-53.745 41.267-98.347 95.01-99.676h345.452c-.344.004-.65.085-.64.085z"/>
    <path opacity=".2" d="M1140.167 777.5v786.145c.395 52.054-41.263 94.665-93.318 95.398H786.428a466.69 466.69 0 0 1-10.404-21.153c-15.655-40.478-23.679-83.522-23.679-126.909V877.176c-1.245-53.745 41.267-98.347 95.01-99.676h293.452c-.344.004-.65.085-.64.085z"/>
    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="198.099" y1="1683.0726" x2="942.2344" y2="394.2607" gradientTransform="matrix(1 0 0 -1 0 2075.3333)">
      <stop offset="0" stopColor="#5a62c3"/><stop offset=".5" stopColor="#4d55bd"/><stop offset="1" stopColor="#3940ab"/>
    </linearGradient>
    <path fill="url(#a)" d="M95.01 777.5h999.313c52.473 0 95.01 42.538 95.01 95.01v999.314c0 52.472-42.538 95.01-95.01 95.01H95.01c-52.473 0-95.01-42.538-95.01-95.01V872.51c0-52.472 42.538-95.01 95.01-95.01z"/>
    <path fill="#FFF" d="M820.211 1100.522H630.834v517.11H509.057v-517.11H320.123V999.81h500.089v100.712z"/>
  </svg>
);

const GroovyIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <span className={`font-monoton text-primary ${className}`} style={{ fontSize: '1.2em', lineHeight: 1 }}>G</span>
);

export default function AgentDetailPage() {
  const { agentId } = useParams();
  const { agents, loading } = useAgents();
  const agent = agents.find(a => a.id === agentId);
  const [activeTab, setActiveTab] = useState('overview');
  const [installOpen, setInstallOpen] = useState(false);
  const [installStep, setInstallStep] = useState<'target' | 'confirm' | 'success'>('target');
  const [selectedTarget, setSelectedTarget] = useState('');

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-[#C800DF]" />
      </div>
    );
  }

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
    { id: 'slack', label: 'Slack', icon: SlackLogo },
    { id: 'teams', label: 'Microsoft Teams', icon: TeamsLogo },
    { id: 'groovy', label: 'Groovy Workspace', icon: GroovyIcon },
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
            <div className="glass-card glass-shimmer p-8 mb-6">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-5">
                <span className="glass-badge px-3 py-1 text-xs font-medium text-[#C800DF]">
                  {agent.category}
                </span>
                <span className="glass-badge px-3 py-1 text-xs font-medium text-[#16A34A]">
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
                <div className="flex items-center gap-1.5 glass-badge px-3.5 py-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-text-primary">{agent.rating}</span>
                  <span className="text-text-secondary">({agent.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 glass-badge px-3.5 py-1.5 text-sm text-text-secondary">
                  <Download className="h-4 w-4" /> {agent.installCount.toLocaleString()} installs
                </div>
                <div className="flex items-center gap-1.5 glass-badge px-3.5 py-1.5 text-sm text-text-secondary">
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
            <div className="flex gap-6 glass-panel !border-b mb-8">
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
                <div className="glass-card glass-shimmer p-6">
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

                <div className="glass-card glass-shimmer p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-[#C800DF]" />
                    <h2 className="text-lg font-bold text-text-primary">What This Agent Does</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{agent.longDescription}</p>
                </div>
                <div className="glass-card glass-shimmer p-6">
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
              <div className="glass-card glass-shimmer p-6">
                <h2 className="text-lg font-bold text-text-primary mb-4">Key Capabilities</h2>
                <ul className="space-y-3">
                  {agent.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-primary">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full glass-badge">
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
                  <div key={i} className="glass-card glass-shimmer p-5">
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
              <div className="glass-card glass-shimmer p-6 text-center">
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
            <div className="glass-card glass-shimmer p-6">
              <h3 className="text-base font-bold text-text-primary mb-4">Quick Info</h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Category', value: agent.category },
                  { label: 'Rating', value: <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{agent.rating}</span> },
                  { label: 'Installs', value: agent.installCount.toLocaleString() },
                  { label: 'Response Time', value: '~30s' },
                  { label: 'Status', value: <span className="glass-badge px-2.5 py-0.5 text-xs font-medium text-[#16A34A]">Active</span> },
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
              <div className="glass-card glass-shimmer p-6">
                <h3 className="text-base font-bold text-text-primary mb-4">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#C800DF]" /> Integrations
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.requiredIntegrations.map(int => (
                    <span key={int} className="glass-badge px-3 py-1 text-xs font-medium text-text-secondary">
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
                  className="w-full flex items-center justify-center gap-2 glass-button rounded-xl py-2.5 text-sm font-medium text-text-primary"
                >
                  <target.icon className="h-4 w-4 text-text-secondary" /> Add to {target.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 glass-panel p-4 md:hidden">
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
                    className="flex w-full items-center gap-3 rounded-xl p-4 text-left glass-button"
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
              <div className="glass-card p-4 mb-6">
                <p className="text-sm text-text-primary"><strong>{agent.name}</strong> will be deployed to <strong>{targets.find(t => t.id === selectedTarget)?.label}</strong></p>
                <p className="text-xs text-text-secondary mt-1">Cost: {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} credits per use`}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setInstallStep('target')} className="flex-1 glass-button rounded-xl py-2.5 text-sm font-medium text-text-secondary">
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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full glass-badge">
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
