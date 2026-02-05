/**
 * 文件相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class GetFileHandler extends BaseToolHandler<{ path: string }, { data: any }> {
  readonly name = 'get_file';
  readonly description = 'Get a file by path';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: { path: { type: 'string', description: 'File path' } },
    required: ['path'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ data: any }> {
    const data = await context.siyuan.file.getFile(args.path);
    return { data };
  }
}

export class PutFileHandler extends BaseToolHandler<
  { path: string; data: string },
  { success: boolean }
> {
  readonly name = 'put_file';
  readonly description = 'Write a file by path';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'File path' },
      data: { type: 'string', description: 'File content' },
    },
    required: ['path', 'data'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.file.putFile(args.path, args.data);
    return { success: true };
  }
}

export class RemoveFileHandler extends BaseToolHandler<{ path: string }, { success: boolean }> {
  readonly name = 'remove_file';
  readonly description = 'Remove a file by path';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: { path: { type: 'string', description: 'File path' } },
    required: ['path'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.file.removeFile(args.path);
    return { success: true };
  }
}

export class RenameFileHandler extends BaseToolHandler<
  { path: string; new_path: string },
  { success: boolean }
> {
  readonly name = 'rename_file';
  readonly description = 'Rename or move a file by path';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Original file path' },
      new_path: { type: 'string', description: 'New file path' },
    },
    required: ['path', 'new_path'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.file.renameFile(args.path, args.new_path);
    return { success: true };
  }
}

export class ListFilesHandler extends BaseToolHandler<{ path: string }, { files: any[] }> {
  readonly name = 'list_files';
  readonly description = 'List files under a path';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: { path: { type: 'string', description: 'Directory path' } },
    required: ['path'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ files: any[] }> {
    const files = await context.siyuan.file.listFiles(args.path);
    return { files };
  }
}
