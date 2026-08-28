import { useState, useCallback, useMemo } from 'react';
import {
  NICHE_OPTIONS,
  CONTENT_PILLARS,
  DAILY_FLOW,
  REVIEW_RHYTHM,
  GROWTH_TESTS,
  MONETIZATION_PATHS,
  WEEKLY_POSTING_SCHEDULE,
} from '@/data/tiktokSetup';
import type { NicheOption, GrowthTest } from '@/data/tiktokSetup';

export function useTikTokSetup() {
  const [selectedNicheId, setSelectedNicheId] = useState<string>(
    NICHE_OPTIONS.find((n) => n.recommended)?.id ?? NICHE_OPTIONS[0].id
  );
  const [growthTests, setGrowthTests] = useState<GrowthTest[]>(GROWTH_TESTS);

  const selectedNiche = useMemo<NicheOption>(
    () => NICHE_OPTIONS.find((n) => n.id === selectedNicheId) ?? NICHE_OPTIONS[0],
    [selectedNicheId]
  );

  const selectNiche = useCallback((id: string) => {
    setSelectedNicheId(id);
  }, []);

  const cycleTestStatus = useCallback((id: string) => {
    setGrowthTests((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const order: GrowthTest['status'][] = ['pending', 'running', 'passed', 'failed'];
        const idx = order.indexOf(t.status);
        return { ...t, status: order[(idx + 1) % order.length] };
      })
    );
  }, []);

  const completedTests = useMemo(
    () => growthTests.filter((t) => t.status === 'passed' || t.status === 'failed').length,
    [growthTests]
  );

  const passedTests = useMemo(
    () => growthTests.filter((t) => t.status === 'passed').length,
    [growthTests]
  );

  return {
    nicheOptions: NICHE_OPTIONS,
    selectedNiche,
    selectNiche,
    contentPillars: CONTENT_PILLARS,
    dailyFlow: DAILY_FLOW,
    reviewRhythm: REVIEW_RHYTHM,
    growthTests,
    cycleTestStatus,
    completedTests,
    passedTests,
    monetizationPaths: MONETIZATION_PATHS,
    weeklySchedule: WEEKLY_POSTING_SCHEDULE,
  };
}

export type UseTikTokSetupReturn = ReturnType<typeof useTikTokSetup>;
