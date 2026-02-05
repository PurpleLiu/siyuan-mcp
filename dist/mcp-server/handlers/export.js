/**
 * 导出相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class ExportMarkdownHandler extends BaseToolHandler {
    name = 'export_markdown';
    description = 'Export markdown for a document or block ID';
    inputSchema = {
        type: 'object',
        properties: { block_id: { type: 'string', description: 'Document or block ID' } },
        required: ['block_id'],
    };
    async execute(args, context) {
        const result = await context.siyuan.export.exportMarkdown(args.block_id);
        return { result };
    }
}
export class ExportFilesHandler extends BaseToolHandler {
    name = 'export_files';
    description = 'Export files or folders by paths';
    inputSchema = {
        type: 'object',
        properties: {
            paths: { type: 'array', items: { type: 'string' }, description: 'Paths to export' },
        },
        required: ['paths'],
    };
    async execute(args, context) {
        const result = await context.siyuan.export.exportFiles(args.paths);
        return { result };
    }
}
//# sourceMappingURL=export.js.map