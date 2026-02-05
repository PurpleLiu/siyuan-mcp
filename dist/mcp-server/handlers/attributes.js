/**
 * 属性相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class GetBlockAttrsHandler extends BaseToolHandler {
    name = 'get_block_attrs';
    description = 'Get block attributes by block ID';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID' },
        },
        required: ['block_id'],
    };
    async execute(args, context) {
        const attrs = await context.siyuan.attr.getBlockAttrs(args.block_id);
        return { attrs };
    }
}
export class SetBlockAttrsHandler extends BaseToolHandler {
    name = 'set_block_attrs';
    description = 'Set block attributes by block ID';
    inputSchema = {
        type: 'object',
        properties: {
            block_id: { type: 'string', description: 'Block ID' },
            attrs: { type: 'object', description: 'Attributes key-value pairs' },
        },
        required: ['block_id', 'attrs'],
    };
    async execute(args, context) {
        await context.siyuan.attr.setBlockAttrs(args.block_id, args.attrs);
        return { success: true };
    }
}
//# sourceMappingURL=attributes.js.map