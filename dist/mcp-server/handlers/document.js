/**
 * 文档相关工具处理器
 */
import { BaseToolHandler } from './base.js';
/**
 * 获取文档内容
 */
export class GetDocumentContentHandler extends BaseToolHandler {
    name = 'get_document_content';
    description = 'Read the markdown content of a note in SiYuan. Returns the full note content in markdown format, with optional pagination support';
    inputSchema = {
        type: 'object',
        properties: {
            document_id: {
                type: 'string',
                description: 'The note document ID (block ID)',
            },
            offset: {
                type: 'number',
                description: 'Starting line number (0-based index). Default is 0 (start from beginning)',
                default: 0,
            },
            limit: {
                type: 'number',
                description: 'Number of lines to return. If not specified, returns all lines from offset to end',
            },
        },
        required: ['document_id'],
    };
    async execute(args, context) {
        // 获取完整内容用于计算总行数
        const fullContent = await context.siyuan.getFileContent(args.document_id);
        const lines = fullContent.split('\n');
        const totalLines = lines.length;
        // 如果没有指定 offset 和 limit，返回完整内容（带元信息）
        if (args.offset === undefined && args.limit === undefined) {
            const metaInfo = `--- Document Info ---\nTotal Lines: ${totalLines}\n--- End Info ---\n\n`;
            return metaInfo + fullContent;
        }
        // 进行分页处理
        const offset = args.offset ?? 0;
        const startLine = offset;
        // 如果起始行超出范围，返回元信息说明
        if (startLine >= totalLines) {
            return `--- Document Info ---\nTotal Lines: ${totalLines}\nRequested Range: ${startLine}-${startLine + (args.limit || 0)}\nStatus: Out of range\n--- End Info ---\n`;
        }
        // 计算结束行
        const endLine = args.limit !== undefined ? startLine + args.limit : totalLines;
        const actualEndLine = Math.min(endLine, totalLines);
        // 构建元信息
        const metaInfo = `--- Document Info ---\nTotal Lines: ${totalLines}\nCurrent Range: ${startLine}-${actualEndLine - 1} (showing ${actualEndLine - startLine} lines)\n--- End Info ---\n\n`;
        // 截取指定范围的行
        const selectedContent = lines.slice(startLine, actualEndLine).join('\n');
        return metaInfo + selectedContent;
    }
}
/**
 * 创建文档
 */
export class CreateDocumentHandler extends BaseToolHandler {
    name = 'create_document';
    description = 'Create a new note document in a SiYuan notebook with markdown content';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The target notebook ID where the note will be created',
            },
            path: {
                type: 'string',
                description: 'Note path within the notebook (e.g., /folder/note-title)',
            },
            content: {
                type: 'string',
                description: 'Markdown content for the new note',
            },
        },
        required: ['notebook_id', 'path', 'content'],
    };
    async execute(args, context) {
        return await context.siyuan.createFile(args.notebook_id, args.path, args.content);
    }
}
/**
 * 追加到文档
 */
export class AppendToDocumentHandler extends BaseToolHandler {
    name = 'append_to_document';
    description = 'Append markdown content to the end of an existing note in SiYuan';
    inputSchema = {
        type: 'object',
        properties: {
            document_id: {
                type: 'string',
                description: 'The target note document ID',
            },
            content: {
                type: 'string',
                description: 'Markdown content to append to the note',
            },
        },
        required: ['document_id', 'content'],
    };
    async execute(args, context) {
        return await context.siyuan.appendToFile(args.document_id, args.content);
    }
}
/**
 * 更新文档
 */
export class UpdateDocumentHandler extends BaseToolHandler {
    name = 'update_document';
    description = 'Replace the entire content of a note in SiYuan with new markdown content (overwrites existing content)';
    inputSchema = {
        type: 'object',
        properties: {
            document_id: {
                type: 'string',
                description: 'The note document ID to update',
            },
            content: {
                type: 'string',
                description: 'New markdown content that will replace the existing note content',
            },
        },
        required: ['document_id', 'content'],
    };
    async execute(args, context) {
        await context.siyuan.overwriteFile(args.document_id, args.content);
        return { success: true, document_id: args.document_id };
    }
}
/**
 * 追加到今日笔记
 */
export class AppendToDailyNoteHandler extends BaseToolHandler {
    name = 'append_to_daily_note';
    description = "Append markdown content to today's daily note in SiYuan (automatically creates the daily note if it doesn't exist)";
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'The notebook ID where the daily note resides',
            },
            content: {
                type: 'string',
                description: 'Markdown content to append to today\'s daily note',
            },
        },
        required: ['notebook_id', 'content'],
    };
    async execute(args, context) {
        return await context.siyuan.appendToDailyNote(args.notebook_id, args.content);
    }
}
/**
 * 移动文档（通过ID）
 */
export class MoveDocumentsHandler extends BaseToolHandler {
    name = 'move_documents';
    description = 'Move one or more notes to a new location in SiYuan. Provide EXACTLY ONE destination: either to_parent_id (to nest notes under a parent note) OR to_notebook_root (to move notes to notebook top level).';
    inputSchema = {
        type: 'object',
        properties: {
            from_ids: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of note document IDs to move. For a single note, use an array with one element: ["note-id"]',
            },
            to_parent_id: {
                type: 'string',
                description: 'OPTION 1: Parent note document ID. Notes will be nested under this parent note as children. Cannot be used together with to_notebook_root.',
            },
            to_notebook_root: {
                type: 'string',
                description: 'OPTION 2: Notebook ID. Notes will be moved to the top level of this notebook. Cannot be used together with to_parent_id.',
            },
        },
        required: ['from_ids'],
    };
    async execute(args, context) {
        // 处理 from_ids，支持单个ID或数组
        let fromIds;
        if (Array.isArray(args.from_ids)) {
            fromIds = args.from_ids;
        }
        else if (typeof args.from_ids === 'string') {
            // 如果是JSON数组字符串，解析它
            if (args.from_ids.startsWith('[')) {
                try {
                    fromIds = JSON.parse(args.from_ids);
                }
                catch {
                    fromIds = [args.from_ids];
                }
            }
            else {
                fromIds = [args.from_ids];
            }
        }
        else {
            throw new Error('from_ids must be a string or array of strings');
        }
        // 验证参数：必须提供其中一个，且只能提供一个
        const hasParentId = !!args.to_parent_id;
        const hasNotebookRoot = !!args.to_notebook_root;
        if (!hasParentId && !hasNotebookRoot) {
            throw new Error('Must provide exactly one of: to_parent_id (for nested placement) or to_notebook_root (for root placement)');
        }
        if (hasParentId && hasNotebookRoot) {
            throw new Error('Cannot provide both to_parent_id and to_notebook_root - choose only one target location');
        }
        // 情况1: 移动到父文档下（嵌套）
        if (hasParentId) {
            await context.siyuan.document.moveDocumentsByIds(fromIds, args.to_parent_id);
        }
        // 情况2: 移动到笔记本根目录（顶级）
        else {
            await context.siyuan.document.moveDocumentsToNotebookRoot(fromIds, args.to_notebook_root);
        }
        return {
            success: true,
            moved_count: fromIds.length,
            from_ids: fromIds,
            to_parent_id: args.to_parent_id,
            to_notebook_root: args.to_notebook_root
        };
    }
}
/**
 * 获取文档树
 */
export class GetDocumentTreeHandler extends BaseToolHandler {
    name = 'get_document_tree';
    description = 'Get the hierarchical structure of notes in SiYuan with specified depth. Returns the note tree starting from a notebook or parent note.';
    inputSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'Starting point: note document ID or notebook ID',
            },
            depth: {
                type: 'number',
                description: 'How deep to traverse the note hierarchy (1 = direct children only, 2 = children and grandchildren, etc.). Default is 1.',
                default: 1,
            },
        },
        required: ['id'],
    };
    async execute(args, context) {
        const depth = args.depth || 1;
        return await context.siyuan.document.getDocumentTree(args.id, depth);
    }
}
/**
 * 删除文档
 */
export class RemoveDocumentHandler extends BaseToolHandler {
    name = 'remove_document';
    description = 'Remove a document by notebook ID and path (dangerous operation)';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'Notebook ID containing the document',
            },
            path: {
                type: 'string',
                description: 'Document path (e.g., /folder/note)',
            },
        },
        required: ['notebook_id', 'path'],
    };
    async execute(args, context) {
        await context.siyuan.document.removeDocument(args.notebook_id, args.path);
        return { success: true };
    }
}
/**
 * 重命名文档
 */
export class RenameDocumentHandler extends BaseToolHandler {
    name = 'rename_document';
    description = 'Rename a document by notebook ID and path';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'Notebook ID containing the document',
            },
            path: {
                type: 'string',
                description: 'Document path (e.g., /folder/note)',
            },
            new_name: {
                type: 'string',
                description: 'New document title',
            },
        },
        required: ['notebook_id', 'path', 'new_name'],
    };
    async execute(args, context) {
        await context.siyuan.document.renameDocument(args.notebook_id, args.path, args.new_name);
        return { success: true, new_name: args.new_name };
    }
}
/**
 * 根据 ID 获取人类可读路径
 */
export class GetHumanPathByIdHandler extends BaseToolHandler {
    name = 'get_human_path_by_id';
    description = 'Get human-readable path by document ID';
    inputSchema = {
        type: 'object',
        properties: {
            document_id: {
                type: 'string',
                description: 'Document ID (block ID)',
            },
        },
        required: ['document_id'],
    };
    async execute(args, context) {
        const hpath = await context.siyuan.document.getHumanReadablePath(args.document_id);
        return { hpath };
    }
}
/**
 * 根据路径获取人类可读路径
 */
export class GetHumanPathByPathHandler extends BaseToolHandler {
    name = 'get_human_path_by_path';
    description = 'Get human-readable path by notebook ID and storage path';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'Notebook ID',
            },
            path: {
                type: 'string',
                description: 'Document storage path (e.g., /folder/note)',
            },
        },
        required: ['notebook_id', 'path'],
    };
    async execute(args, context) {
        const hpath = await context.siyuan.document.getHumanReadablePathByPath(args.notebook_id, args.path);
        return { hpath };
    }
}
/**
 * 根据 ID 获取存储路径
 */
export class GetPathByIdHandler extends BaseToolHandler {
    name = 'get_path_by_id';
    description = 'Get storage path by document ID';
    inputSchema = {
        type: 'object',
        properties: {
            document_id: {
                type: 'string',
                description: 'Document ID (block ID)',
            },
        },
        required: ['document_id'],
    };
    async execute(args, context) {
        const path = await context.siyuan.document.getPathById(args.document_id);
        return { path };
    }
}
/**
 * 根据人类可读路径获取文档 ID
 */
export class GetIdsByHPathHandler extends BaseToolHandler {
    name = 'get_ids_by_hpath';
    description = 'Get document IDs by human-readable path';
    inputSchema = {
        type: 'object',
        properties: {
            notebook_id: {
                type: 'string',
                description: 'Notebook ID',
            },
            path: {
                type: 'string',
                description: 'Human-readable path (e.g., /Folder/Note)',
            },
        },
        required: ['notebook_id', 'path'],
    };
    async execute(args, context) {
        const ids = await context.siyuan.document.getDocIdsByPath(args.notebook_id, args.path);
        return { ids };
    }
}
//# sourceMappingURL=document.js.map