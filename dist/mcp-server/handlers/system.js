/**
 * 系统相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class GetBootProgressHandler extends BaseToolHandler {
    name = 'get_boot_progress';
    description = 'Get system boot progress from SiYuan';
    inputSchema = { type: 'object', properties: {} };
    async execute(_args, context) {
        const data = await context.siyuan.system.getBootProgress();
        return { data };
    }
}
export class GetSystemVersionHandler extends BaseToolHandler {
    name = 'get_system_version';
    description = 'Get SiYuan system version';
    inputSchema = { type: 'object', properties: {} };
    async execute(_args, context) {
        const data = await context.siyuan.system.getSystemVersion();
        return { data };
    }
}
export class GetSystemTimeHandler extends BaseToolHandler {
    name = 'get_system_time';
    description = 'Get SiYuan system time';
    inputSchema = { type: 'object', properties: {} };
    async execute(_args, context) {
        const data = await context.siyuan.system.getSystemTime();
        return { data };
    }
}
//# sourceMappingURL=system.js.map