// Platform OAuth configuration.
// Values are injected at deploy time via `supabase secrets set`.
// Frontend-facing values (client ids + redirect URI) can be public.

export interface OAuthConfig {
  provider: string;
  authorizeUrl: string;
  tokenUrl: string;
  clientIdEnv: string;
  clientSecretEnv: string;
  scopes: string;
  redirectPath: string;
}

export const REDIRECT_BASE = Deno.env.get('APP_URL') ?? 'http://localhost:5173';

export const OAUTH_PROVIDERS: Record<string, OAuthConfig> = {
  instagram: {
    provider: 'instagram',
    authorizeUrl: 'https://api.instagram.com/oauth/authorize',
    tokenUrl: 'https://api.instagram.com/oauth/access_token',
    clientIdEnv: 'INSTAGRAM_CLIENT_ID',
    clientSecretEnv: 'INSTAGRAM_CLIENT_SECRET',
    scopes: 'user_profile,user_media',
    redirectPath: '/auth/instagram/callback',
  },
  facebook: {
    provider: 'facebook',
    authorizeUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v19.0/oauth/access_token',
    clientIdEnv: 'FACEBOOK_CLIENT_ID',
    clientSecretEnv: 'FACEBOOK_CLIENT_SECRET',
    scopes: 'pages_show_list,pages_read_engagement,pages_manage_posts',
    redirectPath: '/auth/facebook/callback',
  },
  tiktok: {
    provider: 'tiktok',
    authorizeUrl: 'https://www.tiktok.com/v2/auth/authorize/',
    tokenUrl: 'https://open.tiktokapis.com/v2/oauth/token/',
    clientIdEnv: 'TIKTOK_CLIENT_ID',
    clientSecretEnv: 'TIKTOK_CLIENT_SECRET',
    scopes: 'user.info.basic,video.upload,video.publish',
    redirectPath: '/auth/tiktok/callback',
  },
  pinterest: {
    provider: 'pinterest',
    authorizeUrl: 'https://www.pinterest.com/oauth/',
    tokenUrl: 'https://api.pinterest.com/v5/oauth/token',
    clientIdEnv: 'PINTEREST_CLIENT_ID',
    clientSecretEnv: 'PINTEREST_CLIENT_SECRET',
    scopes: 'boards:read,pins:read,pins:write',
    redirectPath: '/auth/pinterest/callback',
  },
  linkedin: {
    provider: 'linkedin',
    authorizeUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    clientIdEnv: 'LINKEDIN_CLIENT_ID',
    clientSecretEnv: 'LINKEDIN_CLIENT_SECRET',
    scopes: 'w_member_social,r_liteprofile,r_emailaddress',
    redirectPath: '/auth/linkedin/callback',
  },
};

export function getProviderConfig(provider: string): OAuthConfig | null {
  return OAUTH_PROVIDERS[provider] ?? null;
}
