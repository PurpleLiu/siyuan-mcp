/**
 * 块相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class DeleteBlockHandler extends BaseToolHandler {
    name = 'delete_block';
    description = 'Delete a block by ID (dangerous operation)';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID to delete' },
        },
        required: ['block_id'],
    };
    async execute(args, context) {
        await context.siyuan.block.deleteBlock(args.block_id);
        return { success: true };
    }
}
export class MoveBlockHandler extends BaseToolHandler {
    name = 'move_block';
    description = 'Move a block to a new location by specifying previous_id or parent_id';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID to move' },
            previous_id: { type: 'string', description: 'Place after this block ID (optional)' },
            parent_id: { type: 'string', description: 'Place under this parent block ID (optional)' },
        },
        required: ['block_id'],
    };
    async execute(args, context) {
        await context.siyuan.block.moveBlock(args.block_id, args.previous_id, args.parent_id);
        return { success: true };
    }
}
export class FoldBlockHandler extends BaseToolHandler {
    name = 'fold_block';
    description = 'Fold a block by ID';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID to fold' },
        },
        required: ['block_id'],
    };
    async execute(args, context) {
        await context.siyuan.block.foldBlock(args.block_id);
        return { success: true };
    }
}
export class UnfoldBlockHandler extends BaseToolHandler {
    name = 'unfold_block';
    description = 'Unfold a block by ID';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID to unfold' },
        },
        required: ['block_id'],
    };
    async execute(args, context) {
        await context.siyuan.block.unfoldBlock(args.block_id);
        return { success: true };
    }
}
export class GetChildBlocksHandler extends BaseToolHandler {
    name = 'get_child_blocks';
    description = 'Get child blocks for a given block ID';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID to query' },
        },
        required: ['block_id'],
    };
    async execute(args, context) {
        const blocks = await context.siyuan.block.getChildBlocks(args.block_id);
        return { blocks };
    }
}
export class TransferBlockRefHandler extends BaseToolHandler {
    name = 'transfer_block_ref';
    description = 'Transfer block reference from one block to another';
    inputSchema = {
        type: 'object',
        properties: {
            from_id: { type: 'string', description: 'Source block ID' },
            to_id: { type: 'string', description: 'Target block ID' },
        },
        required: ['from_id', 'to_id'],
    };
    async execute(args, context) {
        await context.siyuan.block.transferBlockRef(args.from_id, args.to_id);
        return { success: true };
    }
}
//# sourceMappingURL=block.js.map