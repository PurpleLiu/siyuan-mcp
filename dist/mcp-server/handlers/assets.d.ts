/**
 * 资源相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class UploadAssetBase64Handler extends BaseToolHandler<{
    filename: string;
    base64: string;
}, {
    result: any;
}> {
    readonly name = "upload_asset_base64";
    readonly description = "Upload an asset using base64 content";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        result: any;
    }>;
}
//# sourceMappingURL=assets.d.ts.map