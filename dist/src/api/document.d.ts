/**
 * 思源笔记文档操作相关 API
 */
import type { SiyuanClient } from './client.js';
import type { DocTreeNode, DocTreeNodeResponse } from '../types/index.js';
export declare class SiyuanDocumentApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 创建文档（使用 Markdown）
     * @param notebookId 笔记本 ID
     * @param path 文档路径（如 /folder/filename）
     * @param markdown Markdown 内容
     * @returns 新创建的文档 ID
     */
    createDocument(notebookId: string, path: string, markdown: string): Promise<string>;
    /**
     * 删除文档
     * @param notebookId 笔记本 ID
     * @param path 文档路径
     */
    removeDocument(notebookId: string, path: string): Promise<void>;
    /**
     * 重命名文档
     * @param notebookId 笔记本 ID
     * @param path 文档路径
     * @param newName 新名称
     */
    renameDocument(notebookId: string, path: string, newName: string): Promise<void>;
    /**
     * 移动文档
     * @param fromNotebookId 源笔记本 ID
     * @param fromPath 源路径
     * @param toNotebookId 目标笔记本 ID
     * @param toPath 目标路径
     */
    moveDocument(fromNotebookId: string, fromPath: string, toNotebookId: string, toPath: string): Promise<void>;
    /**
     * 根据ID移动文档到另一个文档下
     * @param fromIds 要移动的文档ID列表（可以是单个或多个）
     * @param toId 目标文档ID
     */
    moveDocumentsByIds(fromIds: string | string[], toId: string): Promise<void>;
    /**
     * 根据ID移动文档到笔记本根目录
     * @param fromIds 要移动的文档ID列表（可以是单个或多个）
     * @param toNotebookId 目标笔记本ID
     */
    moveDocumentsToNotebookRoot(fromIds: string | string[], toNotebookId: string): Promise<void>;
    /**
     * 根据路径获取文档 ID
     * @param notebookId 笔记本 ID
     * @param path 文档路径
     * @returns 文档 ID 列表
     */
    getDocIdsByPath(notebookId: string, path: string): Promise<string[]>;
    /**
     * 获取文档树
     * @param notebookId 笔记本 ID
     * @param path 起始路径（可选）
     * @returns 文档树
     */
    getDocTree(notebookId: string, path?: string): Promise<DocTreeNode[]>;
    /**
     * 获取人类可读的文档路径（通过 ID）
     * @param blockId 块 ID
     * @returns 人类可读路径
     */
    getHumanReadablePath(blockId: string): Promise<string>;
    /**
     * 根据文档路径获取人类可读路径
     * @param notebookId 笔记本 ID
     * @param path 文档存储路径（如 /foo/bar）
     */
    getHumanReadablePathByPath(notebookId: string, path: string): Promise<string>;
    /**
     * 根据文档 ID 获取存储路径
     * @param blockId 块 ID（文档 ID）
     */
    getPathById(blockId: string): Promise<string>;
    /**
     * 获取文档树结构（带深度限制）
     * 使用 listDocsByPath API 递归获取，正确处理文档层级关系
     * @param id 文档ID或笔记本ID
     * @param maxDepth 最大深度（1表示只返回直接子节点，默认为1）
     * @returns 文档树响应节点数组
     */
    getDocumentTree(id: string, maxDepth?: number): Promise<DocTreeNodeResponse[]>;
    /**
     * 判断 id 是否为笔记本ID
     */
    private resolveNotebookId;
    /**
     * 获取文档的 box 和 path 信息
     */
    private getDocInfo;
    /**
     * 递归使用 listDocsByPath 获取文档树
     */
    private listDocsRecursive;
}
//# sourceMappingURL=document.d.ts.map