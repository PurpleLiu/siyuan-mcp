/**
 * 思源笔记 SQL API
 */

import type { SiyuanClient } from './client.js';
import { requireNonEmptyString } from '../utils/validation.js';

export class SiyuanSqlApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 执行 SQL 查询
   * @param stmt SQL 语句
   */
  async execute(stmt: string): Promise<any[]> {
    requireNonEmptyString(stmt, 'stmt');

    const response = await this.client.request<any[]>('/api/query/sql', { stmt });

    if (response.code !== 0) {
      throw new Error(`Failed to execute SQL: ${response.msg}`);
    }

    return response.data || [];
  }

  /**
   * 提交事务
   */
  async flushTransaction(): Promise<void> {
    const response = await this.client.request('/api/query/flushTransaction');

    if (response.code !== 0) {
      throw new Error(`Failed to flush transaction: ${response.msg}`);
    }
  }
}
