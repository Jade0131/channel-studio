import { useState, useCallback, useMemo } from 'react';
import { TEST_SCENARIOS, DEPLOYMENT_CHECKLIST, MOCK_ISSUES } from '@/data/testPlan';
import type { TestStatus, TestResult, TestIssue, DeploymentChecklistItem, ReadinessDecision } from '@/types';

const INITIAL_RESULTS: TestResult[] = TEST_SCENARIOS.map((s) => ({
  scenarioId: s.id,
  status: 'not-run' as TestStatus,
  duration: '—',
  notes: '',
  checksPassed: 0,
  checksTotal: s.passCriteria.length,
  timestamp: null,
}));

// Simulated test outcomes — each scenario has a predetermined result
// that mimics what a real validation run would produce
const SIMULATED_RESULTS: Record<string, { status: TestStatus; duration: string; checksPassed: number; notes: string }> = {
  'test-trigger': {
    status: 'passed',
    duration: '0:03',
    checksPassed: 3,
    notes: 'Trigger fired at 7:00 AM automatically. All 4 channels present. Run ID and stage queue created successfully.',
  },
  'test-continuity': {
    status: 'passed',
    duration: '5:12',
    checksPassed: 3,
    notes: 'Full daily sequence completed without stalling. All stages received previous stage output. No items dropped.',
  },
  'test-output': {
    status: 'passed',
    duration: '4:30',
    checksPassed: 4,
    notes: 'Drafts coherent with briefs. Supporting assets present. All output fields conform to schema. Minor: some hashtags need filtering.',
  },
  'test-repeatability': {
    status: 'passed',
    duration: '15:45',
    checksPassed: 3,
    notes: '3 consecutive runs followed identical stage sequence. Output schema consistent across all cycles.',
  },
  'test-approval': {
    status: 'passed',
    duration: '8:20',
    checksPassed: 4,
    notes: 'All generated content appeared in batch. Approve/revise/reject worked. Checklist gated closure correctly. Only approved content advanced.',
  },
  'test-fallback': {
    status: 'warning',
    duration: '6:10',
    checksPassed: 4,
    notes: 'Fallback activated and universal baseline ran. Overrides bypassed. Content flagged for review. Notification sent. Minor: resume flow needs manual confirmation.',
  },
  'test-adaptation': {
    status: 'passed',
    duration: '3:45',
    checksPassed: 4,
    notes: 'Output fields mapped to extension points. Captions adaptable. Visual direction supports resizing. Posting time override works.',
  },
};

export function useTestPlan() {
  const [results, setResults] = useState<TestResult[]>(INITIAL_RESULTS);
  const [running, setRunning] = useState(false);
  const [issues, setIssues] = useState<TestIssue[]>(MOCK_ISSUES);
  const [checklist, setChecklist] = useState<DeploymentChecklistItem[]>(DEPLOYMENT_CHECKLIST);
  const [decision, setDecision] = useState<ReadinessDecision>('pending');

  const runAllTests = useCallback(() => {
    setRunning(true);
    setResults((prev) =>
      prev.map((r) => ({ ...r, status: 'running' as TestStatus, timestamp: null }))
    );

    // Simulate sequential test execution with staggered completion
    TEST_SCENARIOS.forEach((scenario, i) => {
      setTimeout(() => {
        const sim = SIMULATED_RESULTS[scenario.id];
        setResults((prev) =>
          prev.map((r) =>
            r.scenarioId !== scenario.id
              ? r
              : {
                  ...r,
                  status: sim.status,
                  duration: sim.duration,
                  checksPassed: sim.checksPassed,
                  notes: sim.notes,
                  timestamp: new Date().toISOString(),
                }
          )
        );

        if (i === TEST_SCENARIOS.length - 1) {
          setRunning(false);
        }
      }, (i + 1) * 800);
    });
  }, []);

  const runSingleTest = useCallback((scenarioId: string) => {
    setResults((prev) =>
      prev.map((r) =>
        r.scenarioId !== scenarioId ? r : { ...r, status: 'running' as TestStatus }
      )
    );

    setTimeout(() => {
      const sim = SIMULATED_RESULTS[scenarioId];
      setResults((prev) =>
        prev.map((r) =>
          r.scenarioId !== scenarioId
            ? r
            : {
                ...r,
                status: sim.status,
                duration: sim.duration,
                checksPassed: sim.checksPassed,
                notes: sim.notes,
                timestamp: new Date().toISOString(),
              }
        )
      );
    }, 1000);
  }, []);

  const resetTests = useCallback(() => {
    setResults(INITIAL_RESULTS);
    setRunning(false);
  }, []);

  const toggleChecklistItem = useCallback((itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id !== itemId ? item : { ...item, checked: !item.checked }
      )
    );
  }, []);

  const updateIssueStatus = useCallback((issueId: string, status: TestIssue['status']) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id !== issueId ? issue : { ...issue, status }
      )
    );
  }, []);

  const passCount = useMemo(
    () => results.filter((r) => r.status === 'passed').length,
    [results]
  );
  const failCount = useMemo(
    () => results.filter((r) => r.status === 'failed').length,
    [results]
  );
  const warningCount = useMemo(
    () => results.filter((r) => r.status === 'warning').length,
    [results]
  );
  const notRunCount = useMemo(
    () => results.filter((r) => r.status === 'not-run' || r.status === 'running').length,
    [results]
  );

  const allTestsRun = useMemo(
    () => results.every((r) => r.status === 'passed' || r.status === 'failed' || r.status === 'warning'),
    [results]
  );

  const criticalTestsPassed = useMemo(() => {
    const criticalScenarios = TEST_SCENARIOS.filter((s) => s.weight === 'critical');
    return criticalScenarios.every((cs) => {
      const result = results.find((r) => r.scenarioId === cs.id);
      return result && (result.status === 'passed' || result.status === 'warning');
    });
  }, [results]);

  const importantTestsPassed = useMemo(() => {
    const importantScenarios = TEST_SCENARIOS.filter((s) => s.weight === 'important');
    return importantScenarios.every((cs) => {
      const result = results.find((r) => r.scenarioId === cs.id);
      return result && (result.status === 'passed' || result.status === 'warning');
    });
  }, [results]);

  const openBlockers = useMemo(
    () => issues.filter((i) => i.severity === 'blocker' && i.status !== 'resolved'),
    [issues]
  );

  const requiredChecklistComplete = useMemo(
    () => checklist.filter((item) => item.required).every((item) => item.checked),
    [checklist]
  );

  const canDeploy = useMemo(() => {
    return (
      allTestsRun &&
      criticalTestsPassed &&
      importantTestsPassed &&
      openBlockers.length === 0 &&
      requiredChecklistComplete
    );
  }, [allTestsRun, criticalTestsPassed, importantTestsPassed, openBlockers, requiredChecklistComplete]);

  const makeDecision = useCallback(
    (d: ReadinessDecision) => {
      setDecision(d);
    },
    []
  );

  return {
    results,
    running,
    issues,
    checklist,
    decision,
    runAllTests,
    runSingleTest,
    resetTests,
    toggleChecklistItem,
    updateIssueStatus,
    makeDecision,
    passCount,
    failCount,
    warningCount,
    notRunCount,
    allTestsRun,
    criticalTestsPassed,
    importantTestsPassed,
    openBlockers,
    requiredChecklistComplete,
    canDeploy,
  };
}

export type UseTestPlanReturn = ReturnType<typeof useTestPlan>;