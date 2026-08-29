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
    id: 'pinterest-niche-dark-fantasy',
    label: 'Dark Fantasy & Magic Aesthetics',
    description: 'Moody, atmospheric pins built around dark fantasy worlds, occult-style magic, enchanted imagery, and gothic visual storytelling. Heavy on saveable, aesthetic-driven boards.',
    audienceSize: 'niche',
    competition: 'low',
    monetizationPotential: 'medium',
    recommended: true,
    rationale: 'This is your lane. Low competition, highly engaged visual-searchers, and pins stay evergreen for years. Built to lead into your own art, photography, and symbol guides.',
  },
  {
    id: 'pinterest-niche-ancient-wisdom',
    label: 'Ancient Wisdom & Symbols',
    description: 'Pins collecting and explaining ancient symbols, sigils, spiritual meaning, old texts, esoteric knowledge, and mystical traditions in a clean, saveable visual format.',
    audienceSize: 'niche',
    competition: 'low',
    monetizationPotential: 'medium',
    recommended: true,
    rationale: 'Evergreen discovery niche that pairs perfectly with the fantasy lane. Drives strong save behavior and opens the door to printable symbol/meaning guides.',
  },
  {
    id: 'pinterest-niche-dark-photography',
    label: 'Dark & Atmospheric Photography',
    description: 'Your own photography as moody pins: night shots, fog, shadows, ruins, and cinematic light. Builds a personal brand that no faceless template can copy.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Original photography is the only truly "yours" asset. High differentiation, real portfolio growth, and it feeds every other niche with authentic visuals.',
  },
  {
    id: 'pinterest-niche-occult-aesthetic',
    label: 'Occult, Mystic & Succubus Aesthetics',
    description: 'Bold, artistic pins around mystic femininity, shadow-work, dark glamour, and seductive occult-inspired moodboards. Edited tastefully to stay within Pinterest guidelines.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'medium',
    recommended: false,
    rationale: 'Your most personality-driven lane. Very sticky audience, but needs care with Pinterest content rules — keep it artistic and tasteful, never explicit.',
  },
  {
    id: 'pinterest-niche-ritual-lifestyle',
    label: 'Ritual & Altar Lifestyle',
    description: 'Atmospheric pins on altar setups, ritual practice, candle magic, moon phases, and daily spiritual routines rendered as beautiful, saveable boards.',
    audienceSize: 'medium',
    competition: 'medium',
    monetizationPotential: 'medium',
    recommended: true,
    rationale: 'Merges the magic and ancient-wisdom lanes into an actionable lifestyle niche with clear product and guide monetization.',
  },
];

export const RECOMMENDED_PINTEREST_NICHE = PINTEREST_NICHE_OPTIONS[0];

export const PINTEREST_CONTENT_PILLARS: PinterestContentPillar[] = [
  {
    id: 'pin-pillar-art-moodboards',
    label: 'Art & Moodboards',
    description: 'Saveable dark-fantasy and mystic aesthetic boards built from curated, edited imagery with strong titles.',
    frequency: '3x/week',
    priority: 'core',
    exampleFormats: ['Idea pin', 'Moodboard', 'Palette'],
  },
  {
    id: 'pin-pillar-symbol-guides',
    label: 'Symbol & Meaning Guides',
    description: 'Clean visual cards explaining a symbol, sigil, or ancient mark — its history, meaning, and uses.',
    frequency: '2x/week',
    priority: 'core',
    exampleFormats: ['Infographic', 'Guide pin', 'Carousel'],
  },
  {
    id: 'pin-pillar-photography',
    label: 'Original Photography',
    description: 'Your own dark/atmospheric photos as pins with a personal caption and a link back to your portfolio or board.',
    frequency: '1x/week',
    priority: 'core',
    exampleFormats: ['Photo pin', 'Before/After edit', 'Series'],
  },
  {
    id: 'pin-pillar-ritual-practice',
    label: 'Ritual & Practice',
    description: 'Actionable pins on altars, moon phases, candle work, and daily spiritual routines styled beautifully.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Step-by-step', 'Checklist', 'Video pin'],
  },
  {
    id: 'pin-pillar-mystic-lifestyle',
    label: 'Mystic Lifestyle & Fashion',
    description: 'Occult-inspired styling, dark-cottagecore, and mystic comfort boards that soak up seasonal and aesthetic searches.',
    frequency: '1x/week',
    priority: 'experimental',
    exampleFormats: ['Style pin', 'Trend remix', 'Seasonal board'],
  },
];

export const PINTEREST_DAILY_FLOW: PinterestDailyFlowStep[] = [
  {
    id: 'pin-daily-1',
    step: 1,
    label: 'Keyword & Trend Pull',
    description: 'Pull high-intent keywords and rising Pinterest searches in the approved mystic/fantasy niche. Match to the day\'s pin topic.',
    timeWindow: '7:00–7:20 AM',
    automated: true,
  },
  {
    id: 'pin-daily-2',
    step: 2,
    label: 'Pin Design',
    description: 'Generate a faceless or photo-based pin: title overlay, moody color palette, and SEO keyword in the caption.',
    timeWindow: '7:20–7:45 AM',
    automated: true,
  },
  {
    id: 'pin-daily-3',
    step: 3,
    label: 'Board & Caption Assignment',
    description: 'Assign the pin to the right themed board, write the SEO caption, and add relevant hashtags.',
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
    description: 'Review the day\'s pin: keyword match, visual quality, and on-brand mood. Approve or request a swap.',
    cadence: 'Every day per post',
    effort: 'minimal',
  },
  {
    id: 'pin-rhythm-weekly',
    label: 'Weekly Board Review',
    description: 'Check which pins and boards drive saves and outbound clicks. Refresh underperforming aesthetic pins.',
    cadence: 'Sunday',
    effort: 'light',
  },
  {
    id: 'pin-rhythm-monthly',
    label: 'Monthly Niche Retro',
    description: 'Review search impressions and top keywords. Adjust niche focus and board structure for the month.',
    cadence: 'First of month',
    effort: 'moderate',
  },
];

export const PINTEREST_GROWTH_TESTS: PinterestGrowthTest[] = [
  {
    id: 'pin-test-keyword',
    label: 'Keyword Targeting Test',
    description: 'Compare broad vs long-tail mystic keywords to see which drives more saves and outbound clicks.',
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
    id: 'pin-test-brand',
    label: 'Personal Brand Test',
    description: 'Test pins that feature your own photography vs pure moodboards to measure brand pull.',
    metric: 'Follows + profile visits',
    targetWeek: 'Week 5',
    status: 'pending',
  },
];

export const PINTEREST_WEEKLY_POSTING_SCHEDULE = [
  { day: 'Monday', pillar: 'Art & Moodboards', format: 'Idea pin', time: '6:00 AM' },
  { day: 'Tuesday', pillar: 'Symbol & Meaning Guides', format: 'Guide pin', time: '6:00 AM' },
  { day: 'Wednesday', pillar: 'Art & Moodboards', format: 'Moodboard', time: '6:00 AM' },
  { day: 'Thursday', pillar: 'Ritual & Practice', format: 'Step-by-step', time: '6:00 AM' },
  { day: 'Friday', pillar: 'Original Photography', format: 'Photo pin', time: '6:00 AM' },
  { day: 'Saturday', pillar: 'Mystic Lifestyle & Fashion', format: 'Style pin', time: '8:00 AM' },
  { day: 'Sunday', pillar: 'Symbol & Meaning Guides', format: 'Carousel', time: '8:00 AM' },
];

export const PINTEREST_MONETIZATION_PATHS: PinterestMonetizationPath[] = [
  {
    id: 'pin-mon-affiliate',
    label: 'Affiliate & Print On Demand',
    description: 'Link pins to print-on-demand art, apparel, and occult-inspired products; earn commission on purchases.',
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
    label: 'Symbol & Guide Printables',
    description: 'Sell printable symbol meaning guides, altar planners, and dark-art coloring/design collections to your audience.',
    threshold: '2K+ engaged followers',
    effort: 'medium',
    passive: true,
  },
  {
    id: 'pin-mon-brand-collabs',
    label: 'Brand Collaborations',
    description: 'Sponsored pins with indie artists, tarot and witchy brands, and print shops that match the aesthetic.',
    threshold: '5K+ engaged followers',
    effort: 'high',
    passive: false,
  },
];
