// Edge Function: auth_start
// GET /functions/v1/auth_start?provider=instagram
// Generates the OAuth authorization URL and redirects the user to it.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getProviderConfig, REDIRECT_BASE } from "../_shared/config.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const provider = url.searchParams.get('provider');
    const state = url.searchParams.get('state'); // optional CSRF token

    if (!provider) {
      return new Response(JSON.stringify({ error: 'Missing provider parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const config = getProviderConfig(provider);
    if (!config) {
      return new Response(JSON.stringify({ error: `Unknown provider: ${provider}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientId = Deno.env.get(config.clientIdEnv);
    const redirectUri = `${REDIRECT_BASE}${config.redirectPath}`;

    if (!clientId) {
      return new Response(JSON.stringify({ error: `Missing ${config.clientIdEnv} secret in Supabase` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build the authorization URL. Each platform has a slightly different param style.
    let authUrl: URL;

    if (provider === 'tiktok') {
      authUrl = new URL(config.authorizeUrl);
      authUrl.searchParams.set('client_key', clientId);
      authUrl.searchParams.set('scope', config.scopes);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('state', state || crypto.randomUUID());
    } else if (provider === 'pinterest') {
      authUrl = new URL(config.authorizeUrl);
      authUrl.searchParams.set('client_id', clientId);
      authUrl.searchParams.set('scope', config.scopes);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('state', state || crypto.randomUUID());
    } else {
      // instagram, facebook, linkedin all use standard params
      authUrl = new URL(config.authorizeUrl);
      authUrl.searchParams.set('client_id', clientId);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('state', state || crypto.randomUUID());
      authUrl.searchParams.set('response_type', 'code');
      if (provider === 'linkedin') {
        authUrl.searchParams.set('scope', config.scopes);
      } else {
        // facebook/instagram: scope is space-separated
        authUrl.searchParams.set('scope', config.scopes);
      }
    }

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: authUrl.toString(),
      },
    });

  } catch (err) {
    console.error('auth_start error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
