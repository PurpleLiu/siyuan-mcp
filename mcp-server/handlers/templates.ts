/**
 * 模板相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class RenderTemplateHandler extends BaseToolHandler<
  { template_id: string; data?: Record<string, any> },
  { content: string }
> {
  readonly name = 'render_template';
  readonly description = 'Render a SiYuan template by template ID';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      template_id: { type: 'string', description: 'Template ID' },
      data: { type: 'object', description: 'Template data (optional)' },
    },
    required: ['template_id'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ content: string }> {
    const content = await context.siyuan.template.renderTemplate(args.template_id, args.data);
    return { content };
  }
}

export class RenderSprigHandler extends BaseToolHandler<
  { template: string; data?: Record<string, any> },
  { content: string }
> {
  readonly name = 'render_sprig';
  readonly description = 'Render a Sprig template string';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      template: { type: 'string', description: 'Sprig template string' },
      data: { type: 'object', description: 'Template data (optional)' },
    },
    required: ['template'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ content: string }> {
    const content = await context.siyuan.template.renderSprig(args.template, args.data);
    return { content };
  }
}
