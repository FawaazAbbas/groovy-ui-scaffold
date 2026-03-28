import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loader2, UserPlus, Eye, EyeOff, Check } from 'lucide-react';
import { GroovyLogo } from '@/components/ui/GroovyLogo';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function SignUpPage() {
  const { signUp, signInWithGoogle, signInWithMicrosoft, user } = useAuth();
  const { startOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to workspace
  if (user) {
    return <Navigate to="/space/marketplace" replace />;
  }

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
      // Demo mode — just navigate
      startOnboarding();
      navigate('/workspace-setup');
      return;
    }

    const { error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isSupabaseConfigured) {
      startOnboarding();
      navigate('/workspace-setup');
      return;
    }

    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  const handleMicrosoftSignUp = async () => {
    if (!isSupabaseConfigured) {
      startOnboarding();
      navigate('/workspace-setup');
      return;
    }

    setError(null);
    const { error } = await signInWithMicrosoft();
    if (error) setError(error.message);
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-8">
          <GroovyLogo className="h-16 w-16 text-[#16A34A]" />
        </div>
        <h1 className="text-display-sm text-text-primary mb-2">You're all set!</h1>
        <p className="text-body text-text-secondary mb-4">
          Your account has been created successfully.
        </p>
        <p className="text-body-sm text-text-secondary mb-8">
          Now let's set up your workspace.
        </p>
        <Link
          to="/workspace-setup"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm"
        >
          Set Up Workspace
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <GroovyLogo className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-display-sm text-text-primary mb-2">Create your account</h1>
      <p className="text-body text-text-secondary mb-8">Get started with Groovy in seconds</p>

      {error && (
        <div className="mb-4 glass-card !rounded-xl border-red-200/30 px-4 py-3 text-body-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Full name */}
        <div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            required
            className="w-full glass-input"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full glass-input"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={8}
            className="w-full glass-input pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Confirm password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            className="w-full glass-input pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Password requirements */}
        {password.length > 0 && (
          <div className="flex flex-col gap-1 text-left">
            <div className={`flex items-center gap-2 text-caption ${passwordChecks.length ? 'text-green-600' : 'text-text-secondary'}`}>
              <Check className={`h-3 w-3 ${passwordChecks.length ? 'opacity-100' : 'opacity-30'}`} />
              At least 8 characters
            </div>
            {confirmPassword.length > 0 && (
              <div className={`flex items-center gap-2 text-caption ${passwordChecks.match ? 'text-green-600' : 'text-red-500'}`}>
                <Check className={`h-3 w-3 ${passwordChecks.match ? 'opacity-100' : 'opacity-30'}`} />
                Passwords match
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-caption text-text-secondary">or sign up with</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* SSO buttons */}
      <div className="space-y-3">
        <button
          onClick={handleGoogleSignUp}
          className="flex w-full items-center justify-center gap-2 rounded-xl glass-button py-3 text-body-sm font-medium text-text-primary"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        {/* Microsoft authentication temporarily hidden until Azure account configuration is complete
        <button
          onClick={handleMicrosoftSignUp}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-solid bg-white/50 py-3 text-body-sm font-medium text-text-primary hover:bg-white/80 transition-all duration-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H1l8.8-12.4L1.4 0h4.8L12 8.4 17.8 0h4.8l-8.4 11.6L23 24h-4.8L12 15.2 11.4 24z"/></svg>
          Continue with Microsoft
        </button>
        */}
      </div>

      <p className="mt-8 text-caption text-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
