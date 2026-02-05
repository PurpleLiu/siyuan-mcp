/**
 * 思源笔记数据快照相关 API
 * 用于创建和回滚数据快照，防止误操作
 */
export class SiyuanSnapshotApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 创建数据快照
     * @param memo 快照备注说明
     * @returns 成功信息（API不返回快照ID，需要通过listSnapshots查询最新的）
     */
    async createSnapshot(memo = 'Auto snapshot') {
        const response = await this.client.request('/api/repo/createSnapshot', {
            memo: memo,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to create snapshot: ${response.msg}`);
        }
        return { success: true, memo };
    }
    /**
     * 获取快照列表
     * @param page 页码（从1开始）
     * @returns 快照列表及分页信息
     */
    async getSnapshots(page = 1) {
        const response = await this.client.request('/api/repo/getRepoSnapshots', {
            page: page,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to get snapshots: ${response.msg}`);
        }
        // 确保返回的数据结构完整
        return {
            snapshots: response.data?.snapshots || [],
            pageCount: response.data?.pageCount || 0,
            totalCount: response.data?.totalCount || 0,
        };
    }
    /**
     * 列出所有快照（别名方法，用于简化调用）
     * @returns 快照列表
     */
    async listSnapshots() {
        const result = await this.getSnapshots(1);
        return result.snapshots;
    }
    /**
     * 回滚到指定快照
     * @param snapshotId 快照ID
     */
    async rollbackToSnapshot(snapshotId) {
        const response = await this.client.request('/api/repo/checkoutRepo', {
            id: snapshotId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to rollback to snapshot: ${response.msg}`);
        }
    }
    /**
     * 为快照添加标签
     * @param snapshotId 快照ID
     * @param tag 标签名称
     */
    async tagSnapshot(snapshotId, tag) {
        const response = await this.client.request('/api/repo/tagSnapshot', {
            id: snapshotId,
            name: tag,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to tag snapshot: ${response.msg}`);
        }
    }
    /**
     * 获取带标签的快照列表
     * @returns 带标签的快照列表
     */
    async getTaggedSnapshots() {
        const response = await this.client.request('/api/repo/getRepoTagSnapshots');
        if (response.code !== 0) {
            throw new Error(`Failed to get tagged snapshots: ${response.msg}`);
        }
        return response.data.snapshots || [];
    }
    /**
     * 删除带标签的快照
     * @param tag 标签名称
     */
    async removeTaggedSnapshot(tag) {
        const response = await this.client.request('/api/repo/removeRepoTagSnapshot', {
            tag: tag,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to remove tagged snapshot: ${response.msg}`);
        }
    }
}
//# sourceMappingURL=snapshot.js.map