/**
 * 思源笔记笔记本操作相关 API
 */
import { requireNonEmptyString } from '../utils/validation.js';
export class SiyuanNotebookApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 列出所有笔记本
     * @returns 笔记本响应列表
     */
    async listNotebooks() {
        const response = await this.client.request('/api/notebook/lsNotebooks');
        const notebooks = response.data.notebooks || [];
        return this.toNotebookResponse(notebooks);
    }
    /**
     * 将Notebook数组转换为笔记本响应
     */
    toNotebookResponse(notebooks) {
        return notebooks.map(notebook => ({
            id: notebook.id,
            name: notebook.name,
            closed: notebook.closed
        }));
    }
    /**
     * 获取笔记本配置
     * @param notebookId 笔记本 ID
     * @returns 笔记本配置
     */
    async getNotebookConf(notebookId) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/notebook/getNotebookConf', { notebook: notebookId });
        if (response.code !== 0) {
            throw new Error(`Failed to get notebook config: ${response.msg}`);
        }
        return response.data.conf;
    }
    /**
     * 设置笔记本配置
     * @param notebookId 笔记本 ID
     * @param conf 笔记本配置
     */
    async setNotebookConf(notebookId, conf) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/notebook/setNotebookConf', {
            notebook: notebookId,
            conf: conf,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to set notebook config: ${response.msg}`);
        }
    }
    /**
     * 打开笔记本
     * @param notebookId 笔记本 ID
     */
    async openNotebook(notebookId) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/notebook/openNotebook', {
            notebook: notebookId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to open notebook: ${response.msg}`);
        }
    }
    /**
     * 关闭笔记本
     * @param notebookId 笔记本 ID
     */
    async closeNotebook(notebookId) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/notebook/closeNotebook', {
            notebook: notebookId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to close notebook: ${response.msg}`);
        }
    }
    /**
     * 创建笔记本
     * @param name 笔记本名称
     * @returns 笔记本 ID
     */
    async createNotebook(name) {
        requireNonEmptyString(name, 'name');
        const response = await this.client.request('/api/notebook/createNotebook', { name });
        if (response.code !== 0) {
            throw new Error(`Failed to create notebook: ${response.msg}`);
        }
        return response.data.notebook.id;
    }
    /**
     * 删除笔记本
     * @param notebookId 笔记本 ID
     */
    async removeNotebook(notebookId) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/notebook/removeNotebook', {
            notebook: notebookId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to remove notebook: ${response.msg}`);
        }
    }
    /**
     * 重命名笔记本
     * @param notebookId 笔记本 ID
     * @param name 新名称
     */
    async renameNotebook(notebookId, name) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(name, 'name');
        const response = await this.client.request('/api/notebook/renameNotebook', {
            notebook: notebookId,
            name: name,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to rename notebook: ${response.msg}`);
        }
    }
    /**
     * 获取最近打开的文档
     * @returns 最近文档列表
     */
    async getRecentDocs() {
        const response = await this.client.request('/api/storage/getRecentDocs');
        if (response.code !== 0) {
            throw new Error(`Failed to get recent docs: ${response.msg}`);
        }
        return response.data || [];
    }
    /**
     * 通过 ID 获取笔记本信息
     */
    async getNotebookById(notebookId) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/notebook/getNotebookByID', { notebook: notebookId });
        if (response.code !== 0) {
            throw new Error(`Failed to get notebook by ID: ${response.msg}`);
        }
        return response.data.notebook;
    }
}
//# sourceMappingURL=notebook.js.map