import { useState } from 'react';
import { useRollout } from '@/hooks/useRollout';
import { getPlatform } from '@/data/platforms';
import { ROLLOUT_DEPENDENCIES, PHASE_LABELS, PHASE_COLORS } from '@/data/channelRollout';
import type { ChannelRolloutStep, RolloutPhaseId } from '@/types';
import {
  Rocket,
  Lock,
  Unlock,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Layers,
  GitBranch,
  Flag,
  TrendingUp,
  Clock,
  type LucideIcon,
} from 'lucide-react';

const STATUS_CONFIG: Record<
  string,
  { icon: LucideIcon; color: string; bg: string; label: string }
> = {
  locked: { icon: Lock, color: '#94A3B8', bg: '#F1F5F9', label: 'Locked' },
  ready: { icon: Unlock, color: '#0EA5E9', bg: '#E0F2FE', label: 'Ready' },
  'in-progress': { icon: Clock, color: '#F59E0B', bg: '#FFFBEB', label: 'In Progress' },
  passed: { icon: CheckCircle2, color: '#10B981', bg: '#ECFDF5', label: 'Passed' },
  blocked: { icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2', label: 'Blocked' },
};

export function ChannelRolloutView() {
  const rollout = useRollout();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const {
    steps,
    completedCount,
    isFullyRolledOut,
    toggleEntryCriterion,
    toggleCheckpoint,
    activateStep,
    completeStep,
    resetStep,
    resetAll,
    canActivate,
    canComplete,
    allEntryCriteriaMet,
    allCheckpointsPassed,
    areDependenciesMet,
  } = rollout;

  const channelSteps = steps.filter((s) => s.checkpoints.length > 0);
  const phaseSteps = steps.filter((s) => s.checkpoints.length === 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Channel Rollout</h2>
        <p className="text-sm text-slate-500">
          A gated, phased path from the deployed universal baseline into channel-specific setups.
          Each channel is added one at a time, only after the previous step passes its checks.
        </p>
      </div>

      {/* Progress Banner */}
      <div
        className={`rounded-xl border p-5 mb-6 transition-all ${
          isFullyRolledOut
            ? 'bg-emerald-50 border-emerald-300'
            : 'bg-sky-50 border-sky-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isFullyRolledOut ? 'bg-emerald-100' : 'bg-sky-100'
            }`}
          >
            {isFullyRolledOut ? (
              <ShieldCheck size={24} className="text-emerald-600" />
            ) : (
              <TrendingUp size={24} className="text-sky-600" />
            )}
          </div>
          <div className="flex-1">
            <h3
              className={`text-sm font-semibold ${
                isFullyRolledOut ? 'text-emerald-800' : 'text-sky-800'
              }`}
            >
              {isFullyRolledOut
                ? 'All channels rolled out'
                : `${completedCount} of ${steps.length} steps complete`}
            </h3>
            <p
              className={`text-xs mt-0.5 ${
                isFullyRolledOut ? 'text-emerald-600' : 'text-sky-600'
              }`}
            >
              {isFullyRolledOut
                ? 'Every channel is running a channel-specific flow on top of the validated baseline.'
                : 'Channels are added one at a time. The baseline workflow stays running underneath as the safety line.'}
            </p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw size={13} />
            Reset All
          </button>
        </div>
      </div>

      {/* Working Rule Callout */}
      <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
        <div classNa                       {statusCfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{step.notes}</p>
                  </div>

                  {platform && !isPhase && (
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{
                        backgroundColor: `${platform.color}18`,
                        color: platform.color,
                      }}
                    >
                      {platform.label[0]}
                    </span>
                  )}

                  {step.status === 'passed' && (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  )}
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                    {/* Entry Criteria */}
                    <div className="mt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-2 flex items-center gap-1.5">
                        <Flag size={12} />
                        Entry Criteria
                        <span className="ml-1 text-slate-300">
                          ({step.entryCriteria.filter((c) => c.met).length}/{step.entryCriteria.length} met)
                        </span>
                      </p>
                      <div className="space-y-1.5">
                        {step.entryCriteria.map((criterion) => {
                          const met = criterion.met;
                          return (
                            <button
                              key={criterion.id}
                              onClick={() => toggleEntryCriterion(step.id, criterion.id)}
                              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                                met
                                  ? 'bg-emerald-50/50 border border-emerald-100'
                                  : 'bg-slate-50 border border-slate-100 hover:bg-slate-100'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  met ? 'bg-emerald-500' : 'bg-white border border-slate-300'
                                }`}
                              >
                                {met ? (
                                  <CheckCircle2 size={12} className="text-white" />
                                ) : (
                                  <Circle size={12} className="text-transparent" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`text-sm font-medium ${
                                    met ? 'text-slate-700' : 'text-slate-600'
                                  }`}
                                >
                                  {criterion.label}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                  {criterion.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Checkpoints (only for channel steps) */}
                    {step.checkpoints.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 size={12} />
  