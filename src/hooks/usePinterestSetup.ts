import { useState, useCallback, useMemo } from 'react';
import {
  PINTEREST_NICHE_OPTIONS,
  PINTEREST_CONTENT_PILLARS,
  PINTEREST_DAILY_FLOW,
  PINTEREST_REVIEW_RHYTHM,
  PINTEREST_GROWTH_TESTS,
  PINTEREST_MONETIZATION_PATHS,
  PINTEREST_WEEKLY_POSTING_SCHEDULE,
} from '@/data/pinterestSetup';
import type { PinterestNicheOption, PinterestGrowthTest } from '@/data/pinterestSetup';

export function usePinterestSetup() {
  const [selectedNicheId, setSelectedNicheId] = useState<string>(
    PINTEREST_NICHE_OPTIONS.find((n) => n.recommended)?.id ?? PINTEREST_NICHE_OPTIONS[0].id
  );
  const [growthTests, setGrowthTests] = useState<PinterestGrowthTest[]>(PINTEREST_GROWTH_TESTS);

  const selectedNiche = useMemo<PinterestNicheOption>(
    () => PINTEREST_NICHE_OPTIONS.find((n) => n.id === selectedNicheId) ?? PINTEREST_NICHE_OPTIONS[0],
    [selectedNicheId]
  );

  const selectNiche = useCallback((id: string) => {
    setSelectedNicheId(id);
  }, []);

  const cycleTestStatus = useCallback((id: string) => {
    setGrowthTests((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const order: PinterestGrowthTest['status'][] = ['pending', 'running', 'passed', 'failed'];
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
    nicheOptions: PINTEREST_NICHE_OPTIONS,
    selectedNiche,
    selectNiche,
    contentPillars: PINTEREST_CONTENT_PILLARS,
    dailyFlow: PINTEREST_DAILY_FLOW,
    reviewRhythm: PINTEREST_REVIEW_RHYTHM,
    growthTests,
    cycleTestStatus,
    completedTests,
    passedTests,
    monetizationPaths: PINTEREST_MONETIZATION_PATHS,
    weeklySchedule: PINTEREST_WEEKLY_POSTING_SCHEDULE,
  };
}

export type UsePinterestSetupReturn = ReturnType<typeof usePinterestSetup>;
