/**
 * 思源笔记块操作相关 API
 */
import type { SiyuanClient } from './client.js';
import type { BlockBreadcrumbResponse, BlockInfoResponse } from '../types/index.js';
export declare class SiyuanBlockApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 获取块内容（Kramdown 格式）
     * @param blockId 块 ID
     * @returns 块内容
     */
    getBlockKramdown(blockId: string): Promise<string>;
    /**
     * 获取块的 Markdown 内容
     * @param blockId 块 ID
     * @returns Markdown 内容（纯净内容，不含元信息）
     */
    getBlockMarkdown(blockId: string): Promise<string>;
    /**
     * 更新块内容（覆盖模式）
     * @param blockId 块 ID
     * @param content Markdown 内容
     * @returns 操作结果
     */
    updateBlock(blockId: string, content: string): Promise<void>;
    /**
     * 在父块下追加子块
     * @param parentId 父块 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    appendBlock(parentId: string, content: string): Promise<string>;
    /**
     * 在指定块之前插入块
     * @param previousId 参考块 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    insertBlockBefore(previousId: string, content: string): Promise<string>;
    /**
     * 在指定块之后插入块
     * @param nextId 参考块 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    insertBlockAfter(nextId: string, content: string): Promise<string>;
    /**
     * 删除块
     * @param blockId 块 ID
     */
    deleteBlock(blockId: string): Promise<void>;
    /**
     * 移动块
     * @param blockId 要移动的块 ID
     * @param previousId 目标位置的前一个块 ID（可选）
     * @param parentId 目标父块 ID（可选）
     */
    moveBlock(blockId: string, previousId?: string, parentId?: string): Promise<void>;
    /**
     * 折叠块
     * @param blockId 块 ID
     */
    foldBlock(blockId: string): Promise<void>;
    /**
     * 展开块
     * @param blockId 块 ID
     */
    unfoldBlock(blockId: string): Promise<void>;
    /**
     * 获取子块列表
     * @param blockId 块 ID
     */
    getChildBlocks(blockId: string): Promise<any[]>;
    /**
     * 转移块引用
     * @param fromId 源块 ID
     * @param toId 目标块 ID
     */
    transferBlockRef(fromId: string, toId: string): Promise<void>;
    /**
     * 在父块下插入块（前置）
     */
    prependBlock(parentId: string, content: string): Promise<string>;
    /**
     * 获取块面包屑
     */
    getBlockBreadcrumb(blockId: string): Promise<BlockBreadcrumbResponse>;
    /**
     * 获取块基础信息
     */
    getBlockInfo(blockId: string): Promise<BlockInfoResponse>;
}
//# sourceMappingURL=block.d.ts.map