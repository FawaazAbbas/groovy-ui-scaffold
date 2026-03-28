import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Building2, Users, ArrowRight, ArrowLeft, Loader2, Briefcase, Check } from 'lucide-react';
import { GroovyLogo } from '@/components/ui/GroovyLogo';
import { useAuth } from '@/contexts/AuthContext';

type SetupMode = 'choose' | 'create' | 'join';

export default function WorkspaceSetupPage() {
  const { user, profile, createWorkspace, joinWorkspace, signOut, hasWorkspace } = useAuth();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState<SetupMode>('choose');
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [workspaceName, setWorkspaceName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  // If already has a workspace, redirect to marketplace to prevent duplicate creation
  if (hasWorkspace) {
    return <Navigate to="/space/marketplace" replace />;
  }

  // Prevent flicker by waiting for profile to finish resolving before showing form
  if (user && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await createWorkspace(workspaceName.trim(), industry, size, jobTitle.trim());
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate('/space/marketplace');
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim() || inviteCode.trim().length < 9) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await joinWorkspace(inviteCode.trim(), jobTitle.trim());
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate('/space/marketplace');
    }
  };

  const resetFlow = () => {
    setMode('choose');
    setStep(1);
    setError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6">
            <GroovyLogo className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {mode === 'choose' && 'Set up your workspace'}
            {mode === 'create' && step === 1 && 'Create a workspace'}
            {mode === 'create' && step === 2 && 'Tell us about your team'}
            {mode === 'join' && step === 1 && 'Join a workspace'}
            {mode === 'join' && step === 2 && 'Your Profile'}
          </h1>
          <p className="text-text-secondary">
            {mode === 'choose' && 'Create a new company workspace or join an existing one.'}
            {mode === 'create' && step === 1 && 'Give your workspace a name to get started.'}
            {mode === 'create' && step === 2 && 'This helps our agents understand your operational context.'}
            {mode === 'join' && step === 1 && 'Enter the invite code shared by your team admin.'}
            {mode === 'join' && step === 2 && 'Let your team know what you do.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Choose mode */}
        {mode === 'choose' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('create')}
              className="w-full card-glass p-6 text-left flex items-center gap-5 group"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary">
                <Building2 className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-text-primary mb-1">Create a workspace</h3>
                <p className="text-sm text-text-secondary">Set up a new company workspace and invite your team</p>
              </div>
              <ArrowRight className="h-5 w-5 text-text-secondary/40 group-hover:text-primary transition-colors shrink-0" />
            </button>

            <button
              onClick={() => setMode('join')}
              className="w-full card-glass p-6 text-left flex items-center gap-5 group"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary">
                <Users className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-text-primary mb-1">Join a workspace</h3>
                <p className="text-sm text-text-secondary">Enter an invite code to join your team's workspace</p>
              </div>
              <ArrowRight className="h-5 w-5 text-text-secondary/40 group-hover:text-primary transition-colors shrink-0" />
            </button>
          </div>
        )}

        {/* Create Workspace Multi-Step */}
        {mode === 'create' && (
          <form onSubmit={handleCreateSubmit} className="space-y-5">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-medium text-text-primary mb-2">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all mb-6"
                />
                <button
                  type="submit"
                  disabled={!workspaceName.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">What industry are you in?</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value="" disabled>Select industry...</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS & Technology">SaaS & Technology</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Retail & Consumer">Retail & Consumer</option>
                    <option value="Marketing Agency">Marketing Agency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Company Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value="" disabled>Select size...</option>
                    <option value="1-10">1 - 10 employees</option>
                    <option value="11-50">11 - 50 employees</option>
                    <option value="51-200">51 - 200 employees</option>
                    <option value="201+">201+ employees</option>
                  </select>
                </div>
                <div className="pb-4">
                  <label className="block text-sm font-medium text-text-primary mb-2">Your Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Founder, Ops Manager..."
                    required
                    className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !industry || !size || !jobTitle.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  {loading ? 'Finalizing Setup...' : 'Finish & Launch Workspace'}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => step === 2 ? setStep(1) : resetFlow()}
              className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-primary transition-colors mt-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </form>
        )}

        {/* Join Workspace Multi-Step */}
        {mode === 'join' && (
          <form onSubmit={handleJoinSubmit} className="space-y-5">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-medium text-text-primary mb-2">Invite Code</label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ACME-7X3K"
                  required
                  autoFocus
                  maxLength={9}
                  className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm font-mono tracking-widest text-center placeholder:text-text-secondary placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all mb-6"
                />
                <button
                  type="submit"
                  disabled={inviteCode.trim().length < 9}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-4 space-y-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-4 items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-body-sm font-semibold text-primary">Valid Invite Code</h4>
                    <p className="text-caption text-text-secondary">Almost there! Complete your profile.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Your Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Customer Support, Developer..."
                    required
                    autoFocus
                    className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !jobTitle.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50 mt-4"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
                  {loading ? 'Joining workspace...' : 'Join Workspace'}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => step === 2 ? setStep(1) : resetFlow()}
              className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-primary transition-colors mt-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </form>
        )}

        {/* Signed in as */}
        {user && (
          <p className="mt-8 text-center text-xs text-text-secondary flex items-center justify-center gap-2">
            <span>Signed in as {user.email}</span>
            <span className="text-border-solid">•</span>
            <button 
              onClick={() => signOut()}
              className="text-primary hover:underline transition-colors focus:outline-none">
              Sign out
            </button>
          </p>
        )}
      </div>
    </div>
  );
}


