/**
 * 笔记本相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
import type { NotebookResponse, SearchResultResponse } from '../../src/types/index.js';
/**
 * 列出所有笔记本
 */
export declare class ListNotebooksHandler extends BaseToolHandler<{}, NotebookResponse[]> {
    readonly name = "list_notebooks";
    readonly description = "List all notebooks in your SiYuan workspace. Notebooks are top-level containers for organizing your notes";
    readonly inputSchema: JSONSchema;
    execute(_args: any, context: ExecutionContext): Promise<NotebookResponse[]>;
}
/**
 * 获取最近更新的文档
 */
export declare class GetRecentlyUpdatedDocumentsHandler extends BaseToolHandler<{
    limit?: number;
    notebook_id?: string;
}, SearchResultResponse[]> {
    readonly name = "get_recently_updated_documents";
    readonly description = "Get recently modified notes in SiYuan, sorted by update time (most recent first). Useful for finding what you worked on recently";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<SearchResultResponse[]>;
}
/**
 * 创建新笔记本
 */
export declare class CreateNotebookHandler extends BaseToolHandler<{
    name: string;
}, string> {
    readonly name = "create_notebook";
    readonly description = "Create a new notebook in SiYuan with the specified name";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<string>;
}
/**
 * 打开笔记本
 */
export declare class OpenNotebookHandler extends BaseToolHandler<{
    notebook_id: string;
}, {
    success: boolean;
}> {
    readonly name = "open_notebook";
    readonly description = "Open a notebook in SiYuan (mark as active/open)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
/**
 * 关闭笔记本
 */
export declare class CloseNotebookHandler extends BaseToolHandler<{
    notebook_id: string;
}, {
    success: boolean;
}> {
    readonly name = "close_notebook";
    readonly description = "Close a notebook in SiYuan";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
/**
 * 重命名笔记本
 */
export declare class RenameNotebookHandler extends BaseToolHandler<{
    notebook_id: string;
    name: string;
}, {
    success: boolean;
    notebook_id: string;
    name: string;
}> {
    readonly name = "rename_notebook";
    readonly description = "Rename a notebook in SiYuan";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        notebook_id: string;
        name: string;
    }>;
}
/**
 * 删除笔记本
 */
export declare class RemoveNotebookHandler extends BaseToolHandler<{
    notebook_id: string;
}, {
    success: boolean;
}> {
    readonly name = "remove_notebook";
    readonly description = "Remove a notebook in SiYuan (dangerous operation)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
/**
 * 获取笔记本配置
 */
export declare class GetNotebookConfHandler extends BaseToolHandler<{
    notebook_id: string;
}, any> {
    readonly name = "get_notebook_conf";
    readonly description = "Get notebook configuration for a given notebook ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<any>;
}
/**
 * 设置笔记本配置
 */
export declare class SetNotebookConfHandler extends BaseToolHandler<{
    notebook_id: string;
    conf: Record<string, any>;
}, {
    success: boolean;
}> {
    readonly name = "set_notebook_conf";
    readonly description = "Update notebook configuration for a given notebook ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=notebook.d.ts.map