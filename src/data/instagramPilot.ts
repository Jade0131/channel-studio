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
    universalBehavior: 'Visual direction + thumbnail concept produced from the draft.',
    instagramBehavior: 'Asset dimensions set to 1080x1920 for reels and 1080x1080 for posts.',
    rationale: 'Instagram has specific aspect ratio requirements. Setting dimensions prevents rework later.',
    enabled: false,
  },
  {
    id: 'adj-captions',
    stageId: 'caption-variants',
    label: 'Captions & Variations',
    universalBehavior: 'Caption + hashtags generated from the draft.',
    instagramBehavior: 'Up to 30 hashtags allowed, emoji-friendly tone applied to caption variants.',
    rationale: 'Instagram allows more hashtags and favors emoji in captions. Adjusting tone and count improves engagement.',
    enabled: false,
  },
  {
    id: 'adj-scheduling',
    stageId: 'scheduling',
    label: 'Scheduling',
    universalBehavior: 'Posting time assigned from the shared scheduling logic.',
    instagramBehavior: 'Evenings 6-8 PM prioritized, weekends preferred for reels.',
    rationale: 'Instagram engagement peaks in the evening. Targeting these windows improves reach.',
    enabled: false,
  },
  {
    id: 'adj-handoff',
    stageId: 'handoff',
    label: 'Handoff',
    universalBehavior: 'Content queued for publish via the shared handoff queue.',
    instagramBehavior: 'Auto-publish via Graph API or manual upload, depending on content type.',
    rationale: 'Instagram supports API publishing for most formats. Enabling this reduces manual work.',
    enabled: false,
  },
];

// ── Pilot checks — confirm the rollout is smooth and manageable ──

export const PILOT_CHECKS: PilotCheck[] = [
  {
    id: 'pc-dashboard',
    label: 'Shared dashboard frame works for Instagram',
    description: 'Instagram content appears correctly in the shared dashboard without a separate UI.',
    passed: false,
  },
  {
    id: 'pc-inherit',
    label: 'Instagram inherits the baseline with limited customization',
    description: 'The channel runs on the universal workflow with only the enabled adjustments. No heavy custom logic added.',
    passed: false,
  },
  {
    id: 'pc-quality',
    label: 'Output quality remains usable after adjustments',
    description: 'Instagram-specific content (reels, carousels, captions) meets the same approval standard as baseline content.',
    passed: false,
  },
  {
    id: 'pc-overhead',
    label: 'No excessive manual overhead',
    description: 'Managing Instagram on top of the baseline does not create too much manual work.',
    passed: false,
  },
  {
    id: 'pc-fallback',
    label: 'Fallback line still works for Instagram',
    description: 'If the Instagram-specific flow breaks, the fallback baseline can take over and keep content flowing.',
    passed: false,
  },
  {
    id: 'pc-simplicity',
    label: 'System remains simple and stable',
    description: 'Adding Instagram has not broken the simplicity, stability, or fallback safety of the overall system.',
    passed: false,
  },
];

// ── Reusable lessons for the next channel ──

export const REUSABLE_LESSONS: ReusableLesson[] = [
  {
    id: 'lesson-1',
    lesson: 'Keep the brief structure unchanged. Channel-specific additions (like a shot list) can be appended without modifying the core fields.',
    appliesTo: ['tiktok', 'pinterest', 'linkedin'],
    isInstagramSpecific: false,
  },
  {
    id: 'lesson-2',
    lesson: 'Asset dimensions are the most common adjustment. Each channel needs its own dimensions, but the production logic stays the same.',
    appliesTo: ['tiktok', 'pinterest', 'linkedin'],
    isInstagramSpecific: false,
  },
  {
    id: 'lesson-3',
    lesson: 'Caption tone and hashtag count vary per channel, but the caption generation logic does not need to change — only the parameters.',
    appliesTo: ['tiktok', 'pinterest', 'linkedin'],
    isInstagramSpecific: false,
  },
  {
    id: 'lesson-4',
    lesson: 'Scheduling windows differ per channel but use the same scheduling stage. Only the optimal time parameters change.',
    appliesTo: ['tiktok', 'pinterest', 'linkedin'],
    isInstagramSpecific: false,
  },
  {
    id: 'lesson-5',
    lesson: 'The handoff stage is the most transferable. Publishing mechanics differ, but the scheduling queue and approval gate are universal.',
    appliesTo: ['tiktok', 'pinterest', 'linkedin'],
    isInstagramSpecific: false,
  },
];