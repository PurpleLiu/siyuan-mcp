/**
 * 思源笔记导出 API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanExportApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 导出 Markdown
     * @param blockId 文档/块 ID
     */
    exportMarkdown(blockId: string): Promise<any>;
    /**
     * 导出文件或文件夹
     * @param paths 路径数组
     */
    exportFiles(paths: string[]): Promise<any>;
}
//# sourceMappingURL=export.d.ts.map