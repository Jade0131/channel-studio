import { useState, useMemo } from 'react';
import { MOCK_CONTENT } from '@/data/mockContent';
import { PLATFORMS, CONTENT_FORMATS, getPlatform, getFormat } from '@/data/platforms';
import type { PlatformId, ContentFormatId, ContentItem } from '@/types';
import { ContentCard } from '@/components/ContentCard';
import {
  Film,
  Clock,
  Image as ImageIcon,
  Pin,
  Video,
  ArrowLeft,
  Plus,
  type LucideIcon,
} from 'lucide-react';

const FORMAT_ICONS: Record<string, LucideIcon> = {
  Film,
  Clock,
  Image: ImageIcon,
  Pin,
  Video,
};

interface PlatformSectionProps {
  platformId: PlatformId;
  onBack: () => void;
  onItemClick: (item: ContentItem) => void;
}

export function PlatformSection({ platformId, onBack, onItemClick }: PlatformSectionProps) {
  const platform = getPlatform(platformId);
  const [activeFormat, setActiveFormat] = useState<ContentFormatId | 'all'>('all');

  const filteredContent = useMemo(() => {
    return MOCK_CONTENT.filter((c) => {
      if (c.platform !== platformId) return false;
      if (activeFormat !== 'all' && c.format !== activeFormat) return false;
      return true;
    });
  }, [platformId, activeFormat]);

  if (!platform) return null;

  const formatTabs = platform.formats.map((fmtId) => CONTENT_FORMATS[fmtId]).filter(Boolean);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-5"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </button>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${platform.color}15` }}
          >
            <span className="text-xl font-bold" style={{ color: platform.color }}>
              {platform.label[0]}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{platform.label}</h2>
            <p className="text-sm text-slate-500">{platform.description}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-sm">
          <Plus size={16} />
          New {platform.label} Content
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveFormat('all')}
          className={`px-4 py-2.5 text-sm font-medium transition-all relative ${
            activeFormat === 'all'
              ? 'text-slate-900'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          All Content
          <span className="ml-1.5 text-xs text-slate-400">
            {MOCK_CONTENT.filter((c) => c.platform === platformId).length}
          </span>
          {activeFormat === 'all' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>
        {formatTabs.map((fmt) => {
          const Icon = FORMAT_ICONS[fmt.icon] || ImageIcon;
          const count = MOCK_CONTENT.filter(
            (c) => c.platform === platformId && c.format === fmt.id
          ).length;
          const isActive = activeFormat === fmt.id;
          return (
            <button
              key={fmt.id}
              onClick={() => setActiveFormat(fmt.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-all relative flex items-center gap-2 ${
                isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={15} />
              {fmt.label}
              <span className="text-xs text-slate-400">{count}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />