import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, UserPlus, Eye, EyeOff, Check, Sparkles } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AnimatedEntry } from '../AnimatedEntry';
import { PRICING_PLANS } from '@/lib/pricing-data';

export function SignUpContent() {
  const { nextStep, selectedPlanId } = useOnboarding();
  const { signUp, signInWithGoogle } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const planLabel = PRICING_PLANS.find((p) => p.id === selectedPlanId)?.name ?? 'Growth';

  const passwordChecks = {
    length: password.length >= 8,
    match: password.length > 0 && confirmPassword.length > 0 && password === confirmPassword,
  };

  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    passwordChecks.length &&
    passwordChecks.match;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      nextStep();
      return;
    }

    const { error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      nextStep();
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isSupabaseConfigured) {
      nextStep();
      return;
    }

    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg mx-auto">
      <AnimatedEntry delay={0}>
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-text-secondary">
            Get started with Groovy in seconds
          </p>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={100} className="w-full">
        <div className="flex items-center gap-2 rounded-xl bg-primary/[0.06] border border-primary/10 px-3.5 py-2.5 mb-5">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm text-text-primary">
            Selected plan: <strong>{planLabel}</strong> — 14-day free trial
          </span>
        </div>
      </AnimatedEntry>

      {error && (
        <AnimatedEntry delay={0} className="w-full">
          <div className="mb-4 rounded-xl border border-red-200/30 bg-red-50/50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </AnimatedEntry>
      )}

      <AnimatedEntry delay={150} className="w-full">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full rounded-xl border border-border-solid bg-white/60 px-3.5 py-2.5 text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              autoFocus
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full rounded-xl border border-border-solid bg-white/60 px-3.5 py-2.5 text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={8}
              className="w-full rounded-xl border border-border-solid bg-white/60 px-3.5 py-2.5 pr-12 text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full rounded-xl border border-border-solid bg-white/60 px-3.5 py-2.5 pr-12 text-sm placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {password.length > 0 && (
            <div className="flex flex-col gap-1">
              <div className={`flex items-center gap-2 text-xs ${passwordChecks.length ? 'text-green-600' : 'text-text-secondary'}`}>
                <Check className={`h-3 w-3 ${passwordChecks.length ? 'opacity-100' : 'opacity-30'}`} />
                At least 8 characters
              </div>
              {confirmPassword.length > 0 && (
                <div className={`flex items-center gap-2 text-xs ${passwordChecks.match ? 'text-green-600' : 'text-red-500'}`}>
                  <Check className={`h-3 w-3 ${passwordChecks.match ? 'opacity-100' : 'opacity-30'}`} />
                  Passwords match
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </AnimatedEntry>

      <AnimatedEntry delay={250} className="w-full">
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-text-secondary">or sign up with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white/60 backdrop-blur-sm py-3 text-sm font-medium text-text-primary hover:bg-white/80 transition-all"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p className="mt-5 text-center text-xs text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </AnimatedEntry>
    </div>
  );
}
