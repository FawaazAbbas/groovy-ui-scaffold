import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatedGroovyLogo } from '@/components/ui/AnimatedGroovyLogo';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from '@/components/Footer';

const navLinks = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

export default function MarketingLayout() {
  const { startOnboarding } = useOnboarding();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleGetStarted = () => {
    startOnboarding();
    navigate('/signup');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen font-sans bg-background flex flex-col">
      {/* ── Floating glass header ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
        <header
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 ease-out rounded-2xl border ${
            scrolled
              ? 'bg-white/70 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]'
              : 'bg-white/40 border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.5)]'
          }`}
          style={{
            backdropFilter: scrolled ? 'blur(48px) saturate(1.8)' : 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: scrolled ? 'blur(48px) saturate(1.8)' : 'blur(24px) saturate(1.4)',
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full" />

          <div className="flex h-14 items-center justify-between px-5 relative">
            {/* ── Left: Animated logo ── */}
            <Link to="/" className="flex items-center group" data-tour="nav-marketplace">
              <AnimatedGroovyLogo className="text-primary" />
            </Link>

            {/* ── Center: Nav links — true page center via absolute positioning ── */}
            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    isActive(to)
                      ? 'text-primary bg-primary/[0.06]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/50'
                  }`}
                >
                  {label}
                  {isActive(to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary/60" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Right: Auth actions (desktop) ── */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Link
                  to="/space/marketplace"
                  className="flex items-center gap-1.5 h-8 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold transition-all duration-200 shadow-[0_2px_8px_rgba(200,0,223,0.2)] hover:shadow-[0_4px_16px_rgba(200,0,223,0.3)] hover:-translate-y-px"
                >
                  Go to Workspace
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="h-8 px-4 rounded-xl text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-white/50 transition-all duration-200 flex items-center"
                  >
                    Sign In
                  </Link>
                  <button
                    onClick={handleGetStarted}
                    className="flex items-center gap-1.5 h-8 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold transition-all duration-200 shadow-[0_2px_8px_rgba(200,0,223,0.2)] hover:shadow-[0_4px_16px_rgba(200,0,223,0.3)] hover:-translate-y-px"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* ── Mobile dropdown ── */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/30 px-5 pb-4 pt-2 space-y-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(to)
                      ? 'text-primary bg-primary/[0.06]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/40'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/20 mt-2 space-y-1">
                {user ? (
                  <Link
                    to="/space/marketplace"
                    className="block text-center py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
                  >
                    Go to Workspace
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/40 transition-colors"
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={handleGetStarted}
                      className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
