import { useState, useCallback, useMemo } from 'react';
import { RECOVERY_CHECKS, FALLBACK_PRE_DEPLOY_CHECKS } from '@/data/fallback';
import type { FailureCaseId, FallbackMode, RecoveryCheck, FallbackPreDeployCheck } from '@/types';

export function useFallback() {
  const [mode, setMode] = useState<FallbackMode>('normal');
  const [activeFailure, setActiveFailure] = useState<FailureCaseId | null>(null);
  const [recoveryChecks, setRecoveryChecks] = useState<RecoveryCheck[]>(RECOVERY_CHECKS);
  const [preDeployChecks, setPreDeployChecks] = useState<FallbackPreDeployCheck[]>(FALLBACK_PRE_DEPLOY_CHECKS);
  const [fallbackStepProgress, setFallbackStepProgress] = useState(0);

  const triggerFallback = useCallback((failureId: FailureCaseId) => {
    setActiveFailure(failureId);
    setMode('fallback');
    setFallbackStepProgress(0);
    setRecoveryChecks(RECOVERY_CHECKS.map((c) => ({ ...c, checked: false })));
  }, []);

  const advanceFallbackStep = useCallback(() => {
    setFallbackStepProgress((prev) => Math.min(prev + 1, 8));
  }, []);

  const beginRecovery = useCallback(() => {
    setMode('recovering');
  }, []);

  const toggleRecoveryCheck = useCallback((checkId: string) => {
    setRecoveryChecks((prev) =>
      prev.map((c) => (c.id !== checkId ? c : { ...c, checked: !c.checked }))
    );
  }, []);

  const completeRecovery = useCallback(() => {
    setMode('normal');
    setActiveFailure(null);
    setFallbackStepProgress(0);
    setRecoveryChecks(RECOVERY_CHECKS.map((c) => ({ ...c, checked: false })));
  }, []);

  const togglePreDeployCheck = useCallback((checkId: string) => {
    setPreDeployChecks((prev) =>
      prev.map((c) => (c.id !== checkId ? c : { ...c, checked: !c.checked }))
    );
  }, []);

  const requiredRecoveryComplete = useMemo(
    () => recoveryChecks.filter((c) => c.required).every((c) => c.checked),
    [recoveryChecks]
  );

  const canRecover = useMemo(
    () => mode === 'fallback' || mode === 'recovering',
    [mode]
  );

  const canCompleteRecovery = useMemo(
    () => mode === 'recovering' && requiredRecoveryComplete,
    [mode, requiredRecoveryComplete]
  );

  const preDeployRequiredComplete = useMemo(
    () => preDeployChecks.filter((c) => c.required).every((c) => c.checked),
    [preDeployChecks]
  );

  const preDeployRequiredCount = preDeployChecks.filter((c) => c.required).length;
  const preDeployCheckedCount = preDeployChecks.filter((c) => c.required && c.checked).length;

  return {
    mode,
    activeFailure,
    fallbackStepProgress,
    recoveryChecks,
    preDeployChecks,
    triggerFallback,
    advanceFallbackStep,
    beginRecovery,
    toggleRecoveryCheck,
    completeRecovery,
    togglePreDeployCheck,
    requiredRecoveryComplete,
    canRecover,
    canCompleteRecovery,
    preDeployRequiredComplete,
    preDeployRequiredCount,
    preDeployCheckedCount,
  };
}

export type UseFallbackReturn = ReturnType<typeof useFallback>;
