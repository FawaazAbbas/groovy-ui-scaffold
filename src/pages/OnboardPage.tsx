import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Upload, Plus, X, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const steps = ['Welcome', 'Company', 'Your Role', 'Invite Team', 'Pick Agents', 'Connect Tools', 'Review'];

const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Education', 'Manufacturing', 'Other'];
const sizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'Support', 'Other'];

const miniAgents = [
  { id: 'agt_01', name: 'LeadScout', category: 'Sales', cost: 5 },
  { id: 'agt_03', name: 'TicketSolver', category: 'Support', cost: 3 },
  { id: 'agt_05', name: 'CodeReviewer', category: 'Engineering', cost: 6 },
  { id: 'agt_10', name: 'CampaignGenius', category: 'Marketing', cost: 8 },
  { id: 'agt_16', name: 'MeetingSynth', category: 'Custom', cost: 4 },
  { id: 'agt_13', name: 'ExpenseGuard', category: 'Finance', cost: 4 },
];

const tools = [
  { id: 'slack', name: 'Slack', icon: '💬' },
  { id: 'teams', name: 'Microsoft Teams', icon: '👥' },
  { id: 'google', name: 'Google Workspace', icon: '📧' },
  { id: 'apple', name: 'Apple Calendar', icon: '📅' },
];

export default function OnboardPage() {
  const [step, setStep] = useState(() => {
    try { return JSON.parse(localStorage.getItem('onboard_step') || '0'); } catch { return 0; }
  });
  const [company, setCompany] = useState(() => {
    try { return JSON.parse(localStorage.getItem('onboard_company') || '{}'); } catch { return {}; }
  });
  const [role, setRole] = useState(() => {
    try { return JSON.parse(localStorage.getItem('onboard_role') || '{}'); } catch { return {}; }
  });
  const [invites, setInvites] = useState<{ email: string; role: string }[]>(() => {
    try { return JSON.parse(localStorage.getItem('onboard_invites') || '[]'); } catch { return []; }
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('onboard_agents') || '[]'); } catch { return []; }
  });
  const [connectedTools, setConnectedTools] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('onboard_tools') || '[]'); } catch { return []; }
  });
  const [launched, setLaunched] = useState(false);

  // Persist to localStorage on change
  useEffect(() => { localStorage.setItem('onboard_step', JSON.stringify(step)); }, [step]);
  useEffect(() => { localStorage.setItem('onboard_company', JSON.stringify(company)); }, [company]);
  useEffect(() => { localStorage.setItem('onboard_role', JSON.stringify(role)); }, [role]);
  useEffect(() => { localStorage.setItem('onboard_invites', JSON.stringify(invites)); }, [invites]);
  useEffect(() => { localStorage.setItem('onboard_agents', JSON.stringify(selectedAgents)); }, [selectedAgents]);
  useEffect(() => { localStorage.setItem('onboard_tools', JSON.stringify(connectedTools)); }, [connectedTools]);

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const addInvite = () => {
    if (inviteEmail && inviteEmail.includes('@')) {
      setInvites([...invites, { email: inviteEmail, role: 'member' }]);
      setInviteEmail('');
    }
  };

  if (launched) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center animate-slide-left">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-comfort">
            <Sparkles className="h-10 w-10 text-comfort-text" />
          </div>
          <h1 className="text-display-sm text-text-primary mb-2">Welcome to Groovy!</h1>
          <p className="text-body text-text-secondary mb-8">Your workspace is ready. Let's get started.</p>
          <Link to="/chats" className="inline-flex rounded-xl bg-primary px-8 py-3 text-body font-medium text-white hover:bg-primary-hover">
            Go to Workspace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress */}
      <div className="border-b border-border glass px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-body-sm font-medium text-text-primary">Step {step + 1} of {steps.length}</span>
            <span className="text-caption text-text-secondary">{steps[step]}</span>
          </div>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg animate-slide-left" key={step}>
          {step === 0 && (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sidebar">
                <span className="text-2xl font-bold text-sidebar-text">G</span>
              </div>
              <h1 className="text-display-sm text-text-primary mb-3">Welcome to Groovy</h1>
              <p className="text-body text-text-secondary mb-8">Let's set up your AI-powered workspace in just a few steps.</p>
              <button onClick={next} className="rounded-xl bg-primary px-8 py-3 text-body font-medium text-white hover:bg-primary-hover">
                Get Started <ArrowRight className="inline h-4 w-4 ml-1" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-heading text-text-primary mb-6">Company Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Company Name</label>
                  <input value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Industry</label>
                  <select value={company.industry} onChange={e => setCompany({ ...company, industry: e.target.value })} className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                    <option value="">Select industry</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Company Size</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(s => (
                      <button key={s} onClick={() => setCompany({ ...company, size: s })} className={`rounded-lg border px-4 py-2 text-body-sm ${company.size === s ? 'border-primary bg-primary/10 text-primary' : 'border-border text-text-secondary hover:border-primary/30'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Logo (optional)</label>
                  <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary/30 cursor-pointer">
                    <div className="text-center">
                      <Upload className="mx-auto h-6 w-6 text-text-secondary mb-1" />
                      <span className="text-caption text-text-secondary">Click to upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-heading text-text-primary mb-6">Your Role</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Full Name</label>
                  <input value={role.name} onChange={e => setRole({ ...role, name: e.target.value })} className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Sarah Chen" />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Email</label>
                  <input value={role.email} onChange={e => setRole({ ...role, email: e.target.value })} className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="sarah@acme.com" />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Title</label>
                  <input value={role.title} onChange={e => setRole({ ...role, title: e.target.value })} className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Head of Operations" />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-1.5">Department</label>
                  <select value={role.department} onChange={e => setRole({ ...role, department: e.target.value })} className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                    <option value="">Select department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-heading text-text-primary mb-6">Invite Team Members</h2>
              <div className="flex gap-2 mb-4">
                <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && addInvite()} className="flex-1 rounded-xl border border-border-solid bg-white/60 px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="colleague@company.com" />
                <button onClick={addInvite} className="rounded-xl bg-primary px-4 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {invites.length > 0 && (
                <div className="space-y-2 mb-4">
                  {invites.map((inv, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2.5">
                      <span className="text-body-sm text-text-primary">{inv.email}</span>
                      <button onClick={() => setInvites(invites.filter((_, j) => j !== i))} className="text-text-secondary hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-caption text-text-secondary">You can also invite team members later from Settings.</p>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-heading text-text-primary mb-6">Pick Your First Agents</h2>
              <div className="grid grid-cols-2 gap-3">
                {miniAgents.map(agent => {
                  const selected = selectedAgents.includes(agent.id);
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgents(selected ? selectedAgents.filter(id => id !== agent.id) : [...selectedAgents, agent.id])}
                      className={`rounded-xl border p-4 text-left transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-muted text-electric text-sm font-bold">{agent.name[0]}</div>
                        {selected && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-body-sm font-medium text-text-primary">{agent.name}</p>
                      <p className="text-caption text-text-secondary">{agent.category} · {agent.cost} cr/use</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-heading text-text-primary mb-6">Connect Your Tools</h2>
              <div className="space-y-3">
                {tools.map(tool => {
                  const connected = connectedTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setConnectedTools(connected ? connectedTools.filter(id => id !== tool.id) : [...connectedTools, tool.id])}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 transition-colors ${connected ? 'border-comfort bg-comfort/10' : 'border-border hover:border-primary/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{tool.icon}</span>
                        <span className="text-body-sm font-medium text-text-primary">{tool.name}</span>
                      </div>
                      {connected ? (
                        <span className="text-caption font-medium text-comfort-text">Connected</span>
                      ) : (
                        <span className="text-caption text-text-secondary">Connect</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-caption text-text-secondary mt-4">You can connect more tools later from Integrations.</p>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-heading text-text-primary mb-6">Review & Launch</h2>
              <div className="space-y-4">
                <div className="card-glass p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm font-medium text-text-primary">Company</span>
                    <button onClick={() => setStep(1)} className="text-caption text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-body-sm text-text-secondary">{company.name || 'Not set'} · {company.industry || 'No industry'} · {company.size || 'No size'}</p>
                </div>
                <div className="card-glass p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm font-medium text-text-primary">Your Role</span>
                    <button onClick={() => setStep(2)} className="text-caption text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-body-sm text-text-secondary">{role.name || 'Not set'} · {role.title || 'No title'}</p>
                </div>
                <div className="card-glass p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm font-medium text-text-primary">Team</span>
                    <button onClick={() => setStep(3)} className="text-caption text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-body-sm text-text-secondary">{invites.length} member{invites.length !== 1 ? 's' : ''} invited</p>
                </div>
                <div className="card-glass p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm font-medium text-text-primary">Agents</span>
                    <button onClick={() => setStep(4)} className="text-caption text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-body-sm text-text-secondary">{selectedAgents.length} agent{selectedAgents.length !== 1 ? 's' : ''} selected</p>
                </div>
                <div className="card-glass p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-body-sm font-medium text-text-primary">Tools</span>
                    <button onClick={() => setStep(5)} className="text-caption text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-body-sm text-text-secondary">{connectedTools.length} tool{connectedTools.length !== 1 ? 's' : ''} connected</p>
                </div>
              </div>
              <button onClick={() => setLaunched(true)} className="mt-6 w-full rounded-lg bg-primary py-3 text-body font-medium text-white hover:bg-primary-hover">
                Launch Workspace 🚀
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      {step > 0 && step < 6 && (
        <div className="border-t border-border glass px-6 py-4">
          <div className="mx-auto flex max-w-lg justify-between">
            <button onClick={prev} className="flex items-center gap-1 rounded-xl border border-border-solid px-4 py-2 text-body-sm transition-all font-medium text-text-secondary hover:bg-surface-elevated">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-1 rounded-xl bg-primary px-6 py-2 text-body-sm font-medium text-white hover:bg-primary-hover">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {step === 6 && (
        <div className="border-t border-border glass px-6 py-4">
          <div className="mx-auto flex max-w-lg justify-start">
            <button onClick={prev} className="flex items-center gap-1 rounded-xl border border-border-solid px-4 py-2 text-body-sm transition-all font-medium text-text-secondary hover:bg-surface-elevated">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
