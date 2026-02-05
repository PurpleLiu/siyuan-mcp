/**
 * 资源相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class UploadAssetBase64Handler extends BaseToolHandler {
    name = 'upload_asset_base64';
    description = 'Upload an asset using base64 content';
    inputSchema = {
        type: 'object',
        properties: {
            filename: { type: 'string', description: 'File name' },
            base64: { type: 'string', description: 'Base64 content (no data: prefix)' },
        },
        required: ['filename', 'base64'],
    };
    async execute(args, context) {
        const result = await context.siyuan.asset.uploadAssetBase64(args.filename, args.base64);
        return { result };
    }
}
//# sourceMappingURL=assets.js.map