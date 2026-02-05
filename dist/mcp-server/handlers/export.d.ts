/**
 * 导出相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class ExportMarkdownHandler extends BaseToolHandler<{
    block_id: string;
}, {
    result: any;
}> {
    readonly name = "export_markdown";
    readonly description = "Export markdown for a document or block ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        result: any;
    }>;
}
export declare class ExportFilesHandler extends BaseToolHandler<{
    paths: string[];
}, {
    result: any;
}> {
    readonly name = "export_files";
    readonly description = "Export files or folders by paths";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        result: any;
    }>;
}
//# sourceMappingURL=export.d.ts.map