/**
 * 思源笔记文件 API
 */
import { requireNonEmptyString } from '../utils/validation.js';
export class SiyuanFileApi {
    client;
    constructor(client) {
        this.client = client;
    }
    async getFile(path) {
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/file/getFile', { path });
        if (response.code !== 0) {
            throw new Error(`Failed to get file: ${response.msg}`);
        }
        return response.data;
    }
    async putFile(path, data) {
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/file/putFile', { path, data });
        if (response.code !== 0) {
            throw new Error(`Failed to put file: ${response.msg}`);
        }
    }
    async removeFile(path) {
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/file/removeFile', { path });
        if (response.code !== 0) {
            throw new Error(`Failed to remove file: ${response.msg}`);
        }
    }
    async renameFile(path, newPath) {
        requireNonEmptyString(path, 'path');
        requireNonEmptyString(newPath, 'newPath');
        const response = await this.client.request('/api/file/renameFile', {
            path,
            newPath,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to rename file: ${response.msg}`);
        }
    }
    async listFiles(path) {
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/file/listFiles', { path });
        if (response.code !== 0) {
            throw new Error(`Failed to list files: ${response.msg}`);
        }
        return response.data || [];
    }
}
//# sourceMappingURL=file.js.map