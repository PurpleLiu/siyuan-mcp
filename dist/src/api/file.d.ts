/**
 * 思源笔记文件 API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanFileApi {
    private client;
    constructor(client: SiyuanClient);
    getFile(path: string): Promise<any>;
    putFile(path: string, data: string): Promise<void>;
    removeFile(path: string): Promise<void>;
    renameFile(path: string, newPath: string): Promise<void>;
    listFiles(path: string): Promise<any[]>;
}
//# sourceMappingURL=file.d.ts.map