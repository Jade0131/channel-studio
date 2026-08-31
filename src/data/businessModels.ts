import type { PlatformId } from '@/types';

// ── Monetization Models ──

export type MonetizationModelId =
  | 'digital-products'
  | 'affiliate'
  | 'template-marketplace'
  | 'lead-gen-services'
  | 'community-membership';

export type EffortLevel = 'low' | 'medium' | 'high';
export type RevenueTimeline = 'immediate' | 'short-term' | 'medium-term' | 'long-term';

export interface MonetizationModel {
  id: MonetizationModelId;
  label: string;
  description: string;
  revenueType: 'one-time' | 'recurring' | 'commission';
  effort: EffortLevel;
  revenueTimeline: RevenueTimeline;
  platforms: PlatformId[];
  firstTest: string;
  firstTestMetrics: string[];
  phase: 1 | 2 | 3;
}

export const MONETIZATION_MODELS: MonetizationModel[] = [
  {
    id: 'affiliate',
    label: 'Affiliate & Tool Partnerships',
    description:
      'Earn commission promoting AI tools (ChatGPT, Midjourney, Canva, Notion, automation tools). Content IS the promotion.',
    revenueType: 'commission',
    effort: 'low',
    revenueTimeline: 'immediate',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    firstTest:
      'Pick 3 AI tools with affiliate programs. Create one piece of content per platform per tool. Track click-through and conversions over 2 weeks.',
    firstTestMetrics: ['click-throughs', 'conversions', 'revenue'],
    phase: 1,
  },
  {
    id: 'digital-products',
    label: 'Digital Product Sales',
    description:
      'AI prompt packs, template bundles, mini-courses, cheat sheets. Highest margin — one product, four distribution channels.',
    revenueType: 'one-time',
    effort: 'medium',
    revenueTimeline: 'short-term',
    platforms: ['linkedin', 'instagram', 'tiktok', 'pinterest'],
    firstTest:
      'Build one "AI Productivity Starter Kit" (5 prompts + 1 template). Sell via Gumroad or Stripe link. LinkedIn posts drive authority, Instagram/TikTok drive curiosity, Pinterest drives long-tail discovery.',
    firstTestMetrics: ['sales', 'page views', 'conversion rate'],
    phase: 1,
  },
  {
    id: 'template-marketplace',
    label: 'Template & Automation Marketplace',
    description:
      'Sell Notion templates, Make.com automations, prompt libraries, swipe files. Scalable — each platform attracts buyers at different funnel stages.',
    revenueType: 'one-time',
    effort: 'medium',
    revenueTimeline: 'short-term',
    platforms: ['linkedin', 'pinterest', 'instagram', 'tiktok'],
    firstTest:
      'Create 1 Notion template for "Weekly Content Planning." Price at $5-15. Promote across all 4 platforms with platform-native content.',
    firstTestMetrics: ['sales', 'downloads', 'review ratings'],
    phase: 2,
  },
  {
    id: 'lead-gen-services',
    label: 'Lead Generation → Service Offering',
    description:
      'Use content to attract leads, then offer consulting/setup services (AI automation setup, social media strategy, content systems). Highest revenue per lead.',
    revenueType: 'one-time',
    effort: 'high',
    revenueTimeline: 'medium-term',
    platforms: ['linkedin', 'instagram', 'tiktok', 'pinterest'],
    firstTest:
      'Post 3 LinkedIn articles about "AI for solo creators." Include a Calendly link. Track inbound inquiries.',
    firstTestMetrics: ['inbound inquiries', 'profile views', 'booked calls'],
    phase: 2,
  },
  {
    id: 'community-membership',
    label: 'Community & Membership',
    description:
      'Paid Discord/Circle community, Patreon tiers, or subscription newsletter. Recurring revenue from established audience.',
    revenueType: 'recurring',
    effort: 'high',
    revenueTimeline: 'long-term',
    platforms: ['linkedin', 'instagram', 'tiktok', 'pinterest'],
    firstTest:
      'Not first. This is Phase 2+ monetization after audience is established (3-6 months).',
    firstTestMetrics: ['members', 'retention rate', 'monthly recurring revenue'],
    phase: 3,
  },
];

// ── First Tests ──

export type TestPriority = 'do-first' | 'do-second' | 'do-third' | 'later';

export interface FirstTest {
  id: string;
  label: string;
  hypothesis: string;
  action: string;
  measures: string[];
  effort: EffortLevel;
  priority: TestPriority;
  platforms: PlatformId[];
  weekNumber: number;
}

export const FIRST_TESTS: FirstTest[] = [
  {
    id: 'test-repurpose',
    label: 'Cross-Platform Content Repurposing',
    hypothesis:
      'One well-crafted piece of content, adapted for each platform, outperforms creating 4 separate pieces.',
    action:
      'Create 1 "AI productivity tip" core piece. Adapt it for all 4 platforms. Schedule for the same week.',
    measures: ['engagement rate per platform', 'follower growth', 'click-throughs'],
    effort: 'low',
    priority: 'do-first',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    weekNumber: 1,
  },
  {
    id: 'test-pinterest-seo',
    label: 'Niche Validation via Pinterest SEO',
    hypothesis:
      'Pinterest search data reveals which "AI productivity" sub-topics have real demand.',
    action:
      'Create 10 pins around different AI productivity angles. Track which get impressions and saves.',
    measures: ['pin impressions', 'saves', 'click-throughs'],
    effort: 'low',
    priority: 'do-first',
    platforms: ['pinterest'],
    weekNumber: 1,
  },
  {
    id: 'test-linkedin-authority',
    label: 'LinkedIn Authority Content → Lead Capture',
    hypothesis:
      '3 professional articles on LinkedIn about AI productivity generate inbound DMs or profile views from potential buyers.',
    action:
      'Publish 3 LinkedIn posts/articles. Include a soft CTA (link to a free resource or Calendly).',
    measures: ['post impressions', 'profile views', 'connection requests', 'DMs', 'link clicks'],
    effort: 'medium',
    priority: 'do-second',
    platforms: ['linkedin'],
    weekNumber: 2,
  },
  {
    id: 'test-tiktok-demo',
    label: 'TikTok Demo Content Virality',
    hypothesis:
      'Quick screen-recording demo videos of AI tools get organic reach on TikTok.',
    action:
      'Create 5 short (15-30s) screen recordings showing AI tool usage. Use trending sounds.',
    measures: ['views', 'shares', 'follows from demo content'],
    effort: 'low',
    priority: 'do-second',
    platforms: ['tiktok'],
    weekNumber: 2,
  },
  {
    id: 'test-affiliate',
    label: 'Affiliate Link Performance',
    hypothesis:
      'Content featuring affiliate links generates measurable clicks and at least 1 conversion within 30 days.',
    action:
      'Add affiliate links to the best-performing content from Tests 1-4. Track with UTM parameters.',
    measures: ['click-throughs', 'conversions', 'revenue'],
    effort: 'low',
    priority: 'do-third',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    weekNumber: 3,
  },
];

// ── Automation Workflows ──

export type AutomationWorkflowId =
  | 'content-pipeline'
  | 'trend-detection'
  | 'content-repurpose'
  | 'engagement-growth'
  | 'analytics-learning';

export interface AutomationWorkflow {
  id: AutomationWorkflowId;
  label: string;
  description: string;
  cadence: 'daily' | 'weekly' | 'on-demand';
  platforms: PlatformId[];
  isUniversal: boolean;
  components: string[];
  platformOverrides: { platform: PlatformId; override: string }[];
}

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'content-pipeline',
    label: 'Content Production Pipeline',
    description:
      'The core daily workflow: trigger → topic → brief → draft → assets → captions → approval → schedule → handoff.',
    cadence: 'daily',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    isUniversal: true,
    components: [
      'Daily trigger scheduler',
      'Brief template engine',
      'Draft generation prompt chain',
      'Approval queue manager',
      'Scheduling optimizer',
    ],
    platformOverrides: [
      { platform: 'instagram', override: 'Hashtag limits, Reel duration, story sticker suggestions' },
      { platform: 'tiktok', override: 'Sound trending, challenge format, duet/stitch opportunities' },
      { platform: 'pinterest', override: 'Keyword descriptions, board categorization, pin dimensions' },
      { platform: 'linkedin', override: 'Professional tone, article length, document/carousel format' },
    ],
  },
  {
    id: 'trend-detection',
    label: 'Trend Detection Agent',
    description:
      'Monitors platform-specific trends and feeds insights back into topic selection.',
    cadence: 'daily',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    isUniversal: false,
    components: [
      'Trend data collector',
      'Momentum scorer',
      'Relevance filter',
      'Angle suggestion engine',
    ],
    platformOverrides: [
      { platform: 'instagram', override: 'Trending hashtags, Reel audio, explore page patterns' },
      { platform: 'tiktok', override: 'Trending sounds, challenges, creator patterns in niche' },
      { platform: 'pinterest', override: 'Seasonal search trends, board popularity, pin virality' },
      { platform: 'linkedin', override: 'Industry news, viral post patterns, engagement bait detection' },
    ],
  },
  {
    id: 'content-repurpose',
    label: 'Content Repurposing Engine',
    description:
      'One piece of core content becomes 4 platform-native outputs. The single biggest efficiency gain.',
    cadence: 'on-demand',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    isUniversal: true,
    components: [
      'Core content parser',
      'Platform format adapter',
      'Caption/hashtag generator per platform',
      'Visual asset resizer',
    ],
    platformOverrides: [
      { platform: 'instagram', override: 'Carousel breakdown or Reel script from text content' },
      { platform: 'tiktok', override: '30-60s quick-fire clip with screen recording or talking head' },
      { platform: 'pinterest', override: 'Infographic pin + blog-style SEO description' },
      { platform: 'linkedin', override: 'Long-form post with professional angle and data points' },
    ],
  },
  {
    id: 'engagement-growth',
    label: 'Engagement & Growth Agent',
    description:
      'Platform-specific engagement patterns and growth strategies.',
    cadence: 'daily',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    isUniversal: false,
    components: [
      'Engagement tracker',
      'Growth metrics dashboard',
      'Weekly growth report generator',
    ],
    platformOverrides: [
      { platform: 'instagram', override: 'DM auto-response, story poll tracking, hashtag reach' },
      { platform: 'tiktok', override: 'Comment engagement, follow-back for niche creators' },
      { platform: 'pinterest', override: 'Board optimization, pin re-sharing scheduler' },
      { platform: 'linkedin', override: 'Connection requests, comment engagement on target accounts' },
    ],
  },
  {
    id: 'analytics-learning',
    label: 'Analytics & Learning Agent',
    description:
      'Collects performance data from all 4 platforms weekly. Identifies patterns, feeds insights back.',
    cadence: 'weekly',
    platforms: ['instagram', 'tiktok', 'pinterest', 'linkedin'],
    isUniversal: true,
    components: [
      'Cross-platform data collector',
      'Performance pattern analyzer',
      'Insight generator',
      'Weekly unified report builder',
    ],
    platformOverrides: [],
  },
];

// ── Weekly Report Template ──

export interface WeeklyReportSection {
  id: string;
  label: string;
  description: string;
  fields: string[];
}

export const WEEKLY_REPORT_TEMPLATE: WeeklyReportSection[] = [
  {
    id: 'per-platform',
    label: 'Per Platform Performance',
    description: 'What worked on each platform this week.',
    fields: [
      'Top performing post type and metric',
      'Niche angle tested and signal strength',
      'Audience growth and engagement rate',
    ],
  },
  {
    id: 'cross-platform',
    label: 'Cross-Platform Insights',
    description: 'Patterns that span multiple platforms.',
    fields: [
      'Best performing repurposed content',
      'Monetization signal (affiliate clicks / lead captures / product interest)',
      'Total audience growth across platforms',
    ],
  },
  {
    id: 'decisions',
    label: 'Decisions',
    description: 'What to keep, stop, and try next.',
    fields: [
      'Keep: what to continue doing',
      'Stop: what to drop or deprioritize',
      'Try: next experiment for the coming week',
    ],
  },
  {
    id: 'next-week',
    label: 'Next Week Focus',
    description: 'The 1-2 sentence priority statement.',
    fields: ['Priority focus area'],
  },
];
