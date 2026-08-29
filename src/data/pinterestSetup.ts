// ── Pinterest Setup Data ──

export interface PinterestNicheOption {
  id: string;
  label: string;
  description: string;
  audienceSize: 'large' | 'medium' | 'niche';
  competition: 'high' | 'medium' | 'low';
  monetizationPotential: 'high' | 'medium' | 'low';
  recommended: boolean;
  rationale: string;
}

export interface PinterestContentPillar {
  id: string;
  label: string;
  description: string;
  frequency: string;
  priority: 'core' | 'supporting' | 'experimental';
  exampleFormats: string[];
}

export interface PinterestDailyFlowStep {
  id: string;
  step: number;
  label: string;
  description: string;
  timeWindow: string;
  automated: boolean;
}

export interface PinterestReviewRhythm {
  id: string;
  label: string;
  description: string;
  cadence: string;
  effort: 'minimal' | 'light' | 'moderate';
}

export interface PinterestGrowthTest {
  id: string;
  label: string;
  description: string;
  metric: string;
  targetWeek: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

export interface PinterestMonetizationPath {
  id: string;
  label: string;
  description: string;
  threshold: string;
  effort: 'low' | 'medium' | 'high';
  passive: boolean;
}

export const PINTEREST_NICHE_OPTIONS: PinterestNicheOption[] = [
  {
    id: 'pinterest-niche-home-decor',
    label: 'Budget Home Decor & DIY',
    description: 'Saving-on-a-budget room makeovers, subtle decor refresh ideas, and achievable DIY projects with clear before/afters. Strong visual board culture and evergreen search volume.',
    audienceSize: 'large',
    competition: 'high',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Pinterest users search decor intent constantly, pins stay evergreen for months, and affiliate links to affordable products convert well.',
  },
  {
    id: 'pinterest-niche-recipes',
    label: 'Quick Healthy Recipes',
    description: 'Fast, visual recipe pins (30-min meals, meal prep, budget friendly) with strong step photography and SEO-friendly titles.',
    audienceSize: 'large',
    competition: 'high',
    monetizationPotential: 'high',
    recommended: false,
    rationale: 'Food is the biggest Pinterest category, but very competitive. Needs polished imagery and clear differentiation.',
  },
  {
    id: 'pinterest-niche-fashion-wardrobe',
    label: 'Capsule Wardrobe & Style',
    description: 'Minimal wardrobe-building pins, outfit formula breakdowns, and seasonal capsule updates with clear visual guides.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'medium',
    recommended: true,
    rationale: 'Mid-sized but engaged audience. Strong affiliate and digital-product potential with a distinct visual angle.',
  },
  {
    id: 'pinterest-niche-travel-tips',
    label: 'Budget Travel & Itineraries',
    description: 'Affordable destination guides, packing lists, and day-by-day itineraries presented as saveable visual boards.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'high',
    recommended: false,
    rationale: 'High affiliate payout (hotels/tours) but travel niche swings seasonally and with broader trends.',
  },
  {
    id: 'pinterest-niche-organizing',
    label: 'Small-Space Organization',
    description: 'Decluttering routines, storage hacks, and small-apartment organization ideas with satisfying before/afters.',
    audienceSize: 'medium',
    competition: 'low',
    monetizationPotential: 'medium',
    recommended: true,
    rationale: 'Underserved visual niche with strong evergreen searches and easy affiliate product links.',
  },
];

export const RECOMMENDED_PINTEREST_NICHE = PINTEREST_NICHE_OPTIONS[0];

export const PINTEREST_CONTENT_PILLARS: PinterestContentPillar[] = [
  {
    id: 'pin-pillar-decor-ideas',
    label: 'Decor Ideas',
    description: 'Saveable visual pins of affordable room updates, color palettes, and decor swaps with clear captions and SEO titles.',
    frequency: '3x/week',
    priority: 'core',
    exampleFormats: ['Idea pin', 'Before/after', 'Color palette'],
  },
  {
    id: 'pin-pillar-diy-tutorial',
    label: 'DIY Tutorials',
    description: 'Step-by-step faceless DIY guides with numbered visual steps and a clear result photo.',
    frequency: '2x/week',
    priority: 'core',
    exampleFormats: ['Step-by-step', 'Video pin', 'Carousel'],
  },
  {
    id: 'pin-pillar-budget-list',
    label: 'Budget Lists',
    description: 'Product roundups and budget shopping lists that link out to affordable items.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Roundup', 'Shopping list', 'Comparison'],
  },
  {
    id: 'pin-pillar-seo-guide',
    label: 'SEO Guides',
    description: 'Educational pins about how to style or organize on a budget, designed to rank in Pinterest search.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Guide pin', 'Infographic', 'Tip card'],
  },
  {
    id: 'pin-pillar-seasonal',
    label: 'Seasonal Refresh',
    description: 'Timely seasonal decor and refresh ideas that ride search spikes.',
    frequency: '1x/week',
    priority: 'experimental',
    exampleFormats: ['Seasonal idea', 'Trend remix', 'Holiday board'],
  },
];

export const PINTEREST_DAILY_FLOW: PinterestDailyFlowStep[] = [
  {
    id: 'pin-daily-1',
    step: 1,
    label: 'Keyword & Trend Pull',
    description: 'Pull high-intent keywords and rising Pinterest searches for the approved niche. Match to pin topic.',
    timeWindow: '7:00–7:20 AM',
    automated: true,
  },
  {
    id: 'pin-daily-2',
    step: 2,
    label: 'Pin Design',
    description: 'Generate a faceless pin: title overlay, clear visual, brand color, and SEO keyword in the caption.',
    timeWindow: '7:20–7:45 AM',
    automated: true,
  },
  {
    id: 'pin-daily-3',
    step: 3,
    label: 'Board & Caption Assignment',
    description: 'Assign the pin to the right board, write the SEO caption, and add relevant hashtags.',
    timeWindow: '7:45–8:00 AM',
    automated: true,
  },
  {
    id: 'pin-daily-4',
    step: 4,
    label: 'Human Review',
    description: 'Approve the pin, confirm the keyword targeting, and schedule today\'s single push.',
    timeWindow: '8:00–8:10 AM',
    automated: false,
  },
];

export const PINTEREST_REVIEW_RHYTHM: PinterestReviewRhythm[] = [
  {
    id: 'pin-rhythm-daily',
    label: 'Daily Pin Check',
    description: 'Review the day\'s pin: keyword match, visual quality, and caption clarity. Approve or request a swap.',
    cadence: 'Every day per post',
    effort: 'minimal',
  },
  {
    id: 'pin-rhythm-weekly',
    label: 'Weekly Board Review',
    description: 'Check which pins and boards are driving saves and outbound clicks. Refresh underperforming pins.',
    cadence: 'Sunday',
    effort: 'light',
  },
  {
    id: 'pin-rhythm-monthly',
    label: 'Monthly SEO Retro',
    description: 'Review search impressions and top performing keywords. Adjust niche focus and board structure for the month.',
    cadence: 'First of month',
    effort: 'moderate',
  },
];

export const PINTEREST_GROWTH_TESTS: PinterestGrowthTest[] = [
  {
    id: 'pin-test-keyword',
    label: 'Keyword Targeting Test',
    description: 'Compare broad vs long-tail keyword pins to see which drives more saves and outbound clicks.',
    metric: 'Save rate + outbound clicks',
    targetWeek: 'Week 2',
    status: 'pending',
  },
  {
    id: 'pin-test-format',
    label: 'Pin Format Test',
    description: 'Compare static pins vs video pins vs idea pins to find the format with the highest engagement.',
    metric: 'Impressions + saves',
    targetWeek: 'Week 3',
    status: 'pending',
  },
  {
    id: 'pin-test-board',
    label: 'Board Structure Test',
    description: 'Test focused single-topic boards vs broad boards to see which drives better discovery.',
    metric: 'Profile visits + follows',
    targetWeek: 'Week 4',
    status: 'pending',
  },
  {
    id: 'pin-test-timing',
    label: 'Posting Time Test',
    description: 'Pin at different times of day to find when the audience is most active in save behavior.',
    metric: 'Impression-to-save ratio',
    targetWeek: 'Week 5',
    status: 'pending',
  },
];

export const PINTEREST_WEEKLY_POSTING_SCHEDULE = [
  { day: 'Monday', pillar: 'Decor Ideas', format: 'Idea pin', time: '6:00 AM' },
  { day: 'Tuesday', pillar: 'DIY Tutorial', format: 'Step-by-step', time: '6:00 AM' },
  { day: 'Wednesday', pillar: 'Decor Ideas', format: 'Before/after', time: '6:00 AM' },
  { day: 'Thursday', pillar: 'Budget List', format: 'Roundup', time: '6:00 AM' },
  { day: 'Friday', pillar: 'DIY Tutorial', format: 'Video pin', time: '6:00 AM' },
  { day: 'Saturday', pillar: 'Seasonal Refresh', format: 'Seasonal idea', time: '8:00 AM' },
  { day: 'Sunday', pillar: 'SEO Guide', format: 'Tip card', time: '8:00 AM' },
];

export const PINTEREST_MONETIZATION_PATHS: PinterestMonetizationPath[] = [
  {
    id: 'pin-mon-affiliate',
    label: 'Affiliate Links',
    description: 'Link pins to affiliated products (decor, tools, organizers) and earn commission on purchases.',
    threshold: '1K+ monthly saves',
    effort: 'low',
    passive: true,
  },
  {
    id: 'pin-mon-creator-rewards',
    label: 'Pinterest Creator Rewards',
    description: 'Earn from high-performing idea pins as Pinterest expands its creator monetization.',
    threshold: '3K+ followers',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'pin-mon-digital-products',
    label: 'Digital Products & Guides',
    description: 'Sell style guides, room-makeover ebooks, or editable printables directly to your audience.',
    threshold: '2K+ engaged followers',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'pin-mon-brand-collabs',
    label: 'Brand Collaborations',
    description: 'Sponsored pins and brand board collaborations with home and lifestyle brands.',
    threshold: '5K+ engaged followers',
    effort: 'high',
    passive: false,
  },
];
