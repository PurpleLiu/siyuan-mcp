/**
 * 思源笔记属性相关 API
 */
export class SiyuanAttributeApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 设置块属性
     * @param blockId 块 ID
     * @param attrs 属性对象
     */
    async setBlockAttrs(blockId, attrs) {
        const response = await this.client.request('/api/attr/setBlockAttrs', {
            id: blockId,
            attrs,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to set block attrs: ${response.msg}`);
        }
    }
    /**
     * 获取块属性
     * @param blockId 块 ID
     */
    async getBlockAttrs(blockId) {
        const response = await this.client.request('/api/attr/getBlockAttrs', { id: blockId });
        if (response.code !== 0) {
            throw new Error(`Failed to get block attrs: ${response.msg}`);
        }
        return response.data || {};
    }
}
//# sourceMappingURL=attributes.js.map