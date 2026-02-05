/**
 * 快照相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
/**
 * 创建数据快照
 */
export declare class CreateSnapshotHandler extends BaseToolHandler<{
    memo?: string;
}, {
    success: boolean;
    memo: string;
    message: string;
}> {
    readonly name = "create_snapshot";
    readonly description = "Create a snapshot to backup all notes in SiYuan workspace. Essential before bulk operations to enable rollback if needed";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        memo: string;
        message: string;
    }>;
}
/**
 * 获取快照列表
 */
export declare class ListSnapshotsHandler extends BaseToolHandler<{
    page_number?: number;
}, {
    snapshots: any[];
    pageCount: number;
    totalCount: number;
}> {
    readonly name = "list_snapshots";
    readonly description = "List available snapshots of your SiYuan notes workspace with pagination. Shows snapshot creation time and description";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        snapshots: any[];
        pageCount: number;
        totalCount: number;
    }>;
}
/**
 * 回滚到指定快照
 */
export declare class RollbackSnapshotHandler extends BaseToolHandler<{
    snapshot_id: string;
}, {
    success: boolean;
    snapshot_id: string;
    message: string;
}> {
    readonly name = "rollback_to_snapshot";
    readonly description = "Restore your SiYuan notes workspace to a previous snapshot state. Use this to recover from accidental changes or deletions";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        snapshot_id: string;
        message: string;
    }>;
}
//# sourceMappingURL=snapshot.d.ts.map