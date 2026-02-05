/**
 * 思源笔记 SQL API
 */
export class SiyuanSqlApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 执行 SQL 查询
     * @param stmt SQL 语句
     */
    async execute(stmt) {
        const response = await this.client.request('/api/query/sql', { stmt });
        if (response.code !== 0) {
            throw new Error(`Failed to execute SQL: ${response.msg}`);
        }
        return response.data || [];
    }
    /**
     * 提交事务
     */
    async flushTransaction() {
        const response = await this.client.request('/api/query/flushTransaction');
        if (response.code !== 0) {
            throw new Error(`Failed to flush transaction: ${response.msg}`);
        }
    }
}
//# sourceMappingURL=sql.js.map