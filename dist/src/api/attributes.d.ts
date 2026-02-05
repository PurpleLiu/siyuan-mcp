/**
 * 思源笔记属性相关 API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanAttributeApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 设置块属性
     * @param blockId 块 ID
     * @param attrs 属性对象
     */
    setBlockAttrs(blockId: string, attrs: Record<string, string>): Promise<void>;
    /**
     * 获取块属性
     * @param blockId 块 ID
     */
    getBlockAttrs(blockId: string): Promise<Record<string, string>>;
}
//# sourceMappingURL=attributes.d.ts.map