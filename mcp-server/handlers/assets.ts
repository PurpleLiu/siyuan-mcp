/**
 * 资源相关工具处理器
 */

import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';

export class UploadAssetBase64Handler extends BaseToolHandler<
  { filename: string; base64: string },
  { result: any }
> {
  readonly name = 'upload_asset_base64';
  readonly description = 'Upload an asset using base64 content';
  readonly inputSchema: JSONSchema = {
    type: 'object',
    properties: {
      filename: { type: 'string', description: 'File name' },
      base64: { type: 'string', description: 'Base64 content (no data: prefix)' },
    },
    required: ['filename', 'base64'],
  };

  async execute(args: any, context: ExecutionContext): Promise<{ result: any }> {
    const result = await context.siyuan.asset.uploadAssetBase64(args.filename, args.base64);
    return { result };
  }
}
