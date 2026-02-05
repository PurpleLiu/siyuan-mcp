/**
 * 系统相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class GetBootProgressHandler extends BaseToolHandler<{}, {
    data: any;
}> {
    readonly name = "get_boot_progress";
    readonly description = "Get system boot progress from SiYuan";
    readonly inputSchema: JSONSchema;
    execute(_args: any, context: ExecutionContext): Promise<{
        data: any;
    }>;
}
export declare class GetSystemVersionHandler extends BaseToolHandler<{}, {
    data: any;
}> {
    readonly name = "get_system_version";
    readonly description = "Get SiYuan system version";
    readonly inputSchema: JSONSchema;
    execute(_args: any, context: ExecutionContext): Promise<{
        data: any;
    }>;
}
export declare class GetSystemTimeHandler extends BaseToolHandler<{}, {
    data: any;
}> {
    readonly name = "get_system_time";
    readonly description = "Get SiYuan system time";
    readonly inputSchema: JSONSchema;
    execute(_args: any, context: ExecutionContext): Promise<{
        data: any;
    }>;
}
//# sourceMappingURL=system.d.ts.map