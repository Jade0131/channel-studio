import type { WorkflowStage, WorkflowStageId, ExtensionPoint, WorkflowRun, ApprovalBatch } from '@/types';
import { MOCK_CONTENT } from '@/data/mockContent';

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'trigger',
    label: 'Daily Trigger',
    description: 'Scheduled at 7:00 AM. Starts the baseline content run for all channels.',
    icon: 'Zap',
    cadence: 'daily',
    isUniversal: true,
  },
  {
    id: 'topic-selection',
    label: 'Niche & Topic Selection',
    description: 'Pulls from the active content niche and selects today\'s topics per channel.',
    icon: 'Compass',
    cadence: 'daily',
    isUniversal: true,
  },
  {
    id: 'brief-creation',
    label: 'Content Brief',
    description: 'Generates a structured brief: topic, audience, tone, keywords, CTA, references.',
    icon: 'ClipboardList',
    cadence: 'daily',
    isUniversal: true,
  },
  {
    id: 'draft-generation',
    label: 'Draft Creation',
    description: 'Produces the first draft of the content piece from the brief.',
    icon: 'PenLine',
    cadence: 'daily',
    isUniversal: true,
  },
  {
    id: 'asset-production',
    label: 'Supporting Assets',
    description: 'Generates visual direction, thumbnail concept, and script/scene breakdown.',
    icon: 'Image',
    cadence: 'daily',
    isUniversal: true,
  },
  {
    id: 'caption-variants',
    label: 'Captions & Variations',
    description: 'Writes caption, hashtags, and platform-aware variations of the core copy.',
    icon: 'Type',
    cadence: 'daily',
    isUniversal: true,
    extensionPoint: 'Platform-specific caption rules, hashtag limits, and tone shifts',
  },
  {
    id: 'approval-checkpoint',
    label: 'Weekly Approval',
    description: 'All generated content from the week is batched for human review and approval.',
    icon: 'CheckSquare',
    cadence: 'weekly',
    isUniversal: true,
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    description: 'Approved content is assigned posting times based on platform optimal windows.',
    icon: 'CalendarClock',
    cadence: 'weekly',
    isUniversal: true,
    extensionPoint: 'Platform-specific posting time optimization and timezone logic',
  },
  {
    id: 'handoff',
    label: 'Handoff',
    description: 'Scheduled content is handed to the channel queue for publishing or manual upload.',
    icon: 'Send',
    cadence: 'weekly',
    isUniversal: true,
    extensionPoint: 'Platform-specific publishing API or manual export format',
  },
];

export const WORKFLOW_STAGE_ORDER: WorkflowStageId[] = [
  'trigger',
  'topic-selection',
  'brief-creation',
  'draft-generation',
  'asset-production',
  'caption-variants',
  'approval-checkpoint',
  'scheduling',
  'handoff',
];

export const DAILY_STAGES = WORKFLOW_STAGE_ORDER.filter(
  (id) => WORKFLOW_STAGES.find((s) => s.id === id)?.cadence === 'daily'
);

export const WEEKLY_STAGES = WORKFLOW_STAGE_ORDER.filter(
  (id) => WORKFLOW_STAGES.find((s) => s.id === id)?.cadence === 'weekly'
);

export const EXTENSION_POINTS: ExtensionPoint[] = [
  {
    id: 'topic-selection',
    label: 'Topic Selection',
    description: 'Universal: niche-based topic pull. Channel-specific: trend detection per platform.',
    universal: false,
    channelOverrides: [
      { platform: 'instagram', behavior: 'Visual trend + hashtag research' },
      { platform: 'tiktok', behavior: 'Trending sound + challenge detection' },
      { platform: 'pinterest', behavior: 'Search keyword + seasonal board trends' },
      { platform: 'linkedin', behavior: 'Industry news + professional discourse topics' },
    ],
  },
  {
    id: 'brief-creation',
    label: 'Content Brief',
    description: 'Universal: structured brief fields. Channel-specific: brief depth and angle.',
    universal: false,
    channelOverrides: [
      { platform: 'instagram', behavior: 'Visual-first brief with shot list' },
      { platform: 'tiktok', behavior: 'Hook-first brief with sound direction' },
      { platform: 'pinterest', behavior: 'SEO-first brief with keyword density' },
      { platform: 'linkedin', behavio },
  { id: 'r003', date: '2026-08-16', stage: 'brief-creation', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '0:30' },
  { id: 'r004', date: '2026-08-16', stage: 'draft-generation', status: 'running', itemsProcessed: 2, itemsGenerated: 2, duration: '1:20' },
  { id: 'r005', date: '2026-08-16', stage: 'asset-production', status: 'pending', itemsProcessed: 0, itemsGenerated: 0, duration: '—' },
  { id: 'r006', date: '2026-08-16', stage: 'caption-variants', status: 'pending', itemsProcessed: 0, itemsGenerated: 0, duration: '—' },
  { id: 'r007', date: '2026-08-15', stage: 'trigger', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '0:02' },
  { id: 'r008', date: '2026-08-15', stage: 'topic-selection', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '0:12' },
  { id: 'r009', date: '2026-08-15', stage: 'brief-creation', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '0:28' },
  { id: 'r010', date: '2026-08-15', stage: 'draft-generation', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '1:45' },
  { id: 'r011', date: '2026-08-15', stage: 'asset-production', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '2:10' },
  { id: 'r012', date: '2026-08-15', stage: 'caption-variants', status: 'complete', itemsProcessed: 4, itemsGenerated: 4, duration: '0:50' },
];

export const MOCK_APPROVAL_BATCHES: ApprovalBatch[] = [
  {
    id: 'batch-w33',
    weekLabel: 'Week 33 (Aug 10–16)',
    reviewDate: '2026-08-16',
    status: 'open',
    items: MOCK_CONTENT.filter((c) => ['drafting', 'review'].includes(c.stage)).map((c, i) => ({
      contentId: c.id,
      title: c.title,
      platform: c.platform,
      format: c.format,
      decision: 'pending' as const,
      reviewer: '',
      notes: '',
    })),
  },
  {
    id: 'batch-w32',
    weekLabel: 'Week 32 (Aug 3–9)',
    reviewDate: '2026-08-09',
    status: 'closed',
    items: MOCK_CONTENT.filter((c) => ['scheduled', 'published'].includes(c.stage)).map((c) => ({
      contentId: c.id,
      title: c.title,
      platform: c.platform,
      format: c.format,
      decision: c.stage === 'published' ? ('approved' as const) : ('approved' as const),
      reviewer: 'Ops Review',
      notes: c.stage === 'published' ? 'Published on schedule' : 'Approved, scheduled for next week',
    })),
  },
];

export function getWorkflowStage(id: string): WorkflowStage | undefined {
  return WORKFLOW_STAGES.find((s) => s.id === id);
}
