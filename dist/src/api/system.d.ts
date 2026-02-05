/**
 * 思源笔记系统 API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanSystemApi {
    private client;
    constructor(client: SiyuanClient);
    getBootProgress(): Promise<any>;
    getSystemVersion(): Promise<any>;
    getSystemTime(): Promise<any>;
}
//# sourceMappingURL=system.d.ts.map