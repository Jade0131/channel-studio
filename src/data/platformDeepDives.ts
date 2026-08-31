import type { PlatformId } from '@/types';

// ── Per-platform deep-dive data: automation safety, monetization timelines, format rankings

export type AutomationLevel = 'full' | 'semi' | 'manual';
export type RiskSeverity = 'low' | 'medium' | 'high';

export interface AutomationTask {
  id: string;
  label: string;
  level: AutomationLevel;
  dailyMinutes: number;
  description: string;
}

export interface FormatRanking {
  id: string;
  label: string;
  viability: 'highest' | 'high' | 'medium' | 'low';
  length: string;
  why: string;
}

export interface MonetizationTier {
  id: string;
  label: string;
  threshold: string;
  effort: 'low' | 'medium' | 'high';
  passive: boolean;
  realisticRevenue: string;
  timeToRevenue: string;
}

export interface AutomationBoundary {
  id: string;
  rule: string;
  reason: string;
}

export interface PlatformDeepDive {
  platform: PlatformId;
  automationTasks: AutomationTask[];
  formatRankings: FormatRanking[];
  monetizationTiers: MonetizationTier[];
  automationBoundaries: AutomationBoundary[];
  dailyHumanMinutes: number;
  weeklyPostingFrequency: string;
}

export const PLATFORM_DEEP_DIVES: PlatformDeepDive[] = [
  // ── TikTok ──
  {
    platform: 'tiktok',
    dailyHumanMinutes: 30,
    weeklyPostingFrequency: '6-7 posts/week (1/day)',
    automationTasks: [
      {
        id: 'tt-auto-trend',
        label: 'Trending sound & challenge detection',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI scans trending sounds daily, matches to niche, flags licensing status.',
      },
      {
        id: 'tt-auto-topic',
        label: 'Topic selection from pillar queue',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI pulls today\'s topic from content pillars at 7AM.',
      },
      {
        id: 'tt-auto-brief',
        label: 'Brief generation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates hook idea, outfit concept, key message, target sound, CTA.',
      },
      {
        id: 'tt-auto-script',
        label: 'Script & caption draft',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI produces 15-60s vertical video script, caption, and 3-5 hashtags.',
      },
      {
        id: 'tt-auto-schedule',
        label: 'Posting time recommendation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI recommends optimal posting window based on audience activity.',
      },
      {
        id: 'tt-semi-daily',
        label: 'Daily quick-check',
        level: 'semi',
        dailyMinutes: 5,
        description: 'Confirm brief hook is strong and topic fits today\'s pillar. Gut check only.',
      },
      {
        id: 'tt-semi-weekly',
        label: 'Weekly batch approval',
        level: 'semi',
        dailyMinutes: 0,
        description: 'Review all 7 drafts in one sitting (Sunday evening). Approve, revise, or reject.',
      },
      {
        id: 'tt-manual-film',
        label: 'Film the video',
        level: 'manual',
        dailyMinutes: 20,
        description: 'Physical filming following AI-generated direction. Phone + human required.',
      },
      {
        id: 'tt-manual-upload',
        label: 'Upload to TikTok',
        level: 'manual',
        dailyMinutes: 5,
        description: 'No API auto-publish. Manual upload or third-party scheduling tool.',
      },
    ],
    formatRankings: [
      { id: 'tt-fmt-transition', label: 'Outfit transition / before-after', viability: 'highest', length: '15-30s', why: 'Visual hook + satisfying payoff. Algorithm loves them.' },
      { id: 'tt-fmt-grwm', label: 'Get Ready With Me (GRWM)', viability: 'high', length: '30-60s', why: 'Repeatable, low production, personal without being face-heavy.' },
      { id: 'tt-fmt-tip', label: 'Quick tip / styling hack', viability: 'high', length: '15-30s', why: 'Saves and shares. Educational content stays in feeds longer.' },
      { id: 'tt-fmt-haul', label: 'Haul / find of the week', viability: 'high', length: '30-60s', why: 'Direct affiliate driver. Price reveal is the hook.' },
      { id: 'tt-fmt-trend', label: 'Trending sound remix', viability: 'medium', length: '15-30s', why: 'Algorithm boost, but needs trend tracking. Can feel forced.' },
      { id: 'tt-fmt-reply', label: 'Comment reply video', viability: 'medium', length: '30-60s', why: 'Community builder. AI drafts reply, human films.' },
      { id: 'tt-fmt-series', label: 'Series / part 1 of X', viability: 'medium', length: '15-30s', why: 'Retention play — drives follows. Needs clear payoff per part.' },
    ],
    monetizationTiers: [
      { id: 'tt-monet-affiliate', label: 'Affiliate links', threshold: 'No minimum', effort: 'low', passive: true, realisticRevenue: '$50-200/month', timeToRevenue: '0-4 weeks' },
      { id: 'tt-monet-digital', label: 'Digital products', threshold: '5K+ engaged', effort: 'medium', passive: true, realisticRevenue: '$100-300/month', timeToRevenue: '4-8 weeks' },
      { id: 'tt-monet-rewards', label: 'TikTok Creator Rewards', threshold: '10K+ followers', effort: 'medium', passive: true, realisticRevenue: '$100-500/month', timeToRevenue: '8-16 weeks' },
      { id: 'tt-monet-brands', label: 'Brand partnerships', threshold: '10K+ engaged', effort: 'high', passive: false, realisticRevenue: '$200-500/video', timeToRevenue: '12+ weeks' },
    ],
    automationBoundaries: [
      { id: 'tt-bound-review', rule: 'Never auto-publish without human review', reason: 'TikTok flags and suppresses spam-like accounts.' },
      { id: 'tt-bound-audio', rule: 'Never use copyrighted audio without checking licensing', reason: 'Takedowns suppress account reach.' },
      { id: 'tt-bound-frequency', rule: 'Never post more than 2x per day', reason: 'Algorithm penalizes over-posting.' },
      { id: 'tt-bound-faceless', rule: 'Maintain mix of faceless and light-face content', reason: 'Algorithm changes can suppress fully faceless accounts.' },
    ],
  },

  // ── LinkedIn ──
  {
    platform: 'linkedin',
    dailyHumanMinutes: 15,
    weeklyPostingFrequency: '5 posts/week (Mon-Fri)',
    automationTasks: [
      {
        id: 'li-auto-topic',
        label: 'Topic selection from niche queue',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI pulls topic from creator-economy or AI-productivity niche at 7AM.',
      },
      {
        id: 'li-auto-brief',
        label: 'Brief generation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates topic, audience angle, tone, key insight, CTA.',
      },
      {
        id: 'li-auto-draft',
        label: 'Draft generation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI produces hook-first text post with LinkedIn-specific formatting.',
      },
      {
        id: 'li-auto-carousel',
        label: 'Carousel slide content',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates 5-7 slide breakdowns for workflow carousel posts.',
      },
      {
        id: 'li-auto-poll',
        label: 'Poll question & options',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates engagement-optimized poll questions for Thursday posts.',
      },
      {
        id: 'li-semi-review',
        label: 'Daily draft review',
        level: 'semi',
        dailyMinutes: 10,
        description: 'Read draft, add personal voice and real experience, adjust claims. Critical quality gate.',
      },
      {
        id: 'li-semi-weekly',
        label: 'Weekly batch review',
        level: 'semi',
        dailyMinutes: 0,
        description: 'Review next week\'s 5 posts. Check tone consistency and brand voice.',
      },
      {
        id: 'li-manual-post',
        label: 'Post to LinkedIn',
        level: 'manual',
        dailyMinutes: 5,
        description: 'Manual copy-paste or scheduling tool. No API auto-publish for personal accounts.',
      },
      {
        id: 'li-manual-comments',
        label: 'Reply to comments',
        level: 'manual',
        dailyMinutes: 0,
        description: 'Algorithm rewards active engagement. Reply within 1 hour of posting.',
      },
    ],
    formatRankings: [
      { id: 'li-fmt-text', label: 'Text post with hook + framework', viability: 'highest', length: '300-600 words', why: 'Algorithm loves text posts. Hook-first structure drives read-through.' },
      { id: 'li-fmt-carousel', label: 'Carousel (document post)', viability: 'high', length: '5-10 slides', why: 'High save rate. Visual workflow breakdowns perform well.' },
      { id: 'li-fmt-poll', label: 'Poll', viability: 'high', length: '1-2 sentences + 4 options', why: 'Algorithm boost from engagement. Quick to generate.' },
      { id: 'li-fmt-article', label: 'Long-form article', viability: 'medium', length: '800-1500 words', why: 'SEO play — shows up in Google. Lower engagement than feed posts.' },
      { id: 'li-fmt-newsletter', label: 'Newsletter post', viability: 'medium', length: '500-1000 words', why: 'Builds subscriber list. Monetizable via sponsorships.' },
      { id: 'li-fmt-video', label: 'Video / document share', viability: 'low', length: '30-90s', why: 'LinkedIn video gets less organic reach than text. Use sparingly.' },
    ],
    monetizationTiers: [
      { id: 'li-monet-consulting', label: 'Consulting leads', threshold: '1K+ engaged', effort: 'medium', passive: false, realisticRevenue: '$200-500/engagement', timeToRevenue: '0-8 weeks' },
      { id: 'li-monet-affiliate', label: 'Affiliate links', threshold: 'No minimum', effort: 'low', passive: true, realisticRevenue: '$50-150/month', timeToRevenue: '0-4 weeks' },
      { id: 'li-monet-newsletter', label: 'Newsletter sponsorships', threshold: '2K+ subscribers', effort: 'low', passive: true, realisticRevenue: '$50-200/issue', timeToRevenue: '8-16 weeks' },
      { id: 'li-monet-course', label: 'Online course', threshold: '3K+ engaged', effort: 'high', passive: true, realisticRevenue: '$500-2000/month', timeToRevenue: '16+ weeks' },
    ],
    automationBoundaries: [
      { id: 'li-bound-review', rule: 'Never publish AI-generated posts without human review', reason: 'LinkedIn audiences detect AI slop faster than any other platform.' },
      { id: 'li-bound-frequency', rule: 'Never post more than 1x per day', reason: 'LinkedIn algorithm punishes over-posting more severely.' },
      { id: 'li-bound-engagement', rule: 'Never auto-accept connections or auto-comment', reason: 'LinkedIn actively penalizes automation on engagement actions.' },
      { id: 'li-bound-personal', rule: 'Always add one personal anecdote per post', reason: 'This separates "AI-assisted" from "AI-generated."' },
    ],
  },

  // ── Pinterest ──
  {
    platform: 'pinterest',
    dailyHumanMinutes: 10,
    weeklyPostingFrequency: '7 pins/week (1/day)',
    automationTasks: [
      {
        id: 'pin-auto-keyword',
        label: 'Keyword research & trend detection',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI scans Pinterest search volume and seasonal trends daily.',
      },
      {
        id: 'pin-auto-topic',
        label: 'Topic selection from niche queue',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI pulls today\'s pin topic from mystic/fantasy niche queue at 7AM.',
      },
      {
        id: 'pin-auto-design',
        label: 'Pin design generation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates title overlay, mood palette, and layout direction.',
      },
      {
        id: 'pin-auto-caption',
        label: 'SEO caption & hashtags',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI writes keyword-rich caption (2-3 sentences) and selects 3-5 hashtags.',
      },
      {
        id: 'pin-auto-board',
        label: 'Board assignment',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI assigns pin to the correct themed board based on content.',
      },
      {
        id: 'pin-auto-analytics',
        label: 'Performance analytics',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI tracks impressions, saves, and outbound clicks per pin weekly.',
      },
      {
        id: 'pin-semi-review',
        label: 'Daily pin check',
        level: 'semi',
        dailyMinutes: 5,
        description: 'Confirm keyword targeting, visual quality, and on-brand mood. Approve or swap.',
      },
      {
        id: 'pin-semi-weekly',
        label: 'Weekly board review',
        level: 'semi',
        dailyMinutes: 0,
        description: 'Check which pins and boards drive saves and outbound clicks.',
      },
      {
        id: 'pin-manual-photo',
        label: 'Original photography',
        level: 'manual',
        dailyMinutes: 0,
        description: 'Physical photography — phone + creative eye. Not daily.',
      },
      {
        id: 'pin-manual-upload',
        label: 'Upload to Pinterest',
        level: 'manual',
        dailyMinutes: 5,
        description: 'No reliable auto-publish API for personal accounts.',
      },
    ],
    formatRankings: [
      { id: 'pin-fmt-static', label: 'Static pin (image + SEO caption)', viability: 'highest', length: '1000x1500px', why: 'Simple to produce, evergreen, SEO-indexed. The bread and butter.' },
      { id: 'pin-fmt-idea', label: 'Idea pin (multi-page story)', viability: 'high', length: '1080x1920px', why: 'Discovery engine loves idea pins. Good for step-by-step guides.' },
      { id: 'pin-fmt-carousel', label: 'Carousel pin (scrollable)', viability: 'high', length: '1000x1500px', why: 'Perfect for symbol guides and "5 types of..." content.' },
      { id: 'pin-fmt-photo', label: 'Photo pin (original work)', viability: 'high', length: '1000x1500px', why: 'Differentiates from moodboard accounts. Portfolio building.' },
      { id: 'pin-fmt-video', label: 'Video pin', viability: 'medium', length: '1080x1920px', why: 'Growing format. Good for atmospheric b-roll or ritual time-lapses.' },
      { id: 'pin-fmt-infographic', label: 'Infographic pin', viability: 'medium', length: '1000x2100px', why: 'Symbol meaning guides. High save rate but more design effort.' },
    ],
    monetizationTiers: [
      { id: 'pin-monet-affiliate', label: 'Affiliate + print-on-demand', threshold: '1K+ monthly saves', effort: 'low', passive: true, realisticRevenue: '$50-200/month', timeToRevenue: '0-8 weeks' },
      { id: 'pin-monet-digital', label: 'Symbol & guide printables', threshold: '2K+ engaged', effort: 'medium', passive: true, realisticRevenue: '$100-300/month', timeToRevenue: '8-12 weeks' },
      { id: 'pin-monet-rewards', label: 'Pinterest Creator Rewards', threshold: '3K+ followers', effort: 'medium', passive: true, realisticRevenue: '$50-200/month', timeToRevenue: '12-16 weeks' },
      { id: 'pin-monet-brands', label: 'Brand collaborations', threshold: '5K+ engaged', effort: 'high', passive: false, realisticRevenue: '$100-500/pin', timeToRevenue: '16+ weeks' },
    ],
    automationBoundaries: [
      { id: 'pin-bound-frequency', rule: 'Never auto-pin more than 5-10 pins per day', reason: 'Pinterest spam filter flags accounts that pin too fast.' },
      { id: 'pin-bound-repin', rule: 'Never repin the same image to multiple boards', reason: 'Pinterest treats this as spam.' },
      { id: 'pin-bound-keywords', rule: 'Never use misleading keywords or clickbait captions', reason: 'Pinterest penalizes pins that don\'t match their destination URL.' },
      { id: 'pin-bound-quality', rule: 'Always verify visual quality before publishing', reason: 'Algorithm suppresses low-quality or blurry images.' },
    ],
  },
  // ── Instagram ──
  {
    platform: 'instagram',
    dailyHumanMinutes: 25,
    weeklyPostingFrequency: '6-7 posts/week (1/day)',
    automationTasks: [
      {
        id: 'ig-auto-topic',
        label: 'Topic selection from pillar queue',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI pulls today\'s topic from AI-productivity or automation niche at 7AM.',
      },
      {
        id: 'ig-auto-brief',
        label: 'Brief generation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates visual concept, target format, hook idea, key message, CTA.',
      },
      {
        id: 'ig-auto-draft',
        label: 'Draft & asset direction',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI produces caption, visual direction, thumbnail concept, and shot list.',
      },
      {
        id: 'ig-auto-caption',
        label: 'Caption & hashtag generation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI generates 5-10 targeted hashtags and caption text per post.',
      },
      {
        id: 'ig-auto-schedule',
        label: 'Posting time recommendation',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI recommends optimal posting window (evenings 6-8PM, weekends for Reels).',
      },
      {
        id: 'ig-auto-analytics',
        label: 'Performance analytics',
        level: 'full',
        dailyMinutes: 0,
        description: 'AI tracks reach, saves, shares, profile visits per post weekly.',
      },
      {
        id: 'ig-semi-daily',
        label: 'Daily quick-check',
        level: 'semi',
        dailyMinutes: 5,
        description: 'Confirm brief hook is strong and visual concept fits the brand. Gut check.',
      },
      {
        id: 'ig-semi-weekly',
        label: 'Weekly batch approval',
        level: 'semi',
        dailyMinutes: 0,
        description: 'Review all 7 drafts in one sitting (Sunday evening). Approve, revise, or reject.',
      },
      {
        id: 'ig-manual-record',
        label: 'Record screen or film Reel',
        level: 'manual',
        dailyMinutes: 15,
        description: 'Physical recording following AI-generated direction. Phone/screen + human required.',
      },
      {
        id: 'ig-manual-carousel',
        label: 'Design carousel slides',
        level: 'manual',
        dailyMinutes: 5,
        description: 'AI generates direction, human designs in Canva or similar.',
      },
      {
        id: 'ig-manual-publish',
        label: 'Schedule or publish',
        level: 'manual',
        dailyMinutes: 5,
        description: 'Post via Meta Business Suite or manually. Instagram supports API publishing.',
      },
    ],
    formatRankings: [
      { id: 'ig-fmt-screen-reel', label: 'Reel (screen recording)', viability: 'highest', length: '1080x1920', why: 'Algorithm favorite. Visual proof of tools working. Direct affiliate driver.' },
      { id: 'ig-fmt-carousel', label: 'Carousel (step-by-step)', viability: 'highest', length: '1080x1080', why: 'High save rate. Educational content that lives in collections forever.' },
      { id: 'ig-fmt-before-after', label: 'Before/after Reel', viability: 'high', length: '1080x1920', why: 'Satisfaction loop. Transition format is algorithmically boosted.' },
      { id: 'ig-fmt-story', label: 'Story (quick demo)', viability: 'high', length: '1080x1920', why: 'Link stickers for direct affiliate clicks. High engagement per view.' },
      { id: 'ig-fmt-template', label: 'Reel (template walkthrough)', viability: 'high', length: '1080x1920', why: 'Product showcase. Shows finished system in action.' },
      { id: 'ig-fmt-metrics', label: 'Post (metrics/social proof)', viability: 'medium', length: '1080x1080', why: 'Builds trust. Shows real results. Lower reach but high engagement rate.' },
      { id: 'ig-fmt-voiceover', label: 'Reel (voiceover tip)', viability: 'medium', length: '1080x1920', why: 'Quick tips with voiceover. High save rate. Growth engine format.' },
    ],
    monetizationTiers: [
      { id: 'ig-monet-affiliate', label: 'Affiliate links (Link in Bio)', threshold: 'No minimum (1K+ for Story link stickers)', effort: 'low', passive: true, realisticRevenue: '$50-200/month', timeToRevenue: '0-4 weeks' },
      { id: 'ig-monet-templates', label: 'Digital product sales', threshold: '500+ engaged', effort: 'medium', passive: true, realisticRevenue: '$100-300/month', timeToRevenue: '4-8 weeks' },
      { id: 'ig-monet-reels-bonus', label: 'Reels Bonus Program', threshold: '10K+ followers (invite-only)', effort: 'medium', passive: true, realisticRevenue: '$50-200/month', timeToRevenue: '8-16 weeks' },
      { id: 'ig-monet-brands', label: 'Brand sponsorships', threshold: '5K+ engaged', effort: 'high', passive: false, realisticRevenue: '$200-1000/video', timeToRevenue: '12+ weeks' },
    ],
    automationBoundaries: [
      { id: 'ig-bound-review', rule: 'Never auto-publish without human review', reason: 'Instagram algorithm penalizes accounts that post low-quality content in bulk.' },
      { id: 'ig-bound-frequency', rule: 'Never post more than 1-2 Reels per day', reason: 'Over-posting Reels triggers reach suppression.' },
      { id: 'ig-bound-hashtags', rule: 'Never use irrelevant or banned hashtags', reason: 'Instagram spam filter flags accounts using misleading hashtags.' },
      { id: 'ig-bound-engagement', rule: 'Never auto-like or auto-follow', reason: 'Instagram actively penalizes engagement automation.' },
    ],
  },
];

export function getPlatformDeepDive(platform: PlatformId): PlatformDeepDive | undefined {
  return PLATFORM_DEEP_DIVES.find((d) => d.platform === platform);
}

export function getTotalAutomationMinutes(platform: PlatformId): number {
  const dive = getPlatformDeepDive(platform);
  if (!dive) return 0;
  return dive.automationTasks.reduce((sum, task) => sum + task.dailyMinutes, 0);
}
