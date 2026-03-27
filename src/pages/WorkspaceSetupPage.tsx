import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, ArrowRight, Copy, Check, Loader2 } from 'lucide-react';
import { GroovyLogo } from '@/components/ui/GroovyLogo';
import { useAuth } from '@/contexts/AuthContext';

type SetupMode = 'choose' | 'create' | 'join';

export default function WorkspaceSetupPage() {
  const { user, createWorkspace, joinWorkspace } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<SetupMode>('choose');
  const [workspaceName, setWorkspaceName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setLoading(true);
    setError(null);

    const { error } = await createWorkspace(workspaceName.trim());
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      // Show the invite code before redirecting
      navigate('/space/marketplace');
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setLoading(true);
    setError(null);

    const { error } = await joinWorkspace(inviteCode.trim());
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate('/space/marketplace');
    }
  };

  const handleCopyCode = async () => {
    if (createdCode) {
      await navigator.clipboard.writeText(createdCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-glass-md">
            <GroovyLogo className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {mode === 'choose' && 'Set up your workspace'}
            {mode === 'create' && 'Create a workspace'}
            {mode === 'join' && 'Join a workspace'}
          </h1>
          <p className="text-text-secondary">
            {mode === 'choose' && 'Create a new company workspace or join an existing one.'}
            {mode === 'create' && 'Give your workspace a name to get started.'}
            {mode === 'join' && 'Enter the invite code shared by your team admin.'}
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

        {/* Create workspace */}
        {mode === 'create' && (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Workspace name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. Acme Corp"
                required
                autoFocus
                className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !workspaceName.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
              {loading ? 'Creating...' : 'Create Workspace'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('choose'); setError(null); }}
              className="w-full text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Back
            </button>
          </form>
        )}

        {/* Join workspace */}
        {mode === 'join' && (
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Invite code</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="e.g. ACME-7X3K"
                required
                autoFocus
                maxLength={9}
                className="w-full rounded-xl border border-border-solid bg-white/60 px-4 py-3 text-sm font-mono tracking-widest text-center placeholder:text-text-secondary placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || inviteCode.trim().length < 9}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Users className="h-4 w-4" />
              )}
              {loading ? 'Joining...' : 'Join Workspace'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('choose'); setError(null); }}
              className="w-full text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Back
            </button>
          </form>
        )}

        {/* Signed in as */}
        {user && (
          <p className="mt-8 text-center text-xs text-text-secondary">
            Signed in as {user.email}
          </p>
        )}
      </div>
    </div>
  );
}
