import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface AccountConnection {
  provider: string;
  label: string;
  connected: boolean;
  verified: boolean;
  accountName: string;
  accessToken: string;
  externalId: string;
  expiresAt: string;
  profileRaw: Record<string, string>;
}

const LOCAL_KEY = 'channel-studio-connections';

const PROVIDER_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook / Meta',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  linkedin: 'LinkedIn',
};

function emptyConnections(): Record<string, AccountConnection> {
  const out: Record<string, AccountConnection> = {};
  for (const [p, label] of Object.entries(PROVIDER_LABELS)) {
    out[p] = {
      provider: p,
      label,
      connected: false,
      verified: false,
      accountName: '',
      accessToken: '',
      externalId: '',
      expiresAt: '',
      profileRaw: {},
    };
  }
  return out;
}

export function useAccountConnections() {
  const [connections, setConnections] = useState<Record<string, AccountConnection>>(emptyConnections());
  const [dbReady, setDbReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage first
    let local: Record<string, AccountConnection> = {};
    try {
      local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    } catch {
      local = {};
    }
    const merged = { ...emptyConnections(), ...local };
    setConnections(merged);
    setLoaded(true);

    // Then load real state from Supabase
    (async () => {
      try {
        const { data, error } = await supabase
          .from('account_connections')
          .select('provider, label, connected, verified, account_name, access_token, external_id, expires_at, profile_raw');
        if (error) throw error;
        if (data) {
          const map = emptyConnections();
          for (const row of data) {
            let profileRaw: Record<string, string> = {};
            try {
              if (row.profile_raw) {
                profileRaw = typeof row.profile_raw === 'string' ? JSON.parse(row.profile_raw) : row.profile_raw;
              }
            } catch { /* ignore parse errors */ }
            map[row.provider] = {
              provider: row.provider,
              label: row.label || PROVIDER_LABELS[row.provider] || row.provider,
              connected: !!row.connected,
              verified: !!row.verified,
              accountName: row.account_name || '',
              accessToken: row.access_token || '',
              externalId: row.external_id || '',
              expiresAt: row.expires_at || '',
              profileRaw,
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
      // Don't persist access tokens in localStorage for security — only state + account name
      const safeCopy = Object.fromEntries(
        Object.entries(next).map(([k, v]) => [k, { ...v, accessToken: '' }])
      );
      localStorage.setItem(LOCAL_KEY, JSON.stringify(safeCopy));
    } catch { /* ignore */ }
  }, []);

  const syncToDb = useCallback(
    async (conn: AccountConnection) => {
      if (!dbReady) return;
      try {
        await supabase
          .from('account_connections')
          .upsert(
            {
              provider: conn.provider,
              label: conn.label,
              connected: conn.connected,
              verified: conn.verified,
              account_name: conn.accountName || null,
              access_token: conn.accessToken || null,
              external_id: conn.externalId || null,
              expires_at: conn.expiresAt || null,
              profile_raw: Object.keys(conn.profileRaw || {}).length > 0 ? JSON.stringify(conn.profileRaw) : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'provider' }
          );
      } catch { /* local copy already saved */ }
    },
    [dbReady]
  );

  // ── OAuth login ──
  const startOAuth = useCallback((provider: string) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const fnUrl = `${supabaseUrl}/functions/v1/auth_start?provider=${provider}&state=${provider}`;
    // Open in same tab — the function will redirect to the platform auth page
    window.location.href = fnUrl;
  }, []);

  // Called on page load to handle OAuth callback URL params
  const handleCallback = useCallback(() => {
    const hash = window.location.hash || '';
    const match = hash.match(/#\/connected\/(\w+)\?status=(\w+)/);
    if (!match) return null;
    const [, provider, status] = match;
    const params = new URLSearchParams(hash.split('?')[1] || '');
    const name = params.get('name') || '';
    const error = params.get('error') || '';

    if (provider && status === 'ok') {
      setConnections((prev) => {
        const next = {
          ...prev,
          [provider]: {
            ...prev[provider],
            connected: true,
            verified: true,
            accountName: name || prev[provider].accountName,
            profileRaw: prev[provider].profileRaw || {},
          },
        };
        persistLocal(next);
        return next;
      });
      // Sync to DB after state update
      setTimeout(() => {
        const conn = connections[provider];
        if (conn) syncToDb({ ...conn, connected: true, verified: true, accountName: name || conn.accountName });
      }, 100);
      // Clean up URL
      window.history.replaceState(null, '', window.location.pathname);
      return { provider, status: 'ok', name };
    }

    if (provider && status === 'error') {
      window.history.replaceState(null, '', window.location.pathname);
      return { provider, status: 'error', error };
    }

    return null;
  }, [connections, persistLocal, syncToDb]);

  // ── Manual connect ──
  const connectManual = useCallback(
    async (provider: string, accountName: string, accessToken: string, profileRaw: Record<string, string> = {}) => {
      const name = accountName.trim();
      if (!name) return { ok: false, error: 'Account name is required.' };
      const nextConn: AccountConnection = {
        provider,
        label: PROVIDER_LABELS[provider] || provider,
        connected: true,
        verified: false,
        accountName: name,
        accessToken: accessToken.trim(),
        externalId: '',
        expiresAt: '',
        profileRaw,
      };
      setConnections((prev) => {
        const next = { ...prev, [provider]: nextConn };
        persistLocal(next);
        return next;
      });
      syncToDb(nextConn);
      return { ok: true, error: null };
    },
    [persistLocal, syncToDb]
  );

  // ── Disconnect ──
  const disconnect = useCallback(
    async (provider: string) => {
      const disconnected: AccountConnection = {
        provider,
        label: PROVIDER_LABELS[provider] || provider,
        connected: false,
        verified: false,
        accountName: '',
        accessToken: '',
        externalId: '',
        expiresAt: '',
        profileRaw: {},
      };
      setConnections((prev) => {
        const next = { ...prev, [provider]: disconnected };
        persistLocal(next);
        return next;
      });
      syncToDb(disconnected);
    },
    [persistLocal, syncToDb]
  );

  return { connections, startOAuth, handleCallback, connectManual, disconnect, dbReady, loaded };
}
