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
//# sourceMappingURL=search.d.ts.map