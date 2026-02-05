/**
 * SQL 相关工具处理器
 */
import { BaseToolHandler } from './base.js';
import type { ExecutionContext, JSONSchema } from '../core/types.js';
export declare class ExecuteSqlHandler extends BaseToolHandler<{
    stmt: string;
}, {
    rows: any[];
}> {
    readonly name = "execute_sql";
    readonly description = "Execute a SiYuan SQL query";
    readonly inputSchema: JSONSchema;
    execute(args: any, context: ExecutionContext): Promise<{
        rows: any[];
    }>;
}
export declare class FlushTransactionHandler extends BaseToolHandler<{}, {
    success: boolean;
}> {
    readonly name = "flush_transaction";
    readonly description = "Flush SQL transaction in SiYuan";
    readonly inputSchema: JSONSchema;
    execute(_args: any, context: ExecutionContext): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=sql.d.ts.map