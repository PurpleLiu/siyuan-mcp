/**
 * 通知相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class PushMessageHandler extends BaseToolHandler<{
    message: string;
}, {
    success: boolean;
}> {
    readonly name = "push_message";
    readonly description = "Push a notification message in SiYuan";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class PushErrorHandler extends BaseToolHandler<{
    message: string;
}, {
    success: boolean;
}> {
    readonly name = "push_error_message";
    readonly description = "Push an error notification message in SiYuan";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=notification.d.ts.map