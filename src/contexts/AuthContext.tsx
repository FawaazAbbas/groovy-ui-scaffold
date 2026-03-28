import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { type User, type Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  type Workspace,
  type UserProfile,
  fetchUserProfile,
  fetchUserWorkspace,
  createWorkspace as createWs,
  joinWorkspace as joinWs,
  ensureUserProfile,
} from '@/lib/workspace';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  workspace: Workspace | null;
  hasWorkspace: boolean;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ error: Error | null }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithMicrosoft: () => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  createWorkspace: (name: string, industry?: string, size?: string, jobTitle?: string) => Promise<{ error: string | null }>;
  joinWorkspace: (inviteCode: string, jobTitle?: string) => Promise<{ error: string | null }>;
  refreshWorkspace: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);

  // Load profile + workspace for a given user
  const loadWorkspaceData = useCallback(async (currentUser: User | null) => {
    if (!currentUser || !isSupabaseConfigured) {
      setProfile(null);
      setWorkspace(null);
      return;
    }

    // Prevent concurrent loads
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      await ensureUserProfile(currentUser, currentUser.user_metadata?.full_name);
      const userProfile = await fetchUserProfile(currentUser);
      setProfile(userProfile);

      if (userProfile?.workspace_id) {
        const ws = await fetchUserWorkspace(currentUser);
        setWorkspace(ws);
      } else {
        setWorkspace(null);
      }
    } catch (err) {
      console.error('Error loading workspace data:', err);
      setProfile(null);
      setWorkspace(null);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        await loadWorkspaceData(s.user);
      }
      if (mounted) setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        const newUser = newSession?.user ?? null;
        setUser(newUser);

        // Await load before setting loading false
        if (newUser) {
          await loadWorkspaceData(newUser);
        } else {
          setProfile(null);
          setWorkspace(null);
        }
        if (mounted) setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadWorkspaceData]);

  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/space/marketplace`,
      },
    });
    return { error: error as Error | null };
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/space/marketplace`,
      },
    });
    return { error: error as Error | null };
  };

  const signInWithMicrosoft = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/space/marketplace`,
        scopes: 'email profile openid',
      },
    });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/workspace-setup`,
      },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setWorkspace(null);
  };

  const createWorkspace = async (name: string, industry?: string, size?: string, jobTitle?: string) => {
    const { workspace: ws, error } = await createWs(name, industry, size, jobTitle);
    if (ws && user) {
      setWorkspace(ws);
      const updatedProfile = await fetchUserProfile(user);
      setProfile(updatedProfile);
    }
    return { error };
  };

  const joinWorkspace = async (inviteCode: string, jobTitle?: string) => {
    const { workspace: ws, error } = await joinWs(inviteCode, jobTitle);
    if (ws && user) {
      setWorkspace(ws);
      const updatedProfile = await fetchUserProfile(user);
      setProfile(updatedProfile);
    }
    return { error };
  };

  const refreshWorkspace = useCallback(async () => {
    if (user) {
      await loadWorkspaceData(user);
    }
  }, [user, loadWorkspaceData]);

  return (
    <AuthContext.Provider value={{
      user, session, profile, workspace,
      hasWorkspace: !!workspace,
      loading,
      signInWithEmail, signInWithPassword,
      signInWithGoogle, signInWithMicrosoft,
      signUp, signOut,
      createWorkspace, joinWorkspace, refreshWorkspace,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
