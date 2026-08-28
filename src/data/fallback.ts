el: 'One Content Brief',
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
