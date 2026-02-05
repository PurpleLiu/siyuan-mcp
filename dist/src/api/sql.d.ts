/**
 * 思源笔记 SQL API
 */
import type { SiyuanClient } from './client.js';
export declare class SiyuanSqlApi {
    private client;
    constructor(client: SiyuanClient);
    /**
     * 执行 SQL 查询
     * @param stmt SQL 语句
     */
    execute(stmt: string): Promise<any[]>;
    /**
     * 提交事务
     */
    flushTransaction(): Promise<void>;
}
//# sourceMappingURL=sql.d.ts.map