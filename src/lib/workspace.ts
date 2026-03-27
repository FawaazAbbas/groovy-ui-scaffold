import { supabase } from './supabase';

// Generate a random invite code in XXXX-XXXX format
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/1/0 for clarity
  let code = '';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export interface Workspace {
  id: string;
  name: string;
  invite_code: string;
  created_by: string;
  plan: string;
  credits_remaining: number;
  credits_total: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  workspace_id: string | null;
  role: string;
  created_at: string;
}

/**
 * Fetch the current user's profile (including workspace association)
 */
export async function fetchUserProfile(): Promise<UserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

/**
 * Fetch the current user's workspace
 */
export async function fetchUserWorkspace(): Promise<Workspace | null> {
  const profile = await fetchUserProfile();
  if (!profile?.workspace_id) return null;

  const { data, error } = await supabase
    .from('company_workspaces')
    .select('*')
    .eq('id', profile.workspace_id)
    .single();

  if (error || !data) return null;
  return data as Workspace;
}

/**
 * Create a new workspace and set the current user as admin
 */
export async function createWorkspace(name: string): Promise<{ workspace: Workspace | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { workspace: null, error: 'Not authenticated' };

  const inviteCode = generateInviteCode();

  // Insert workspace
  const { data: workspace, error: wsError } = await supabase
    .from('company_workspaces')
    .insert({
      name,
      invite_code: inviteCode,
      created_by: user.id,
      plan: 'free',
      credits_remaining: 1000,
      credits_total: 1000,
    })
    .select()
    .single();

  if (wsError || !workspace) {
    return { workspace: null, error: wsError?.message || 'Failed to create workspace' };
  }

  // Update user profile to link to workspace as admin
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({ workspace_id: workspace.id, role: 'admin' })
    .eq('user_id', user.id);

  if (profileError) {
    return { workspace: null, error: profileError.message };
  }

  return { workspace: workspace as Workspace, error: null };
}

/**
 * Join an existing workspace using an invite code
 */
export async function joinWorkspace(inviteCode: string): Promise<{ workspace: Workspace | null; error: string | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { workspace: null, error: 'Not authenticated' };

  // Look up workspace by invite code
  const { data: workspace, error: wsError } = await supabase
    .from('company_workspaces')
    .select('*')
    .eq('invite_code', inviteCode.toUpperCase().trim())
    .single();

  if (wsError || !workspace) {
    return { workspace: null, error: 'Invalid invite code. Please check and try again.' };
  }

  // Update user profile to link to workspace as member
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({ workspace_id: workspace.id, role: 'member' })
    .eq('user_id', user.id);

  if (profileError) {
    return { workspace: null, error: profileError.message };
  }

  return { workspace: workspace as Workspace, error: null };
}

/**
 * Ensure a user_profiles row exists for the current user.
 * Called after sign-up or first login if the DB trigger hasn't fired.
 */
export async function ensureUserProfile(fullName?: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!data) {
    await supabase
      .from('user_profiles')
      .insert({
        user_id: user.id,
        full_name: fullName || user.user_metadata?.full_name || '',
        email: user.email || '',
        role: 'member',
      });
  }
}
