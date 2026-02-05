/**
 * 思源笔记导出 API
 */
export class SiyuanExportApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 导出 Markdown
     * @param blockId 文档/块 ID
     */
    async exportMarkdown(blockId) {
        const response = await this.client.request('/api/export/exportMd', { id: blockId });
        if (response.code !== 0) {
            throw new Error(`Failed to export markdown: ${response.msg}`);
        }
        return response.data;
    }
    /**
     * 导出文件或文件夹
     * @param paths 路径数组
     */
    async exportFiles(paths) {
        const response = await this.client.request('/api/export/exportFiles', { paths });
        if (response.code !== 0) {
            throw new Error(`Failed to export files: ${response.msg}`);
        }
        return response.data;
    }
}
//# sourceMappingURL=export.js.map