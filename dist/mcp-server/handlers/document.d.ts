/**
 * 文档相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
import type { DocTreeNodeResponse } from '../../src/types/index.js';
type DailyNoteTodoItem = {
    text: string;
    done: boolean;
    date: string;
    document_id: string;
    line_no: number;
};
/**
 * 获取文档内容
 */
export declare class GetDocumentContentHandler extends BaseToolHandler<{
    document_id: string;
    offset?: number;
    limit?: number;
}, string> {
    readonly name = "get_document_content";
    readonly description = "Read the markdown content of a note in SiYuan. Returns the full note content in markdown format, with optional pagination support";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<string>;
}
/**
 * 创建文档
 */
export declare class CreateDocumentHandler extends BaseToolHandler<{
    notebook_id: string;
    path: string;
    content?: string;
    content_file?: string;
}, string> {
    readonly name = "create_document";
    readonly description = "Create a new note document in a SiYuan notebook with markdown content";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<string>;
}
/**
 * 批量创建文档
 */
export declare class BatchCreateDocumentsHandler extends BaseToolHandler<{
    items: Array<{
        notebook_id: string;
        path: string;
        content: string;
    }>;
}, any> {
    readonly name = "batch_create_documents";
    readonly description = "Create multiple documents in bulk. Returns per-item success and errors";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<any>;
}
/**
 * 追加到文档
 */
export declare class AppendToDocumentHandler extends BaseToolHandler<{
    document_id: string;
    content?: string;
    content_file?: string;
}, string> {
    readonly name = "append_to_document";
    readonly description = "Append markdown content to the end of an existing note in SiYuan";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<string>;
}
/**
 * 更新文档
 */
export declare class UpdateDocumentHandler extends BaseToolHandler<{
    document_id: string;
    content?: string;
    content_file?: string;
}, {
    success: boolean;
    document_id: string;
}> {
    readonly name = "update_document";
    readonly description = "Replace the entire content of a note in SiYuan with new markdown content (overwrites existing content)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        document_id: string;
    }>;
}
/**
 * 追加到今日笔记
 */
export declare class AppendToDailyNoteHandler extends BaseToolHandler<{
    notebook_id: string;
    content: string;
}, string> {
    readonly name = "append_to_daily_note";
    readonly description = "Append markdown content to today's daily note in SiYuan (automatically creates the daily note if it doesn't exist)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<string>;
}
/**
 * 列出近 N 天今日笔记未完成待办
 */
export declare class ListDailyNoteTodosHandler extends BaseToolHandler<{
    notebook_id: string;
    days?: number;
}, DailyNoteTodoItem[]> {
    readonly name = "list_daily_note_todos";
    readonly description = "List incomplete markdown checkbox todos from daily notes within the specified notebook over the past N days. Returns 0-based line numbers.";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<DailyNoteTodoItem[]>;
}
/**
 * 移动文档（通过ID）
 */
export declare class MoveDocumentsHandler extends BaseToolHandler<{
    from_ids: string | string[];
    to_parent_id?: string;
    to_notebook_root?: string;
}, {
    success: boolean;
    moved_count: number;
    from_ids: string[];
    to_parent_id?: string;
    to_notebook_root?: string;
}> {
    readonly name = "move_documents";
    readonly description = "Move one or more notes to a new location in SiYuan. Provide EXACTLY ONE destination: either to_parent_id (to nest notes under a parent note) OR to_notebook_root (to move notes to notebook top level).";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        moved_count: number;
        from_ids: string[];
        to_parent_id?: string;
        to_notebook_root?: string;
    }>;
}
/**
 * 通过路径批量移动文档
 */
export declare class MoveDocumentsByPathHandler extends BaseToolHandler<{
    from_paths: string[];
    to_notebook_id: string;
    to_path: string;
}, {
    success: boolean;
    moved_count: number;
}> {
    readonly name = "move_documents_by_path";
    readonly description = "Move documents by storage paths to a target notebook path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        moved_count: number;
    }>;
}
/**
 * 获取文档树
 */
export declare class GetDocumentTreeHandler extends BaseToolHandler<{
    id: string;
    depth?: number;
}, DocTreeNodeResponse[]> {
    readonly name = "get_document_tree";
    readonly description = "Get the hierarchical structure of notes in SiYuan with specified depth. Returns the note tree starting from a notebook or parent note.";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<DocTreeNodeResponse[]>;
}
/**
 * 删除文档
 */
export declare class RemoveDocumentHandler extends BaseToolHandler<{
    notebook_id: string;
    path: string;
}, {
    success: boolean;
}> {
    readonly name = "remove_document";
    readonly description = "Remove a document by notebook ID and path (dangerous operation)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
/**
 * 通过 ID 删除文档
 */
export declare class RemoveDocumentByIdHandler extends BaseToolHandler<{
    document_id: string;
}, {
    success: boolean;
}> {
    readonly name = "remove_document_by_id";
    readonly description = "Remove a document by document ID (dangerous operation)";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
/**
 * 重命名文档
 */
export declare class RenameDocumentHandler extends BaseToolHandler<{
    notebook_id: string;
    path: string;
    new_name: string;
}, {
    success: boolean;
    new_name: string;
}> {
    readonly name = "rename_document";
    readonly description = "Rename a document by notebook ID and path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        new_name: string;
    }>;
}
/**
 * 通过 ID 重命名文档
 */
export declare class RenameDocumentByIdHandler extends BaseToolHandler<{
    document_id: string;
    new_name: string;
}, {
    success: boolean;
    new_name: string;
}> {
    readonly name = "rename_document_by_id";
    readonly description = "Rename a document by document ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
        new_name: string;
    }>;
}
/**
 * 根据 ID 获取人类可读路径
 */
export declare class GetHumanPathByIdHandler extends BaseToolHandler<{
    document_id: string;
}, {
    hpath: string;
}> {
    readonly name = "get_human_path_by_id";
    readonly description = "Get human-readable path by document ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        hpath: string;
    }>;
}
/**
 * 根据路径获取人类可读路径
 */
export declare class GetHumanPathByPathHandler extends BaseToolHandler<{
    notebook_id: string;
    path: string;
}, {
    hpath: string;
}> {
    readonly name = "get_human_path_by_path";
    readonly description = "Get human-readable path by notebook ID and storage path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        hpath: string;
    }>;
}
/**
 * 根据 ID 获取存储路径
 */
export declare class GetPathByIdHandler extends BaseToolHandler<{
    document_id: string;
}, {
    path: string;
}> {
    readonly name = "get_path_by_id";
    readonly description = "Get storage path by document ID";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        path: string;
    }>;
}
/**
 * 根据人类可读路径获取文档 ID
 */
export declare class GetIdsByHPathHandler extends BaseToolHandler<{
    notebook_id: string;
    path: string;
}, {
    ids: string[];
}> {
    readonly name = "get_ids_by_hpath";
    readonly description = "Get document IDs by human-readable path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        ids: string[];
    }>;
}
export {};
//# sourceMappingURL=document.d.ts.map