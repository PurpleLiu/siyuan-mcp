/**
 * 标签相关工具处理器
 */
import { BaseToolHandler } from './base.js';
/**
 * 列出所有标签
 */
export class ListAllTagsHandler extends BaseToolHandler {
    name = 'list_all_tags';
    description = 'List all tags used across your SiYuan notes with usage counts. Useful for discovering how you organize your knowledge. Supports filtering by prefix and limiting by hierarchy depth';
    inputSchema = {
        type: 'object',
        properties: {
            prefix: {
                type: 'string',
                description: 'Optional: Filter tags by prefix. Only tags starting with this prefix will be returned (e.g., "project" will match "project", "project/frontend", etc.)',
            },
            depth: {
                type: 'number',
                description: 'Optional: Limit tag hierarchy depth (starts from 1). For example, depth=1 returns only top-level tags (e.g., "project"), depth=2 includes second level (e.g., "project/frontend"). Tags are split by "/" separator.',
            },
        },
    };
    async execute(args, context) {
        return await context.siyuan.search.listAllTags(args.prefix, args.depth);
    }
}
/**
 * 替换标签
 */
export class ReplaceTagHandler extends BaseToolHandler {
    name = 'batch_replace_tag';
    description = 'Rename or remove a tag across all notes in SiYuan. Useful for reorganizing your knowledge base tags. Use empty string for new_tag to remove the tag entirely';
    inputSchema = {
        type: 'object',
        properties: {
            old_tag: {
                type: 'string',
                description: 'Old tag name to replace (without # symbol, e.g., "old-tag")',
            },
            new_tag: {
                type: 'string',
                description: 'New tag name to replace with (without # symbol, e.g., "new-tag"). Use empty string to remove the tag.',
            },
        },
        required: ['old_tag', 'new_tag'],
    };
    async execute(args, context) {
        const oldTag = args.old_tag;
        const newTag = args.new_tag || '';
        return await context.siyuan.tag.replaceTag(oldTag, newTag);
    }
}
//# sourceMappingURL=tag.js.map