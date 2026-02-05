/**
 * 快照相关工具处理器
 */
import { BaseToolHandler } from './base.js';
/**
 * 创建数据快照
 */
export class CreateSnapshotHandler extends BaseToolHandler {
    name = 'create_snapshot';
    description = 'Create a snapshot to backup all notes in SiYuan workspace. Essential before bulk operations to enable rollback if needed';
    inputSchema = {
        type: 'object',
        properties: {
            memo: {
                type: 'string',
                description: 'Description of what this snapshot is for (optional, default: "Auto snapshot")',
            },
        },
    };
    async execute(args, context) {
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
export class ListSnapshotsHandler extends BaseToolHandler {
    name = 'list_snapshots';
    description = 'List available snapshots of your SiYuan notes workspace with pagination. Shows snapshot creation time and description';
    inputSchema = {
        type: 'object',
        properties: {
            page_number: {
                type: 'number',
                description: 'Page number (starts from 1, default: 1)',
            },
        },
    };
    async execute(args, context) {
        const page = args.page_number || 1;
        return await context.siyuan.snapshot.getSnapshots(page);
    }
}
/**
 * 回滚到指定快照
 */
export class RollbackSnapshotHandler extends BaseToolHandler {
    name = 'rollback_to_snapshot';
    description = 'Restore your SiYuan notes workspace to a previous snapshot state. Use this to recover from accidental changes or deletions';
    inputSchema = {
        type: 'object',
        properties: {
            snapshot_id: {
                type: 'string',
                description: 'The snapshot ID to restore to (get from list_snapshots)',
            },
        },
        required: ['snapshot_id'],
    };
    async execute(args, context) {
        await context.siyuan.snapshot.rollbackToSnapshot(args.snapshot_id);
        return {
            success: true,
            snapshot_id: args.snapshot_id,
            message: `Successfully rolled back to snapshot: ${args.snapshot_id}`,
        };
    }
}
//# sourceMappingURL=snapshot.js.map