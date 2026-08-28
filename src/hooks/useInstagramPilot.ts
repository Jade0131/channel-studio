import { useState, useCallback, useMemo } from 'react';
import {
  PILOT_PREREQUISITES,
  BASELINE_REUSE,
  INSTAGRAM_ADJUSTMENTS,
  PILOT_CHECKS,
  REUSABLE_LESSONS,
} from '@/data/instagramPilot';
import type {
  PrerequisiteCheck,
  BaselineElement,
  InstagramAdjustment,
  PilotCheck,
  ReusableLesson,
} from '@/types';

export type PilotPhase = 'prerequisites' | 'baseline-mapping' | 'adjustments' | 'pilot-checks' | 'lessons';

export function useInstagramPilot() {
  const [prerequisites, setPrerequisites] = useState<PrerequisiteCheck[]>(PILOT_PREREQUISITES);
  const [baselineElements, setBaselineElements] = useState<BaselineElement[]>(BASELINE_REUSE);
  const [adjustments, setAdjustments] = useState<InstagramAdjustment[]>(INSTAGRAM_ADJUSTMENTS);
  const [pilotChecks, setPilotChecks] = useState<PilotCheck[]>(PILOT_CHECKS);
  const [lessons] = useState<ReusableLesson[]>(REUSABLE_LESSONS);

  const togglePrerequisite = useCallback((id: string) => {
    setPrerequisites((prev) =>
      prev.map((p) => (p.id !== id ? p : { ...p, met: !p.met }))
    );
  }, []);

  const toggleBaselineElement = useCallback((id: string) => {
    setBaselineElements((prev) =>
      prev.map((b) => (b.id !== id ? b : { ...b, reusedAsIs: !b.reusedAsIs }))
    );
  }, []);

  const toggleAdjustment = useCallback((id: string) => {
    setAdjustments((prev) =>
      prev.map((a) => (a.id !== id ? a : { ...a, enabled: !a.enabled }))
    );
  }, []);

  const togglePilotCheck = useCallback((id: string) => {
    setPilotChecks((prev) =>
      prev.map((c) => (c.id !== id ? c : { ...c, passed: !c.passed }))
    );
  }, []);

  const allPrerequisitesMet = useMemo(
    () => prerequisites.every((p) => p.met),
    [prerequisites]
  );

  const enabledAdjustmentCount = useMemo(
    () => adjustments.filter((a) => a.enabled).length,
    [adjustments]
  );

  const allPilotChecksPassed = useMemo(
    () => pilotChecks.every((c) => c.passed),
    [pilotChecks]
  );

  const pilotComplete = useMemo(
    () => allPrerequisitesMet && allPilotChecksPassed,
    [allPrerequisitesMet, allPilotChecksPassed]
  );

  const resetAll = useCallback(() => {
    setPrerequisites(PILOT_PREREQUISITES.map((p) => ({ ...p, met: false })));
    setBaselineElements(BASELINE_REUSE.map((b) => ({ ...b, reusedAsIs: true })));
    setAdjustments(INSTAGRAM_ADJUSTMENTS.map((a) => ({ ...a, enabled: false })));
    setPilotChecks(PILOT_CHECKS.map((c) => ({ ...c, passed: false })));
  }, []);

  return {
    prerequisites,
    baselineElements,
    adjustments,
    pilotChecks,
    lessons,
    togglePrerequisite,
    toggleBaselineElement,
    toggleAdjustment,
    togglePilotCheck,
    allPrerequisitesMet,
    enabledAdjustmentCount,
    allPilotChecksPassed,
    pilotComplete,
    resetAll,
  };
}

export type UseInstagramPilotReturn = ReturnType<typeof useInstagramPilot>;
