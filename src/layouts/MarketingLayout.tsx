import { Outlet, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/marketplace" className="flex items-center gap-2" data-tour="nav-marketplace">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar">
              <span className="text-sm font-bold text-sidebar-text">G</span>
            </div>
            <span className="text-heading-sm font-semibold text-text-primary">Groovy</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search agents..."
                className="h-9 w-64 rounded-lg border border-border bg-surface-elevated pl-9 pr-4 text-body-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-body-sm font-medium text-text-secondary hover:text-text-primary">
              Sign In
            </Link>
            <Link
              to="/integrations"
              className="rounded-lg bg-primary px-4 py-2 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
