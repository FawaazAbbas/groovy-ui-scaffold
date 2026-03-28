import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { GroovyLogo } from '@/components/ui/GroovyLogo';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from '@/components/Footer';

export default function MarketingLayout() {
  const { startOnboarding } = useOnboarding();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    startOnboarding();
    navigate('/space/chats');
  };

  return (
    <div className="min-h-screen font-sans bg-background flex flex-col">
      <header className="border-b border-white/40 bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/marketplace" className="flex items-center gap-2.5" data-tour="nav-marketplace">
            <GroovyLogo className="h-8 w-8 text-primary" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search agents..."
                className="h-9 w-64 rounded-lg border border-border bg-surface-solid pl-9 pr-4 text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-[#C800DF]/20 focus:border-[#C800DF]/30 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Blog
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Pricing
            </Link>
            {user ? (
              <Link to="/space/marketplace" className="btn-gradient px-5 py-2 text-sm font-medium flex items-center gap-2">
                Go to Workspace
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  Sign In
                </Link>
                <button
                  onClick={handleGetStarted}
                  className="btn-gradient px-5 py-2 text-sm font-medium"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
