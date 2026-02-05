/**
 * 辅助工具方法
 * 提供额外的便捷功能，增强 LLM 的可用性
 */
import type { SiyuanClient } from '../api/client.js';
import type { Block, SearchResultResponse } from '../types/index.js';
import type { EnhancedBlock, OperationResult } from '../types/enhanced.js';
export declare class SiyuanHelpers {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 根据 ID 获取完整的块信息（增强版）
     * @param blockId 块 ID
     * @returns 增强的块信息
     */
    getEnhancedBlockInfo(blockId: string): Promise<EnhancedBlock>;
    /**
     * 获取块的完整上下文（包括前后兄弟块）
     * @param blockId 块 ID
     * @param context 前后各获取几个块，默认 2
     */
    getBlockContext(blockId: string, context?: number): Promise<{
        target: Block;
        previous: Block[];
        next: Block[];
    }>;
    /**
     * 获取文档的大纲结构
     * @param docId 文档 ID
     */
    getDocumentOutline(docId: string): Promise<Array<{
        id: string;
        content: string;
        type: string;
        level: number;
        children: Array<any>;
    }>>;
    /**
     * 获取最近更新的文档
     * @param limit 返回数量
     * @param notebookId 限制在特定笔记本（可选）
     */
    getRecentlyUpdatedDocuments(limit?: number, notebookId?: string): Promise<SearchResultResponse[]>;
    /**
     * 将Block数组转换为搜索结果响应
     */
    private toSearchResultResponse;
    /**
     * 创建操作结果对象
     */
    createOperationResult(success: boolean, id: string, operation: OperationResult['operation'], resourceType: OperationResult['resourceType'], metadata?: OperationResult['metadata']): OperationResult;
    /**
     * 格式化块的引用链接
     * @param blockId 块 ID
     * @param anchor 锚文本（可选）
     */
    formatBlockRef(blockId: string, anchor?: string): string;
    /**
     * 解析思源笔记的时间戳格式
     * @param timestamp 思源笔记时间戳（如 20230404163414）
     */
    parseTimestamp(timestamp: string): Date;
    /**
     * 格式化思源笔记时间戳
     * @param date 日期对象
     */
    formatTimestamp(date?: Date): string;
    /**
     * 获取块的面包屑路径
     * @param blockId 块 ID
     */
    getBreadcrumb(blockId: string): Promise<string[]>;
}
//# sourceMappingURL=helpers.d.ts.map