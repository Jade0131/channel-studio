# Channel Studio — Supabase Edge Functions Setup

Real platform login (OAuth) requires Supabase Edge Functions to securely exchange
authorization codes for access tokens. This guide covers deploying the two functions
and setting the platform credentials.

## Prerequisites

1. Supabase project (already live for this project)
2. Developer apps registered on each platform (Meta, TikTok, Pinterest, LinkedIn)
3. Supabase CLI installed: `npm i -g supabase` (or use the dashboard to deploy)

## Step 1 — Run the updated migration

The `account_connections` table now has additional columns for OAuth tokens and
profile data. Run the SQL from `supabase/migrations/20260829200000_account_connections.sql`
in the Supabase dashboard SQL Editor, or if running fresh the full migration will
create the table with all columns.

If you already have the table, run this manually in the SQL Editor:

```sql
alter table public.account_connections
  add column if not exists account_name text,
  add column if not exists access_token text,
  add column if not exists verified boolean not null default false,
  add column if not exists external_id text,
  add column if not exists refresh_token text,
  add column if not exists expires_at timestamptz,
  add column if not exists profile_raw text;
```

## Step 2 — Set Supabase secrets

Set the platform OAuth credentials as Supabase secrets. These are injected into
the Edge Functions environment at runtime (not stored in code).

Via Supabase Dashboard → Settings → Edge Functions → Secrets, OR via CLI:

```bash
supabase secrets set \
  APP_URL="https://channel-studio.pages.dev" \
  INSTAGRAM_CLIENT_ID="your_instagram_client_id" \
  INSTAGRAM_CLIENT_SECRET="your_instagram_client_secret" \
  FACEBOOK_CLIENT_ID="your_facebook_client_id" \
  FACEBOOK_CLIENT_SECRET="your_facebook_client_secret" \
  TIKTOK_CLIENT_KEY="your_tiktok_client_key" \
  TIKTOK_CLIENT_SECRET="your_tiktok_client_secret" \
  PINTEREST_CLIENT_ID="your_pinterest_app_id" \
  PINTEREST_CLIENT_SECRET="your_pinterest_app_secret" \
  LINKEDIN_CLIENT_ID="your_linkedin_client_id" \
  LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"
```

## Step 3 — Deploy the Edge Functions

From the project root (where `supabase/` lives):

```bash
supabase functions deploy auth_start --no-verify-jwt
supabase functions deploy auth_callback --no-verify-jwt
```

Or deploy via the Supabase Dashboard → Edge Functions.

## Step 4 — Configure platform redirect URIs

Each platform's developer app needs the following callback URL registered:

| Platform   | Redirect URI                                              |
|------------|-----------------------------------------------------------|
| Instagram  | `https://<PROJECT_REF>.supabase.co/functions/v1/auth_callback` |
| Facebook   | `https://<PROJECT_REF>.supabase.co/functions/v1/auth_callback` |
| TikTok     | `https://<PROJECT_REF>.supabase.co/functions/v1/auth_callback` |
| Pinterest  | `https://<PROJECT_REF>.supabase.co/functions/v1/auth_callback` |
| LinkedIn   | `https://<PROJECT_REF>.supabase.co/functions/v1/auth_callback` |

Where `<PROJECT_REF>` is your Supabase project reference ID (visible in the dashboard URL).

## How the flow works

1. User clicks "Login with Instagram" → frontend opens `/functions/v1/auth_start?provider=instagram`
2. `auth_start` builds the correct OAuth URL with your client ID and redirects the user
3. User logs in on the platform and approves permissions
4. Platform redirects back to `/functions/v1/auth_callback?code=xxx&state=instagram`
5. `auth_callback` exchanges the code for an access token, fetches the user profile, stores
   everything in `account_connections`, and redirects the user back to the frontend
6. Frontend shows the connected account name and "✓ Verified" status

## What happens without platform credentials

If the secrets aren't set yet, clicking "Login with X" will show a server error
and redirect back. The "Manual entry" option always works as a fallback — it stores
a real account name without any OAuth, and the connection state is honest
("Manual entry — platform verification pending").

## Each platform's developer app registration

### Meta (Instagram + Facebook)
- https://developers.facebook.com/
- Create an app → set type (Business or Consumer) → enable Instagram Graph API
- For Facebook: add `pages_show_list`, `pages_read_engagement`, `pages_manage_posts` permissions
- For Instagram: add `user_profile`, `user_media` permissions

### TikTok
- https://developers.tiktok.com/
- Create an app → set redirect URI → request `user.info.basic`, `video.upload`, `video.publish` scopes
- TikTok API access requires app review for write permissions

### Pinterest
- https://developers.pinterest.com/
- Create an app → set redirect URI → request `boards:read`, `pins:read`, `pins:write` scopes
- Pinterest apps don't require heavy review for basic read access

### LinkedIn
- https://www.linkedin.com/developers/
- Create an app → add product "Sign In with LinkedIn using OpenID Connect"
- Set redirect URI → request `w_member_social`, `r_liteprofile`, `r_emailaddress` scopes
- LinkedIn requires verified app domain for production use
