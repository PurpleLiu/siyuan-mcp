/**
 * 笔记本相关工具处理器
 */
import { BaseToolHandler } from './base.js';
/**
 * 列出所有笔记本
 */
export class ListNotebooksHandler extends BaseToolHandler {
    name = 'list_notebooks';
    description = 'List all notebooks in your SiYuan workspace. Notebooks are top-level containers for organizing your notes';
    inputSchema = {
        type: 'object',
        properties: {},
    };
    async execute(_args, context) {
        return await context.siyuan.notebook.listNotebooks();
    }
}
/**
 * 获取最近更新的文档
 */
export class GetRecentlyUpdatedDocumentsHandler extends BaseToolHandler {
    name = 'get_recently_updated_documents';
    description = 'Get recently modified notes in SiYuan, sorted by update time (most recent first). Useful for finding what you worked on recently';
    inputSchema = {
        type: 'object',
        properties: {
            limit: {
                type: 'number',
                description: 'Number of notes to return (default: 10)',
                default: 10,
            },
            notebook_id: {
                type: 'string',
                description: 'Optional: Filter to a specific notebook ID',
            },
        },
    };
    async execute(args, context) {
        return await context.siyuan.helpers.getRecentlyUpdatedDocuments(args.limit || 10, args.notebook_id);
    }
}
/**
 * 创建新笔记本
 */
export class CreateNotebookHandler extends BaseToolHandler {
    name = 'create_notebook';
    description = 'Create a new notebook in SiYuan with the specified name';
    inputSchema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'The name of the new notebook',
            },
        },
        required: ['name'],
    };
    async execute(args, context) {
        return await context.siyuan.notebook.createNotebook(args.name);
    }
}
/**
 * 打开笔记本
 */
export class OpenNotebookHandler extends BaseToolHandler {
    name = 'open_notebook';
    description = 'Open a notebook in SiYuan (mark as active/open)';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID to open',
            },
        },
        required: ['notebook_id'],
    };
    async execute(args, context) {
        await context.siyuan.notebook.openNotebook(args.notebook_id);
        return { success: true };
    }
}
/**
 * 关闭笔记本
 */
export class CloseNotebookHandler extends BaseToolHandler {
    name = 'close_notebook';
    description = 'Close a notebook in SiYuan';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID to close',
            },
        },
        required: ['notebook_id'],
    };
    async execute(args, context) {
        await context.siyuan.notebook.closeNotebook(args.notebook_id);
        return { success: true };
    }
}
/**
 * 重命名笔记本
 */
export class RenameNotebookHandler extends BaseToolHandler {
    name = 'rename_notebook';
    description = 'Rename a notebook in SiYuan';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID to rename',
            },
            name: {
                type: 'string',
                description: 'New notebook name',
            },
        },
        required: ['notebook_id', 'name'],
    };
    async execute(args, context) {
        await context.siyuan.notebook.renameNotebook(args.notebook_id, args.name);
        return { success: true, notebook_id: args.notebook_id, name: args.name };
    }
}
/**
 * 删除笔记本
 */
export class RemoveNotebookHandler extends BaseToolHandler {
    name = 'remove_notebook';
    description = 'Remove a notebook in SiYuan (dangerous operation)';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID to remove',
            },
        },
        required: ['notebook_id'],
    };
    async execute(args, context) {
        await context.siyuan.notebook.removeNotebook(args.notebook_id);
        return { success: true };
    }
}
/**
 * 获取笔记本配置
 */
export class GetNotebookConfHandler extends BaseToolHandler {
    name = 'get_notebook_conf';
    description = 'Get notebook configuration for a given notebook ID';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID',
            },
        },
        required: ['notebook_id'],
    };
    async execute(args, context) {
        return await context.siyuan.notebook.getNotebookConf(args.notebook_id);
    }
}
/**
 * 设置笔记本配置
 */
export class SetNotebookConfHandler extends BaseToolHandler {
    name = 'set_notebook_conf';
    description = 'Update notebook configuration for a given notebook ID';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID',
            },
            conf: {
                type: 'object',
                description: 'Partial notebook configuration to update',
            },
        },
        required: ['notebook_id', 'conf'],
    };
    async execute(args, context) {
        await context.siyuan.notebook.setNotebookConf(args.notebook_id, args.conf);
        return { success: true };
    }
}
//# sourceMappingURL=notebook.js.map