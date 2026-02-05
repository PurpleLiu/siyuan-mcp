/**
 * 思源笔记资产（资源） API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanAssetApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 上传资源（base64）
     * @param filename 文件名
     * @param base64 Base64 内容（不含 data: 前缀）
     */
    uploadAssetBase64(filename: string, base64: string): Promise<any>;
}
//# sourceMappingURL=assets.d.ts.map