import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface AccountConnection {
  id: string;
  provider: string;
  label: string;
  connected: boolean;
}

const LOCAL_KEY = 'channel-studio-connections';

export function useAccountConnections() {
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [dbReady, setDbReady] = useState(false);

  // Load from Supabase if available, else localStorage.
  useEffect(() => {
    let local: Record<string, boolean> = {};
    try {
      local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    } catch {
      local = {};
    }
    setConnections(local);

    (async () => {
      try {
        const { data, error } = await supabase
          .from('account_connections')
          .select('provider, connected');
        if (error) throw error;
        if (data) {
          const map: Record<string, boolean> = {};
          for (const row of data) map[row.provider] = row.connected;
          setConnections((prev) => ({ ...prev, ...map }));
          setDbReady(true);
        }
      } catch {
        // DB table not created yet — stay on local storage.
        setDbReady(false);
      }
    })();
  }, []);

  const toggle = async (provider: string) => {
    const next = !connections[provider];
    setConnections((prev) => ({ ...prev, [provider]: next }));

    // Persist to local always.
    try {
      const merged = { ...connections, [provider]: next };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
    } catch {
      /* ignore */
    }

    // Persist to Supabase when the table exists.
    if (dbReady) {
      try {
        await supabase
          .from('account_connections')
          .update({ connected: next, updated_at: new Date().toISOString() })
          .eq('provider', provider);
      } catch {
        /* ignore — local copy already saved */
      }
    }
  };

  return { connections, toggle, dbReady };
}
