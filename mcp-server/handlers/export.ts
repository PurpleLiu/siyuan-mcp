/**
 * 导出相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class ExportMarkdownHandler extends BaseToolHandler<
  { block_id: string },
  { result: any }
> {
  readonly name = 'export_markdown';
  readonly description = 'Export markdown for a document or block ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: { block_id: { type: 'string', description: 'Document or block ID' } },
    required: ['block_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ result: any }> {
    const result = await context.siyuan.export.exportMarkdown(args.block_id);
    return { result };
  }
}

export class ExportFilesHandler extends BaseToolHandler<
  { paths: string[] },
  { result: any }
> {
  readonly name = 'export_files';
  readonly description = 'Export files or folders by paths';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      paths: { type: 'array', items: { type: 'string' }, description: 'Paths to export' },
    },
    required: ['paths'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ result: any }> {
    const result = await context.siyuan.export.exportFiles(args.paths);
    return { result };
  }
}
