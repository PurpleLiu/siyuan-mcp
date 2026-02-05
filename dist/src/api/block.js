/**
 * 思源笔记块操作相关 API
 */
export class SiyuanBlockApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 获取块内容（Kramdown 格式）
     * @param blockId 块 ID
     * @returns 块内容
     */
    async getBlockKramdown(blockId) {
        const response = await this.client.request('/api/block/getBlockKramdown', { id: blockId });
        return response.data.kramdown;
    }
    /**
     * 获取块的 Markdown 内容
     * @param blockId 块 ID
     * @returns Markdown 内容（纯净内容，不含元信息）
     */
    async getBlockMarkdown(blockId) {
        const response = await this.client.request('/api/export/exportMdContent', { id: blockId });
        return response.data.content;
    }
    /**
     * 更新块内容（覆盖模式）
     * @param blockId 块 ID
     * @param content Markdown 内容
     * @returns 操作结果
     */
    async updateBlock(blockId, content) {
        const response = await this.client.request('/api/block/updateBlock', {
            id: blockId,
            dataType: 'markdown',
            data: content,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to update block: ${response.msg}`);
        }
    }
    /**
     * 在父块下追加子块
     * @param parentId 父块 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    async appendBlock(parentId, content) {
        const response = await this.client.request('/api/block/appendBlock', {
            parentID: parentId,
            dataType: 'markdown',
            data: content,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to append block: ${response.msg}`);
        }
        return response.data[0].doOperations[0].id;
    }
    /**
     * 在指定块之前插入块
     * @param previousId 参考块 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    async insertBlockBefore(previousId, content) {
        const response = await this.client.request('/api/block/insertBlock', {
            previousID: previousId,
            dataType: 'markdown',
            data: content,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to insert block: ${response.msg}`);
        }
        return response.data[0].doOperations[0].id;
    }
    /**
     * 在指定块之后插入块
     * @param nextId 参考块 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    async insertBlockAfter(nextId, content) {
        const response = await this.client.request('/api/block/insertBlock', {
            nextID: nextId,
            dataType: 'markdown',
            data: content,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to insert block: ${response.msg}`);
        }
        return response.data[0].doOperations[0].id;
    }
    /**
     * 删除块
     * @param blockId 块 ID
     */
    async deleteBlock(blockId) {
        const response = await this.client.request('/api/block/deleteBlock', { id: blockId });
        if (response.code !== 0) {
            throw new Error(`Failed to delete block: ${response.msg}`);
        }
    }
    /**
     * 移动块
     * @param blockId 要移动的块 ID
     * @param previousId 目标位置的前一个块 ID（可选）
     * @param parentId 目标父块 ID（可选）
     */
    async moveBlock(blockId, previousId, parentId) {
        const response = await this.client.request('/api/block/moveBlock', {
            id: blockId,
            previousID: previousId,
            parentID: parentId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to move block: ${response.msg}`);
        }
    }
    /**
     * 折叠块
     * @param blockId 块 ID
     */
    async foldBlock(blockId) {
        const response = await this.client.request('/api/block/foldBlock', { id: blockId });
        if (response.code !== 0) {
            throw new Error(`Failed to fold block: ${response.msg}`);
        }
    }
    /**
     * 展开块
     * @param blockId 块 ID
     */
    async unfoldBlock(blockId) {
        const response = await this.client.request('/api/block/unfoldBlock', { id: blockId });
        if (response.code !== 0) {
            throw new Error(`Failed to unfold block: ${response.msg}`);
        }
    }
    /**
     * 获取子块列表
     * @param blockId 块 ID
     */
    async getChildBlocks(blockId) {
        const response = await this.client.request('/api/block/getChildBlocks', { id: blockId });
        if (response.code !== 0) {
            throw new Error(`Failed to get child blocks: ${response.msg}`);
        }
        return response.data || [];
    }
    /**
     * 转移块引用
     * @param fromId 源块 ID
     * @param toId 目标块 ID
     */
    async transferBlockRef(fromId, toId) {
        const response = await this.client.request('/api/block/transferBlockRef', {
            fromID: fromId,
            toID: toId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to transfer block reference: ${response.msg}`);
        }
    }
}
//# sourceMappingURL=block.js.map