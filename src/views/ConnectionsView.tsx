import { useEffect, useState } from 'react';
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
  Sparkles,
  Info,
  type LucideIcon,
} from 'lucide-react';

interface ConnectorDef {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
  powers: string;
  note: string;
}

const CONNECTORS: ConnectorDef[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    icon: Instagram,
    powers: 'Instagram Pilot brain — reels, stories, posts',
    note: 'Connected through Meta. Uses the Instagram Graph API once wired.',
  },
  {
    id: 'facebook',
    label: 'Facebook / Meta',
    color: '#1877F2',
    icon: Facebook,
    powers: 'Meta bridge — login + permission hub for Instagram & Facebook',
    note: 'One Meta login can authorize Instagram too. This is why it makes sense as a connector.',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#69C9D0',
    icon: Music2,
    powers: 'TikTok Setup brain — short-form video content',
    note: 'Logs in with username or phone — no Google needed. API connector added later.',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    color: '#E60023',
    icon: Image,
    powers: 'Pinterest Setup brain — dark fantasy, symbols, photography',
    note: 'Your niche boards (dark fantasy, ancient symbols, succubus aesthetics) plug in here.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: Linkedin,
    powers: 'LinkedIn Setup brain — professional posts',
    note: 'Own API connector, own niche research, own schedule.',
  },
];

export function ConnectionsView() {
  const { connections, toggle, dbReady } = useAccountConnections();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const connectedCount = CONNECTORS.filter((c) => connections[c.id]).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Connections</h1>
          <p className="text-sm text-slate-500 mt-1">
            This is where your social accounts live. Tap Connect on each platform.
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

      <div className="flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 mb-6">
        <Info size={18} className="text-sky-500 mt-0.5 shrink-0" />
        <p className="text-xs text-sky-700 leading-relaxed">
          {dbReady
            ? 'Connections are saved to your Supabase database — they survive phone restarts and sync across devices. Still a demo tick (no password stored); real \u201cLogin with\u2026\u201d buttons come as we wire each platform.'
            : 'Right now Connect is a demo tick saved on this device only — the database table has not been created yet. Run the SQL migration (supabase/migrations/20260829200000_account_connections.sql) to switch connections to cloud storage.'}
          {' '}Facebook/Meta makes sense as a connector because one Meta login can also authorize Instagram.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CONNECTORS.map((connector) => {
          const Icon = connector.icon;
          const connected = !!connections[connector.id];
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
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">{connector.label}</h3>
                  <p className="text-[11px] text-slate-500 truncate">{connector.powers}</p>
                </div>
                {connected ? (
                  <CheckCircle2 size={18} className="text-emerald-500 ml-auto shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-300 ml-auto shrink-0" />
                )}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">{connector.note}</p>

              <button
                onClick={() => toggle(connector.id)}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  connected
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'text-white hover:opacity-90'
                }`}
                style={connected ? undefined : { backgroundColor: connector.color }}
              >
                <Plug size={14} />
                {connected ? 'Connected — tap to remove' : 'Connect account'}
              </button>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-6 transition-all duration-500 ${
          ready && connectedCount === CONNECTORS.length ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <Sparkles size={18} className="text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800">
            All platforms connected! Every brain is unlocked — head to Channel Rollout to
            start the flow.
          </p>
        </div>
      </div>
    </div>
  );
}
