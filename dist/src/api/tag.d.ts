/**
 * 思源笔记标签相关 API
 * 用于管理文档标签
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanTagApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 批量替换标签
     * @param oldTag 旧标签名(不需要包含#符号)
     * @param newTag 新标签名(不需要包含#符号,空字符串表示删除标签)
     * @returns 操作成功返回true,失败则抛出异常
     */
    replaceTag(oldTag: string, newTag: string): Promise<boolean>;
    /**
     * 删除指定标签(从所有文档中移除)
     * @param tag 标签名(不需要包含#符号)
     * @returns 操作成功返回true,失败则抛出异常
     */
    removeTag(tag: string): Promise<boolean>;
}
//# sourceMappingURL=tag.d.ts.map