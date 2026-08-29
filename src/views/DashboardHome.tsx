import { PLATFORMS, CONTENT_STAGES, getFormat } from '@/data/platforms';
import { MOCK_CONTENT } from '@/data/mockContent';
import type { PlatformId, ViewId } from '@/types';
import { ArrowRight, LayoutDashboard } from 'lucide-react';

interface DashboardHomeProps {
  onPlatformSelect: (platformId: PlatformId) => void;
  onNavigate: (view: ViewId) => void;
}

export function DashboardHome({ onPlatformSelect, onNavigate }: DashboardHomeProps) {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <LayoutDashboard size={18} className="text-sky-500" />
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        </div>
        <p className="text-sm text-slate-500">
          Overview of all channels, content pipeline, and workflow status
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Channels</h3>
        <div className="grid grid-cols-2 gap-4">
          {PLATFORMS.map((platform) => {
            const platformContent = MOCK_CONTENT.filter((c) => c.platform === platform.id);
            const platformPublished = platformContent.filter((c) => c.stage === 'published').length;
            return (
              <button
                key={platform.id}
                onClick={() => onPlatformSelect(platform.id)}
                className="group text-left bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: `${platform.color}18`, color: platform.color }}
                    >
                      {platform.label[0]}
                    </span>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{platform.label}</h4>
                      <p className="text-xs text-slate-400">{platformContent.length} items</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{platform.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {platform.formats.map((fmtId) => {
                    const fmt = getFormat(fmtId);
                    return fmt ? (
                      <span
                        key={fmtId}
                        className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600"
                      >
                        {fmt.label}
                      </span>
                    ) : null;
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{platformPublished} published</span>
                  <span className="text-slate-400">{platformContent.length - platformPublished} in progress</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pipeline Overview</h3>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2">
            {CONTENT_STAGES.map((stage, i) => {
              const count = MOCK_CONTENT.filter((c) => c.stage === stage.id).length;
              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <div className="flex-1 text-center">
                    <div
                      className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold mb-2"
                      style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                    >
                      {count}
                    </div>
                    <p className="text-xs font-medium text-slate-600">{stage.label}</p>
                  </div>
                  {i < CONTENT_STAGES.length - 1 && (
                    <div className="h-0.5 flex-1 bg-slate-200 -mt-6" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
