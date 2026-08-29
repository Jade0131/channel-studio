import type { ContentItem } from '@/types';
import { getPlatform, getFormat, getStageInfo } from '@/data/platforms';
import { AccessibleModal } from '@/components/AccessibleModal';
import {
  Target,
  Users,
  MessageSquare,
  Tag,
  Link2,
  Megaphone,
  BookOpen,
  FileText,
  Hash,
  ScrollText,
  Eye,
  Image as ImageIcon,
  Clock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

interface ContentDetailModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

const INPUT_ICON_MAP: Record<string, LucideIcon> = {
  topic: Target,
  audience: Users,
  tone: MessageSquare,
  keywords: Tag,
  references: Link2,
  callToAction: Megaphone,
  brandGuidelines: BookOpen,
};

const OUTPUT_ICON_MAP: Record<string, LucideIcon> = {
  caption: FileText,
  hashtags: Hash,
  script: ScrollText,
  visualDirection: Eye,
  thumbnailConcept: ImageIcon,
  postingTime: Clock,
  estimatedReach: TrendingUp,
};

const INPUT_LABELS: Record<string, string> = {
  topic: 'Topic',
  audience: 'Target Audience',
  tone: 'Tone & Voice',
  keywords: 'Keywords',
  references: 'References',
  callToAction: 'Call to Action',
  brandGuidelines: 'Brand Guidelines',
};

const OUTPUT_LABELS: Record<string, string> = {
  caption: 'Caption',
  hashtags: 'Hashtags',
  script: 'Script',
  visualDirection: 'Visual Direction',
  thumbnailConcept: 'Thumbnail Concept',
  postingTime: 'Posting Time',
  estimatedReach: 'Estimated Reach',
};

export function ContentDetailModal({ item, onClose }: ContentDetailModalProps) {
  if (!item) return null;

  const platform = getPlatform(item.platform);
  const format = getFormat(item.format);
  const stage = getStageInfo(item.stage);

  if (!platform || !format || !stage) return null;

  const inputEntries = Object.entries(item.input).filter(([, v]) => v != null && (Array.isArray(v) ? v.length > 0 : true));
  const outputEntries = Object.entries(item.output).filter(([, v]) => v != null && (Array.isArray(v) ? v.length > 0 : true));

  return (
    <AccessibleModal
      open={!!item}
      onClose={onClose}
      titleId="content-detail-title"
      title={item.title}
      subtitle={`${platform.label} · ${format.label}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: `${platform.color}18`, color: platform.color }}
          aria-hidden="true"
        >
          {platform.label[0]}
        </span>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
        >
          {stage.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span>Assignee: <span className="text-slate-600 font-medium">{item.assignee}</span></span>
        <span>Created: <span className="text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</span></span>
        <span>Updated: <span className="text-slate-600">{new Date(item.updatedAt).toLocaleDateString()}</span></span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full bg-sky-500" aria-hidden="true" />
          <h4 className="text-sm font-semibold text-slate-800">Inputs</h4>
          <span className="text-xs text-slate-400">({inputEntries.length} fields)</span>
        </div>
        {inputEntries.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No inputs defined yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {inputEntries.map(([key, value]) => {
              const Icon = INPUT_ICON_MAP[key] || FileText;
              return (
                <div key={key} className="bg-sky-50/50 border border-sky-100 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={13} className="text-sky-500" aria-hidden="true" />
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {INPUT_LABELS[key] || key}
                    </p>
                  </div>
                  <p className="text-sm text-slate-700">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full bg-emerald-500" aria-hidden="true" />
          <h4 className="text-sm font-semibold text-slate-800">Outputs</h4>
          <span className="text-xs text-slate-400">({outputEntries.length} fields)</span>
        </div>
        {outputEntries.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No outputs generated yet</p>
        ) : (
          <div className="space-y-2">
            {outputEntries.map(([key, value]) => {
              const Icon = OUTPUT_ICON_MAP[key] || FileText;
              return (
                <div key={key} className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={13} className="text-emerald-600" aria-hidden="true" />
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {OUTPUT_LABELS[key] || key}
                    </p>
                  </div>
                  <p className="text-sm text-slate-700">
                    {Array.isArray(value) ? value.join(' · ') : String(value)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AccessibleModal>
  );
}
