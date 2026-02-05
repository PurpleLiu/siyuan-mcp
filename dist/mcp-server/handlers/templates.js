/**
 * 模板相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class RenderTemplateHandler extends BaseToolHandler {
    name = 'render_template';
    description = 'Render a SiYuan template by template ID';
    inputSchema = {
        type: 'object',
        properties: {
            template_id: { type: 'string', description: 'Template ID' },
            data: { type: 'object', description: 'Template data (optional)' },
        },
        required: ['template_id'],
    };
    async execute(args, context) {
        const content = await context.siyuan.template.renderTemplate(args.template_id, args.data);
        return { content };
    }
}
export class RenderSprigHandler extends BaseToolHandler {
    name = 'render_sprig';
    description = 'Render a Sprig template string';
    inputSchema = {
        type: 'object',
        properties: {
            template: { type: 'string', description: 'Sprig template string' },
            data: { type: 'object', description: 'Template data (optional)' },
        },
        required: ['template'],
    };
    async execute(args, context) {
        const content = await context.siyuan.template.renderSprig(args.template, args.data);
        return { content };
    }
}
//# sourceMappingURL=templates.js.map