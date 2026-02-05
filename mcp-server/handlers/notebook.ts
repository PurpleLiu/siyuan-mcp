/**
 * 笔记本相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
import type { NotebookResponse, SearchResultResponse } from '../../src/types/index.js';

/**
 * 列出所有笔记本
 */
export class ListNotebooksHandler extends BaseToolHandler<{}, NotebookResponse[]> {
  readonly name = 'list_notebooks';
  readonly description = 'List all notebooks in your SiYuan workspace. Notebooks are top-level containers for organizing your notes';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {},
  };

  async execute(_args: any, context: ExecutionContext): Promise<NotebookResponse[]> {
    return await context.siyuan.notebook.listNotebooks();
  }
}

/**
 * 获取最近更新的文档
 */
export class GetRecentlyUpdatedDocumentsHandler extends BaseToolHandler<
  { limit?: number; notebook_id?: string },
  SearchResultResponse[]
> {
  readonly name = 'get_recently_updated_documents';
  readonly description = 'Get recently modified notes in SiYuan, sorted by update time (most recent first). Useful for finding what you worked on recently';
  readonly inputSchema: JSONSchema = {
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

  async execute(args: any, context: ExecutionContext): Promise<SearchResultResponse[]> {
    return await context.siyuan.helpers.getRecentlyUpdatedDocuments(
      args.limit || 10,
      args.notebook_id
    );
  }
}

/**
 * 创建新笔记本
 */
export class CreateNotebookHandler extends BaseToolHandler<{ name: string }, string> {
  readonly name = 'create_notebook';
  readonly description = 'Create a new notebook in SiYuan with the specified name';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the new notebook',
      },
    },
    required: ['name'],
  };

  async execute(args: any, context: ExecutionContext): Promise<string> {
    return await context.siyuan.notebook.createNotebook(args.name);
  }
}

/**
 * 打开笔记本
 */
export class OpenNotebookHandler extends BaseToolHandler<{ notebook_id: string }, { success: boolean }> {
  readonly name = 'open_notebook';
  readonly description = 'Open a notebook in SiYuan (mark as active/open)';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      notebook_id: {
        type: 'string',
        description: 'The notebook ID to open',
      },
    },
    required: ['notebook_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.notebook.openNotebook(args.notebook_id);
    return { success: true };
  }
}

/**
 * 关闭笔记本
 */
export class CloseNotebookHandler extends BaseToolHandler<{ notebook_id: string }, { success: boolean }> {
  readonly name = 'close_notebook';
  readonly description = 'Close a notebook in SiYuan';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      notebook_id: {
        type: 'string',
        description: 'The notebook ID to close',
      },
    },
    required: ['notebook_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.notebook.closeNotebook(args.notebook_id);
    return { success: true };
  }
}

/**
 * 重命名笔记本
 */
export class RenameNotebookHandler extends BaseToolHandler<
  { notebook_id: string; name: string },
  { success: boolean; notebook_id: string; name: string }
> {
  readonly name = 'rename_notebook';
  readonly description = 'Rename a notebook in SiYuan';
  readonly inputSchema: JSONSchema = {
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

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean; notebook_id: string; name: string }> {
    await context.siyuan.notebook.renameNotebook(args.notebook_id, args.name);
    return { success: true, notebook_id: args.notebook_id, name: args.name };
  }
}

/**
 * 删除笔记本
 */
export class RemoveNotebookHandler extends BaseToolHandler<{ notebook_id: string }, { success: boolean }> {
  readonly name = 'remove_notebook';
  readonly description = 'Remove a notebook in SiYuan (dangerous operation)';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      notebook_id: {
        type: 'string',
        description: 'The notebook ID to remove',
      },
    },
    required: ['notebook_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.notebook.removeNotebook(args.notebook_id);
    return { success: true };
  }
}

/**
 * 获取笔记本配置
 */
export class GetNotebookConfHandler extends BaseToolHandler<{ notebook_id: string }, any> {
  readonly name = 'get_notebook_conf';
  readonly description = 'Get notebook configuration for a given notebook ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      notebook_id: {
        type: 'string',
        description: 'The notebook ID',
      },
    },
    required: ['notebook_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<any> {
    return await context.siyuan.notebook.getNotebookConf(args.notebook_id);
  }
}

/**
 * 设置笔记本配置
 */
export class SetNotebookConfHandler extends BaseToolHandler<{ notebook_id: string; conf: Record<string, any> }, { success: boolean }> {
  readonly name = 'set_notebook_conf';
  readonly description = 'Update notebook configuration for a given notebook ID';
  readonly inputSchema: JSONSchema = {
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

  async execute(args: any, context: ExecutionContext): Promise<{ success: boolean }> {
    await context.siyuan.notebook.setNotebookConf(args.notebook_id, args.conf);
    return { success: true };
  }
}

