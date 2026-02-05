/**
 * 思源笔记通知 API
 */
export class SiyuanNotificationApi {
    client;
    constructor(client) {
        this.client = client;
    }
    async pushMessage(message) {
        const response = await this.client.request('/api/notification/pushMsg', { msg: message });
        if (response.code !== 0) {
            throw new Error(`Failed to push message: ${response.msg}`);
        }
    }
    async pushError(message) {
        const response = await this.client.request('/api/notification/pushErrMsg', { msg: message });
        if (response.code !== 0) {
            throw new Error(`Failed to push error message: ${response.msg}`);
        }
    }
}
//# sourceMappingURL=notification.js.map