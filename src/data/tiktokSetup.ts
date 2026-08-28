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
    exampleFormats: ['Haul video', 'Pric Review',
    description: 'Look at what worked and what didn\'t. Which videos got the most views, saves, and follows? Adjust content pillars and posting times based on data.',
    cadence: 'Once per month',
    effort: 'moderate',
  },
];

export const GROWTH_TESTS: GrowthTest[] = [
  {
    id: 'test-1',
    label: 'Posting Time Test',
    description: 'Post at 7 PM for one week, then 8 PM the next week. Compare average views and engagement rate. Pick the winner and lock it in.',
    metric: 'Average views per post',
    targetWeek: 'Weeks 1-2',
    status: 'pending',
  },
  {
    id: 'test-2',
    label: 'Hook Format Test',
    description: 'Test 3 different hook styles (question, bold statement, visual reveal) across 9 posts (3 of each). See which gets the highest watch-through rate.',
    metric: 'Watch-through rate',
    targetWeek: 'Weeks 3-4',
    status: 'pending',
  },
  {
    id: 'test-3',
    label: 'Posting Frequency Test',
    description: 'Post 5x one week, then 7x the next. Compare total weekly views and new followers. Find the sustainable sweet spot.',
    metric: 'New followers per week',
    targetWeek: 'Weeks 5-6',
    status: 'pending',
  },
  {
    id: 'test-4',
    label: 'Content Pillar Mix Test',
    description: 'Shift the ratio of outfit ideas vs budget finds (e.g. 70/30 vs 50/50) across two weeks. See which mix drives more saves and affiliate clicks.',
    metric: 'Saves and link clicks',
    targetWeek: 'Weeks 7-8',
    status: 'pending',
  },
  {
    id: 'test-5',
    label: 'Monetization Readiness Test',
    description: 'Add affiliate links to 3 posts and track click-through rate. If CTR is above 2%, expand affiliate use. If below, refine the CTA and retry.',
    metric: 'Affiliate click-through rate',
    targetWeek: 'Weeks 9-10',
    status: 'pending',
  },
];

export const MONETIZATION_PATHS: MonetizationPath[] = [
  {
    id: 'monetization-affiliate',
    label: 'Affiliate Links',
    description: 'Include tracked affiliate links in your bio and post captions. Earn commission when followers purchase items you feature.',
    threshold: '1,000+ engaged followers',
    effort: 'low',
    passive: true,
  },
  {
    id: 'monetization-creator-rewards',
    label: 'TikTok Creator Rewards Program',
    description: 'TikTok pays eligible creators based on video performance. Requires 10K followers and 100K video views in the last 30 days.',
    threshold: '10,000 followers + 100K monthly views',
    effort: 'low',
    passive: true,
  },
  {
    id: 'monetization-brand-deals',
    label: 'Brand Collaborations',
    description: 'Brands pay for sponsored content featuring their products. Starts with gifted products, moves to paid deals as audience grows.',
    threshold: '5,000+ engaged followers',
    effort: 'medium',
    passive: false,
  },
  {
    id: 'monetization-digital-products',
    label: 'Digital Style Guides',
    description: 'Sell low-cost digital products — seasonal lookbooks, capsule wardrobe guides, or shopping checklists. Passive once created.',
    threshold: '3,000+ engaged followers',
    effort: 'medium',
    passive: true,
  },
];

export const WEEKLY_POSTING_SCHEDULE = [
  { day: 'Monday', pillar: 'Daily Outfit Ideas', format: 'Outfit transition', time: '7:00 PM' },
  { day: 'Tuesday', pillar: 'Styling Tips & Education', format: 'Quick tutorial', time: '7:00 PM' },
  { day: 'Wednesday', pillar: 'Daily Outfit Ideas', format: 'Get Ready With Me', time: '7:00 PM' },
  { day: 'Thursday', pillar: 'Budget Finds & Hauls', format: 'Haul video', time: '8:00 PM' },
  { day: 'Friday', pillar: 'Daily Outfit Ideas', format: 'Outfit transition', time: '8:00 PM' },
  { day: 'Saturday', pillar: 'Trend Participation', format: 'Trending sound', time: '6:00 PM' },
  { day: 'Sunday', pillar: 'Community Engagement', format: 'Comment reply or Q&A', time: '5:00 PM' },
];
