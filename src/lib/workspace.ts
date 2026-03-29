import { supabase } from './supabase';
import { type User } from '@supabase/supabase-js';

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
export async function fetchUserProfile(user: User): Promise<UserProfile | null> {
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
 * Fetch a workspace by ID (avoids redundant profile re-fetch)
 */
export async function fetchWorkspaceById(workspaceId: string): Promise<Workspace | null> {
  const { data, error } = await supabase
    .from('company_workspaces')
    .select('*')
    .eq('id', workspaceId)
    .single();

  if (error || !data) return null;
  return data as Workspace;
}

/**
 * Create a new workspace and set the current user as admin
 */
export async function createWorkspace(
  name: string,
  currentUser: User | null,
  industry?: string,
  size?: string,
  jobTitle?: string
): Promise<{ workspace: Workspace | null; error: string | null }> {
  if (!currentUser) return { workspace: null, error: 'Not authenticated' };
  const user = currentUser;

  const inviteCode = generateInviteCode();

  // Insert workspace
  const { data: workspace, error: wsError } = await supabase
    .from('company_workspaces')
    .insert({
      name,
      industry: industry || null,
      size: size || null,
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

  // Update user profile to link to workspace as admin and save job title
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({ 
      workspace_id: workspace.id, 
      role: 'admin',
      job_title: jobTitle || null
    })
    .eq('user_id', user.id);

  if (profileError) {
    return { workspace: null, error: profileError.message };
  }

  return { workspace: workspace as Workspace, error: null };
}

/**
 * Join an existing workspace using an invite code
 */
export async function joinWorkspace(
  inviteCode: string,
  currentUser: User | null,
  jobTitle?: string
): Promise<{ workspace: Workspace | null; error: string | null }> {
  if (!currentUser) return { workspace: null, error: 'Not authenticated' };
  const user = currentUser;

  // Look up workspace by invite code
  const { data: workspace, error: wsError } = await supabase
    .from('company_workspaces')
    .select('*')
    .eq('invite_code', inviteCode.toUpperCase().trim())
    .single();

  if (wsError || !workspace) {
    return { workspace: null, error: 'Invalid invite code. Please check and try again.' };
  }

  // Update user profile to link to workspace as member and save job title
  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({ 
      workspace_id: workspace.id, 
      role: 'member',
      job_title: jobTitle || null
    })
    .eq('user_id', user.id);

  if (profileError) {
    return { workspace: null, error: profileError.message };
  }

  return { workspace: workspace as Workspace, error: null };
}

/**
 * Ensure a user_profiles row exists and return it in one pass.
 * Replaces the old ensureUserProfile + fetchUserProfile two-step.
 */
export async function ensureAndFetchProfile(user: User, fullName?: string): Promise<UserProfile | null> {
  if (!user) return null;

  const { data: existing } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (existing) return existing as UserProfile;

  // Profile doesn't exist — create it and return
  const { data: created } = await supabase
    .from('user_profiles')
    .insert({
      user_id: user.id,
      full_name: fullName || user.user_metadata?.full_name || '',
      email: user.email || '',
      role: 'member',
    })
    .select()
    .single();

  return (created as UserProfile) || null;
}
