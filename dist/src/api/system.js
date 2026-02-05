/**
 * 思源笔记系统 API
 */
export class SiyuanSystemApi {
    client;
    constructor(client) {
        this.client = client;
    }
    async getBootProgress() {
        const response = await this.client.request('/api/system/bootProgress');
        if (response.code !== 0) {
            throw new Error(`Failed to get boot progress: ${response.msg}`);
        }
        return response.data;
    }
    async getSystemVersion() {
        const response = await this.client.request('/api/system/version');
        if (response.code !== 0) {
            throw new Error(`Failed to get system version: ${response.msg}`);
        }
        return response.data;
    }
    async getSystemTime() {
        const response = await this.client.request('/api/system/time');
        if (response.code !== 0) {
            throw new Error(`Failed to get system time: ${response.msg}`);
        }
        return response.data;
    }
}
//# sourceMappingURL=system.js.map