/**
 * SQL 相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class ExecuteSqlHandler extends BaseToolHandler<
  { stmt: string },
  { rows: any[] }
> {
  readonly name = 'execute_sql';
  readonly description = 'Execute a SiYuan SQL query';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      stmt: { type: 'string', description: 'SQL statement' },
    },
    required: ['stmt'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ rows: any[] }> {
    const rows = await context.siyuan.sql.execute(args.stmt);
    return { rows };
  }
}

export class FlushTransactionHandler extends BaseToolHandler<{}, { success: boolean }> {
  readonly name = 'flush_transaction';
  readonly description = 'Flush SQL transaction in SiYuan';
  readonly inputSchema: JSONSchema = { type: 'object', properties: {} };

  async execute(_args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.sql.flushTransaction();
    return { success: true };
  }
}
