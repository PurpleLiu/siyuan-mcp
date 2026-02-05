/**
 * 简单的日志记录器实现
 */

import type { Logger } from './types.js';

type LogLevel = 'silent' | 'info' | 'debug';

export class ConsoleLogger implements Logger {
  constructor(
    private prefix: string = '[SiYuan-MCP]',
    private level: LogLevel = 'info'
  ) {}

  debug(message: string, ...args: any[]): void {
    if (this.level === 'debug') {
      console.error(`${this.prefix} [DEBUG]`, message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.level !== 'silent') {
      console.error(`${this.prefix} [INFO]`, message, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.level !== 'silent') {
      console.error(`${this.prefix} [WARN]`, message, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    console.error(`${this.prefix} [ERROR]`, message, ...args);
  }
}
