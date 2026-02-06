/**
 * 思源笔记通知 API
 */
import { requireNonEmptyString } from '../utils/validation.js';
export class SiyuanNotificationApi {
    client;
    constructor(client) {
        this.client = client;
    }
    async pushMessage(message) {
        requireNonEmptyString(message, 'message');
        const response = await this.client.request('/api/notification/pushMsg', { msg: message });
        if (response.code !== 0) {
            throw new Error(`Failed to push message: ${response.msg}`);
        }
    }
    async pushError(message) {
        requireNonEmptyString(message, 'message');
        const response = await this.client.request('/api/notification/pushErrMsg', { msg: message });
        if (response.code !== 0) {
            throw new Error(`Failed to push error message: ${response.msg}`);
        }
    }
}
//# sourceMappingURL=notification.js.map