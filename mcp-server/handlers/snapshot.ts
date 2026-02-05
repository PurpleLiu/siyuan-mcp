/**
 * 快照相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

/**
 * 创建数据快照
 */
export class CreateSnapshotHandler extends BaseToolHandler<
  { memo?: string },
  { success: boolean; memo: string; message: string }
> {
  readonly name = 'create_snapshot';
  readonly description = 'Create a snapshot to backup all notes in SiYuan workspace. Essential before bulk operations to enable rollback if needed';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      memo: {
        type: 'string',
        description: 'Description of what this snapshot is for (optional, default: "Auto snapshot")',
      },
    },
  };

  async execute(
    args: any,
    context: ExecutionContext
  ): Promise<{ success: boolean; memo: string; message: string }> {
    const memo = args.memo || 'Auto snapshot';
    const result = await context.siyuan.snapshot.createSnapshot(memo);
    return {
      ...result,
      message: `Snapshot created successfully with memo: "${memo}"`,
    };
  }
}

/**
 * 获取快照列表
 */
export class ListSnapshotsHandler extends BaseToolHandler<
  { page_number?: number },
  { snapshots: any[]; pageCount: number; totalCount: number }
> {
  readonly name = 'list_snapshots';
  readonly description = 'List available snapshots of your SiYuan notes workspace with pagination. Shows snapshot creation time and description';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      page_number: {
        type: 'number',
        description: 'Page number (starts from 1, default: 1)',
      },
    },
  };

  async execute(
    args: any,
    context: ExecutionContext
  ): Promise<{ snapshots: any[]; pageCount: number; totalCount: number }> {
    const page = args.page_number || 1;
    return await context.siyuan.snapshot.getSnapshots(page);
  }
}

/**
 * 回滚到指定快照
 */
export class RollbackSnapshotHandler extends BaseToolHandler<
  { snapshot_id: string },
  { success: boolean; snapshot_id: string; message: string }
> {
  readonly name = 'rollback_to_snapshot';
  readonly description = 'Restore your SiYuan notes workspace to a previous snapshot state. Use this to recover from accidental changes or deletions';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      snapshot_id: {
        type: 'string',
        description: 'The snapshot ID to restore to (get from list_snapshots)',
      },
    },
    required: ['snapshot_id'],
  };

  async execute(
    args: any,
    context: ExecutionContext
  ): Promise<{ success: boolean; snapshot_id: string; message: string }> {
    await context.siyuan.snapshot.rollbackToSnapshot(args.snapshot_id);
    return {
      success: true,
      snapshot_id: args.snapshot_id,
      message: `Successfully rolled back to snapshot: ${args.snapshot_id}`,
    };
  }
}

/**
 * 自动快照
 */
export class AutoSnapshotHandler extends BaseToolHandler<
  { memo_prefix?: string; tag_prefix?: string },
  { snapshot: any; tag: string }
> {
  readonly name = 'auto_snapshot';
  readonly description = 'Create an auto snapshot with a generated timestamp tag';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      memo_prefix: {
        type: 'string',
        description: 'Optional memo prefix (default: "Auto snapshot")',
      },
      tag_prefix: {
        type: 'string',
        description: 'Optional tag prefix (default: "auto")',
      },
    },
  };

  async execute(args: any, context: ExecutionContext): Promise<{ snapshot: any; tag: string }> {
    return await context.siyuan.snapshot.autoSnapshot({
      memoPrefix: args.memo_prefix,
      tagPrefix: args.tag_prefix,
    });
  }
}

/**
 * 清理旧的带标签快照
 */
export class CleanupSnapshotsHandler extends BaseToolHandler<
  { tag_prefix?: string; keep_latest?: number; max_age_days?: number },
  any
> {
  readonly name = 'cleanup_snapshots';
  readonly description = 'Cleanup old tagged snapshots by prefix, age, and retention count';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      tag_prefix: {
        type: 'string',
        description: 'Tag prefix to filter (default: "auto")',
      },
      keep_latest: {
        type: 'number',
        description: 'How many latest snapshots to keep (default: 5)',
      },
      max_age_days: {
        type: 'number',
        description: 'Max age in days to keep (default: 30)',
      },
    },
  };

  async execute(args: any, context: ExecutionContext): Promise<any> {
    return await context.siyuan.snapshot.cleanupTaggedSnapshots({
      tagPrefix: args.tag_prefix,
      keepLatest: args.keep_latest,
      maxAgeDays: args.max_age_days,
    });
  }
}
