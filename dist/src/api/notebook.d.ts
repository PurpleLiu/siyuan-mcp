/**
 * 思源笔记笔记本操作相关 API
 */
import type { SiyuanClient } from './client.js';
import type { NotebookConf, NotebookResponse } from '../types/index.js';
export declare class SiyuanNotebookApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 列出所有笔记本
     * @returns 笔记本响应列表
     */
    listNotebooks(): Promise<NotebookResponse[]>;
    /**
     * 将Notebook数组转换为笔记本响应
     */
    private toNotebookResponse;
    /**
     * 获取笔记本配置
     * @param notebookId 笔记本 ID
     * @returns 笔记本配置
     */
    getNotebookConf(notebookId: string): Promise<NotebookConf>;
    /**
     * 设置笔记本配置
     * @param notebookId 笔记本 ID
     * @param conf 笔记本配置
     */
    setNotebookConf(notebookId: string, conf: Partial<NotebookConf>): Promise<void>;
    /**
     * 打开笔记本
     * @param notebookId 笔记本 ID
     */
    openNotebook(notebookId: string): Promise<void>;
    /**
     * 关闭笔记本
     * @param notebookId 笔记本 ID
     */
    closeNotebook(notebookId: string): Promise<void>;
    /**
     * 创建笔记本
     * @param name 笔记本名称
     * @returns 笔记本 ID
     */
    createNotebook(name: string): Promise<string>;
    /**
     * 删除笔记本
     * @param notebookId 笔记本 ID
     */
    removeNotebook(notebookId: string): Promise<void>;
    /**
     * 重命名笔记本
     * @param notebookId 笔记本 ID
     * @param name 新名称
     */
    renameNotebook(notebookId: string, name: string): Promise<void>;
    /**
     * 获取最近打开的文档
     * @returns 最近文档列表
     */
    getRecentDocs(): Promise<any[]>;
}
//# sourceMappingURL=notebook.d.ts.map