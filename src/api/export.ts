/**
 * 思源笔记导出 API
 */

import type { SiyuanClient } from './client.js';

export class SiyuanExportApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 导出 Markdown
   * @param blockId 文档/块 ID
   */
  async exportMarkdown(blockId: string): Promise<any> {
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
  async exportFiles(paths: string[]): Promise<any> {
    const response = await this.client.request('/api/export/exportFiles', { paths });
    if (response.code !== 0) {
      throw new Error(`Failed to export files: ${response.msg}`);
    }
    return response.data;
  }
}
