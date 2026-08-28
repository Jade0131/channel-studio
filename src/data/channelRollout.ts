import type {
  ChannelRolloutStep,
  RolloutDependency,
  RolloutEntryCriterion,
  ChannelCheckpoint,
  RolloutPhaseId,
} from '@/types';

// ── Entry Criteria (shared across all channel activations) ──

export const ENTRY_CRITERIA: RolloutEntryCriterion[] = [
  {
    id: 'ec-tests',
    label: 'Universal workflow passed validation',
    description: 'All critical and important test scenarios have passed or warned. No open blockers remain.',
    met: false,
  },
  {
    id: 'ec-deployed',
    label: 'Universal workflow deployed successfully',
    description: 'The baseline workflow is live and producing content across all channels without platform overrides.',
    met: false,
  },
  {
    id: 'ec-fallback',
    label: 'Fallback path ready and usable',
    description: 'The fallback baseline route has been tested and can take over if a channel-specific flow breaks.',
    met: false,
  },
  {
    id: 'ec-no-disruption',
    label: 'Channel can be added without disrupting the baseline',
    description: 'Adding the next channel will not break the working universal workflow or existing channel setups.',
    met: false,
  },
];

// ── Per-Channel Activation Checkpoints ──

export const CHANNEL_CHECKPOINTS: ChannelCheckpoint[] = [
  {
    id: 'cp-dashboard',
    label: 'Shared dashboard frame',
    description: 'The channel can use the shared dashboard frame without a separate UI.',
    passed: false,
  },
  {
    id: 'cp-inherit',
    label: 'Inherits universal workflow with limited customization',
    description: 'The channel runs on the universal workflow with only necessary platform-specific overrides.',
    passed: false,
  },
  {
    id: 'cp-quality',
    label: 'Output quality remains usable',
    description: 'Content quality after channel-specific adjustments meets the approval standard.',
    passed: false,
  },
  {
    id: 'cp-overhead',
    label: 'No excessive manual overhead',
    description: 'The added channel does not create too much manual work to manage.',
    passed: false,
  },
  {
    id: 'cp-fallback',
    label: 'Fallback line still works',
    description: 'If the channel-specific flow breaks, the fallback baseline can take over for this channel.',
    passed: false,
  },
];

// ── Rollout Sequence ──
// Instagram is the pilot channel, then one at a time.

export const ROLLOUT_SEQUENCE: ChannelRolloutStep[] = [
  {
    id: 'phase-baseline-validated',
    platformId: 'instagram',
    phase: 'baseline-validated',
    order: 0,
    label: 'Validate Universal Baseline',
    status: 'locked',
    entryCriteria: ENTRY_CRITERIA,
    checkpoints: [],
    dependencies: [],
    notes: 'Run the full test plan and confirm all critical tests pass before any channel rollout begins.',
  },
  {
    id: 'phase-baseline-deployed',
    platformId: 'instagram',
    phase: 'baseline-deployed',
    order: 1,
    label: 'Deploy Universal Baseline',
    status: 'locked',
    entryCriteria: ENTRY_CRITERIA,
    checkpoints: [],
    dependencies: ['phase-baseline-validated'],
    notes: 'Approve deployment at the deployment gate and confirm the baseline is live.',
  },
  {
    id: 'rollout-instagram',
    platformId: 'instagram',
    phase: 'pilot',
    order: 2,
    label: 'Instagram — Pilot Channel',
    status: 'locked',
    entryCriteria: ENTRY_CRITERIA,
    checkpoints: CHANNEL_CHECKPOINTS,
    dependencies: ['phase-baseline-deployed'],
    notes: 'Start with Instagram as the pilot. Learn what truly needs customization before adding the next channel.',
  },
  {
    id: 'rollout-tiktok',
    platformId: 'tiktok',
    phase: 'expand-1',
    order: 3,
    label: 'TikTok — First Expansion',
    status: 'locked',
    entryCriteria: ENTRY_CRITERIA,
    checkpoints: CHANNEL_CHECKPOINTS,
    dependencies: ['rollout-instagram'],
    notes: 'Add TikTok only after the pilot path feels stable and manageable. Carry forward only useful customizations.',
  },
  {
    id: 'rollout-pinterest',
    platformId: 'pinterest',
    phase: 'expand-2',
    order: 4,
    label: 'Pinterest — Second Expansion',
    status: 'locked',
    entryCriteria: ENTRY_CRITERIA,
    checkpoints: CHANNEL_CHECKPOINTS,
    dependencies: ['rollout-tiktok'],
    notes: 'Add Pinterest after TikTok passes all activation checkpoints.',
  },
  {
    id: 'rollout-linkedin',
    platformId: 'linkedin',
    phase: 'expand-3',
    order: 5,
    label: 'LinkedIn — Final Expansion',
    status: 'locked',
    entryCriteria: ENTRY_CRITERIA,
    checkpoints: CHANNEL_CHECKPOINTS,
    dependencies: ['rollout-pinterest'],
    notes: 'Add LinkedIn last. After this, all channels are running channel-specific flows on top of the baseline.',
  },
];

// ── Dependency Map ──

export const ROLLOUT_DEPENDENCIES: RolloutDependency[] = [
  {
    id: 'dep-1',
    from: 'phase-baseline-validated',
    to: 'phase-baseline-deployed',
    label: 'Tests must pass before deployment',
    type: 'blocking',
  },
  {
    id: 'dep-2',
    from: 'phase-baseline-deployed',
    to: 'rollout-instagram',
    label: 'Baseline must be live before pilot',
    type: 'blocking',
  },
  {
    id: 'dep-3',
    from: 'rollout-instagram',
    to: 'rollout-tiktok',
    label: 'Pilot must pass checkpoints',
    type: 'blocking',
  },
  {
    id: 'dep-4',
    from: 'rollout-tiktok',
    to: 'rollout-pinterest',
    label: 'TikTok must pass checkpoints',
    type: 'blocking',
  },
  {
    id: 'dep-5',
    from: 'rollout-pinterest',
    to: 'rollout-linkedin',
    label: 'Pinterest must pass checkpoints',
    type: 'blocking',
  },
];

// ── Phase Labels ──

export const PHASE_LABELS: Record<RolloutPhaseId, string> = {
  'baseline-validated': 'Baseline Validation',
  'baseline-deployed': 'Baseline Deployment',
  pilot: 'Pilot Channel',
  'expand-1': 'Expansion 1',
  'expand-2': 'Expansion 2',
  'expand-3': 'Expansion 3',
  complete: 'Rollout Complete',
};

export const PHASE_COLORS: Record<RolloutPhaseId, string> = {
  'baseline-validated': '#0EA5E9',
  'baseline-deployed': '#0EA5E9',
  pilot: '#10B981',
  'expand-1': '#F59E0B',
  'expand-2': '#F59E0B',
  'expand-3': '#F59E0B',
  complete: '#10B981',
};