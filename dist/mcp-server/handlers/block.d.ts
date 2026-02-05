/**
 * 块相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class DeleteBlockHandler extends BaseToolHandler<{
    block_id: string;
}, {
    success: boolean;
}> {
    readonly name = "delete_block";
    readonly description = "Delete a block by ID (dangerous operation)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class MoveBlockHandler extends BaseToolHandler<{
    block_id: string;
    previous_id?: string;
    parent_id?: string;
}, {
    success: boolean;
}> {
    readonly name = "move_block";
    readonly description = "Move a block to a new location by specifying previous_id or parent_id";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class FoldBlockHandler extends BaseToolHandler<{
    block_id: string;
}, {
    success: boolean;
}> {
    readonly name = "fold_block";
    readonly description = "Fold a block by ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class UnfoldBlockHandler extends BaseToolHandler<{
    block_id: string;
}, {
    success: boolean;
}> {
    readonly name = "unfold_block";
    readonly description = "Unfold a block by ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class GetChildBlocksHandler extends BaseToolHandler<{
    block_id: string;
}, {
    blocks: any[];
}> {
    readonly name = "get_child_blocks";
    readonly description = "Get child blocks for a given block ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        blocks: any[];
    }>;
}
export declare class TransferBlockRefHandler extends BaseToolHandler<{
    from_id: string;
    to_id: string;
}, {
    success: boolean;
}> {
    readonly name = "transfer_block_ref";
    readonly description = "Transfer block reference from one block to another";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=block.d.ts.map