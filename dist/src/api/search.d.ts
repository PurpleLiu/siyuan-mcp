/**
 * 思源笔记搜索相关 API
 */
import type { SiyuanClient } from './client.js';
import type { Block, FullTextSearchOptions, FullTextSearchResponse, SearchOptions, SearchResultResponse, TagResponse } from '../types/index.js';
export interface SmartSearchOptions extends SearchOptions {
    limit?: number;
    includeContentPreview?: boolean;
}
export declare class SiyuanSearchApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 根据文件名搜索文档
     * @param fileName 文件名关键词
     * @param options 搜索选项
     * @returns 搜索结果响应
     */
    searchByFileName(fileName: string, options?: SearchOptions): Promise<SearchResultResponse[]>;
    /**
     * 根据文件内容搜索块
     * @param content 内容关键词
     * @param options 搜索选项
     * @returns 搜索结果响应
     */
    searchByContent(content: string, options?: SearchOptions): Promise<SearchResultResponse[]>;
    /**
     * 使用 SQL 查询
     * @param sql SQL 语句
     * @returns 查询结果
     */
    query(sql: string): Promise<Block[]>;
    /**
     * 官方全文搜索 API（支持更多过滤条件与排序）
     */
    fullTextSearch(options: FullTextSearchOptions): Promise<FullTextSearchResponse>;
    /**
     * 将Block数组转换为搜索结果响应
     */
    private toSearchResultResponse;
    /**
     * 列出所有标签
     * @param prefix 可选的标签前缀过滤
     * @param depth 可选的层级限制(从1开始计数,例如 depth=1 只返回顶层标签)
     * @returns 标签数组,包含标签名和使用次数
     */
    listAllTags(prefix?: string, depth?: number): Promise<TagResponse[]>;
    /**
     * 根据标签查找相关文档
     * @param tag 标签名(不需要包含#符号)
     * @param limit 返回结果数量限制,默认 50
     * @returns 搜索结果响应
     */
    searchByTag(tag: string, limit?: number): Promise<SearchResultResponse[]>;
    /**
     * 统一搜索接口:支持按内容、标签、文件名等多种条件搜索
     * @param options 搜索选项
     * @returns 搜索结果响应
     */
    search(options: {
        content?: string;
        tag?: string;
        filename?: string;
        limit?: number;
        notebook?: string;
        types?: string[];
    }): Promise<SearchResultResponse[]>;
    /**
     * 智慧搜尋：模糊匹配 + 相關性排序
     */
    smartSearch(query: string, options?: SmartSearchOptions): Promise<SearchResultResponse[]>;
    /**
     * 转义 SQL 特殊字符
     */
    private escapeSql;
    private scoreBlock;
}
//# sourceMappingURL=search.d.ts.map