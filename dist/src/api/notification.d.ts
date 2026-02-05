/**
 * 思源笔记通知 API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanNotificationApi {
    private client;
    constructor(client: SiyuanClient);
    pushMessage(message: string): Promise<void>;
    pushError(message: string): Promise<void>;
}
//# sourceMappingURL=notification.d.ts.map