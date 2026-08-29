import { useState, useCallback, useMemo } from 'react';
import { ROLLOUT_SEQUENCE } from '@/data/channelRollout';
import type {
  ChannelRolloutStep,
  ChannelRolloutStatus,
  RolloutEntryCriterion,
  ChannelCheckpoint,
} from '@/types';

export function useRollout() {
  const [steps, setSteps] = useState<ChannelRolloutStep[]>(ROLLOUT_SEQUENCE);

  const toggleEntryCriterion = useCallback((stepId: string, criterionId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id !== stepId
          ? step
          : {
              ...step,
              entryCriteria: step.entryCriteria.map((c) =>
                c.id !== criterionId ? c : { ...c, met: !c.met }
              ),
            }
      )
    );
  }, []);

  const toggleCheckpoint = useCallback((stepId: string, checkpointId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id !== stepId
          ? step
          : {
              ...step,
              checkpoints: step.checkpoints.map((c) =>
                c.id !== checkpointId ? c : { ...c, passed: !c.passed }
              ),
            }
      )
    );
  }, []);

  const updateStepStatus = useCallback((stepId: string, status: ChannelRolloutStatus) => {
    setSteps((prev) => prev.map((s) => (s.id !== stepId ? s : { ...s, status })));
  }, []);

  const allEntryCriteriaMet = useCallback(
    (step: ChannelRolloutStep) => step.entryCriteria.every((c) => c.met),
    []
  );

  const allCheckpointsPassed = useCallback(
    (step: ChannelRolloutStep) => step.checkpoints.every((c) => c.passed),
    []
  );

  const areDependenciesMet = useCallback(
    (step: ChannelRolloutStep, allSteps: ChannelRolloutStep[]) => {
      if (step.dependencies.length === 0) return true;
      return step.dependencies.every((depId) => {
        const dep = allSteps.find((s) => s.id === depId);
        return dep && (dep.status === 'passed' || dep.status === 'in-progress');
      });
    },
    []
  );

  const canActivate = useCallback(
    (step: ChannelRolloutStep) => {
      if (step.status === 'passed') return false;
      return allEntryCriteriaMet(step) && areDependenciesMet(step, steps);
    },
    [allEntryCriteriaMet, areDependenciesMet, steps]
  );

  const canComplete = useCallback(
    (step: ChannelRolloutStep) => {
      if (step.status !== 'in-progress') return false;
      return allCheckpointsPassed(step);
    },
    [allCheckpointsPassed]
  );

  const activateStep = useCallback(
    (stepId: string) => {
      setSteps((prev) => {
        const step = prev.find((s) => s.id === stepId);
        if (!step || !canActivate(step)) return prev;
        return prev.map((s) => (s.id === stepId ? { ...s, status: 'in-progress' } : s));
      });
    },
    [canActivate]
  );

  const completeStep = useCallback(
    (stepId: string) => {
      setSteps((prev) => {
        const step = prev.find((s) => s.id === stepId);
        if (!step || !canComplete(step)) return prev;
        return prev.map((s) => (s.id === stepId ? { ...s, status: 'passed' } : s));
      });
    },
    [canComplete]
  );

  const resetStep = useCallback((stepId: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id !== stepId
          ? s
          : {
              ...s,
              status: 'locked',
              entryCriteria: s.entryCriteria.map((c) => ({ ...c, met: false })),
              checkpoints: s.checkpoints.map((c) => ({ ...c, passed: false })),
            }
      )
    );
  }, []);

  const resetAll = useCallback(() => {
    setSteps(
      ROLLOUT_SEQUENCE.map((s) => ({
        ...s,
        status: 'locked' as ChannelRolloutStatus,
        entryCriteria: s.entryCriteria.map((c) => ({ ...c, met: false })),
        checkpoints: s.checkpoints.map((c) => ({ ...c, passed: false })),
      }))
    );
  }, []);

  const currentStep = useMemo(
    () => steps.find((s) => s.status === 'in-progress'),
    [steps]
  );

  const completedCount = useMemo(
    () => steps.filter((s) => s.status === 'passed').length,
    [steps]
  );

  const isFullyRolledOut = useMemo(
    () => steps.filter((s) => s.checkpoints.length > 0).every((s) => s.status === 'passed'),
    [steps]
  );

  return {
    steps,
    currentStep,
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
  };
}

export type UseRolloutReturn = ReturnType<typeof useRollout>;
