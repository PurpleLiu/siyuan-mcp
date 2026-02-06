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
/**
 * 自动快照
 */
export declare class AutoSnapshotHandler extends BaseToolHandler<{
    memo_prefix?: string;
    tag_prefix?: string;
}, {
    snapshot: any;
    tag: string;
}> {
    readonly name = "auto_snapshot";
    readonly description = "Create an auto snapshot with a generated timestamp tag";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        snapshot: any;
        tag: string;
    }>;
}
/**
 * 清理旧的带标签快照
 */
export declare class CleanupSnapshotsHandler extends BaseToolHandler<{
    tag_prefix?: string;
    keep_latest?: number;
    max_age_days?: number;
}, any> {
    readonly name = "cleanup_snapshots";
    readonly description = "Cleanup old tagged snapshots by prefix, age, and retention count";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<any>;
}
//# sourceMappingURL=snapshot.d.ts.map