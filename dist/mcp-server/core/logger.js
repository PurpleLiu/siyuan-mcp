/**
 * 简单的日志记录器实现
 */
export class ConsoleLogger {
    prefix;
    level;
    constructor(prefix = '[SiYuan-MCP]', level = 'info') {
        this.prefix = prefix;
        this.level = level;
    }
    debug(message, ...args) {
        if (this.level === 'debug') {
            console.error(`${this.prefix} [DEBUG]`, message, ...args);
        }
    }
    info(message, ...args) {
        if (this.level !== 'silent') {
            console.error(`${this.prefix} [INFO]`, message, ...args);
        }
    }
    warn(message, ...args) {
        if (this.level !== 'silent') {
            console.error(`${this.prefix} [WARN]`, message, ...args);
        }
    }
    error(message, ...args) {
        console.error(`${this.prefix} [ERROR]`, message, ...args);
    }
}
//# sourceMappingURL=logger.js.map