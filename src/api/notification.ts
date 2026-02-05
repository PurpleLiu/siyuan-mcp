/**
 * 思源笔记通知 API
 */

import type { SiyuanClient } from './client.js';
import { requireNonEmptyString } from '../utils/validation.js';

export class SiyuanNotificationApi {
  constructor(private client: SiyuanClient) {}

  async pushMessage(message: string): Promise<void> {
    requireNonEmptyString(message, 'message');

    const response = await this.client.request('/api/notification/pushMsg', { msg: message });
    if (response.code !== 0) {
      throw new Error(`Failed to push message: ${response.msg}`);
    }
  }

  async pushError(message: string): Promise<void> {
    requireNonEmptyString(message, 'message');

    const response = await this.client.request('/api/notification/pushErrMsg', { msg: message });
    if (response.code !== 0) {
      throw new Error(`Failed to push error message: ${response.msg}`);
    }
  }
}
