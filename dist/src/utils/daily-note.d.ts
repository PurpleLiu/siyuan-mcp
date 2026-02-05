/**
 * 今日笔记工具类
 */
import type { SiyuanClient } from '../api/client.js';
import type { SiyuanDocumentApi } from '../api/document.js';
import type { SiyuanNotebookApi } from '../api/notebook.js';
import type { SiyuanBlockApi } from '../api/block.js';
export declare class DailyNoteUtils {
    private client;
    private documentApi;
    private notebookApi;
    private blockApi;
    constructor(client: SiyuanClient, documentApi: SiyuanDocumentApi, notebookApi: SiyuanNotebookApi, blockApi: SiyuanBlockApi);
    /**
     * 渲染 Sprig 模板（思源使用的日期模板格式）
     * @param template 模板字符串
     * @returns 渲染后的字符串
     */
    private renderTemplate;
    /**
     * 获取或创建今日笔记
     * @param notebookId 笔记本 ID
     * @returns 今日笔记的文档 ID
     */
    getOrCreateDailyNote(notebookId: string): Promise<string>;
    /**
     * 追加内容到今日笔记
     * @param notebookId 笔记本 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    appendToDailyNote(notebookId: string, content: string): Promise<string>;
    /**
     * 在今日笔记开头插入内容
     * @param notebookId 笔记本 ID
     * @param content Markdown 内容
     * @returns 新创建的块 ID
     */
    prependToDailyNote(notebookId: string, content: string): Promise<string>;
}
//# sourceMappingURL=daily-note.d.ts.map