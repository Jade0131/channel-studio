// ── Instagram Setup Data ──

export interface InstagramNicheOption {
  id: string;
  label: string;
  description: string;
  audienceSize: 'large' | 'medium' | 'niche';
  competition: 'high' | 'medium' | 'low';
  monetizationPotential: 'high' | 'medium' | 'low';
  recommended: boolean;
  rationale: string;
}

export interface InstagramContentPillar {
  id: string;
  label: string;
  description: string;
  frequency: string;
  priority: 'core' | 'supporting' | 'experimental';
  exampleFormats: string[];
}

export interface InstagramDailyFlowStep {
  id: string;
  step: number;
  label: string;
  description: string;
  timeWindow: string;
  automated: boolean;
}

export interface InstagramReviewRhythm {
  id: string;
  label: string;
  description: string;
  cadence: string;
  effort: 'minimal' | 'light' | 'moderate';
}

export interface InstagramGrowthTest {
  id: string;
  label: string;
  description: string;
  metric: string;
  targetWeek: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

export interface InstagramMonetizationPath {
  id: string;
  label: string;
  description: string;
  threshold: string;
  effort: 'low' | 'medium' | 'high';
  passive: boolean;
}

// ── Niches ──
// Instagram is the visual-first platform. Reels, carousels, and stories are the primary
// delivery formats. The recommended niche aligns with the cross-platform "AI productivity
// templates and micro-automation" strategy while leveraging Instagram's visual strengths.

export const INSTAGRAM_NICHE_OPTIONS: InstagramNicheOption[] = [
  {
    id: 'ig-niche-ai-productivity',
    label: 'AI Productivity & Workflow Visuals',
    description: 'Showcase AI tools, templates, and automations through screen recordings, before/after comparisons, and clean infographics. Visual proof that the tools work — not just talking about them.',
    audienceSize: 'large',
    competition: 'medium',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Massive audience for AI tools content. Medium competition — most creators post text on LinkedIn, not visuals on Instagram. Visual demos (screen recordings, carousels) convert well to affiliate clicks and template sales. Aligns with the cross-platform niche.',
  },
  {
    id: 'ig-niche-faceless-automation',
    label: 'Faceless Automation Showcases',
    description: 'Screen recordings and motion graphics showing AI automations running in real-time. No face required. Focus on the "watch it work" satisfaction loop.',
    audienceSize: 'large',
    competition: 'low',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Low competition for faceless AI automation content on Instagram. High satisfaction loop — viewers watch automations run. Strong affiliate driver because viewers want the same setup. Fits the faceless content strategy perfectly.',
  },
  {
    id: 'ig-niche-creator-tools',
    label: 'Creator Tool Reviews & Comparisons',
    description: 'Side-by-side tool comparisons, honest reviews, and "which tool for which job" decision guides. Carousel-heavy format.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'high',
    recommended: false,
    rationale: 'Solid affiliate monetization, but medium audience and competition. Better as a supporting content pillar than primary niche — use when the algorithm favors comparison content.',
  },
  {
    id: 'ig-niche-quick-wins',
    label: 'Quick Wins & Micro-Tips',
    description: 'Under-30-second Reels showing one specific tip, trick, or shortcut. High save rate, high share rate. The snackable format.',
    audienceSize: 'large',
    competition: 'high',
    monetizationPotential: 'medium',
    recommended: false,
    rationale: 'Large audience but high competition. Good for growth via saves/shares but weaker direct monetization. Use as a supporting pillar to maintain engagement between higher-value posts.',
  },
];

export const RECOMMENDED_INSTAGRAM_NICHE = INSTAGRAM_NICHE_OPTIONS[0];

// ── Content Pillars ──

export const INSTAGRAM_CONTENT_PILLARS: InstagramContentPillar[] = [
  {
    id: 'ig-pillar-tool-demos',
    label: 'AI Tool Demos & Walkthroughs',
    description: 'Screen recordings showing an AI tool in action — from setup to result. The core format. Viewers see the tool work, then want to try it themselves. Drives affiliate clicks and template sales.',
    frequency: '3x/week',
    priority: 'core',
    exampleFormats: ['Reel (screen recording)', 'Carousel (step-by-step)', 'Story (quick demo)'],
  },
  {
    id: 'ig-pillar-before-after',
    label: 'Before & After Transformations',
    description: 'Show the manual way vs the AI-automated way. Side-by-side or transition format. High satisfaction, high save rate.',
    frequency: '2x/week',
    priority: 'core',
    exampleFormats: ['Reel (transition)', 'Carousel (comparison)', 'Post (static comparison)'],
  },
  {
    id: 'ig-pillar-templates',
    label: 'Template & System Showcases',
    description: 'Show the finished template or automation system. What it does, how it looks, what results it produces. Direct link to product.',
    frequency: '1-2x/week',
    priority: 'core',
    exampleFormats: ['Reel (walkthrough)', 'Carousel (feature breakdown)', 'Story (behind the scenes)'],
  },
  {
    id: 'ig-pillar-tips',
    label: 'Quick Tips & Micro-Hacks',
    description: 'Under-30-second Reels showing one specific tip. High save rate, high share rate. Growth engine — brings new followers who then see the higher-value content.',
    frequency: '2x/week',
    priority: 'supporting',
    exampleFormats: ['Reel (quick tip)', 'Story (poll + tip)', 'Carousel (one concept)'],
  },
  {
    id: 'ig-pillar-social-proof',
    label: 'Results & Social Proof',
    description: 'Share metrics, wins, and real results from using the tools and systems. Builds trust. Shows you actually use what you recommend.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Post (metrics screenshot)', 'Reel (results walkthrough)', 'Story (milestone)'],
  },
  {
    id: 'ig-pillar-community',
    label: 'Community & Engagement',
    description: 'Reply to DMs, respond to comments, share follower questions and answers. Builds loyalty and repeat viewership.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Story (Q&A)', 'Reel (comment reply)', 'Post (discussion)'],
  },
  {
    id: 'ig-pillar-experimental',
    label: 'Experimental Formats',
    description: 'Test new content types — collaborations, longer storytelling, Reels with voiceover, live sessions. Low pressure, high learning.',
    frequency: '1x/week',
    priority: 'experimental',
    exampleFormats: ['Collaboration', 'Live session', 'Long-form Reel'],
  },
];

// ── Daily Flow ──

export const INSTAGRAM_DAILY_FLOW: InstagramDailyFlowStep[] = [
  {
    id: 'ig-flow-1',
    step: 1,
    label: 'Morning Topic Pull',
    description: 'AI selects today\'s topic from the content pillars and trending visual formats. Matches topic to the day\'s pillar assignment.',
    timeWindow: '7:00 AM',
    automated: true,
  },
  {
    id: 'ig-flow-2',
    step: 2,
    label: 'Brief Generation',
    description: 'AI generates a structured brief: visual concept, target format (Reel/Carousel/Story), hook idea, key message, and CTA.',
    timeWindow: '7:05 AM',
    automated: true,
  },
  {
    id: 'ig-flow-3',
    step: 3,
    label: 'Draft & Asset Direction',
    description: 'AI produces a caption draft, visual direction (screen recording angles, carousel layout, before/after framing), and thumbnail concept.',
    timeWindow: '7:15 AM',
    automated: true,
  },
  {
    id: 'ig-flow-4',
    step: 4,
    label: 'Human Review',
    description: 'Quick review of the brief and draft. Confirm the hook is strong and the visual concept fits the brand. 5 minutes max.',
    timeWindow: '7:25 AM',
    automated: false,
  },
  {
    id: 'ig-flow-5',
    step: 5,
    label: 'Queue for Production',
    description: 'Approved brief, script, and assets are queued. All elements packaged together for filming or screen recording.',
    timeWindow: '7:30 AM',
    automated: true,
  },
  {
    id: 'ig-flow-6',
    step: 6,
    label: 'Film / Record',
    description: 'Record the screen recording, film the Reel, or design the carousel following the AI-generated direction.',
    timeWindow: 'Flexible (same day)',
    automated: false,
  },
  {
    id: 'ig-flow-7',
    step: 7,
    label: 'Schedule or Publish',
    description: 'Approved content is scheduled via Meta Business Suite or posted manually. Instagram supports API publishing for most formats.',
    timeWindow: '6:00-8:00 PM',
    automated: false,
  },
];

// ── Review Rhythm ──

export const INSTAGRAM_REVIEW_RHYTHM: InstagramReviewRhythm[] = [
  {
    id: 'ig-rhythm-daily',
    label: 'Daily Quick Check',
    description: '5 minutes reviewing the AI-generated brief and script. Confirm the hook is strong and the visual concept makes sense. No deep editing — gut check.',
    cadence: 'Every day before recording',
    effort: 'minimal',
  },
  {
    id: 'ig-rhythm-weekly',
    label: 'Weekly Batch Approval',
    description: 'Review all content produced during the week in one sitting. Approve, request revisions, or reject. This is the only formal approval gate.',
    cadence: 'Once per week (e.g. Sunday evening)',
    effort: 'light',
  },
  {
    id: 'ig-rhythm-monthly',
    label: 'Monthly Performance Retro',
    description: 'Look at what performed best, what flopped, and adjust the content mix. Update audience insights, refine hashtag strategy, and plan next month\'s content pillars.',
    cadence: 'Once per month (e.g. first Monday)',
    effort: 'moderate',
  },
];

// ── Growth Tests ──

export const INSTAGRAM_GROWTH_TESTS: InstagramGrowthTest[] = [
  {
    id: 'ig-test-hook',
    label: 'Hook Style Test',
    description: 'Test different hook styles (question, bold claim, visual payoff in first frame) to find which holds viewers past the first 1.5 seconds on Reels.',
    metric: 'Reel retention rate (first 3 seconds)',
    targetWeek: 'Week 2',
    status: 'pending',
  },
  {
    id: 'ig-test-format',
    label: 'Format Performance Test',
    description: 'Compare Reels vs carousels vs static posts to find which format drives the most saves and profile visits.',
    metric: 'Save rate + profile visits',
    targetWeek: 'Week 3',
    status: 'pending',
  },
  {
    id: 'ig-test-posting-time',
    label: 'Posting Time Test',
    description: 'Post the same type of content at different times (morning vs evening) to find when the audience is most active.',
    metric: 'Reach + engagement rate',
    targetWeek: 'Week 4',
    status: 'pending',
  },
  {
    id: 'ig-test-caption-cta',
    label: 'Caption CTA Test',
    description: 'Compare different CTAs ("Save this for later" vs "Link in bio" vs "Comment your take") to find which drives the most action.',
    metric: 'Saves + link clicks + comments',
    targetWeek: 'Week 5',
    status: 'pending',
  },
];

// ── Weekly Schedule ──

export const INSTAGRAM_WEEKLY_SCHEDULE: { day: string; pillar: string; format: string; time: string }[] = [
  { day: 'Monday', pillar: 'AI Tool Demos', format: 'Reel (screen recording)', time: '6:30 PM' },
  { day: 'Tuesday', pillar: 'Before & After', format: 'Reel (transition)', time: '7:00 PM' },
  { day: 'Wednesday', pillar: 'Quick Tips', format: 'Reel (under 30s)', time: '12:00 PM' },
  { day: 'Thursday', pillar: 'Template Showcases', format: 'Carousel (feature breakdown)', time: '6:30 PM' },
  { day: 'Friday', pillar: 'AI Tool Demos', format: 'Reel (walkthrough)', time: '7:00 PM' },
  { day: 'Saturday', pillar: 'Results & Social Proof', format: 'Post (metrics)', time: '10:00 AM' },
  { day: 'Sunday', pillar: 'Community & Engagement', format: 'Story (Q&A)', time: 'Flexible' },
];

// ── Monetization Paths ──

export const INSTAGRAM_MONETIZATION_PATHS: InstagramMonetizationPath[] = [
  {
    id: 'ig-monet-affiliate',
    label: 'Affiliate Links (Link in Bio)',
    description: 'Share tracked affiliate links via Linktree or similar in bio. Every Reel and carousel that demos a tool drives clicks. Instagram allows link stickers in Stories for direct linking.',
    threshold: 'No minimum (1K+ for link sticker in Stories)',
    effort: 'low',
    passive: true,
  },
  {
    id: 'ig-monet-templates',
    label: 'Digital Product Sales',
    description: 'Sell AI prompt packs, Notion templates, automation blueprints, or mini-courses directly through the bio link. Instagram visual content is the perfect product showcase.',
    threshold: '500+ engaged followers',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'ig-monet-reels-bonus',
    label: 'Reels Bonus Program',
    description: 'Instagram pays bonuses on high-performing Reels when eligible. Not guaranteed — invite-only and inconsistent — but pure passive once it activates.',
    threshold: '10K+ followers (invite-only)',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'ig-monet-brands',
    label: 'Brand Sponsorships',
    description: 'Paid partnerships with AI tool companies, SaaS products, and productivity brands. Highest revenue per post but requires outreach or inbound at scale.',
    threshold: '5K+ engaged followers',
    effort: 'high',
    passive: false,
  },
];

// ── Type re-exports for consistency with other platform setup files ──

export type NicheOption = InstagramNicheOption;
export type ContentPillar = InstagramContentPillar;
export type DailyFlowStep = InstagramDailyFlowStep;
export type ReviewRhythm = InstagramReviewRhythm;
export type GrowthTest = InstagramGrowthTest;
export type MonetizationPath = InstagramMonetizationPath;
