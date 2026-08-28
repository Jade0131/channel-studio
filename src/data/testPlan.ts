import type {
  TestScenario,
  TestIssue,
  DeploymentChecklistItem,
} from '@/types';

export const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'test-trigger',
    name: 'Trigger Test',
    category: 'trigger',
    description:
      'Confirm the workflow starts correctly from the planned daily input at the scheduled time.',
    steps: [
      'Verify the daily trigger fires at 7:00 AM without manual start',
      'Confirm all four channels are included in the initial run',
      'Check that the trigger produces a valid run ID and stage queue',
      'Verify no duplicate or missing channel entries in the run',
    ],
    passCriteria: [
      'Trigger fires automatically at the scheduled time',
      'All four channels are present in the run',
      'Run ID and stage queue are created without errors',
    ],
    failCriteria: [
      'Trigger requires manual intervention to start',
      'One or more channels are missing from the run',
      'Run ID is not created or stage queue is malformed',
    ],
    relatedStages: ['trigger'],
    weight: 'critical',
  },
  {
    id: 'test-continuity',
    name: 'Continuity Test',
    category: 'continuity',
    description:
      'Confirm every stage hands off correctly to the next without breaking the run.',
    steps: [
      'Run the full daily sequence from trigger through caption-variants',
      'Verify each stage receives the output of the previous stage',
      'Check that no stage drops or duplicates content items',
      'Confirm the run completes all 6 daily stages without stalling',
    ],
    passCriteria: [
      'Every stage receives and processes the previous stage output',
      'No content items are dropped between stages',
      'Full daily sequence completes without stalling or crashing',
    ],
    failCriteria: [
      'Any stage fails to receive input from the previous stage',
      'Content items are dropped or duplicated during handoff',
      'Run stalls or requires manual restart at any stage',
    ],
    relatedStages: [
      'trigger',
      'topic-selection',
      'brief-creation',
      'draft-generation',
      'asset-production',
      'caption-variants',
    ],
    weight: 'critical',
  },
  {
    id: 'test-output',
    name: 'Output Test',
    category: 'output',
    description:
      'Confirm the workflow produces usable drafts, supporting assets, and structured outputs.',
    steps: [
      'Inspect generated drafts for coherence with the content brief',
      'Verify supporting assets include visual direction and thumbnail concept',
      'Check that captions, hashtags, and posting time are present',
      'Confirm all output fields conform to the standard output schema',
    ],
    passCriteria: [
      'Drafts are coherent with the brief and usable without major rewrite',
      'Supporting assets are present and structurally valid',
      'Captions, hashtags, and posting time are populated',
      'All outputs conform to the standard output schema',
    ],
    failCriteria: [
      'Drafts are incoherent or require major manual rewriting',
      'Supporting assets are missing or incomplete',
      'Output fields are empty or do not conform to the schema',
    ],
    relatedStages: ['draft-generation', 'asset-production', 'caption-variants'],
    weight: 'critical',
  },
  {
    id: 'test-repeatability',
    name: 'Repeatability Test',
    category: 'repeatability',
    description:
      'Confirm the same workflow can run across multiple cycles without major variation in structure.',
    steps: [
      'Run the workflow for 3 consecutive daily cycles',
      'Compare the structure and stage sequence across all 3 runs',
      'Verify the same set of stages executes in the same order each time',
      'Check that output structure remains consistent across cycles',
    ],
    passCriteria: [
      'All 3 runs follow the same stage sequence',
      'No structural variation in the workflow between cycles',
      'Output schema remains consistent across all runs',
    ],
    failCriteria: [
      'Stage sequence varies between runs',
      'Workflow structure changes between cycles',
      'Output structure is inconsistent across runs',
    ],
    relatedStages: [
      'trigger',
      'topic-selection',
      'brief-creation',
      'draft-generation',
      'asset-production',
      'caption-variants',
    ],
    weight: 'important',
  },
  {
    id: 'test-approval',
    name: 'Approval Test',
    category: 'approval',
    description:
      'Confirm the weekly approval checkpoint is clear, light, and usable.',
    steps: [
      'Open the weekly approval batch after a full week of daily runs',
      'Verify all generated content appears in the batch',
      'Walk through the approve, revise, and reject actions',
      'Confirm the review checklist gates batch closure correctly',
      'Verify only approved content moves to scheduling',
    ],
    passCriteria: [
      'All generated content appears in the weekly batch',
      'Approve, revise, and reject actions work without friction',
      'Checklist prevents closing the batch with pending items',
      'Only approved content advances to scheduling',
    ],
    failCriteria: [
      'Generated content is missing from the batch',
      'Approval actions are unclear or require excessive steps',
      'Batch can be closed with unreviewed items',
      'Rejected content incorrectly advances to scheduling',
    ],
    relatedStages: ['approval-checkpoint', 'scheduling'],
    weight: 'critical',
  },
  {
    id: 'test-fallback',
    name: 'Fallback Readiness Test',
    category: 'fallback',
    description:
      'Confirm the baseline flow can still operate as the minimum safe line if extensions fail.',
    steps: [
      'Activate fallback mode for a simulated channel-specific failure',
      'Verify the universal baseline runs without platform overrides',
      'Confirm all fallback content is flagged for manual review',
      'Check that the operator is notified of fallback activation',
      'Verify the channel-specific flow can resume after the issue is resolved',
    ],
    passCriteria: [
      'Fallback mode activates and runs the universal baseline',
      'Platform overrides are bypassed during fallback',
      'Fallback content is flagged for manual review',
      'Operator notification is sent',
      'Channel-specific flow can resume after resolution',
    ],
    failCriteria: [
      'Fallback mode fails to activate or run the baseline',
      'Platform overrides are not bypassed during fallback',
      'Fallback content is not flagged for review',
      'Channel-specific flow cannot resume after resolution',
    ],
    relatedStages: [
      'trigger',
      'topic-selection',
      'brief-creation',
      'draft-generation',
      'asset-production',
      'caption-variants',
    ],
    weight: 'critical',
  },
  {
    id: 'test-adaptation',
    name: 'Adaptation Test',
    category: 'adaptation',
    description:
      'Confirm outputs are clean enough to be reused later for channel-specific configuration.',
    steps: [
      'Take a sample of universal outputs from the workflow',
      'Verify each output field can be mapped to a channel-specific extension point',
      'Check that captions can be adapted for different hashtag limits',
      'Confirm visual direction can be resized for different platform dimensions',
      'Verify posting time can be overridden per platform optimal window',
    ],
    passCriteria: [
      'Output fields map cleanly to extension point overrides',
      'Captions can be adapted for platform-specific hashtag limits',
      'Visual direction supports platform-specific dimension requirements',
      'Posting time can be overridden without breaking the output structure',
    ],
    failCriteria: [
      'Output fields cannot be mapped to extension points',
      'Captions require full rewrite for different platforms',
      'Visual direction does not support platform dimensions',
      'Posting time override breaks the output structure',
    ],
    relatedStages: ['caption-variants', 'asset-production', 'scheduling', 'handoff'],
    weight: 'important',
  },
];

export const DEPLOYMENT_CHECKLIST: DeploymentChecklistItem[] = [
  {
    id: 'dc-01',
    label: 'All critical tests passed',
    description: 'Trigger, Continuity, Output, Approval, and Fallback tests must all pass.',
    category: 'core-tests',
    required: true,
    checked: false,
  },
  {
    id: 'dc-02',
    label: 'Important tests passed or waived',
    description: 'Repeatability and Adaptation tests passed, or their risks are documented.',
    category: 'core-tests',
    required: true,
    checked: false,
  },
  {
    id: 'dc-03',
    label: 'No open blocker issues',
    description: 'All issues marked as blocker severity are resolved.',
    category: 'quality',
    required: true,
    checked: false,
  },
  {
    id: 'dc-04',
    label: 'Major issues documented or resolved',
    description: 'All major severity issues are either fixed or have a documented workaround.',
    category: 'quality',
    required: true,
    checked: false,
  },
  {
    id: 'dc-05',
    label: 'Workflow runs with minimal manual intervention',
    description: 'Daily run completes end-to-end without requiring manual repair steps.',
    category: 'process',
    required: true,
    checked: false,
  },
  {
    id: 'dc-06',
    label: 'Approval step stays simple',
    description: 'Weekly approval pass takes under 30 minutes and does not create friction.',
    category: 'process',
    required: true,
    checked: false,
  },
  {
    id: 'dc-07',
    label: 'Failure points are visible early',
    description: 'Errors surface at the stage where they occur, not downstream.',
    category: 'process',
    required: true,
    checked: false,
  },
  {
    id: 'dc-08',
    label: 'Outputs are consistent enough to review and adapt',
    description: 'Output schema is stable and reusable for channel-specific extension.',
    category: 'readiness',
    required: true,
    checked: false,
  },
  {
    id: 'dc-09',
    label: 'Fallback route verified',
    description: 'Baseline flow operates as the safety line when channel-specific flows fail.',
    category: 'readiness',
    required: true,
    checked: false,
  },
  {
    id: 'dc-10',
    label: 'Weak points are known and documented',
    description: 'Known limitations are recorded so they can be addressed after deployment.',
    category: 'readiness',
    required: false,
    checked: false,
  },
];

export const MOCK_ISSUES: TestIssue[] = [
  {
    id: 'issue-001',
    scenarioId: 'test-continuity',
    severity: 'minor',
    description:
      'Asset production stage occasionally takes 2+ minutes when processing 4 channels simultaneously. Does not break the run but adds latency.',
    affectedStage: 'asset-production',
    status: 'open',
    mustFixBeforeDeploy: false,
  },
  {
    id: 'issue-002',
    scenarioId: 'test-output',
    severity: 'minor',
    description:
      'Hashtag suggestions sometimes include deprecated tags. Caption content is usable but hashtags need a quick manual filter during approval.',
    affectedStage: 'caption-variants',
    status: 'open',
    mustFixBeforeDeploy: false,
  },
  {
    id: 'issue-003',
    scenarioId: 'test-adaptation',
    severity: 'minor',
    description:
      'Visual direction text is platform-agnostic but does not include explicit dimension guidance. Channel-specific flows will need to add dimension mapping.',
    affectedStage: 'asset-production',
    status: 'open',
    mustFixBeforeDeploy: false,
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  trigger: 'Trigger',
  continuity: 'Continuity',
  output: 'Output',
  repeatability: 'Repeatability',
  approval: 'Approval',
  fallback: 'Fallback',
  adaptation: 'Adaptation',
};

export const CATEGORY_COLORS: Record<string, string> = {
  trigger: '#0EA5E9',
  continuity: '#6366F1',
  output: '#10B981',
  repeatability: '#F59E0B',
  approval: '#8B5CF6',
  fallback: '#EF4444',
  adaptation: '#14B8A6',
};

export const WEIGHT_LABELS: Record<string, string> = {
  critical: 'Critical',
  important: 'Important',
  standard: 'Standard',
};

export const WEIGHT_COLORS: Record<string, string> = {
  critical: '#EF4444',
  important: '#F59E0B',
  standard: '#64748B',
};