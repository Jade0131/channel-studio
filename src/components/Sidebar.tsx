import { PLATFORMS } from '@/data/platforms';
import type { PlatformId, ViewId } from '@/types';
import {
  LayoutDashboard,
  Workflow,
  ArrowRightLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Instagram,
  Music2,
  Image,
  Linkedin,
  ChevronRight,
  Zap,
  CheckSquare,
  Boxes,
  FlaskConical,
  ShieldCheck,
  Rocket,
  Shield,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Instagram,
  Music2,
  Image,
  Linkedin,
};

interface SidebarProps {
  activeView: ViewId;
  activePlatform: PlatformId | null;
  onNavigate: (view: ViewId) => void;
  onPlatformSelect: (platformId: PlatformId) => void;
}

const NAV_SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' as ViewId },
  { id: 'workflow', label: 'Baseline Workflow', icon: Zap, view: 'workflow' as ViewId },
  { id: 'approval', label: 'Weekly Approval', icon: CheckSquare, view: 'approval' as ViewId },
  { id: 'pipeline', label: 'Content Pipeline', icon: Workflow, view: 'pipeline' as ViewId },
  { id: 'extensions', label: 'Extension Points', icon: Boxes, view: 'extensions' as ViewId },
  { id: 'inputs', label: 'Standard Inputs', icon: ArrowDownToLine, view: 'inputs' as ViewId },
  { id: 'outputs', label: 'Standard Outputs', icon: ArrowUpFromLine, view: 'outputs' as ViewId },
  { id: 'handoff', label: 'Handoff Flow', icon: ArrowRightLeft, view: 'content' as ViewId },
  { id: 'test-plan', label: 'Test Plan', icon: FlaskConical, view: 'test-plan' as ViewId },
  { id: 'deployment-gate', label: 'Deployment Gate', icon: ShieldCheck, view: 'deployment-gate' as ViewId },
  { id: 'channel-rollout', label: 'Channel Rollout', icon: Rocket, view: 'channel-rollout' as ViewId },
  { id: 'fallback-path', label: 'Fallback Path', icon: Shield, view: 'fallback-path' as ViewId },
  { id: 'instagram-pilot', label: 'Instagram Pilot', icon: Sparkles, view: 'instagram-pilot' as ViewId },
  { id: 'tiktok-setup', label: 'TikTok Setup', icon: Music2, view: 'tiktok-setup' as ViewId },
  { id: 'linkedin-setup', label: 'LinkedIn Setup', icon: Linkedin, view: 'linkedin-setup' as ViewId },
];

export function Sidebar({ activeView, activePlatform, onNavigate, onPlatformSelect }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Workflow size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">Channel Studio</h1>
            <p className="text-slate-500 text-xs">Social Content Workflow</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Overview
          </p>
          <div className="space-y-1">
            {NAV_SECTIONS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.view)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-400 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-sky-400' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Channels
          </p>
          <div className="space-y-1">
            {PLATFORMS.map((platform) => {
              const Icon = ICON_MAP[platform.icon] || Image;
              const isActive = activeView === 'platform' && activePlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => onPlatformSelect(platform.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-slate-800 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${platform.color}20` }}
                  >
                    <Icon size={15} style={{ color: platform.color }} />
                  </span>
                  <span className="flex-1 text-left">{platform.label}</span>
                  <ChevronRight
                    size={14}
                    className={isActive ? 'text-slate-400' : 'text-slate-600'}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Workflow active</span>
        </div>
      </div>
    </aside>
  );
}
