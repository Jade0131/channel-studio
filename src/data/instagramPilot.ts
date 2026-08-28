import type {
  PrerequisiteCheck,
  BaselineElement,
  InstagramAdjustment,
  PilotCheck,
  ReusableLesson,
} from '@/types';

// ── Prerequisites — must all be met before the pilot can begin ──

export const PILOT_PREREQUISITES: PrerequisiteCheck[] = [
  {
    id: 'prereq-dashboard',
    label: 'Shared dashboard frame is ready',
    description: 'The dashboard structure, channel sections, and content-format sections are in place and usable.',
    met: false,
  },
  {
    id: 'prereq-validation',
    label: 'Universal workflow has passed validation',
    description: 'All critical and important test scenarios have passed. No open blockers remain.',
    met: false,
  },
  {
    id: 'prereq-fallback',
    label: 'Fallback path is available',
    description: 'The fallback baseline route has been tested and can take over if the Instagram-specific flow breaks.',
    met: false,
  },
  {
    id: 'prereq-deployment',
    label: 'Deployment is stable',
    description: 'The baseline workflow is live and producing content without errors across at least 2 full run cycles.',
    met: false,
  },
];

// ── Baseline elements reused as-is (no Instagram customization needed) ──

export const BASELINE_REUSE: BaselineElement[] = [
  {
    id: 'reuse-trigger',
    stageId: 'trigger',
    label: 'Daily Trigger',
    description: 'The 7 AM daily trigger runs unchanged. Instagram content starts from the same trigger as every other channel.',
    reusedAsIs: true,
  },
  {
    id: 'reuse-brief',
    stageId: 'brief-creation',
    label: 'Content Brief Structure',
    description: 'The structured brief fields (topic, audience, tone, keywords, CTA, references) are reused without modification.',
    reusedAsIs: true,
  },
  {
    id: 'reuse-draft',
    stageId: 'draft-generation',
    label: 'Draft Generation Logic',
    description: 'The core draft generation from the brief runs unchanged. Instagram gets the same first-draft treatment as the baseline.',
    reusedAsIs: true,
  },
  {
    id: 'reuse-approval',
    stageId: 'approval-checkpoint',
    label: 'Weekly Approval Batch',
    description: 'Instagram content goes through the same weekly approval batch as all other channels. No separate review process.',
    reusedAsIs: true,
  },
  {
    id: 'reuse-handoff-queue',
    stageId: 'handoff',
    label: 'Handoff Queue Structure',
    description: 'The handoff queue structure is reused. Instagram content is queued the same way as baseline content.',
    reusedAsIs: true,
  },
];

// ── Instagram-specific adjustments (minimal, only where they clearly help) ──

export const INSTAGRAM_ADJUSTMENTS: InstagramAdjustment[] = [
  {
    id: 'adj-topic',
    stageId: 'topic-selection',
    label: 'Topic Selection',
    universalBehavior: 'Niche-based topic pull from the shared topic pool.',
    instagramBehavior: 'Visual trend + hashtag research added on top of the shared topic pool.',
    rationale: 'Instagram rewards visual trends. Adding hashtag research improves discoverability without changing the core topic logic.',
    enabled: false,
  },
  {
    id: 'adj-brief',
    stageId: 'brief-creation',
    label: 'Content Brief',
    universalBehavior: 'Structured brief with topic, audience, tone, keywords, CTA, references.',
    instagramBehavior: 'Visual-first brief with a shot list appended to the standard fields.',
    rationale: 'Instagram is visual-first. A shot list helps guide asset production without changing the brief structure.',
    enabled: false,
  },
  {
    id: 'adj-draft',
    stageId: 'draft-generation',
    label: 'Draft Creation',
    universalBehavior: 'First draft from the brief using universal generation logic.',
    instagramBehavior: 'Carousel slide copy + reel script generated alongside the standard draft.',
    rationale: 'Instagram uses carousels and reels heavily. Generating these formats from the same draft improves output quality.',
    enabled: false,
  },
  {
    id: 'adj-assets',
    stageId: 'asset-production',
    label: 'Supporting Assets',
    universalBehavior: 'Visual direction + thumbna