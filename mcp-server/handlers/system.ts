/**
 * 系统相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class GetBootProgressHandler extends BaseToolHandler<{}, { data: any }> {
  readonly name = 'get_boot_progress';
  readonly description = 'Get system boot progress from SiYuan';
  readonly inputSchema: JSONSchema = { type: 'object', properties: {} };

  async execute(_args: any, context: ExecutionContext): Promise<{ data: any }> {
    const data = await context.siyuan.system.getBootProgress();
    return { data };
  }
}

export class GetSystemVersionHandler extends BaseToolHandler<{}, { data: any }> {
  readonly name = 'get_system_version';
  readonly description = 'Get SiYuan system version';
  readonly inputSchema: JSONSchema = { type: 'object', properties: {} };

  async execute(_args: any, context: ExecutionContext): Promise<{ data: any }> {
    const data = await context.siyuan.system.getSystemVersion();
    return { data };
  }
}

export class GetSystemTimeHandler extends BaseToolHandler<{}, { data: any }> {
  readonly name = 'get_system_time';
  readonly description = 'Get SiYuan system time';
  readonly inputSchema: JSONSchema = { type: 'object', properties: {} };

  async execute(_args: any, context: ExecutionContext): Promise<{ data: any }> {
    const data = await context.siyuan.system.getSystemTime();
    return { data };
  }
}
