import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  MessageSquare, CheckSquare, Calendar, FolderOpen, Activity,
  Network, Puzzle, CreditCard, Search, Bell, ChevronLeft, ChevronRight,
  Menu, X, Command,
} from 'lucide-react';
import { mockSession } from '@/lib/mocks/session';
import { CommandPalette } from '@/components/CommandPalette';

const navItems = [
  { label: 'Chats', icon: MessageSquare, path: '/chats' },
  { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { label: 'Calendar', icon: Calendar, path: '/calendar' },
  { label: 'Files', icon: FolderOpen, path: '/files' },
  { label: 'Activity', icon: Activity, path: '/activity' },
  { label: 'Architecture', icon: Network, path: '/architecture' },
  { label: 'Integrations', icon: Puzzle, path: '/integrations' },
  { label: 'Billing', icon: CreditCard, path: '/billing' },
];

export default function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const location = useLocation();

  const sidebarWidth = collapsed ? 'w-16' : 'w-[260px]';

  // Cmd+K handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // handled globally
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background" onKeyDown={handleKeyDown}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarWidth} fixed md:relative z-50 flex h-full flex-col bg-sidebar text-sidebar-text transition-all duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Workspace header */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          {!collapsed && (
            <span className="truncate text-body-sm font-semibold">{mockSession.workspace.name}</span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-body-sm transition-colors ${
                  isActive
                    ? 'border-l-2 border-primary bg-comfort/10 text-comfort'
                    : 'border-l-2 border-transparent text-sidebar-text/70 hover:bg-white/5 hover:text-sidebar-text'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-white/10 p-4">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
              {mockSession.user.name.split(' ').map(n => n[0]).join('')}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-body-sm font-medium">{mockSession.user.name}</p>
                <p className="truncate text-caption text-sidebar-text/50">{mockSession.user.role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle - desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-10 items-center justify-center border-t border-white/10 text-sidebar-text/50 hover:text-sidebar-text transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-1.5 text-body-sm text-text-secondary">
              <Link to="/chats" className="hover:text-text-primary">Workspace</Link>
              <span>/</span>
              <span className="text-text-primary font-medium capitalize">
                {location.pathname.split('/')[1] || 'chats'}
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-body-sm text-text-secondary hover:border-primary/30 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-caption font-mono">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
            <button className="relative text-text-secondary hover:text-text-primary">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                3
              </span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
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
