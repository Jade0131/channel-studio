import { useState } from 'react';
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
  type LucideIcon,
} from 'lucide-react';

interface ConnectorDef {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
  powers: string;
  note: string;
  credentialLabel: string;
  credentialPlaceholder: string;
  requiresCredential: boolean;
}

const CONNECTORS: ConnectorDef[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    icon: Instagram,
    powers: 'Instagram Pilot brain — reels, stories, posts',
    note: 'Connects through Meta. Needs your Instagram username and a Meta/Instagram access token.',
    credentialLabel: 'Instagram username',
    credentialPlaceholder: 'e.g. @yourhandle',
    requiresCredential: true,
  },
  {
    id: 'facebook',
    label: 'Facebook / Meta',
    color: '#1877F2',
    icon: Facebook,
    powers: 'Meta bridge — login + permission hub for Instagram & Facebook',
    note: 'Enter the Facebook account name/page tied to your Meta. One login can authorize Instagram too.',
    credentialLabel: 'Facebook account / page name',
    credentialPlaceholder: 'e.g. Your Page',
    requiresCredential: true,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#69C9D0',
    icon: Music2,
    powers: 'TikTok Setup brain — short-form video content',
    note: 'Logs in with username or phone. Enter your TikTok username and access token if you have one.',
    credentialLabel: 'TikTok username',
    credentialPlaceholder: 'e.g. @yourtiktok',
    requiresCredential: true,
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    color: '#E60023',
    icon: Image,
    powers: 'Pinterest Setup brain — dark fantasy, symbols, photography',
    note: 'Enter the Pinterest username tied to your niche boards (dark fantasy, ancient symbols).',
    credentialLabel: 'Pinterest username',
    credentialPlaceholder: 'e.g. yourpinterest',
    requiresCredential: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: Linkedin,
    powers: 'LinkedIn Setup brain — professional posts',
    note: 'Enter your LinkedIn profile / company page name and a token if you have one.',
    credentialLabel: 'LinkedIn name',
    credentialPlaceholder: 'e.g. John Doe',
    requiresCredential: true,
  },
];

export function ConnectionsView() {
  const { connections, connect, disconnect, dbReady, loaded } = useAccountConnections();
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const connectedCount = CONNECTORS.filter((c) => connections[c.id]?.connected).length;

  const handleConnect = async (connector: ConnectorDef) => {
    setError((prev) => ({ ...prev, [connector.id]: '' }));
    setSaving((prev) => ({ ...prev, [connector.id]: true }));
    const accountName = form[connector.id] || '';
    const token = form[`${connector.id}-token`] || '';
    const result = await connect(connector.id, accountName, token);
    if (!result.ok) {
      setError((prev) => ({ ...prev, [connector.id]: result.error || 'Connection failed' }));
    }
    setSaving((prev) => ({ ...prev, [connector.id]: false }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Connections</h1>
          <p className="text-sm text-slate-500 mt-1">
            Enter your real account details for each platform. Nothing happens until you provide a valid account name.
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
          These are manual connects — you enter your account name and optional access token, and the system records it. A real
          "verified" badge only appears once we wire a platform API check. Until then, an entry is stored but not verified by the platform.
          {dbReady
            ? ' Connections are saved to your Supabase database and sync across devices.'
            : ' Connections are saved on this device only — run the SQL migration to switch to cloud storage.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CONNECTORS.map((connector) => {
          const Icon = connector.icon;
          const conn = connections[connector.id];
          const connected = !!conn?.connected;
          const isSaving = !!saving[connector.id];
          return (
            <div
              key={connector.id}
              className={`bg-white border rounded-xl p-5 transition-all ${
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
                <div className="space-y-2">
                  <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                    <p className="text-[11px] text-slate-500">Account</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {conn?.accountName || '—'}
                    </p>
                    {conn?.verified ? (
                      <p className="text-[11px] text-emerald-600 mt-1">✓ Verified with platform</p>
                    ) : (
                      <p className="text-[11px] text-amber-600 mt-1">Saved — platform verification pending</p>
                    )}
                  </div>
                  <button
                    onClick={() => disconnect(connector.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
                  >
                    <Plug size={14} />
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 leading-relaxed">{connector.note}</p>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      {connector.credentialLabel}
                    </label>
                    <input
                      type="text"
                      value={form[connector.id] || ''}
                      onChange={(e) => setForm((prev) => ({ ...prev, [connector.id]: e.target.value }))}
                      placeholder={connector.credentialPlaceholder}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none"
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
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none"
                    />
                  </div>

                  {error[connector.id] && (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertTriangle size={13} /> {error[connector.id]}
                    </p>
                  )}

                  <button
                    onClick={() => handleConnect(connector)}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all disabled:opacity-60"
                    style={{ backgroundColor: connector.color }}
                  >
                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Plug size={14} />}
                    {isSaving ? 'Connecting…' : 'Save & connect'}
                  </button>
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
            ? 'All platforms have an account saved. Head to Channel Rollout when you are ready.'
            : 'No fake ticks — an account only counts as connected once you enter a real account name above.'}
        </p>
      </div>
    </div>
  );
}
