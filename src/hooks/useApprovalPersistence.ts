import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { ApprovalBatch, ApprovalItem, ApprovalDecision, PlatformId, ContentFormatId } from '@/types';

interface DbBatch {
  id: string;
  week_label: string;
  review_date: string | null;
  status: string;
  created_at: string;
}

interface DbItem {
  id: string;
  batch_id: string;
  content_id: string;
  title: string;
  platform: string;
  format: string;
  decision: string;
  reviewer: string;
  notes: string;
  created_at: string;
}

function mapBatch(row: DbBatch, items: DbItem[]): ApprovalBatch {
  return {
    id: row.id,
    weekLabel: row.week_label,
    reviewDate: row.review_date || '',
    status: row.status as 'open' | 'closed',
    items: items.map((i) => ({
      contentId: i.content_id,
      title: i.title,
      platform: i.platform as PlatformId,
      format: i.format as ContentFormatId,
      decision: i.decision as ApprovalDecision,
      reviewer: i.reviewer,
      notes: i.notes,
    })),
  };
}

export function useApprovalPersistence() {
  const [batches, setBatches] = useState<ApprovalBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    (async () => {
      try {
        const { data: batchRows, error: batchErr } = await supabase
          .from('approval_batches')
          .select('*')
          .order('created_at', { ascending: false });

        if (batchErr) throw batchErr;

        const { data: itemRows, error: itemErr } = await supabase
          .from('approval_items')
          .select('*');

        if (itemErr) throw itemErr;

        if (batchRows && batchRows.length > 0) {
          const itemsByBatch = new Map<string, DbItem[]>();
          for (const row of itemRows || []) {
            if (!itemsByBatch.has(row.batch_id)) itemsByBatch.set(row.batch_id, []);
            itemsByBatch.get(row.batch_id)!.push(row);
          }

          const mapped = batchRows.map((b) => mapBatch(b, itemsByBatch.get(b.id) || []));
          setBatches(mapped);
          setDbReady(true);
        }
      } catch {
        setDbReady(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist a decision change
  const persistDecision = useCallback(
    async (batchId: string, contentId: string, decision: ApprovalDecision, reviewer: string, notes: string) => {
      if (!dbReady) return;

      // Find the approval_items row for this batch + content
      try {
        const { data: existing } = await supabase
          .from('approval_items')
          .select('id')
          .eq('batch_id', batchId)
          .eq('content_id', contentId)
          .single();

        if (existing) {
          await supabase
            .from('approval_items')
            .update({ decision, reviewer, notes })
            .eq('id', existing.id);
        } else {
          // Find the item from the local state to get title/platform/format
          const batch = batches.find((b) => b.id === batchId);
          const item = batch?.items.find((i) => i.contentId === contentId);
          if (item) {
            await supabase.from('approval_items').insert({
              batch_id: batchId,
              content_id: contentId,
              title: item.title,
              platform: item.platform,
              format: item.format,
              decision,
              reviewer,
              notes,
            });
          }
        }
      } catch {
        // Offline: local state already updated
      }
    },
    [dbReady, batches]
  );

  // Close a batch and promote approved content
  const closeBatchPersistence = useCallback(
    async (batchId: string) => {
      if (!dbReady) return;

      try {
        // Mark batch as closed
        await supabase
          .from('approval_batches')
          .update({ status: 'closed' })
          .eq('id', batchId);

        // Find approved items and promote to content_items
        const batch = batches.find((b) => b.id === batchId);
        if (!batch) return;

        const approved = batch.items.filter((i) => i.decision === 'approved');
        for (const item of approved) {
          // Upsert into content_items with stage='scheduled'
          await supabase.from('content_items').upsert(
            {
              id: item.contentId,
              platform: item.platform,
              format: item.format,
              title: item.title,
              stage: 'scheduled',
              status: 'active',
              decision: 'approved',
              reviewer: item.reviewer,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );
        }
      } catch {
        // Offline: local state already updated
      }
    },
    [dbReady, batches]
  );

  // Create a new batch (e.g., from generated content)
  const createBatch = useCallback(
    async (weekLabel: string, items: ApprovalItem[]) => {
      try {
        const { data: batch, error } = await supabase
          .from('approval_batches')
          .insert({ week_label: weekLabel, status: 'open' })
          .select('*')
          .single();

        if (error || !batch) throw error;

        // Insert approval items
        const rows = items.map((item) => ({
          batch_id: batch.id,
          content_id: item.contentId,
          title: item.title,
          platform: item.platform,
          format: item.format,
          decision: 'pending',
          reviewer: '',
          notes: '',
        }));

        const { error: itemErr } = await supabase.from('approval_items').insert(rows);
        if (itemErr) throw itemErr;

        const newBatch: ApprovalBatch = {
          id: batch.id,
          weekLabel: batch.week_label,
          reviewDate: batch.review_date || '',
          status: 'open',
          items,
        };

        setBatches((prev) => [newBatch, ...prev]);
        return newBatch;
      } catch {
        return null;
      }
    },
    []
  );

  return { batches, setBatches, loading, dbReady, persistDecision, closeBatchPersistence, createBatch };
}
