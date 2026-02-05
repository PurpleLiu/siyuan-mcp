/**
 * 思源笔记数据快照相关 API
 * 用于创建和回滚数据快照，防止误操作
 */

import type { SiyuanClient } from './client.js';
import type { BatchOperationResult } from '../types/enhanced.js';
import { requireNonEmptyString } from '../utils/validation.js';

export interface Snapshot {
  id: string;
  memo: string;
  created: string;
  hCreated: string;
  count: number;
  hSize: string;
  tag?: string;
}

export class SiyuanSnapshotApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 创建数据快照
   * @param memo 快照备注说明
   * @returns 成功信息（API不返回快照ID，需要通过listSnapshots查询最新的）
   */
  async createSnapshot(memo: string = 'Auto snapshot'): Promise<{ success: boolean; memo: string }> {
    requireNonEmptyString(memo, 'memo');

    const response = await this.client.request('/api/repo/createSnapshot', {
      memo: memo,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to create snapshot: ${response.msg}`);
    }

    return { success: true, memo };
  }

  /**
   * 获取快照列表
   * @param page 页码（从1开始）
   * @returns 快照列表及分页信息
   */
  async getSnapshots(
    page: number = 1
  ): Promise<{ snapshots: Snapshot[]; pageCount: number; totalCount: number }> {
    const response = await this.client.request<{
      snapshots: Snapshot[];
      pageCount: number;
      totalCount: number;
    }>('/api/repo/getRepoSnapshots', {
      page: page,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to get snapshots: ${response.msg}`);
    }

    // 确保返回的数据结构完整
    return {
      snapshots: response.data?.snapshots || [],
      pageCount: response.data?.pageCount || 0,
      totalCount: response.data?.totalCount || 0,
    };
  }

  /**
   * 列出所有快照（别名方法，用于简化调用）
   * @returns 快照列表
   */
  async listSnapshots(): Promise<Snapshot[]> {
    const result = await this.getSnapshots(1);
    return result.snapshots;
  }

  /**
   * 回滚到指定快照
   * @param snapshotId 快照ID
   */
  async rollbackToSnapshot(snapshotId: string): Promise<void> {
    requireNonEmptyString(snapshotId, 'snapshotId');

    const response = await this.client.request('/api/repo/checkoutRepo', {
      id: snapshotId,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to rollback to snapshot: ${response.msg}`);
    }
  }

  /**
   * 为快照添加标签
   * @param snapshotId 快照ID
   * @param tag 标签名称
   */
  async tagSnapshot(snapshotId: string, tag: string): Promise<void> {
    requireNonEmptyString(snapshotId, 'snapshotId');
    requireNonEmptyString(tag, 'tag');

    const response = await this.client.request('/api/repo/tagSnapshot', {
      id: snapshotId,
      name: tag,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to tag snapshot: ${response.msg}`);
    }
  }

  /**
   * 获取带标签的快照列表
   * @returns 带标签的快照列表
   */
  async getTaggedSnapshots(): Promise<Snapshot[]> {
    const response = await this.client.request<{ snapshots: Snapshot[] }>(
      '/api/repo/getRepoTagSnapshots'
    );

    if (response.code !== 0) {
      throw new Error(`Failed to get tagged snapshots: ${response.msg}`);
    }

    return response.data.snapshots || [];
  }

  /**
   * 删除带标签的快照
   * @param tag 标签名称
   */
  async removeTaggedSnapshot(tag: string): Promise<void> {
    requireNonEmptyString(tag, 'tag');

    const response = await this.client.request('/api/repo/removeRepoTagSnapshot', {
      tag: tag,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to remove tagged snapshot: ${response.msg}`);
    }
  }

  /**
   * 创建并标记快照（自动通过最新快照 ID 标记）
   */
  async createTaggedSnapshot(memo: string, tag: string): Promise<{ snapshot: Snapshot; tag: string }> {
    requireNonEmptyString(memo, 'memo');
    requireNonEmptyString(tag, 'tag');

    await this.createSnapshot(memo);
    const latest = await this.getSnapshots(1);
    const snapshot = latest.snapshots[0];
    if (!snapshot) {
      throw new Error('Snapshot created but no snapshot found to tag');
    }

    await this.tagSnapshot(snapshot.id, tag);
    return { snapshot, tag };
  }

  /**
   * 自动快照（支持自动标签）
   */
  async autoSnapshot(options?: { memoPrefix?: string; tagPrefix?: string }): Promise<{ snapshot: Snapshot; tag: string }> {
    const timestamp = formatSnapshotTimestamp(new Date());
    const memo = `${options?.memoPrefix || 'Auto snapshot'} ${timestamp}`;
    const tag = `${options?.tagPrefix || 'auto'}-${timestamp}`;
    return this.createTaggedSnapshot(memo, tag);
  }

  /**
   * 清理旧的带标签快照
   */
  async cleanupTaggedSnapshots(options: {
    tagPrefix?: string;
    keepLatest?: number;
    maxAgeDays?: number;
  }): Promise<BatchOperationResult> {
    const tagPrefix = options.tagPrefix || 'auto';
    const keepLatest = options.keepLatest ?? 5;
    const maxAgeDays = options.maxAgeDays ?? 30;

    const tagged = await this.getTaggedSnapshots();
    const filtered = tagged
      .filter((snapshot) => snapshot.tag?.startsWith(tagPrefix))
      .sort((a, b) => Number(b.created) - Number(a.created));

    const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;
    const toRemove = filtered.filter((snapshot, index) => {
      if (index < keepLatest) return false;
      const createdAt = parseSnapshotCreated(snapshot.created);
      return createdAt ? createdAt.getTime() < cutoff : true;
    });

    const results = await Promise.all(
      toRemove.map(async (snapshot) => {
        try {
          if (!snapshot.tag) {
            return { success: false, error: 'Missing tag for snapshot' };
          }
          await this.removeTaggedSnapshot(snapshot.tag);
          return { id: snapshot.id, success: true };
        } catch (error) {
          return { id: snapshot.id, success: false, error: error instanceof Error ? error.message : String(error) };
        }
      })
    );

    const success = results.filter((r) => r.success).length;
    return {
      total: results.length,
      success,
      failed: results.length - success,
      results,
    };
  }
}

function parseSnapshotCreated(created: string): Date | null {
  if (!created || created.length < 14) return null;
  const year = Number(created.slice(0, 4));
  const month = Number(created.slice(4, 6)) - 1;
  const day = Number(created.slice(6, 8));
  const hour = Number(created.slice(8, 10));
  const minute = Number(created.slice(10, 12));
  const second = Number(created.slice(12, 14));
  if ([year, month, day, hour, minute, second].some((n) => !Number.isFinite(n))) {
    return null;
  }
  return new Date(year, month, day, hour, minute, second);
}

function formatSnapshotTimestamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}
