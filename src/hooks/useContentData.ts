import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MOCK_CONTENT } from '@/data/mockContent';
import type { ContentItem, ContentStatus, PlatformId, ContentStage } from '@/types';

interface DbRow {
  id: string;
  platform: string;
  format: string;
  title: string;
  stage: ContentStage;
  status: ContentStatus;
  assignee: string | null;
  input: Record<string, unknown> | null;
  output: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

function mapRow(row: DbRow): ContentItem {
  return {
    id: row.id,
    platform: row.platform as PlatformId,
    format: row.format as ContentItem['format'],
    title: row.title,
    stage: row.stage,
    status: row.status,
    assignee: row.assignee || '',
    input: (row.input as ContentItem['input']) || {},
    output: (row.output as ContentItem['output']) || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function useContentData() {
  const [content, setContent] = useState<ContentItem[]>(MOCK_CONTENT);
  const [dbLive, setDbLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('content_items')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setContent(data.map(mapRow));
          setDbLive(true);
        }
      } catch {
        // DB unreachable — keep mock data.
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addContent = async (input: {
    platform: PlatformId;
    format: string;
    title: string;
    stage?: ContentStage;
    assignee?: string;
  }) => {
    const row = {
      platform: input.platform,
      format: input.format,
      title: input.title,
      stage: input.stage || 'ideation',
      status: 'active' as ContentStatus,
      assignee: input.assignee || '',
      input: { topic: input.title },
      output: {},
    };
    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert(row)
        .select('*')
        .single();
      if (error) throw error;
      if (data) {
        const item = mapRow(data as DbRow);
        setContent((prev) => [item, ...prev]);
        return item;
      }
    } catch {
      // Offline fallback: keep in memory so the UI still feels responsive.
      const temp: ContentItem = {
        id: `local-${Date.now()}`,
        platform: input.platform,
        format: input.format as ContentItem['format'],
        title: input.title,
        stage: input.stage || 'ideation',
        status: 'active',
        assignee: input.assignee || '',
        input: { topic: input.title },
        output: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setContent((prev) => [temp, ...prev]);
      return temp;
    }
  };

  return { content, dbLive, loading, addContent };
}
