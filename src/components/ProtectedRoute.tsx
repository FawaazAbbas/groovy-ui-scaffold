import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function ProtectedRoute() {
  const { user, hasWorkspace, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-body-sm text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Demo mode — allow through without real auth
  if (!isSupabaseConfigured) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but no workspace — redirect to setup
  if (!hasWorkspace) {
    return <Navigate to="/workspace-setup" replace />;
  }

  return <Outlet />;
}
