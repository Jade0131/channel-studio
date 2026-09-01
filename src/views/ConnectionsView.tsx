import { useState, useEffect } from 'react';
import { useAccountConnections } from '@/hooks/useAccountConnections';
import {
  Instagram,
  Facebook,
  Music2,
  Image,
  Linkedin,
  Plug,
  CheckCircle2,
  Circle,
  Info,
  AlertTriangle,
  Loader2,
  KeyRound,
  Lock,
  type LucideIcon,
} from 'lucide-react';

interface ConnectorDef {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
  powers: string;
  note: string;
  accountLabel: string;
  accountPlaceholder: string;
}

const CONNECTORS: ConnectorDef[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    icon: Instagram,
    powers: 'Instagram Pilot brain — reels, stories, posts',
    note: 'Secure login via Meta. Your access token is stored server-side and never kept in the browser.',
    accountLabel: 'Instagram username',
    accountPlaceholder: 'e.g. @yourhandle',
  },
  {
    id: 'facebook',
    label: 'Facebook / Meta',
    color: '#1877F2',
    icon: Facebook,
    powers: 'Meta bridge — login + permission hub for Instagram & Facebook',
    note: 'One Meta login can authorize Instagram. Secure OAuth via Meta.',
    accountLabel: 'Facebook account / page name',
    accountPlaceholder: 'e.g. Your Page',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#69C9D0',
    icon: Music2,
    powers: 'TikTok Setup brain — short-form video content',
    note: 'Secure TikTok OAuth login. Token stored server-side.',
    accountLabel: 'TikTok username',
    accountPlaceholder: 'e.g. @yourtiktok',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    color: '#E60023',
    icon: Image,
    powers: 'Pinterest Setup brain — dark fantasy, symbols, photography',
    note: 'Secure Pinterest OAuth login tied to your niche boards.',
    accountLabel: 'Pinterest username',
    accountPlaceholder: 'e.g. yourpinterest',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: Linkedin,
    powers: 'LinkedIn Setup brain — professional posts',
    note: 'Secure LinkedIn OAuth login. Token stored server-side.',
    accountLabel: 'LinkedIn name',
    accountPlaceholder: 'e.g. John Doe',
  },
];

const FACEBOOK_PREPOP = {
  pageName: 'Cosy Corner with Leni',
  pageUrl: 'https://www.facebook.com/profile.php?id=111681144140468',
  bio: 'Your safe space to unwind ✨ Relaxing reads, cozy vibes, inspiring quotes 📖💛 ...💙',
  category: 'Interest',
  location: 'Woking',
  followers: '42,524',
  following: '716',
  website: 'sophia-stars.workers.dev',
  profileImageUrl: '',
  pageId: '111681144140468',
};

export function ConnectionsView() {
  const { connections, startOAuth, handleCallback, connectManual, disconnect, dbReady, loaded } = useAccountConnections();
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<Record<string, string>>({});
  const [profileForm, setProfileForm] = useState<Record<string, Record<string, string>>>({});
  const [error, setError] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  // Handle OAuth callback on mount
  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  const connectedCount = CONNECTORS.filter((c) => connections[c.id]?.connected).length;

  const toggleForm = (id: string) => {
    setManualOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    // Pre-populate Facebook fields on first open
    if (id === 'facebook' && !profileForm[id]) {
      setProfileForm((prev) => ({ ...prev, [id]: { ...FACEBOOK_PREPOP } }));
      setForm((prev) => ({ ...prev, [id]: FACEBOOK_PREPOP.pageName }));
    }
  };

  const setProfileField = (provider: string, field: string, value: string) => {
    setProfileForm((prev) => ({ ...prev, [provider]: { ...(prev[provider] || {}), [field]: value } }));
  };

  const handleManualSave = async (connector: ConnectorDef) => {
    setError((prev) => ({ ...prev, [connector.id]: '' }));
    setSaving((prev) => ({ ...prev, [connector.id]: true }));
    const accountName = form[connector.id] || '';
    const token = form[`${connector.id}-token`] || '';
    const prof = profileForm[connector.id] || {};
    const result = await connectManual(connector.id, accountName, token, prof);
    if (!result.ok) {
      setError((prev) => ({ ...prev, [connector.id]: result.error || 'Connection failed' }));
    } else {
      setManualOpen((prev) => ({ ...prev, [connector.id]: false }));
    }
    setSaving((prev) => ({ ...prev, [connector.id]: false }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Connections</h1>
          <p className="text-sm text-slate-500 mt-1">
            Securely connect your social accounts with real login. Tokens are stored server-side in Supabase.
          </p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            connectedCount >= 4
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {connectedCount} / {CONNECTORS.length} connected
        </div>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
        <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          To use secure OAuth login, the platform developer credentials (client ID + secret) must be set as Supabase secrets, and the Edge Functions deployed. Until then, use "Manual entry" below — it stores a real account name (no fake ticks), verified pending.
          {dbReady
            ? ' Connected state syncs to your Supabase database and across devices.'
            : ' Saved on this device only — run the SQL migration to switch to cloud sync.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CONNECTORS.map((connector) => {
          const Icon = connector.icon;
          const conn = connections[connector.id];
          const connected = !!conn?.connected;
          const isSaving = !!saving[connector.id];
          const isOpen = !!manualOpen[connector.id];
          return (
            <div
              key={connector.id}
              className={`bg-white border rounded-xl p-5 transition-all flex flex-col ${
                connected ? 'border-emerald-200 shadow-sm' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${connector.color}1a` }}
                >
                  <Icon size={20} style={{ color: connector.color }} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">{connector.label}</h3>
                  <p className="text-[11px] text-slate-500 truncate">{connector.powers}</p>
                </div>
                {connected ? (
                  <CheckCircle2 size={18} className="text-emerald-500 ml-auto shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-300 ml-auto shrink-0" />
                )}
              </div>

              {connected ? (
                <div className="space-y-2 mt-1 flex-1">
                  <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                    <p className="text-[11px] text-slate-500">Account</p>
                    <p className="text-sm font-semibold text-slate-800 break-all">{conn?.accountName || '—'}</p>
                    {conn?.verified ? (
                      <p className="text-[11px] text-emerald-600 mt-1">✓ Verified with {connector.label}</p>
                    ) : (
                      <p className="text-[11px] text-amber-600 mt-1">Manual entry — platform verification pending</p>
                    )}
                  </div>
                  {/* Show profile metadata if available */}
                  {connections[connector.id]?.profileRaw && Object.keys(connections[connector.id].profileRaw).length > 0 && (
                    <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px] space-y-1">
                      {connections[connector.id].profileRaw.bio && (
                        <p className="text-slate-600 italic">{connections[connector.id].profileRaw.bio}</p>
                      )}
                      {connections[connector.id].profileRaw.followers && (
                        <p className="text-slate-500">👥 {connections[connector.id].profileRaw.followers} followers</p>
                      )}
                      {connections[connector.id].profileRaw.location && (
                        <p className="text-slate-500">📍 {connections[connector.id].profileRaw.location}</p>
                      )}
                      {connections[connector.id].profileRaw.category && (
                        <p className="text-slate-500">📂 {connections[connector.id].profileRaw.category}</p>
                      )}
                      {connections[connector.id].profileRaw.website && (
                        <p className="text-slate-500">🔗 {connections[connector.id].profileRaw.website}</p>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => disconnect(connector.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all mt-auto"
                  >
                    <Plug size={14} />
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="space-y-3 flex-1 flex flex-col">
                  <p className="text-xs text-slate-500 leading-relaxed">{connector.note}</p>

                  {/* Primary: OAuth login */}
                  <button
                    onClick={() => startOAuth(connector.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: connector.color }}
                  >
                    <KeyRound size={14} />
                    Login with {connector.label}
                  </button>

                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-slate-200" />
                    <span className="px-2 text-[10px] text-slate-400">OR</span>
                    <div className="flex-grow border-t border-slate-200" />
                  </div>

                  {/* Manual fallback */}
                  <button
                    onClick={() => toggleForm(connector.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                  >
                    <Lock size={14} />
                    {isOpen ? 'Hide manual entry' : 'Manual entry'}
                  </button>

                  {isOpen && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          {connector.accountLabel}
                        </label>
                        <input
                          type="text"
                          value={form[connector.id] || ''}
                          onChange={(e) => setForm((prev) => ({ ...prev, [connector.id]: e.target.value }))}
                          placeholder={connector.accountPlaceholder}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Access token (optional)
                        </label>
                        <input
                          type="password"
                          value={form[`${connector.id}-token`] || ''}
                          onChange={(e) => setForm((prev) => ({ ...prev, [`${connector.id}-token`]: e.target.value }))}
                          placeholder="Paste token if you have one"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 outline-none"
                        />
                      </div>

                      {/* Profile metadata fields */}
                      {isOpen && (
                        <div className="space-y-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Profile Details</p>
                          {[
                            { key: 'pageUrl', label: 'Profile / Page URL', placeholder: 'https://...' },
                            { key: 'bio', label: 'Bio / About', placeholder: 'Your bio here...', multiline: true },
                            { key: 'category', label: 'Category', placeholder: 'e.g. Interest' },
                            { key: 'location', label: 'Location', placeholder: 'e.g. Woking' },
                            { key: 'followers', label: 'Followers', placeholder: 'e.g. 42,524' },
                            { key: 'website', label: 'Website', placeholder: 'e.g. example.com' },
                            { key: 'profileImageUrl', label: 'Profile Image URL', placeholder: 'https://...' },
                          ].map(({ key, label, placeholder, multiline }) => (
                            <div key={key}>
                              <label className="block text-[10px] font-medium text-slate-500 mb-0.5">{label}</label>
                              {multiline ? (
                                <textarea
                                  value={profileForm[connector.id]?.[key] || ''}
                                  onChange={(e) => setProfileField(connector.id, key, e.target.value)}
                                  placeholder={placeholder}
                                  rows={2}
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none resize-none"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={profileForm[connector.id]?.[key] || ''}
                                  onChange={(e) => setProfileField(connector.id, key, e.target.value)}
                                  placeholder={placeholder}
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {error[connector.id] && (
                        <p className="text-xs text-rose-600 flex items-center gap-1">
                          <AlertTriangle size={13} /> {error[connector.id]}
                        </p>
                      )}

                      <button
                        onClick={() => handleManualSave(connector)}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-60"
                      >
                        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Plug size={14} />}
                        {isSaving ? 'Saving…' : 'Save & connect'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3">
        <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
        <p className="text-xs text-sky-700 leading-relaxed">
          {!loaded
            ? 'Loading saved connections…'
            : connectedCount === CONNECTORS.length
            ? 'All platforms connected. Every brain is unlocked.'
            : 'Use "Login with…" for the secure OAuth flow, or "Manual entry" to store a real account name. No fake ticks.'}
        </p>
      </div>
    </div>
  );
}
