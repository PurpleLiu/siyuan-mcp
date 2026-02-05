/**
 * 思源笔记资产（资源） API
 */

import type { SiyuanClient } from './client.js';
import { requireNonEmptyString } from '../utils/validation.js';

export class SiyuanAssetApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 上传资源（base64）
   * @param filename 文件名
   * @param base64 Base64 内容（不含 data: 前缀）
   */
  async uploadAssetBase64(filename: string, base64: string): Promise<any> {
    requireNonEmptyString(filename, 'filename');
    requireNonEmptyString(base64, 'base64');

    const { baseUrl, token } = this.client.getConfig();
    const buffer = Buffer.from(base64, 'base64');

    const form = new FormData();
    form.append('file', new Blob([buffer]), filename);

    const response = await fetch(`${baseUrl}/api/asset/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload asset: HTTP ${response.status}`);
    }

    const json = await response.json() as { code: number; msg?: string; data: any };
    if (json.code !== 0) {
      throw new Error(`Failed to upload asset: ${json.msg || 'Unknown error'}`);
    }

    return json.data;
  }
}
