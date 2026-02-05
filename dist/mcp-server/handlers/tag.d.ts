/**
 * 标签相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
/**
 * 列出所有标签
 */
export declare class ListAllTagsHandler extends BaseToolHandler<{
    prefix?: string;
    depth?: number;
}, Array<{
    label: string;
    document_count: number;
}>> {
    readonly name = "list_all_tags";
    readonly description = "List all tags used across your SiYuan notes with usage counts. Useful for discovering how you organize your knowledge. Supports filtering by prefix and limiting by hierarchy depth";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<Array<{
        label: string;
        document_count: number;
    }>>;
}
/**
 * 替换标签
 */
export declare class ReplaceTagHandler extends BaseToolHandler<{
    old_tag: string;
    new_tag: string;
}, boolean> {
    readonly name = "batch_replace_tag";
    readonly description = "Rename or remove a tag across all notes in SiYuan. Useful for reorganizing your knowledge base tags. Use empty string for new_tag to remove the tag entirely";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=tag.d.ts.map