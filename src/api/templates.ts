/**
 * 思源笔记模板 API
 */

import type { SiyuanClient } from './client.js';
import { requireNonEmptyString } from '../utils/validation.js';

export class SiyuanTemplateApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 渲染模板
   * @param templateId 模板 ID
   * @param data 模板参数
   */
  async renderTemplate(templateId: string, data?: Record<string, any>): Promise<string> {
    requireNonEmptyString(templateId, 'templateId');

    const response = await this.client.request<{ content: string }>('/api/template/render', {
      id: templateId,
      data,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to render template: ${response.msg}`);
    }

    return response.data?.content || '';
  }

  /**
   * 渲染 Sprig
   * @param template 模板字符串
   * @param data 模板参数
   */
  async renderSprig(template: string, data?: Record<string, any>): Promise<string> {
    requireNonEmptyString(template, 'template');

    const response = await this.client.request<{ content: string }>('/api/template/renderSprig', {
      template,
      data,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to render Sprig: ${response.msg}`);
    }

    return response.data?.content || '';
  }
}
