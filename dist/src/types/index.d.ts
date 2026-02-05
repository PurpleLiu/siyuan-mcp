/**
 * 思源笔记 API 类型定义
 */
/**
 * 思源笔记 API 响应格式
 */
export interface SiyuanApiResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}
/**
 * 思源笔记配置
 */
export interface SiyuanConfig {
    baseUrl: string;
    token: string;
    verbose?: boolean;
}
/**
 * 块信息
 */
export interface Block {
    id: string;
    parent_id?: string;
    root_id: string;
    hash: string;
    box: string;
    path: string;
    hpath: string;
    name: string;
    alias: string;
    memo: string;
    tag: string;
    content: string;
    fcontent?: string;
    markdown: string;
    length: number;
    type: string;
    subtype: string;
    ial?: string;
    sort: number;
    created: string;
    updated: string;
}
/**
 * 笔记本信息
 */
export interface Notebook {
    id: string;
    name: string;
    icon: string;
    sort: number;
    closed: boolean;
}
/**
 * 笔记本配置
 */
export interface NotebookConf {
    name: string;
    closed: boolean;
    refCreateSavePath: string;
    createDocNameTemplate: string;
    dailyNoteSavePath: string;
    dailyNoteTemplatePath: string;
}
/**
 * 文档树节点
 */
export interface DocTreeNode {
    id: string;
    name: string;
    icon: string;
    type: string;
    subtype: string;
    path: string;
    children?: DocTreeNode[];
}
/**
 * 笔记本响应结构（API返回）
 */
export interface NotebookResponse {
    id: string;
    name: string;
    closed: boolean;
}
/**
 * 搜索结果响应结构（API返回）
 */
export interface SearchResultResponse {
    id: string;
    name: string;
    path: string;
    content: string;
    type: string;
    updated: string;
}
/**
 * 文档树节点响应结构（API返回）
 */
export interface DocTreeNodeResponse {
    id: string;
    name: string;
    path: string;
    children?: DocTreeNodeResponse[];
}
/**
 * 搜索选项
 */
export interface SearchOptions {
    limit?: number;
    notebook?: string;
    path?: string;
    types?: string[];
}
/**
 * 块操作选项
 */
export interface BlockOperationOptions {
    dataType: 'markdown' | 'dom';
    previousID?: string;
    parentID?: string;
    nextID?: string;
}
/**
 * 标签响应结构(API返回)
 */
export interface TagResponse {
    label: string;
    document_count: number;
}
//# sourceMappingURL=index.d.ts.map