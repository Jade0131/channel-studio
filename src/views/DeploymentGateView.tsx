import { DEPLOYMENT_CHECKLIST } from '@/data/testPlan';
import { getWorkflowStage } from '@/data/workflow';
import type { UseTestPlanReturn } from '@/hooks/useTestPlan';
import type { DeploymentChecklistItem } from '@/types';
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  ShieldAlert,
  Rocket,
  Wrench,
  Bug,
  AlertTriangle,
  Lock,
  Unlock,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  'core-tests': { label: 'Core Tests', icon: CheckCircle2, color: '#0EA5E9' },
  'quality': { label: 'Quality', icon: Bug, color: '#F59E0B' },
  'process': { label: 'Process', icon: AlertTriangle, color: '#8B5CF6' },
  'readiness': { label: 'Readiness', icon: ShieldCheck, color: '#10B981' },
};

const SEVERITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  blocker: { color: '#EF4444', bg: '#FEE2E2', label: 'Blocker' },
  major: { color: '#F59E0B', bg: '#FFFBEB', label: 'Major' },
  minor: { color: '#64748B', bg: '#F1F5F9', label: 'Minor' },
};

const STATUS_BADGE: Record<string, { color: string; bg: string; label: string }> = {
  open: { color: '#EF4444', bg: '#FEE2E2', label: 'Open' },
  fixing: { color: '#F59E0B', bg: '#FFFBEB', label: 'Fixing' },
  resolved: { color: '#10B981', bg: '#ECFDF5', label: 'Resolved' },
};

interface DeploymentGateViewProps {
  testPlan: UseTestPlanReturn;
}

export function DeploymentGateView({ testPlan }: DeploymentGateViewProps) {
  const {
    checklist,
    toggleChecklistItem,
    issues,
    updateIssueStatus,
    allTestsRun,
    criticalTestsPassed,
    importantTestsPassed,
    openBlockers,
    requiredChecklistComplete,
    canDeploy,
    decision,
    makeDecision,
    passCount,
    warningCount,
    failCount,
  } = testPlan;

  const groupedChecklist = DEPLOYMENT_CHECKLIST.reduce(
    (acc, item) => {
      const liveItem = checklist.find((c) => c.id === item.id) || item;
      if (!acc[liveItem.category]) acc[liveItem.category] = [];
      acc[liveItem.category].push(liveItem);
      return acc;
    },
    {} as Record<string, DeploymentChecklistItem[]>
  );

  const requiredCount = checklist.filter((c) => c.required).length;
  const requiredChecked = checklist.filter((c) => c.required && c.checked).length;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Deployment Gate</h2>
        <p className="text-sm text-slate-500">
          Confirm deployment readiness. The gate opens only when all critical tests pass, blockers
          are resolved, and the required checklist is complete.
        </p>
      </div>

      {/* Readiness Banner */}
      <div
        className={`rounded-xl border p-5 mb-6 transition-all ${
          canDeploy
            ? 'bg-emerald-50 border-emerald-300'
            : 'bg-amber-50 border-amber-300'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              canDeploy ? 'bg-emerald-100' : 'bg-amber-100'
            }`}
          >
            {canDeploy ? (
              <ShieldCheck size={24} className="text-emerald-600" />
            ) : (
              <ShieldAlert size={24} className="text-amber-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-semibold ${canDeploy ? 'text-emerald-800' : 'text-amber-800'}`}>
              {canDeploy
                ? 'Deployment Ready — All gates passed'
                : 'Not Ready — Complete remaining requirements'}
            </h3>
            <p className={`text-xs mt-0.5 ${canDeploy ? 'text-emerald-600' : 'text-amber-600'}`}>
              {canDeploy
                ? 'The universal baseline workflow has passed validation and is cleared for deployment.'
                : `${requiredCount - requiredChecked} required checklist items pending, ${openBlockers.length} open blockers, or core tests incomplete.`}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{passCount}</p>
              <p className="text-[10px] text-slate-500">Passed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
              <p className="text-[10px] text-slate-500">Warnings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-rose-500">{failCount}</p>
              <p className="text-[10px] text-slate-500">Failed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gate Conditions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <GateCondition
          label="All tests executed"
          passed={allTestsRun}
          detail={allTestsRun ? 'All 7 test scenarios have been run' : 'Some tests have not been run yet'}
        />
        <GateCondition
          label="Critical tests passed"
          passed={criticalTestsPassed}
          detail={criticalTestsPassed ? 'All critical-weight tests passed or warned' : 'One or more critical tests failed or are pending'}
        />
        <GateCondition
          label="Important tests passed"
          passed={importantTestsPassed}
          detail={importantTestsPassed ? 'All important-weight tests passed or warned' : 'One or more important tests failed or are pending'}
        />
        <GateCondition
          label="No open blockers"
          passed={openBlockers.length === 0}
          detail={openBlockers.length === 0 ? 'No blocker-severity issues remain open' : `${openBlockers.length} blocker issue(s) need resolution`}
        />
        <GateCondition
          label="Required checklist complete"
          passed={requiredChecklistComplete}
          detail={requiredChecklistComplete ? 'All required checklist items are checked' : `${requiredCount - requiredChecked} required item(s) still need to be checked`}
        />
        <GateCondition
          label="Decision recorded"
          passed={decision !== 'pending'}
          detail={decision === 'ready' ? 'Decision: Deploy' : decision === 'rework' ? 'Decision: Rework' : 'No decision made yet'}
        />
      </div>

      {/* Deployment Checklist */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Deployment Readiness Checklist</h3>
          <span className="text-xs text-slate-400">
            {requiredChecked}/{requiredCount} required items checked
          </span>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedChecklist).map(([category, items]) => {
            const catCfg = CATEGORY_CONFIG[category];
            const CatIcon = catCfg.icon;
            return (
              <div key={category} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${catCfg.color}12` }}
                  >
                    <CatIcon size={16} style={{ color: catCfg.color }} />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">{catCfg.label}</h4>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        item.checked
                          ? 'bg-emerald-50/50 border border-emerald-100'
                          : 'bg-slate-50 border border-sl