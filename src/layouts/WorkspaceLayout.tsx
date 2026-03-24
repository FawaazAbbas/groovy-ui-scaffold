import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  MessageSquare, CheckSquare, Calendar, FolderOpen, Activity,
  Network, Puzzle, CreditCard, Search, Bell, ChevronLeft, ChevronRight,
  Menu, X, Command, Sun, Moon, Presentation, Store,
} from 'lucide-react';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { mockSession } from '@/lib/mocks/session';
import { CommandPalette } from '@/components/CommandPalette';

const navItems = [
  { label: 'Chats', icon: MessageSquare, path: '/space/chats', tourId: 'nav-chats' },
  { label: 'Tasks', icon: CheckSquare, path: '/space/tasks', tourId: 'nav-tasks' },
  { label: 'Calendar', icon: Calendar, path: '/space/calendar', tourId: 'nav-calendar' },
  { label: 'Files', icon: FolderOpen, path: '/space/files' },
  { label: 'Activity', icon: Activity, path: '/space/activity' },
  { label: 'Architecture', icon: Network, path: '/space/architecture' },
  { label: 'Marketplace', icon: Store, path: '/space/marketplace', tourId: 'nav-marketplace' },
  { label: 'Integrations', icon: Puzzle, path: '/space/integrations' },
  { label: 'Billing', icon: CreditCard, path: '/space/billing' },
];

export default function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { isDark, toggle: toggleDark } = useDarkMode();
  const location = useLocation();

  const sidebarWidth = collapsed ? 'w-16' : 'w-[260px]';

  return (
    <div className="flex h-screen overflow-hidden bg-background retro-grid" style={{ background: isDark ? 'linear-gradient(135deg, #1C1C1E 0%, #1F1D1A 25%, #1C1C1E 50%, #1A1D1F 75%, #1C1C1E 100%)' : 'linear-gradient(135deg, #F5F5F7 0%, #F0EDE8 30%, #F0F2F5 50%, #EDE8E0 70%, #F5F5F7 100%)', transition: 'background 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — liquid glass */}
      <aside
        className={`${sidebarWidth} fixed md:relative z-50 flex h-full flex-col glass-liquid transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Retro accent line */}
        <div className="retro-divider" />

        {/* Workspace header */}
        <div className="flex h-14 items-center gap-3 border-b border-black/[0.04] px-4">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-primary to-primary-dark shadow-glass-sm">
            <span className="text-sm font-semibold text-white">A</span>
            <span className="absolute -bottom-0.5 -right-0.5 neon-dot animate-pulse" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="truncate text-body-sm font-semibold tracking-tight text-text-primary block">{mockSession.workspace.name}</span>
              <span className="retro-label text-electric/40 animate-retro-pulse">SYS:ONLINE</span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                data-tour={item.tourId}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2 text-body-sm transition-all duration-200 ${
                  isActive
                    ? 'glass-liquid-item-active text-electric-bright font-medium'
                    : 'text-text-secondary hover:glass-liquid-item hover:text-text-primary'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-electric-bright neon-glow-sm" />
                )}
                <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-electric-bright drop-shadow-[0_0_6px_rgba(245,200,66,0.5)]' : ''}`} />
                {!collapsed && <span className={isActive ? 'text-shadow-[0_0_8px_rgba(245,200,66,0.3)]' : ''}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-black/[0.04] p-3">
          <div className={`flex items-center gap-3 rounded-xl px-2 py-2 glass-liquid-item ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-dark text-xs font-medium text-white shadow-glass-sm">
              {mockSession.user.name.split(' ').map(n => n[0]).join('')}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-body-sm font-medium text-text-primary">{mockSession.user.name}</p>
                <p className="truncate text-caption text-text-secondary">{mockSession.user.role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Retro divider + version */}
        <div className="retro-divider" />
        {!collapsed && (
          <div className="flex items-center justify-between px-4 py-1.5">
            <span className="retro-label text-text-secondary/40">v2.4.1</span>
            <span className="retro-label cyan-text">ELIXA</span>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-10 items-center justify-center border-t border-black/[0.04] text-text-secondary/40 hover:text-text-secondary transition-colors duration-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar — frosted glass */}
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-border glass px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-1.5 text-body-sm text-text-secondary">
              <Link to="/space/chats" className="hover:text-text-primary transition-colors">Workspace</Link>
              <span className="text-electric/30 font-mono">//</span>
              <span className="font-mono text-text-primary font-medium capitalize tracking-wide">
                {location.pathname.split('/')[2] || 'chats'}
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-white/50 px-3 py-1.5 text-body-sm text-text-secondary hover:bg-white/80 transition-all duration-200"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border-solid px-1.5 py-0.5 text-caption font-mono text-text-secondary/60">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
            <button
              onClick={toggleDark}
              className="text-text-secondary hover:text-text-primary transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <button className="relative text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-electric-bright text-[10px] font-bold text-electric-dark neon-glow-sm">
                3
              </span>
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-dark text-[11px] font-medium text-white">
              {mockSession.user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Command palette */}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}
