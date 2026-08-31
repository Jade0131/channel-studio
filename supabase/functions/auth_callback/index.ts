// Edge Function: auth_callback
// Receives the OAuth code from the platform redirect, exchanges it for an access token,
// optionally fetches the user profile, stores everything in Supabase, and redirects
// the user back to the frontend with the connection status.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getProviderConfig, REDIRECT_BASE } from "../_shared/config.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface TokenResponse {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  refresh_token?: string;
  error?: string;
  error_description?: string;
}

// ── Profile fetchers per platform ──

async function fetchInstagramProfile(accessToken: string): Promise<{ name: string; id: string } | null> {
  try {
    const res = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
    if (!res.ok) return null;
    const data = await res.json();
    return { name: data.username ?? '', id: data.id ?? '' };
  } catch { return null; }
}

async function fetchFacebookProfile(accessToken: string): Promise<{ name: string; id: string } | null> {
  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${accessToken}`);
    if (!res.ok) return null;
    const data = await res.json();
    return { name: data.name ?? '', id: data.id ?? '' };
  } catch { return null; }
}

async function fetchTikTokProfile(accessToken: string): Promise<{ name: string; id: string } | null> {
  try {
    const res = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=display_name,open_id', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const user = data?.data?.user;
    return { name: user?.display_name ?? '', id: user?.open_id ?? '' };
  } catch { return null; }
}

async function fetchPinterestProfile(accessToken: string): Promise<{ name: string; id: string } | null> {
  try {
    const res = await fetch('https://api.pinterest.com/v5/user_account', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { name: data.username ?? data.full_name ?? '', id: data.id ?? '' };
  } catch { return null; }
}

async function fetchLinkedInProfile(accessToken: string): Promise<{ name: string; id: string } | null> {
  try {
    const res = await fetch('https://api.linkedin.com/v2/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const name = `${data.localizedFirstName ?? ''} ${data.localizedLastName ?? ''}`.trim();
    return { name, id: data.id ?? '' };
  } catch { return null; }
}

const PROFILE_FETCHERS: Record<string, (token: string) => Promise<{ name: string; id: string } | null>> = {
  instagram: fetchInstagramProfile,
  facebook: fetchFacebookProfile,
  tiktok: fetchTikTokProfile,
  pinterest: fetchPinterestProfile,
  linkedin: fetchLinkedInProfile,
};

// ── Token exchange per platform ──

async function exchangeCode(config: ReturnType<typeof getProviderConfig> & {}, code: string, redirectUri: string): Promise<TokenResponse> {
  const clientSecret = Deno.env.get(config.clientSecretEnv);
  if (!clientSecret) throw new Error(`Missing ${config.clientSecretEnv}`);

  if (config.provider === 'tiktok') {
    const body = new URLSearchParams();
    body.set('client_key', Deno.env.get(config.clientIdEnv) ?? '');
    body.set('client_secret', clientSecret);
    body.set('code', code);
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', redirectUri);
    const res = await fetch(config.tokenUrl, { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    if (!res.ok) throw new Error(`TikTok token exchange failed: ${res.status}`);
    const data = await res.json();
    return { access_token: data.data?.access_token, expires_in: data.data?.expires_in, refresh_token: data.data?.refresh_token ?? undefined };
  }

  if (config.provider === 'linkedin') {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', redirectUri);
    body.set('client_id', Deno.env.get(config.clientIdEnv) ?? '');
    body.set('client_secret', clientSecret);
    const res = await fetch(config.tokenUrl, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!res.ok) throw new Error(`LinkedIn token exchange failed: ${res.status}`);
    return await res.json();
  }

  // instagram, facebook, pinterest — standard params
  const params = new URLSearchParams({
    client_id: Deno.env.get(config.clientIdEnv) ?? '',
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  // instagram requires empty body to get access_token
  if (config.provider === 'instagram') {
    params.delete('grant_type');
    params.delete('client_secret');
  }

  const res = await fetch(config.tokenUrl, {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const data: TokenResponse = await res.json();
  if (!res.ok) throw new Error(data.error_description || `Token exchange failed: ${res.status}`);
  return data;
}

// ── Main handler ──

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    // URL pattern: /functions/v1/auth_callback?code=xxx&state=provider_name
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const provider = state || 'instagram'; // state carries provider name

    if (!code) {
      return new Response('No code provided — authorization failed.', { status: 400 });
    }

    const config = getProviderConfig(provider);
    if (!config) {
      return new Response('Unknown provider.', { status: 400 });
    }

    const redirectUri = `${REDIRECT_BASE}${config.redirectPath}`;
    const tokenData = await exchangeCode(config, code, redirectUri);

    if (!tokenData.access_token) {
      throw new Error(tokenData.error || 'No access token in response');
    }

    // Fetch profile if a fetcher exists
    const fetcher = PROFILE_FETCHERS[provider];
    const profile = fetcher ? await fetcher(tokenData.access_token) : null;

    // Store in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const accountName = profile?.name ?? 'Connected';
    const externalId = profile?.id ?? null;

    const upsertPayload: Record<string, unknown> = {
      provider,
      label: config.provider,
      connected: true,
      verified: true,
      account_name: accountName,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token ?? null,
      expires_at: tokenData.expires_in
        ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
        : null,
      external_id: externalId,
      profile_raw: profile ? JSON.stringify(profile) : null,
      updated_at: new Date().toISOString(),
    };

    const { error: dbErr } = await supabase
      .from('account_connections')
      .upsert(upsertPayload, { onConflict: 'provider' });

    if (dbErr) console.error('DB write failed:', dbErr.message);

    // Redirect back to frontend with success state
    const appUrl = REDIRECT_BASE === 'http://localhost:5173'
      ? `${REDIRECT_BASE}`
      : REDIRECT_BASE;

    const redirectUrl = `${appUrl}#/connected/${provider}?status=ok&name=${encodeURIComponent(accountName)}`;

    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: redirectUrl },
    });

  } catch (err) {
    console.error('auth_callback error:', err);
    const provider = new URL(req.url).searchParams.get('state') ?? 'unknown';
    const errorRedirect = `${REDIRECT_BASE}#/connected/${provider}?status=error&error=${encodeURIComponent(String(err))}`;
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: errorRedirect },
    });
  }
});
