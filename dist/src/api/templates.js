/**
 * 思源笔记模板 API
 */
export class SiyuanTemplateApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 渲染模板
     * @param templateId 模板 ID
     * @param data 模板参数
     */
    async renderTemplate(templateId, data) {
        const response = await this.client.request('/api/template/render', {
            id: templateId,
            data,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to render template: ${response.msg}`);
        }
        return response.data?.content || '';
    }
    /**
     * 渲染 Sprig
     * @param template 模板字符串
     * @param data 模板参数
     */
    async renderSprig(template, data) {
        const response = await this.client.request('/api/template/renderSprig', {
            template,
            data,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to render Sprig: ${response.msg}`);
        }
        return response.data?.content || '';
    }
}
//# sourceMappingURL=templates.js.map