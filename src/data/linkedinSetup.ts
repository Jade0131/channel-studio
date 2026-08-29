// ── LinkedIn Setup Data ──

export interface LinkedInNicheOption {
  id: string;
  label: string;
  description: string;
  audienceSize: 'large' | 'medium' | 'niche';
  competition: 'high' | 'medium' | 'low';
  monetizationPotential: 'high' | 'medium' | 'low';
  recommended: boolean;
  rationale: string;
}

export interface LinkedInContentPillar {
  id: string;
  label: string;
  description: string;
  frequency: string;
  priority: 'core' | 'supporting' | 'experimental';
  exampleFormats: string[];
}

export interface LinkedInDailyFlowStep {
  id: string;
  step: number;
  label: string;
  description: string;
  timeWindow: string;
  automated: boolean;
}

export interface LinkedInReviewRhythm {
  id: string;
  label: string;
  description: string;
  cadence: string;
  effort: 'minimal' | 'light' | 'moderate';
}

export interface LinkedInGrowthTest {
  id: string;
  label: string;
  description: string;
  metric: string;
  targetWeek: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

export interface LinkedInMonetizationPath {
  id: string;
  label: string;
  description: string;
  threshold: string;
  effort: 'low' | 'medium' | 'high';
  passive: boolean;
}

export const LINKEDIN_NICHE_OPTIONS: LinkedInNicheOption[] = [
  {
    id: 'niche-creator-economy',
    label: 'Creator Economy & Content Strategy',
    description: 'Share practical insights on how creators build audiences, monetize content, and run sustainable content workflows. Position yourself as a practitioner who ships, not a theorist.',
    audienceSize: 'large',
    competition: 'medium',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Large and growing audience on LinkedIn. Medium competition — most creators post on Twitter/X, not LinkedIn. High monetization through consulting, courses, and newsletter subscriptions. Aligns with the existing content workflow expertise already in this app.',
  },
  {
    id: 'niche-ai-productivity',
    label: 'AI-Driven Productivity & Workflows',
    description: 'Show how AI tools and automation can save time in everyday work. Practical tutorials, tool comparisons, and real workflow examples — not hype.',
    audienceSize: 'large',
    competition: 'high',
    monetizationPotential: 'high',
    recommended: true,
    rationale: 'Massive audience interest and strong monetization through consulting and digital products. High competition, but most posts are surface-level hype — practical, workflow-driven content stands out.',
  },
  {
    id: 'niche-solopreneur-operations',
    label: 'Solopreneur Operations & Systems',
    description: 'Help one-person businesses build repeatable systems for content, sales, and operations. Focus on templates, checklists, and process documentation.',
    audienceSize: 'medium',
    competition: 'low',
    monetizationPotential: 'high',
    recommended: false,
    rationale: 'Low competition and excellent monetization through templates and consulting. Smaller audience but highly engaged and willing to pay. Good as a secondary niche or content pillar.',
  },
  {
    id: 'niche-career-growth',
    label: 'Career Growth & Professional Development',
    description: 'Actionable advice on career transitions, skill-building, and workplace communication. Broad appeal but crowded space.',
    audienceSize: 'large',
    competition: 'high',
    monetizationPotential: 'medium',
    recommended: false,
    rationale: 'Large audience but extremely high competition and saturated with generic advice. Monetization is harder — audience expects free content. Better as a supporting content pillar than a primary niche.',
  },
];

export const RECOMMENDED_LINKEDIN_NICHE = LINKEDIN_NICHE_OPTIONS[0];

export const LINKEDIN_CONTENT_PILLARS: LinkedInContentPillar[] = [
  {
    id: 'pillar-practical-insights',
    label: 'Practical Insights & Frameworks',
    description: 'Share a specific, actionable framework or insight from your experience. One idea per post, formatted for skimming. This is the bread and butter — what people save and share.',
    frequency: '3x/week',
    priority: 'core',
    exampleFormats: ['Framework post', 'Text post', 'Carousel'],
  },
  {
    id: 'pillar-workflow-breakdowns',
    label: 'Workflow Breakdowns',
    description: 'Show how you actually execute — tools, steps, and lessons from real projects. Builds trust and positions you as pragmatic.',
    frequency: '1x/week',
    priority: 'core',
    exampleFormats: ['Carousel', 'Step-by-step', 'Tool stack'],
  },
  {
    id: 'pillar-stories-lessons',
    label: 'Stories & Lessons Learned',
    description: 'Share a specific result, failure, or insight from real experience. Authentic and relatable — drives conversation.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Story post', 'Reflection', 'Lesson learned'],
  },
  {
    id: 'pillar-community-polls',
    label: 'Community Discussion & Polls',
    description: 'Engage the audience with polls and open questions. Feeds the algorithm and builds comment sections.',
    frequency: '1x/week',
    priority: 'supporting',
    exampleFormats: ['Poll', 'Discussion question', 'Open thread'],
  },
  {
    id: 'pillar-curated-resources',
    label: 'Curated Roundups & Resources',
    description: 'Share useful tools, reads, and resources. Positions you as a connector and adds recurring value.',
    frequency: '1x/week',
    priority: 'experimental',
    exampleFormats: ['Resource list', 'Roundup', 'Tool recommendation'],
  },
];

export const LINKEDIN_WEEKLY_POSTING_SCHEDULE = [
  { day: 'Monday', pillar: 'Practical Insights & Frameworks', format: 'Text post', time: '8:00 AM' },
  { day: 'Tuesday', pillar: 'Workflow Breakdowns', format: 'Carousel', time: '8:00 AM' },
  { day: 'Wednesday', pillar: 'Practical Insights & Frameworks', format: 'Text post', time: '8:00 AM' },
  { day: 'Thursday', pillar: 'Community Discussion & Polls', format: 'Poll', time: '9:00 AM' },
  { day: 'Friday', pillar: 'Stories & Lessons Learned', format: 'Text post', time: '8:00 AM' },
  { day: 'Saturday', pillar: 'Curated Roundups & Resources', format: 'Resource list', time: '10:00 AM' },
  { day: 'Sunday', pillar: 'Experimental Formats', format: 'Video or newsletter', time: 'Flexible' },
];

export const LINKEDIN_DAILY_FLOW: LinkedInDailyFlowStep[] = [
  {
    id: 'li-daily-1',
    step: 1,
    label: 'Topic Pull & Brief',
    description: 'Pull the day\'s topic from the content niche queue and generate a one-paragraph brief.',
    timeWindow: '7:00–7:15 AM',
    automated: true,
  },
  {
    id: 'li-daily-2',
    step: 2,
    label: 'Draft Generation',
    description: 'Generate a professional draft tailored to LinkedIn\'s tone — insight-first, no fluff.',
    timeWindow: '7:15–7:30 AM',
    automated: true,
  },
  {
    id: 'li-daily-3',
    step: 3,
    label: 'Human Review',
    description: 'Quick read through, add personal voice and experience, adjust any claims.',
    timeWindow: '7:30–7:45 AM',
    automated: false,
  },
  {
    id: 'li-daily-4',
    step: 4,
    label: 'Schedule Post',
    description: 'Confirm the posting time or adjust based on engagement patterns.',
    timeWindow: '7:45–8:00 AM',
    automated: true,
  },
];

export const LINKEDIN_REVIEW_RHYTHM: LinkedInReviewRhythm[] = [
  {
    id: 'li-rhythm-daily',
    label: 'Daily Light Check',
    description: 'Skim the day\'s draft. Confirm the topic makes sense and the tone sounds like you. No heavy editing.',
    cadence: 'Every morning',
    effort: 'minimal',
  },
  {
    id: 'li-rhythm-weekly',
    label: 'Weekly Batch Review',
    description: 'Review weekly performance, check which posts drove engagement, and queue the best ideas for next week.',
    cadence: 'Sunday evening',
    effort: 'light',
  },
  {
    id: 'li-rhythm-monthly',
    label: 'Monthly Strategy Retro',
    description: 'Review follower growth, engagement over time, and which content pillars perform best. Adjust strategy for the month ahead.',
    cadence: 'First Monday of month',
    effort: 'moderate',
  },
];

export const LINKEDIN_GROWTH_TESTS: LinkedInGrowthTest[] = [
  {
    id: 'li-test-format',
    label: 'Format Performance Test',
    description: 'Compare text posts vs carousels vs polls to find which format drives the most meaningful engagement.',
    metric: 'Engagement rate',
    targetWeek: 'Week 2',
    status: 'pending',
  },
  {
    id: 'li-test-timing',
    label: 'Posting Time Test',
    description: 'Test Tuesday vs Thursday and morning vs midday to find the highest-engagement window.',
    metric: 'Impression + click rate',
    targetWeek: 'Week 3',
    status: 'pending',
  },
  {
    id: 'li-test-pillar',
    label: 'Content Pillar Test',
    description: 'Run each content pillar for a week and compare which drives the most profile visits and new connections.',
    metric: 'Profile views + new connections',
    targetWeek: 'Week 4',
    status: 'pending',
  },
];

export const LINKEDIN_MONETIZATION_PATHS: LinkedInMonetizationPath[] = [
  {
    id: 'li-mon-consulting',
    label: 'Consulting',
    description: 'Attract inbound consulting leads by demonstrating expertise through consistent posting.',
    threshold: '1K+ engaged followers',
    effort: 'medium',
    passive: false,
  },
  {
    id: 'li-mon-online-course',
    label: 'Online Course',
    description: 'Package your expertise into a structured course. Posts serve as top-of-funnel content.',
    threshold: '3K+ engaged followers',
    effort: 'high',
    passive: true,
  },
  {
    id: 'li-mon-newsletter',
    label: 'Newsletter Sponsorships',
    description: 'Build a LinkedIn newsletter and monetize it with sponsor placements.',
    threshold: '2K+ subscribers',
    effort: 'low',
    passive: true,
  },
];
