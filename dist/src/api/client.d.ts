/**
 * 思源笔记 API 客户端
 * 负责底层的 HTTP 请求封装
 */
import type { SiyuanApiResponse, SiyuanConfig } from '../types/index.js';
export declare class SiyuanApiError extends Error {
    readonly endpoint: string;
    readonly code?: number | undefined;
    readonly status?: number | undefined;
    constructor(message: string, endpoint: string, code?: number | undefined, status?: number | undefined);
}
export declare class SiyuanClient {
    private config;
    constructor(config: SiyuanConfig);
    /**
     * 发送请求到思源笔记 API
     * @param endpoint API 端点
     * @param data 请求数据
     * @returns API 响应
     */
    request<T = any>(endpoint: string, data?: any): Promise<SiyuanApiResponse<T>>;
    /**
     * 更新配置
     */
    updateConfig(config: Partial<SiyuanConfig>): void;
    /**
     * 获取当前配置
     */
    getConfig(): Readonly<SiyuanConfig>;
}
//# sourceMappingURL=client.d.ts.map