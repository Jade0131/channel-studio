import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface AccountConnection {
  provider: string;
  label: string;
  connected: boolean;
  accountName: string;
  accessToken: string;
  verified: boolean;
}

const LOCAL_KEY = 'channel-studio-connections';

const EMPTY: Record<string, AccountConnection> = {};

function emptyConnections(): Record<string, AccountConnection> {
  const providers = ['instagram', 'facebook', 'tiktok', 'pinterest', 'linkedin'];
  const labels: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook / Meta',
    tiktok: 'TikTok',
    pinterest: 'Pinterest',
    linkedin: 'LinkedIn',
  };
  const out: Record<string, AccountConnection> = {};
  for (const p of providers) {
    out[p] = {
      provider: p,
      label: labels[p],
      connected: false,
      accountName: '',
      accessToken: '',
      verified: false,
    };
  }
  return out;
}

export function useAccountConnections() {
  const [connections, setConnections] = useState<Record<string, AccountConnection>>(EMPTY);
  const [dbReady, setDbReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage first for instant UI.
    let local: Record<string, AccountConnection> = {};
    try {
      local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    } catch {
      local = {};
    }
    const merged = { ...emptyConnections(), ...local };
    setConnections(merged);
    setLoaded(true);

    // Load real state from Supabase if the table exists.
    (async () => {
      try {
        const { data, error } = await supabase
          .from('account_connections')
          .select('provider, label, connected, account_name, access_token, verified');
        if (error) throw error;
        if (data) {
          const map = emptyConnections();
          for (const row of data) {
            map[row.provider] = {
              provider: row.provider,
              label: row.label || map[row.provider]?.label || row.provider,
              connected: !!row.connected,
              accountName: row.account_name || '',
              accessToken: row.access_token || '',
              verified: !!row.verified,
            };
          }
          setConnections((prev) => ({ ...prev, ...map }));
          setDbReady(true);
        }
      } catch {
        setDbReady(false);
      }
    })();
  }, []);

  const persistLocal = useCallback((next: Record<string, AccountConnection>) => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  // Real connect: requires an account name. Stores the credential and marks verified
  // only when we can actually validate it (kept honest — manual entry is 'pending').
  const connect = useCallback(
    async (provider: string, accountName: string, accessToken: string) => {
      const name = accountName.trim();
      if (!name) {
        return { ok: false, error: 'Account name is required.' };
      }
      const nextConn: AccountConnection = {
        provider,
        label: connections[provider]?.label || provider,
        connected: true,
        accountName: name,
        accessToken: accessToken.trim(),
        verified: false, // never claim verified without a real platform check
      };
      setConnections((prev) => {
        const next = { ...prev, [provider]: nextConn };
        persistLocal(next);
        return next;
      });
      if (dbReady) {
        try {
          await supabase
            .from('account_connections')
            .upsert(
              {
                provider,
                label: nextConn.label,
                connected: true,
                account_name: name,
                access_token: accessToken.trim() || null,
                verified: false,
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'provider' }
            );
        } catch {
          /* local copy already saved */
        }
      }
      return { ok: true, error: null };
    },
    [connections, dbReady, persistLocal]
  );

  const disconnect = useCallback(
    async (provider: string) => {
      setConnections((prev) => {
        const next = {
          ...prev,
          [provider]: { ...prev[provider], connected: false, accountName: '', accessToken: '', verified: false },
        };
        persistLocal(next);
        return next;
      });
      if (dbReady) {
        try {
          await supabase
            .from('account_connections')
            .update({ connected: false, account_name: null, access_token: null, verified: false, updated_at: new Date().toISOString() })
            .eq('provider', provider);
        } catch {
          /* ignore */
        }
      }
    },
    [dbReady, persistLocal]
  );

  return { connections, connect, disconnect, dbReady, loaded };
}
