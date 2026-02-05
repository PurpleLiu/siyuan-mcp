/**
 * 文件相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class GetFileHandler extends BaseToolHandler {
    name = 'get_file';
    description = 'Get a file by path';
    inputSchema = {
        type: 'object',
        properties: { path: { type: 'string', description: 'File path' } },
        required: ['path'],
    };
    async execute(args, context) {
        const data = await context.siyuan.file.getFile(args.path);
        return { data };
    }
}
export class PutFileHandler extends BaseToolHandler {
    name = 'put_file';
    description = 'Write a file by path';
    inputSchema = {
        type: 'object',
        properties: {
            path: { type: 'string', description: 'File path' },
            data: { type: 'string', description: 'File content' },
        },
        required: ['path', 'data'],
    };
    async execute(args, context) {
        await context.siyuan.file.putFile(args.path, args.data);
        return { success: true };
    }
}
export class RemoveFileHandler extends BaseToolHandler {
    name = 'remove_file';
    description = 'Remove a file by path';
    inputSchema = {
        type: 'object',
        properties: { path: { type: 'string', description: 'File path' } },
        required: ['path'],
    };
    async execute(args, context) {
        await context.siyuan.file.removeFile(args.path);
        return { success: true };
    }
}
export class RenameFileHandler extends BaseToolHandler {
    name = 'rename_file';
    description = 'Rename or move a file by path';
    inputSchema = {
        type: 'object',
        properties: {
            path: { type: 'string', description: 'Original file path' },
            new_path: { type: 'string', description: 'New file path' },
        },
        required: ['path', 'new_path'],
    };
    async execute(args, context) {
        await context.siyuan.file.renameFile(args.path, args.new_path);
        return { success: true };
    }
}
export class ListFilesHandler extends BaseToolHandler {
    name = 'list_files';
    description = 'List files under a path';
    inputSchema = {
        type: 'object',
        properties: { path: { type: 'string', description: 'Directory path' } },
        required: ['path'],
    };
    async execute(args, context) {
        const files = await context.siyuan.file.listFiles(args.path);
        return { files };
    }
}
//# sourceMappingURL=file.js.map