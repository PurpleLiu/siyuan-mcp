/**
 * 思源笔记属性相关 API
 */

import type { SiyuanClient } from './client.js';

export class SiyuanAttributeApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 设置块属性
   * @param blockId 块 ID
   * @param attrs 属性对象
   */
  async setBlockAttrs(blockId: string, attrs: Record<string, string>): Promise<void> {
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
  async getBlockAttrs(blockId: string): Promise<Record<string, string>> {
    const response = await this.client.request<Record<string, string>>(
      '/api/attr/getBlockAttrs',
      { id: blockId }
    );

    if (response.code !== 0) {
      throw new Error(`Failed to get block attrs: ${response.msg}`);
    }

    return response.data || {};
  }
}
