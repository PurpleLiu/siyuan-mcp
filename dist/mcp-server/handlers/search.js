/**
 * 搜索相关工具处理器
 */
import { BaseToolHandler } from './base.js';
/**
 * 统一搜索工具：支持内容、标签、文件名等多种条件
 */
export class UnifiedSearchHandler extends BaseToolHandler {
    name = 'unified_search';
    description = 'Search notes in SiYuan by content keywords, tags, note titles, or combined filters. Returns matching notes and blocks from your knowledge base';
    inputSchema = {
        type: 'object',
        properties: {
            content: {
                type: 'string',
                description: 'Optional: Content keyword to search for',
            },
            tag: {
                type: 'string',
                description: 'Optional: Tag to filter by (without # symbol, e.g., "项目")',
            },
            filename: {
                type: 'string',
                description: 'Optional: Note title keyword to search for',
            },
            limit: {
                type: 'number',
                description: 'Maximum number of results (default: 10)',
                default: 10,
            },
            notebook_id: {
                type: 'string',
                description: 'Optional: Limit to specific notebook ID',
            },
            types: {
                type: 'array',
                items: { type: 'string' },
                description: 'Optional: Block types to search (e.g., ["d"] for documents)',
            },
        },
    };
    async execute(args, context) {
        return await context.siyuan.search.search({
            content: args.content,
            tag: args.tag,
            filename: args.filename,
            limit: args.limit || 10,
            notebook: args.notebook_id,
            types: args.types,
        });
    }
}
//# sourceMappingURL=search.js.map