import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { type Agent } from '@/lib/mocks/agents';

let cachedAgents: Agent[] | null = null;
let fetchPromise: Promise<Agent[]> | null = null;

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>(cachedAgents || []);
  const [loading, setLoading] = useState(!cachedAgents);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedAgents) {
      setAgents(cachedAgents);
      setLoading(false);
      return;
    }

    async function fetchAgents() {
      if (!isSupabaseConfigured) {
        const { mockAgents } = await import('@/lib/mocks/agents');
        cachedAgents = mockAgents;
        setAgents(mockAgents);
        setLoading(false);
        return;
      }

      if (!fetchPromise) {
        fetchPromise = (async () => {
          const { data, error } = await supabase.from('agents').select('*');
          if (error) throw error;
          if (!data) return [];
          return data.map(val => ({
            id: val.id,
            name: val.name,
            description: val.description,
            longDescription: val.long_description,
            category: val.category,
            publisher: val.publisher,
            avatar: val.avatar,
            rating: Number(val.rating),
            reviewCount: val.review_count,
            installCount: val.install_count,
            creditCost: val.credit_cost,
            featured: val.featured,
            capabilities: val.capabilities || [],
            requiredIntegrations: val.required_integrations || [],
            screenshots: val.screenshots || [],
            changelog: val.changelog || [],
            reviews: val.reviews || []
          }));
        })();
      }

      try {
        const result = await fetchPromise;
        cachedAgents = result;
        setAgents(result);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch agents'));
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  return { agents, loading, error };
}
