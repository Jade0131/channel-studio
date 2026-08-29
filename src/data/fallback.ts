import type {
  FailureCase,
  FallbackStep,
  MinViableOutput,
  RecoveryCheck,
  FallbackPreDeployCheck,
} from '@/types';

export const FAILURE_CASES: FailureCase[] = [
  {
    id: 'stage-failure',
    label: 'Major Stage Failure',
    description: 'The workflow fails to complete one of the major daily stages (draft, assets, or captions).',
    trigger: 'A stage returns an error or times out without producing output.',
    affectedStages: ['draft-generation', 'asset-production', 'caption-variants'],
    severity: 'critical',
    autoDetect: true,
  },
  {
    id: 'output-unusable',
    label: 'Unusable Outputs',
    description: 'Generated outputs are missing, empty, or too inconsistent to continue the normal flow.',
    trigger: 'Output quality check fails — fields are empty, incoherent, or do not conform to schema.',
    affectedStages: ['draft-generation', 'asset-production', 'caption-variants'],
    severity: 'critical',
    autoDetect: true,
  },
  {
    id: 'approval-blocked',
    label: 'Approval Blocked',
    description: 'The weekly approval step becomes blocked, unclear, or cannot be completed in a reasonable time.',
    trigger: 'Approval batch has unresolved items past the review window or the review interface is inaccessible.',
    affectedStages: ['approval-checkpoint'],
    severity: 'high',
    autoDetect: false,
  },
  {
    id: 'extension-break',
    label: 'Extension Break',
    description: 'A platform-specific extension breaks the normal operating flow for one or more channels.',
    trigger: 'A channel-specific override throws an error or produces invalid platform-specific output.',
    affectedStages: ['topic-selection', 'brief-creation', 'draft-generation', 'asset-production', 'caption-variants', 'scheduling', 'handoff'],
    severity: 'high',
    autoDetect: true,
  },
  {
    id: 'manual-overload',
    label: 'Manual Repair Overload',
    description: 'The workflow requires more manual repair than the baseline is meant to allow.',
    trigger: 'Manual intervention count exceeds threshold (more than 2 manual fixes per daily run).',
    affectedStages: ['trigger', 'topic-selection', 'brief-creation', 'draft-generation', 'asset-production', 'caption-variants'],
    severity: 'medium',
    autoDetect: false,
  },
];

export const FALLBACK_STEPS: FallbackStep[] = [
  {
    id: 'fb-01',
    label: 'Detect Failure',
    description: 'Identify which stage or extension has failed and confirm it cannot self-recover.',
    order: 1,
    isMvp: false,
  },
  {
    id: 'fb-02',
    label: 'Stop Broken Path',
    description: 'Halt the failing channel-specific extension or stage. Prevent it from producing corrupt output.',
    order: 2,
    isMvp: false,
  },
  {
    id: 'fb-03',
    label: 'Switch to Universal Baseline',
    description: 'Activate the universal baseline for the affected channel(s). Bypass all platform-specific overrides.',
    order: 3,
    isMvp: true,
  },
  {
    id: 'fb-04',
    label: 'Generate Minimum Viable Content',
    description: 'Produce one usable content brief, one draft, and one set of captions using universal logic only.',
    order: 4,
    isMvp: true,
  },
  {
    id: 'fb-05',
    label: 'Lightweight Approval Check',
    description: 'Run a single quick review pass on fallback content. No full weekly batch — just a go/no-go on the MVP output.',
    order: 5,
    isMvp: true,
  },
  {
    id: 'fb-06',
    label: 'Safe Handoff',
    description: 'Queue the approved fallback content for manual upload or later channel-specific adaptation.',
    order: 6,
    isMvp: true,
  },
  {
    id: 'fb-07',
    label: 'Flag for Rework',
    description: 'Record the failed stage and its error so it can be fixed without blocking the rest of the operating line.',
    order: 7,
    isMvp: false,
  },
  {
    id: 'fb-08',
    label: 'Notify Operator',
    description: 'Send a notification that fallback mode is active, what failed, and what action is needed to restore.',
    order: 8,
    isMvp: false,
  },
];

export const MVP_OUTPUTS: MinViableOutput[] = [
  {
    id: 'mvp-01',
    label: 'One Content Brief',
    description: 'A single structured brief with topic, audience, tone, and CTA — enough to guide a draft.',
    required: true,
  },
  {
    id: 'mvp-02',
    label: 'One Draft Output',
    description: 'A single reviewable draft that can be reused or adapted for channel-specific formatting later.',
    required: true,
  },
  {
    id: 'mvp-03',
    label: 'One Lightweight Approval',
    description: 'A quick go/no-go review on the fallback content — not the full weekly batch, just a single check.',
    required: true,
  },
  {
    id: 'mvp-04',
    label: 'One Safe Handoff Point',
    description: 'Content queued for manual upload or later channel-specific adaptation. No auto-publish in fallback.',
    required: true,
  },
];

export const RECOVERY_CHECKS: RecoveryCheck[] = [
  {
    id: 'rc-01',
    label: 'Failed stage works reliably',
    description: 'The stage or extension that broke has been fixed and runs without errors across at least 2 test cycles.',
    required: true,
    checked: false,
  },
  {
    id: 'rc-02',
    label: 'Outputs are stable',
    description: 'Outputs from the repaired stage are consistent enough to rejoin the normal flow.',
    required: true,
    checked: false,
  },
  {
    id: 'rc-03',
    label: 'Fallback no longer carrying load',
    description: 'Fallback mode is not the primary content source. The normal workflow can take over.',
    required: true,
    checked: false,
  },
  {
    id: 'rc-04',
    label: 'Resume without confusion',
    description: 'Resuming the full workflow does not create duplicate content, missing items, or operator confusion.',
    required: true,
    checked: false,
  },
  {
    id: 'rc-05',
    label: 'No extra pressure',
    description: 'The transition back to normal mode is calm and does not require urgent manual intervention.',
    required: false,
    checked: false,
  },
];

export const FALLBACK_PRE_DEPLOY_CHECKS: FallbackPreDeployCheck[] = [
  {
    id: 'fdc-01',
    label: 'Fallback activates on stage failure',
    description: 'When a major stage fails, the system detects it and switches to fallback within 1 minute.',
    required: true,
    checked: false,
  },
  {
    id: 'fdc-02',
    label: 'MVP output is produced',
    description: 'Fallback mode produces at least one usable brief, draft, approval check, and handoff point.',
    required: true,
    checked: false,
  },
  {
    id: 'fdc-03',
    label: 'Overrides are bypassed',
    description: 'Platform-specific overrides are disabled during fallback — only universal logic runs.',
    required: true,
    checked: false,
  },
  {
    id: 'fdc-04',
    label: 'Operator is notified',
    description: 'A clear notification is sent when fallback activates and when recovery is possible.',
    required: true,
    checked: false,
  },
  {
    id: 'fdc-05',
    label: 'Recovery path is testable',
    description: 'The recovery checks can be walked through and the system returns to normal mode safely.',
    required: true,
    checked: false,
  },
  {
    id: 'fdc-06',
    label: 'Fallback does not auto-publish',
    description: 'Fallback content is queued for manual review only — no automatic publishing in safety mode.',
    required: true,
    checked: false,
  },
];

export const SEVERITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: '#EF4444', bg: '#FEE2E2', label: 'Critical' },
  high: { color: '#F59E0B', bg: '#FFFBEB', label: 'High' },
  medium: { color: '#64748B', bg: '#F1F5F9', label: 'Medium' },
};