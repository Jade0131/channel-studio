import { useState, useCallback, useMemo } from 'react';
import {
  LINKEDIN_NICHE_OPTIONS,
  LINKEDIN_CONTENT_PILLARS,
  LINKEDIN_DAILY_FLOW,
  LINKEDIN_REVIEW_RHYTHM,
  LINKEDIN_GROWTH_TESTS,
  LINKEDIN_MONETIZATION_PATHS,
  LINKEDIN_WEEKLY_POSTING_SCHEDULE,
} from '@/data/linkedinSetup';
import type { LinkedInNicheOption, LinkedInGrowthTest } from '@/data/linkedinSetup';

export function useLinkedInSetup() {
  const [selectedNicheId, setSelectedNicheId] = useState<string>(
    LINKEDIN_NICHE_OPTIONS.find((n) => n.recommended)?.id ?? LINKEDIN_NICHE_OPTIONS[0].id
  );
  const [growthTests, setGrowthTests] = useState<LinkedInGrowthTest[]>(LINKEDIN_GROWTH_TESTS);

  const selectedNiche = useMemo<LinkedInNicheOption>(
    () => LINKEDIN_NICHE_OPTIONS.find((n) => n.id === selectedNicheId) ?? LINKEDIN_NICHE_OPTIONS[0],
    [selectedNicheId]
  );

  const selectNiche = useCallback((id: string) => {
    setSelectedNicheId(id);
  }, []);

  const cycleTestStatus = useCallback((id: string) => {
    setGrowthTests((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const order: LinkedInGrowthTest['status'][] = ['pending', 'running', 'passed', 'failed'];
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
    nicheOptions: LINKEDIN_NICHE_OPTIONS,
    selectedNiche,
    selectNiche,
    contentPillars: LINKEDIN_CONTENT_PILLARS,
    dailyFlow: LINKEDIN_DAILY_FLOW,
    reviewRhythm: LINKEDIN_REVIEW_RHYTHM,
    growthTests,
    cycleTestStatus,
    completedTests,
    passedTests,
    monetizationPaths: LINKEDIN_MONETIZATION_PATHS,
    weeklySchedule: LINKEDIN_WEEKLY_POSTING_SCHEDULE,
  };
}

export type UseLinkedInSetupReturn = ReturnType<typeof useLinkedInSetup>;
