/**
 * 思源笔记数据快照相关 API
 * 用于创建和回滚数据快照，防止误操作
 */
import type { SiyuanClient } from './client.js';
export interface Snapshot {
    id: string;
    memo: string;
    created: string;
    hCreated: string;
    count: number;
    hSize: string;
    tag?: string;
}
export declare class SiyuanSnapshotApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 创建数据快照
     * @param memo 快照备注说明
     * @returns 成功信息（API不返回快照ID，需要通过listSnapshots查询最新的）
     */
    createSnapshot(memo?: string): Promise<{
        success: boolean;
        memo: string;
    }>;
    /**
     * 获取快照列表
     * @param page 页码（从1开始）
     * @returns 快照列表及分页信息
     */
    getSnapshots(page?: number): Promise<{
        snapshots: Snapshot[];
        pageCount: number;
        totalCount: number;
    }>;
    /**
     * 列出所有快照（别名方法，用于简化调用）
     * @returns 快照列表
     */
    listSnapshots(): Promise<Snapshot[]>;
    /**
     * 回滚到指定快照
     * @param snapshotId 快照ID
     */
    rollbackToSnapshot(snapshotId: string): Promise<void>;
    /**
     * 为快照添加标签
     * @param snapshotId 快照ID
     * @param tag 标签名称
     */
    tagSnapshot(snapshotId: string, tag: string): Promise<void>;
    /**
     * 获取带标签的快照列表
     * @returns 带标签的快照列表
     */
    getTaggedSnapshots(): Promise<Snapshot[]>;
    /**
     * 删除带标签的快照
     * @param tag 标签名称
     */
    removeTaggedSnapshot(tag: string): Promise<void>;
}
//# sourceMappingURL=snapshot.d.ts.map