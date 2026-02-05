/**
 * 通知相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class PushMessageHandler extends BaseToolHandler {
    name = 'push_message';
    description = 'Push a notification message in SiYuan';
    inputSchema = {
        type: 'object',
        properties: { message: { type: 'string', description: 'Message content' } },
        required: ['message'],
    };
    async execute(args, context) {
        await context.siyuan.notification.pushMessage(args.message);
        return { success: true };
    }
}
export class PushErrorHandler extends BaseToolHandler {
    name = 'push_error_message';
    description = 'Push an error notification message in SiYuan';
    inputSchema = {
        type: 'object',
        properties: { message: { type: 'string', description: 'Error message content' } },
        required: ['message'],
    };
    async execute(args, context) {
        await context.siyuan.notification.pushError(args.message);
        return { success: true };
    }
}
//# sourceMappingURL=notification.js.map