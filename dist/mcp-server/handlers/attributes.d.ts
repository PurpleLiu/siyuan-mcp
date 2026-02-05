/**
 * 属性相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class GetBlockAttrsHandler extends BaseToolHandler<{
    block_id: string;
}, {
    attrs: Record<string, string>;
}> {
    readonly name = "get_block_attrs";
    readonly description = "Get block attributes by block ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        attrs: Record<string, string>;
    }>;
}
export declare class SetBlockAttrsHandler extends BaseToolHandler<{
    block_id: string;
    attrs: Record<string, string>;
}, {
    success: boolean;
}> {
    readonly name = "set_block_attrs";
    readonly description = "Set block attributes by block ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=attributes.d.ts.map