/**
 * 思源笔记 API 客户端
 * 负责底层的 HTTP 请求封装
 */
export class SiyuanApiError extends Error {
    endpoint;
    code;
    status;
    constructor(message, endpoint, code, status) {
        super(message);
        this.endpoint = endpoint;
        this.code = code;
        this.status = status;
        this.name = 'SiyuanApiError';
    }
}
export class SiyuanClient {
    config;
    constructor(config) {
        this.config = config;
    }
    /**
     * 发送请求到思源笔记 API
     * @param endpoint API 端点
     * @param data 请求数据
     * @returns API 响应
     */
    async request(endpoint, data) {
        try {
            if (this.config.verbose) {
                console.error('[SiYuan-MCP] [DEBUG] Request', endpoint, data ? { ...data } : undefined);
            }
            const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${this.config.token}`,
                },
                body: data ? JSON.stringify(data) : undefined,
            });
            if (!response.ok) {
                throw new SiyuanApiError(`HTTP ${response.status} ${response.statusText}`, endpoint, undefined, response.status);
            }
            const json = (await response.json());
            if (this.config.verbose) {
                console.error('[SiYuan-MCP] [DEBUG] Response', endpoint, {
                    code: json.code,
                    msg: json.msg,
                });
            }
            if (json.code !== 0) {
                throw new SiyuanApiError(`API error (code ${json.code}): ${json.msg || 'Unknown error'}`, endpoint, json.code, response.status);
            }
            return json;
        }
        catch (error) {
            if (error instanceof SiyuanApiError) {
                throw error;
            }
            throw new SiyuanApiError(`Request failed: ${error instanceof Error ? error.message : String(error)}`, endpoint);
        }
    }
    /**
     * 更新配置
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /**
     * 获取当前配置
     */
    getConfig() {
        return { ...this.config };
    }
}
//# sourceMappingURL=client.js.map