import { useState } from 'react';
import { ArrowRight, Globe, Users, Building2, Loader2 } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AnimatedEntry } from '../AnimatedEntry';

const TIMEZONES = [
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
] as const;

export function WorkspaceSetupContent() {
  const { nextStep } = useOnboarding();
  const { createWorkspace } = useAuth();
  const [workspaceName, setWorkspaceName] = useState('');
  const [timezone, setTimezone] = useState('Europe/London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canProceed = workspaceName.trim().length > 0 && !loading;

  const handleSetupWorkspace = async () => {
    if (!canProceed) return;

    // Demo mode — skip real workspace creation
    if (!isSupabaseConfigured) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: wsError } = await createWorkspace(workspaceName.trim());
      setLoading(false);

      if (wsError) {
        setError(wsError);
        return;
      }

      nextStep();
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to create workspace. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      <AnimatedEntry delay={0}>
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Set up your workspace
          </h2>
          <p className="mt-2 text-base text-text-secondary">
            This is where you and your team will work with AI agents.
          </p>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={150} className="w-full">
        <div className="space-y-5 rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-6 shadow-sm">
          {/* Workspace name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-1.5">
              <Users className="h-4 w-4 text-text-secondary" />
              Workspace name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Acme HQ"
              className="w-full rounded-xl border border-border-solid bg-white/60 px-3.5 py-2.5 text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              autoFocus
            />
            <p className="mt-1 text-xs text-text-secondary/70">
              Your team and agents will see this name
            </p>
          </div>

          {/* Timezone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-1.5">
              <Globe className="h-4 w-4 text-text-secondary" />
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-xl border border-border-solid bg-white/60 px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Invite — just a teaser, not functional */}
          <div className="rounded-xl bg-black/[0.03] border border-border px-4 py-3">
            <p className="text-sm text-text-secondary">
              You can invite your team later from workspace settings.
            </p>
          </div>
        </div>
      </AnimatedEntry>

      {error && (
        <AnimatedEntry delay={0} className="w-full mt-4">
          <div className="rounded-xl border border-red-200/30 bg-red-50/50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </AnimatedEntry>
      )}

      <AnimatedEntry delay={300} className="w-full mt-6">
        <button
          onClick={handleSetupWorkspace}
          disabled={!canProceed}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating workspace...
            </>
          ) : (
            <>
              Set up workspace
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </AnimatedEntry>
    </div>
  );
}
