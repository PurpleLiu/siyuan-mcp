/**
 * 思源笔记文件 API
 */

import type { SiyuanClient } from './client.js';

export class SiyuanFileApi {
  constructor(private client: SiyuanClient) {}

  async getFile(path: string): Promise<any> {
    const response = await this.client.request('/api/file/getFile', { path });
    if (response.code !== 0) {
      throw new Error(`Failed to get file: ${response.msg}`);
    }
    return response.data;
  }

  async putFile(path: string, data: string): Promise<void> {
    const response = await this.client.request('/api/file/putFile', { path, data });
    if (response.code !== 0) {
      throw new Error(`Failed to put file: ${response.msg}`);
    }
  }

  async removeFile(path: string): Promise<void> {
    const response = await this.client.request('/api/file/removeFile', { path });
    if (response.code !== 0) {
      throw new Error(`Failed to remove file: ${response.msg}`);
    }
  }

  async renameFile(path: string, newPath: string): Promise<void> {
    const response = await this.client.request('/api/file/renameFile', {
      path,
      newPath,
    });
    if (response.code !== 0) {
      throw new Error(`Failed to rename file: ${response.msg}`);
    }
  }

  async listFiles(path: string): Promise<any[]> {
    const response = await this.client.request<any[]>('/api/file/listFiles', { path });
    if (response.code !== 0) {
      throw new Error(`Failed to list files: ${response.msg}`);
    }
    return response.data || [];
  }
}
