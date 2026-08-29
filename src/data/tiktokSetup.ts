// ── TikTok Setup Data ──

export interface NicheOption {
  id: string;
  label: string;
  description: string;
  audienceSize: 'large' | 'medium' | 'niche';
  competition: 'high' | 'medium' | 'low';
  monetizationPotential: 'high' | 'medium' | 'low';
  recommended: boolean;
  rationale: string;
}

export interface ContentPillar {
  id: string;
  label: string;
  description: string;
  frequency: string;
  priority: 'core' | 'supporting' | 'experimental';
  exampleFormats: string[];
}

export interface DailyFlowStep {
  id: string;
  step: number;
  label: string;
  description: string;
  timeWindow: string;
  automated: boolean;
}

export interface ReviewRhythm {
  id: string;
  label: string;
  description: string;
  cadence: string;
  effort: 'minimal' | 'light' | 'moderate';
}

export interface GrowthTest {
  id: string;
  label: string;
  description: string;
  metric: string;
  targetWeek: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

export interface MonetizationPath {
  id: string;
  label: string;
  description: string;
  threshold: string;
  effort: 'low' | 'medium' | 'high';
  passive: boolean;
}

export const NICHE_OPTIONS: NicheOption[] = [
  {
    id: 'niche-fashion-styling',
    label: 'Everyday Fashion Styling',
    description: 'Practical outfit ideas, layering tutorials, and style tips for everyday wear. Focus on accessible, repeatable looks rather than high fashion.',
    audienceSize: 'large',
    competition: 'high',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Large audience, proven monetization through affiliate links and brand deals. Visual content performs well on TikTok. Aligns with existing Instagram presence.',
  },
  {
    id: 'niche-budget-fashion',
    label: 'Budget-Friendly Fashion Finds',
    description: 'Affordable fashion discoveries, haul videos, and price-to-value comparisons. Show followers how to look great without overspending.',
    audienceSize: 'large',
    competition: 'medium',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Lower competition than general fashion. Affiliate revenue converts well because viewers are price-conscious and ready to buy. Haul and find content is highly shareable.',
  },
  {
    id: 'niche-fashion-education',
    label: 'Fashion Education & Styling Science',
    description: 'Teach the principles behind great style — color theory, body proportions, fabric choices. Educational content that builds authority.',
    audienceSize: 'medium',
    competition: 'low',
    monetizationPotential: 'medium',
    recommended: false,
    rationale: 'Low competition and strong authority building, but smaller audience and slower growth. Better as a secondary content pillar than a primary niche.',
  },
  {
    id: 'niche-sustainable-fashion',
    label: 'Sustainable & Conscious Fashion',
    description: 'Thrift flips, sustainable brand spotlights, and wardrobe longevity tips. Content that promotes mindful consumption.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'medium',
    recommended: false,
    rationale: 'Growing audience but monetization is harder — sustainable brands often have smaller budgets. Good for brand identity but slower path to passive income.',
  },
];

export const RECOMMENDED_NICHE = NICHE_OPTIONS[0];

export const CONTENT_PILLARS: ContentPillar[] = [
  {
    id: 'pillar-outfit-ideas',
    label: 'Daily Outfit Ideas',
    description: 'Quick, repeatable outfit videos showing 1-3 looks per post. The bread and butter — what to wear for specific occasions, weather, or moods.',
    frequency: '5x per week',
    priority: 'core',
    exampleFormats: ['Short-form video', 'Outfit transition', 'Get Ready With Me'],
  },
  {
    id: 'pillar-budget-finds',
    label: 'Budget Finds & Hauls',
    description: 'Affordable fashion discoveries from accessible retailers. Show the item, the price, and how to style it. Drives affiliate clicks.',
    frequency: '2x per week',
    priority: 'core',
    exampleFormats: ['Haul video', 'Price comparison', 'Find of the week'],
  },
  {
    id: 'pillar-styling-tips',
    label: 'Styling Tips & Education',
    description: 'Short educational clips teaching one concept per video — how to layer, color matching, dressing for body type. Builds authority and saves.',
    frequency: '2x per week',
    priority: 'supporting',
    exampleFormats: ['Tutorial', 'Before & after', 'Quick tip'],
  },
  {
    id: 'pillar-trend-participation',
    label: 'Trend Participation',
    description: 'Join trending sounds, formats, and challenges with a fashion lens. Keeps the account visible in the algorithm and attracts new followers.',
    frequency: '1-2x per week',
    priority: 'supporting',
    exampleFormats: ['Trending sound', 'Challenge response', 'Format remix'],
  },
  {
    id: 'pillar-community-engagement',
    label: 'Community Engagement',
    description: 'Reply to comments with video responses, Q&A sessions, and follower-requested content. Builds loyalty and repeat viewership.',
    frequency: '1x per week',
    priority: 'supporting',
    exampleFormats: ['Comment reply', 'Q&A', 'Follower request'],
  },
  {
    id: 'pillar-experimental',
    label: 'Experimental Formats',
    description: 'Test new content types — longer storytelling, series content, collaborations. Low pressure, high learning.',
    frequency: '1x per week',
    priority: 'experimental',
    exampleFormats: ['Series pilot', 'Collaboration', 'Long-form test'],
  },
];

export const DAILY_FLOW: DailyFlowStep[] = [
  {
    id: 'flow-1',
    step: 1,
    label: 'Morning Topic Pull',
    description: 'AI selects today\'s topic from the content pillars and trending sounds. Matches topic to the day\'s pillar assignment.',
    timeWindow: '7:00 AM',
    automated: true,
  },
  {
    id: 'flow-2',
    step: 2,
    label: 'Brief Generation',
    description: 'AI generates a structured brief: hook idea, outfit concept, key message, target sound, and CTA.',
    timeWindow: '7:05 AM',
    automated: true,
  },
  {
    id: 'flow-3',
    step: 3,
    label: 'Script & Caption Draft',
    description: 'AI produces a 15-60 second vertical video script, caption text, and 3-5 hashtags optimized for TikTok discovery.',
    timeWindow: '7:15 AM',
    automated: true,
  },
  {
    id: 'flow-4',
    step: 4,
    label: 'Visual Direction',
    description: 'AI generates visual direction: shot list, lighting notes, text overlay suggestions, and thumbnail concept.',
    timeWindow: '7:25 AM',
    automated: true,
  },
  {
    id: 'flow-5',
    step: 5,
    label: 'Queue for Production',
    description: 'Completed draft is queued for filming. All assets (script, visual direction, caption) are packaged together.',
    timeWindow: '7:30 AM',
    automated: true,
  },
  {
    id: 'flow-6',
    step: 6,
    label: 'Film & Upload',
    description: 'Film the video following the AI-generated direction. Upload raw footage or finished clip to the review queue.',
    timeWindow: 'Flexible (same day)',
    automated: false,
  },
  {
    id: 'flow-7',
    step: 7,
    label: 'Auto-Schedule Post',
    description: 'Approved content is scheduled for the optimal posting window. TikTok does not support auto-publish via API, so manual upload is required.',
    timeWindow: '7:00-9:00 PM',
    automated: false,
  },
];

export const REVIEW_RHYTHM: ReviewRhythm[] = [
  {
    id: 'rhythm-daily-quick',
    label: 'Daily Quick Check',
    description: 'Spend 5 minutes reviewing the AI-generated brief and script before filming. Confirm the topic makes sense and the hook is strong. No deep editing — just a gut check.',
    cadence: 'Every day before filming',
    effort: 'minimal',
  },
  {
    id: 'rhythm-weekly-batch',
    label: 'Weekly Batch Approval',
    description: 'Review all content produced during the week in one sitting. Approve, request revisions, or reject. This is the only formal approval gate — everything else is lightweight.',
    cadence: 'Once per week (e.g. Sunday evening)',
    effort: 'light',
  },
  {
    id: 'rhythm-monthly-retro',
    label: 'Monthly Performance Retro',
    description: 'Look at what performed best, what flopped, and adjust the content mix. Update audience insights, refine hashtag strategy, and plan next month\'s content pillars.',
    cadence: 'Once per month (e.g. first Monday)',
    effort: 'moderate',
  },
];
export const GROWTH_TESTS: GrowthTest[] = [
  {
    id: 'test-hook-retention',
    label: 'Hook Retention Test',
    description: 'Test different hook styles (question, bold claim, story cold-open) to find which holds viewers past the first 3 seconds.',
    metric: '3-second retention rate',
    targetWeek: 'Week 2',
    status: 'pending',
  },
  {
    id: 'test-posting-time',
    label: 'Posting Time Test',
    description: 'Post the same type of content at different times of day to find when the audience is most active.',
    metric: 'Average watch time + views',
    targetWeek: 'Week 3',
    status: 'pending',
  },
  {
    id: 'test-hashtag-density',
    label: 'Hashtag Density Test',
    description: 'Compare broad-niche hashtags vs tight micro-niche hashtags to see which drives better discovery.',
    metric: 'Discovery impressions',
    targetWeek: 'Week 4',
    status: 'pending',
  },
  {
    id: 'test-series-vs-single',
    label: 'Series vs Single Post Test',
    description: 'Compare a multi-part series with standalone posts on the same topic to measure retention and follow conversion.',
    metric: 'Profile visits + new followers',
    targetWeek: 'Week 5',
    status: 'pending',
  },
];

export const WEEKLY_POSTING_SCHEDULE: { day: string; pillar: string; format: string; time: string }[] = [
  { day: 'Monday', pillar: 'Style Tips', format: 'Tutorial/How-To', time: '6:00 PM' },
  { day: 'Tuesday', pillar: 'Outfit Ideas', format: 'GET-ready-with-me', time: '5:30 PM' },
  { day: 'Wednesday', pillar: 'Transformation', format: 'Duet/Reaction', time: '7:00 PM' },
  { day: 'Thursday', pillar: 'Style Tips', format: 'Quick tip (under 30s)', time: '12:00 PM' },
  { day: 'Friday', pillar: 'Outfit Ideas', format: 'Try-on haul', time: '6:30 PM' },
  { day: 'Saturday', pillar: 'Behind the scenes', format: 'Story-style vlog', time: '4:00 PM' },
  { day: 'Sunday', pillar: 'Rest & reflect', format: 'No post — community engagement', time: '—' },
];

export const MONETIZATION_PATHS: MonetizationPath[] = [
  {
    id: 'mon-affiliate',
    label: 'Affiliate Links',
    description: 'Share product links in bio and video descriptions. Earn commission on purchases from tracked links.',
    threshold: '1K+ followers',
    effort: 'low',
    passive: true,
  },
  {
    id: 'mon-creator-rewards',
    label: 'TikTok Creator Rewards',
    description: 'Long-form videos (1min+) earn revenue based on quality and watch time. Requires consistent posting.',
    threshold: '10K+ followers',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'mon-digital-products',
    label: 'Digital Products',
    description: 'Sell style guides, lookbooks, or notion templates directly to your audience.',
    threshold: '5K+ engaged followers',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'mon-brand-deals',
    label: 'Brand Partnerships',
    description: 'Paid sponsorships with fashion and lifestyle brands. Highest revenue per video but requires outreach.',
    threshold: '10K+ engaged followers',
    effort: 'high',
    passive: false,
  },
];
