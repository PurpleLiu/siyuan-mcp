/**
 * 搜索相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
import type { SearchResultResponse } from '../../src/types/index.js';
/**
 * 统一搜索工具：支持内容、标签、文件名等多种条件
 */
export declare class UnifiedSearchHandler extends BaseToolHandler<{
    content?: string;
    tag?: string;
    filename?: string;
    limit?: number;
    notebook_id?: string;
    types?: string[];
}, SearchResultResponse[]> {
    readonly name = "unified_search";
    readonly description = "Search notes in SiYuan by content keywords, tags, note titles, or combined filters. Returns matching notes and blocks from your knowledge base";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<SearchResultResponse[]>;
}
/**
 * 智慧搜尋工具：模糊匹配 + 相關性排序
 */
export declare class SmartSearchHandler extends BaseToolHandler<{
    query: string;
    limit?: number;
    notebook_id?: string;
    types?: string[];
    include_preview?: boolean;
}, SearchResultResponse[]> {
    readonly name = "smart_search";
    readonly description = "Smart fuzzy search with relevance ranking across titles, tags, and content. Best for exploratory queries";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<SearchResultResponse[]>;
}
/**
 * 官方全文搜索工具
 */
export declare class FullTextSearchBlocksHandler extends BaseToolHandler<{
    query: string;
    method?: string;
    types?: string[];
    paths?: string[];
    order_by?: string;
    group_by?: string;
    page?: number;
    page_size?: number;
}, any> {
    readonly name = "full_text_search_blocks";
    readonly description = "Official SiYuan full-text search API. Supports advanced filters, ordering, and pagination";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<any>;
}
//# sourceMappingURL=search.d.ts.map