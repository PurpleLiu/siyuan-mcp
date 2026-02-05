/**
 * 文件相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class GetFileHandler extends BaseToolHandler<{
    path: string;
}, {
    data: any;
}> {
    readonly name = "get_file";
    readonly description = "Get a file by path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        data: any;
    }>;
}
export declare class PutFileHandler extends BaseToolHandler<{
    path: string;
    data: string;
}, {
    success: boolean;
}> {
    readonly name = "put_file";
    readonly description = "Write a file by path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class RemoveFileHandler extends BaseToolHandler<{
    path: string;
}, {
    success: boolean;
}> {
    readonly name = "remove_file";
    readonly description = "Remove a file by path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class RenameFileHandler extends BaseToolHandler<{
    path: string;
    new_path: string;
}, {
    success: boolean;
}> {
    readonly name = "rename_file";
    readonly description = "Rename or move a file by path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
export declare class ListFilesHandler extends BaseToolHandler<{
    path: string;
}, {
    files: any[];
}> {
    readonly name = "list_files";
    readonly description = "List files under a path";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        files: any[];
    }>;
}
//# sourceMappingURL=file.d.ts.map