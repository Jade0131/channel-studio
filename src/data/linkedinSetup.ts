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
    frequency: '3x per week',
    priority: 'core',
    exampleFormats: ['Text post', 'Carousel', 'Poll'],
  },
  {
    id: 'pillar-workflow-breakdowns',
    label: 'Workflow Breakdowns',
    description: 'Show a real workflow step-by-step — how you plan, produce, or automate content. Visual carousels work best here. Demonstrates expertise and drives saves.',
    frequency: '2x per week',
    priority: 'core',
    exampleFormats: ['Carousel', 'Document post', 'Text post with image'],
  },
  {
    id: 'pillar-engagement-stories',
    label: 'Stories & Lessons Learned',
    description: 'Personal stories about what worked, what failed, and what surprised you. Authentic narrative posts that build connection and humanize your brand.',
    frequency: '1x per week',
    priority: 'supporting',
    exampleFormats: ['Text post', 'Before & after', 'Lesson learned'],
  },
  {
    id: 'pillar-community-discussion',
    label: 'Community Discussion & Polls',
    description: 'Ask questions, run polls, and spark discussions. Boosts engagement metrics and signals to LinkedIn\'s algorithm that your content generates conversation.',
    frequency: '1x per week',
    priority: 'supporting',
    exampleFormats: ['Poll', 'Question post', 'Hot take'],
  },
  {
    id: 'pillar-curated-roundups',
    label: 'Curated Roundups & Resources',
    description: 'Collect and organize useful resources — tools, articles, templates — into a single post. High save rate and positions you as a curator and authority.',
    frequency: '1x per week',
    priority: 'supporting',
    exampleFormats: ['Resource list', 'Tool comparison', 'Link roundup'],
  },
  {
    id: 'pillar-experimental-formats',
    label: 'Experimental Formats',
    description: 'Test new content types — video posts, newsletters, collaborative articles, LinkedIn Audio events. Low pressure, high learning.',
    frequency: '1x per week',
    priority: 'experimental',
    exampleFormats: ['Video post', 'Newsletter issue', 'Collaborative article'],
  },
];

export const LINKEDIN_DAILY_FLOW: LinkedInDailyFlowStep[] = [
  {
    id: 'flow-1',
    step: 1,
    label: 'Morning Topic Pull',
    description: 'AI selects today\'s topic from the content pillars, considering what\'s trending on LinkedIn and which pillars haven\'t been covered recently.',
    timeWindow: '7:00 AM',
    automated: true,
  },
  {
    id: 'flow-2',
    step: 2,
    label: 'Post Draft Generation',
    description: 'AI generates a full post draft: hook (first line), body with line breaks for readability, and a discussion-driving question at the end.',
    timeWindow: '7:05 AM',
    automated: true,
  },
  {
    id: 'flow-3',
    step: 3,
    label: 'Carousel or Visual Generation',
    description: 'For carousel posts, AI generates slide-by-slide content: titles, bullet points, and visual direction. For text posts, suggests a supporting image concept.',
    timeWindow: '7:15 AM',
    automated: true,
  },
  {
    id: 'flow-4',
    step: 4,
    label: 'Hashtag & SEO Optimization',
    description: 'AI selects 3-5 relevant hashtags and optimizes the post for LinkedIn search. Avoids overused tags and targets niche-relevant ones.',
    timeWindow: '7:20 AM',
    automated: true,
  },
  {
    id: 'flow-5',
    step: 5,
    label: 'Comment Engagement Plan',
    description: 'AI identifies 5 relevant posts from other creators to comment on today. Commenting on others\' posts is the #1 growth lever on LinkedIn.',
    timeWindow: '7:25 AM',
    automated: true,
  },
  {
    id: 'flow-6',
    step: 6,
    label: 'Review & Post',
    description: 'Review the draft for accuracy and voice. Make any edits. Post directly to LinkedIn or schedule for the optimal time window.',
    timeWindow: '8:00-9:00 AM',
    automated: false,
  },
  {
    id: 'flow-7',
    step: 7,
    label: 'Engage with Comments',
    description: 'Respond to comments on your post within the first hour — this is critical for LinkedIn\'s algorithm. Also leave thoughtful comments on the 5 identified posts.',
    timeWindow: 'Within 1 hour of posting',
    automated: false