/**
 * 模板相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class RenderTemplateHandler extends BaseToolHandler<{
    template_id: string;
    data?: Record<string, any>;
}, {
    content: string;
}> {
    readonly name = "render_template";
    readonly description = "Render a SiYuan template by template ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        content: string;
    }>;
}
export declare class RenderSprigHandler extends BaseToolHandler<{
    template: string;
    data?: Record<string, any>;
}, {
    content: string;
}> {
    readonly name = "render_sprig";
    readonly description = "Render a Sprig template string";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        content: string;
    }>;
}
//# sourceMappingURL=templates.d.ts.map