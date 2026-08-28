import { useState, useCallback, useMemo } from 'react';
import { MOCK_RUNS, MOCK_APPROVAL_BATCHES } from '@/data/workflow';
import { MOCK_CONTENT } from '@/data/mockContent';
import type { WorkflowStageId, RunStatus, ApprovalDecision, PlatformId } from '@/types';

interface RunState {
  stageId: WorkflowStageId;
  status: RunStatus;
}

const INITIAL_RUN_STATES: RunState[] = [
  { stageId: 'trigger', status: 'complete' },
  { stageId: 'topic-selection', status: 'complete' },
  { stageId: 'brief-creation', status: 'complete' },
  { stageId: 'draft-generation', status: 'running' },
  { stageId: 'asset-production', status: 'pending' },
  { stageId: 'caption-variants', status: 'pending' },
];

export function useWorkflow() {
  const [runStates, setRunStates] = useState<RunState[]>(INITIAL_RUN_STATES);
  const [fallbackActive, setFallbackActive] = useState(false);
  const [approvalBatches, setApprovalBatches] = useState(MOCK_APPROVAL_BATCHES);

  const advanceStage = useCallback((stageId: WorkflowStageId) => {
    setRunStates((prev) => {
      const idx = prev.findIndex((r) => r.stageId === stageId);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = { ...next[idx], status: 'complete' };
      if (idx + 1 < next.length) {
        next[idx + 1] = { ...next[idx + 1], status: 'running' };
      }
      return next;
    });
  }, []);

  const resetRun = useCallback(() => {
    setRunStates(INITIAL_RUN_STATES);
  }, []);

  const toggleFallback = useCallback(() => {
    setFallbackActive((prev) => !prev);
  }, []);

  const setApprovalDecision = useCallback(
    (batchId: string, contentId: string, decision: ApprovalDecision, reviewer: string, notes: string) => {
      setApprovalBatches((prev) =>
        prev.map((batch) =>
          batch.id !== batchId
            ? batch
            : {
                ...batch,
                items: batch.items.map((item) =>
                  item.contentId !== contentId
                    ? item
                    : { ...item, decision, reviewer, notes }
                ),
              }
        )
      );
    },
    []
  );

  const closeBatch = useCallback((batchId: string) => {
    setApprovalBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: 'closed' } : b))
    );
  }, []);

  const todayRuns = useMemo(() => MOCK_RUNS.filter((r) => r.date === '2026-08-16'), []);

  const currentStage = useMemo(
    () => runStates.find((r) => r.status === 'running'),
    [runStates]
  );

  const completedCount = useMemo(
    () => runStates.filter((r) => r.status === 'complete').length,
    [runStates]
  );

  const pendingApprovals = useMemo(
    () => {
      const openBatch = approvalBatches.find((b) => b.status === 'open');
      return openBatch ? openBatch.items.filter((i) => i.decision === 'pending').length : 0;
    },
    [approvalBatches]
  );

  return {
    runStates,
    todayRuns,
    currentStage,
    completedCount,
    advanceStage,
    resetRun,
    fallbackActive,
    toggleFallback,
    approvalBatches,
    setApprovalDecision,
    closeBatch,
    pendingApprovals,
  };
}

export type UseWorkflowReturn = ReturnType<typeof useWorkflow>;
