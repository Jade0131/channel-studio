import type { Platform, ContentFormat, ContentStage } from '@/types';

export const PLATFORMS: Platform[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'Instagram',
    color: '#E1306C',
    accent: '#F77737',
    formats: ['reels', 'stories', 'posts'],
    description: 'Visual storytelling through photos, reels, and stories',
  },  {
    id: 'facebook',
    label: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    accent: '#4267B2',
    formats: ['posts', 'reels', 'stories'],
    description: 'Community building, groups, and social connection through feed content',
  },

  {
    id: 'tiktok',
    label: 'TikTok',
    icon: 'Music2',
    color: '#69C9D0',
    accent: '#EE1D52',
    formats: ['short-form', 'stories'],
    description: 'Short-form video built for trends and discovery',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    icon: 'Image',
    color: '#E60023',
    accent: '#BD081C',
    formats: ['pins', 'posts'],
    description: 'Visual discovery and idea-driven content boards',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0A66C2',
    accent: '#004182',
    formats: ['posts', 'short-form'],
    description: 'Professional networking and thought leadership content',
  },
];

export const CONTENT_FORMATS: Record<string, ContentFormat> = {
  reels: {
    id: 'reels',
    label: 'Reels',
    description: 'Short vertical video clips with audio and effects',
    icon: 'Film',
  },
  stories: {
    id: 'stories',
    label: 'Stories',
    description: 'Ephemeral vertical content that expires after 24 hours',
    icon: 'Clock',
  },
  posts: {
    id: 'posts',
    label: 'Posts',
    description: 'Static or carousel feed content with captions',
    icon: 'Image',
  },
  pins: {
    id: 'pins',
    label: 'Pins',
    description: 'Visual bookmarks linking to external content',
    icon: 'Pin',
  },
  'short-form': {
    id: 'short-form',
    label: 'Short-Form Video',
    description: 'Concise vertical video optimized for quick engagement',
    icon: 'Video',
  },
};

export const CONTENT_STAGES: { id: ContentStage; label: string; color: string }[] = [
  { id: 'ideation', label: 'Ideation', color: '#6B7280' },
  { id: 'drafting', label: 'Drafting', color: '#F59E0B' },
  { id: 'review', label: 'Review', color: '#3B82F6' },
  { id: 'scheduled', label: 'Scheduled', color: '#8B5CF6' },
  { id: 'published', label: 'Published', color: '#10B981' },
];

export const STAGE_ORDER: ContentStage[] = [
  'ideation',
  'drafting',
  'review',
  'scheduled',
  'published',
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

export function getFormat(id: string): ContentFormat | undefined {
  return CONTENT_FORMATS[id];
}

export function getStageInfo(id: string) {
  return CONTENT_STAGES.find((s) => s.id === id);
}
