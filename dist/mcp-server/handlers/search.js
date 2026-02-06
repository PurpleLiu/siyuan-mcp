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
/**
 * 智慧搜尋工具：模糊匹配 + 相關性排序
 */
export class SmartSearchHandler extends BaseToolHandler {
    name = 'smart_search';
    description = 'Smart fuzzy search with relevance ranking across titles, tags, and content. Best for exploratory queries';
    inputSchema = {
        type: 'object',
        properties: {
            query: {
                type: 'string',
                description: 'Search query keywords (supports fuzzy matching)',
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
                description: 'Optional: Block types to search',
            },
            include_preview: {
                type: 'boolean',
                description: 'Include content preview in results (default: true)',
                default: true,
            },
        },
        required: ['query'],
    };
    async execute(args, context) {
        return await context.siyuan.search.smartSearch(args.query, {
            limit: args.limit || 10,
            notebook: args.notebook_id,
            types: args.types,
            includeContentPreview: args.include_preview !== false,
        });
    }
}
/**
 * 官方全文搜索工具
 */
export class FullTextSearchBlocksHandler extends BaseToolHandler {
    name = 'full_text_search_blocks';
    description = 'Official SiYuan full-text search API. Supports advanced filters, ordering, and pagination';
    inputSchema = {
        type: 'object',
        properties: {
            query: { type: 'string', description: 'Search query string' },
            method: { type: 'string', description: 'Search method (default: keyword)' },
            types: { type: 'array', items: { type: 'string' }, description: 'Block types to search' },
            paths: { type: 'array', items: { type: 'string' }, description: 'Limit search paths' },
            order_by: { type: 'string', description: 'Order by (default: rank)' },
            group_by: { type: 'string', description: 'Group by field (optional)' },
            page: { type: 'number', description: 'Page number (default: 1)' },
            page_size: { type: 'number', description: 'Page size (default: 50)' },
        },
        required: ['query'],
    };
    async execute(args, context) {
        return await context.siyuan.search.fullTextSearch({
            query: args.query,
            method: args.method,
            types: args.types,
            paths: args.paths,
            orderBy: args.order_by,
            groupBy: args.group_by,
            page: args.page,
            pageSize: args.page_size,
        });
    }
}
//# sourceMappingURL=search.js.map