/**
 * 简单的日志记录器实现
 */
import type { Logger } from './types.js';
type LogLevel = 'silent' | 'info' | 'debug';
export declare class ConsoleLogger implements Logger {
    private prefix;
    private level;
    constructor(prefix?: string, level?: LogLevel);
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
export {};
//# sourceMappingURL=logger.d.ts.map