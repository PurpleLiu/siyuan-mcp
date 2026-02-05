/**
 * 思源笔记系统 API
 */

import type { SiyuanClient } from './client.js';

export class SiyuanSystemApi {
  constructor(private client: SiyuanClient) {}

  async getBootProgress(): Promise<any> {
    const response = await this.client.request('/api/system/bootProgress');
    if (response.code !== 0) {
      throw new Error(`Failed to get boot progress: ${response.msg}`);
    }
    return response.data;
  }

  async getSystemVersion(): Promise<any> {
    const response = await this.client.request('/api/system/version');
    if (response.code !== 0) {
      throw new Error(`Failed to get system version: ${response.msg}`);
    }
    return response.data;
  }

  async getSystemTime(): Promise<any> {
    const response = await this.client.request('/api/system/time');
    if (response.code !== 0) {
      throw new Error(`Failed to get system time: ${response.msg}`);
    }
    return response.data;
  }
}
