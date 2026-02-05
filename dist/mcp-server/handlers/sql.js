/**
 * SQL 相关工具处理器
 */
import { BaseToolHandler } from './base.js';
export class ExecuteSqlHandler extends BaseToolHandler {
    name = 'execute_sql';
    description = 'Execute a SiYuan SQL query';
    inputSchema = {
        type: 'object',
        properties: {
            stmt: { type: 'string', description: 'SQL statement' },
        },
        required: ['stmt'],
    };
    async execute(args, context) {
        const rows = await context.siyuan.sql.execute(args.stmt);
        return { rows };
    }
}
export class FlushTransactionHandler extends BaseToolHandler {
    name = 'flush_transaction';
    description = 'Flush SQL transaction in SiYuan';
    inputSchema = { type: 'object', properties: {} };
    async execute(_args, context) {
        await context.siyuan.sql.flushTransaction();
        return { success: true };
    }
}
//# sourceMappingURL=sql.js.map