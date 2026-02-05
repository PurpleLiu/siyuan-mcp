/**
 * 块相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class DeleteBlockHandler extends BaseToolHandler<
  { block_id: string },
  { success: boolean }
> {
  readonly name = 'delete_block';
  readonly description = 'Delete a block by ID (dangerous operation)';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID to delete' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.block.deleteBlock(args.block_id);
    return { success: true };
  }
}

export class MoveBlockHandler extends BaseToolHandler<
  { block_id: string; previous_id?: string; parent_id?: string },
  { success: boolean }
> {
  readonly name = 'move_block';
  readonly description = 'Move a block to a new location by specifying previous_id or parent_id';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID to move' },
      previous_id: { type: 'string', description: 'Place after this block ID (optional)' },
      parent_id: { type: 'string', description: 'Place under this parent block ID (optional)' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.block.moveBlock(args.block_id, args.previous_id, args.parent_id);
    return { success: true };
  }
}

export class FoldBlockHandler extends BaseToolHandler<
  { block_id: string },
  { success: boolean }
> {
  readonly name = 'fold_block';
  readonly description = 'Fold a block by ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID to fold' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.block.foldBlock(args.block_id);
    return { success: true };
  }
}

export class UnfoldBlockHandler extends BaseToolHandler<
  { block_id: string },
  { success: boolean }
> {
  readonly name = 'unfold_block';
  readonly description = 'Unfold a block by ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID to unfold' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.block.unfoldBlock(args.block_id);
    return { success: true };
  }
}

export class GetChildBlocksHandler extends BaseToolHandler<
  { block_id: string },
  { blocks: any[] }
> {
  readonly name = 'get_child_blocks';
  readonly description = 'Get child blocks for a given block ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID to query' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ blocks: any[] }> {
    const blocks = await context.siyuan.block.getChildBlocks(args.block_id);
    return { blocks };
  }
}

export class TransferBlockRefHandler extends BaseToolHandler<
  { from_id: string; to_id: string },
  { success: boolean }
> {
  readonly name = 'transfer_block_ref';
  readonly description = 'Transfer block reference from one block to another';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      from_id: { type: 'string', description: 'Source block ID' },
      to_id: { type: 'string', description: 'Target block ID' },
    },
    required: ['from_id', 'to_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.block.transferBlockRef(args.from_id, args.to_id);
    return { success: true };
  }
}

export class PrependBlockHandler extends BaseToolHandler<
  { parent_id: string; content: string },
  { block_id: string }
> {
  readonly name = 'prepend_block';
  readonly description = 'Prepend a new block as the first child under a parent block';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      parent_id: { type: 'string', description: 'Parent block ID' },
      content: { type: 'string', description: 'Markdown content of the new block' },
    },
    required: ['parent_id', 'content'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ block_id: string }> {
    const id = await context.siyuan.block.prependBlock(args.parent_id, args.content);
    return { block_id: id };
  }
}

export class GetBlockBreadcrumbHandler extends BaseToolHandler<
  { block_id: string },
  any
> {
  readonly name = 'get_block_breadcrumb';
  readonly description = 'Get breadcrumb path for a block';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<any> {
    return await context.siyuan.block.getBlockBreadcrumb(args.block_id);
  }
}

export class GetBlockInfoHandler extends BaseToolHandler<
  { block_id: string },
  any
> {
  readonly name = 'get_block_info';
  readonly description = 'Get basic metadata for a block';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<any> {
    return await context.siyuan.block.getBlockInfo(args.block_id);
  }
}
