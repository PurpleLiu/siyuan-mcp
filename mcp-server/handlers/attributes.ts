/**
 * 属性相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class GetBlockAttrsHandler extends BaseToolHandler<
  { block_id: string },
  { attrs: Record<string, string> }
> {
  readonly name = 'get_block_attrs';
  readonly description = 'Get block attributes by block ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID' },
    },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ attrs: Record<string, string> }> {
    const attrs = await context.siyuan.attr.getBlockAttrs(args.block_id);
    return { attrs };
  }
}

export class SetBlockAttrsHandler extends BaseToolHandler<
  { block_id: string; attrs: Record<string, string> },
  { success: boolean }
> {
  readonly name = 'set_block_attrs';
  readonly description = 'Set block attributes by block ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      block_id: { type: 'string', description: 'Block ID' },
      attrs: { type: 'object', description: 'Attributes key-value pairs' },
    },
    required: ['block_id', 'attrs'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.attr.setBlockAttrs(args.block_id, args.attrs);
    return { success: true };
  }
}
