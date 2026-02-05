/**
 * 通知相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class PushMessageHandler extends BaseToolHandler<
  { message: string },
  { success: boolean }
> {
  readonly name = 'push_message';
  readonly description = 'Push a notification message in SiYuan';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: { message: { type: 'string', description: 'Message content' } },
    required: ['message'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.notification.pushMessage(args.message);
    return { success: true };
  }
}

export class PushErrorHandler extends BaseToolHandler<
  { message: string },
  { success: boolean }
> {
  readonly name = 'push_error_message';
  readonly description = 'Push an error notification message in SiYuan';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: { message: { type: 'string', description: 'Error message content' } },
    required: ['message'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.notification.pushError(args.message);
    return { success: true };
  }
}
