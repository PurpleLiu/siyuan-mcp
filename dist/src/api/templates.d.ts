/**
 * 思源笔记模板 API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanTemplateApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 渲染模板
     * @param templateId 模板 ID
     * @param data 模板参数
     */
    renderTemplate(templateId: string, data?: Record<string, any>): Promise<string>;
    /**
     * 渲染 Sprig
     * @param template 模板字符串
     * @param data 模板参数
     */
    renderSprig(template: string, data?: Record<string, any>): Promise<string>;
}
//# sourceMappingURL=templates.d.ts.map