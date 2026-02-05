/**
 * 思源笔记工具库
 * SiYuan Tools - A TypeScript library for SiYuan Note API operations
 *
 * @packageDocumentation
 */

import { SiyuanClient } from './api/client.js';
import { SiyuanSearchApi } from './api/search.js';
import { SiyuanBlockApi } from './api/block.js';
import { SiyuanDocumentApi } from './api/document.js';
import { SiyuanNotebookApi } from './api/notebook.js';
import { SiyuanSnapshotApi } from './api/snapshot.js';
import { SiyuanTagApi } from './api/tag.js';
import { SiyuanAttributeApi } from './api/attributes.js';
import { SiyuanSqlApi } from './api/sql.js';
import { SiyuanTemplateApi } from './api/templates.js';
import { SiyuanAssetApi } from './api/assets.js';
import { SiyuanFileApi } from './api/file.js';
import { SiyuanExportApi } from './api/export.js';
import { SiyuanNotificationApi } from './api/notification.js';
import { SiyuanSystemApi } from './api/system.js';
import { DailyNoteUtils } from './utils/daily-note.js';
import { SiyuanHelpers } from './utils/helpers.js';

import type { SiyuanConfig } from './types/index.js';

/**
 * 思源笔记工具类
 * 整合了所有 API 操作的主类
 */
export class SiyuanTools {
  private client: SiyuanClient;

  /** 搜索相关 API */
  public readonly search: SiyuanSearchApi;

  /** 块操作相关 API */
  public readonly block: SiyuanBlockApi;

  /** 文档操作相关 API */
  public readonly document: SiyuanDocumentApi;

  /** 笔记本操作相关 API */
  public readonly notebook: SiyuanNotebookApi;

  /** 快照操作相关 API */
  public readonly snapshot: SiyuanSnapshotApi;

  /** 标签操作相关 API */
  public readonly tag: SiyuanTagApi;

  /** 属性相关 API */
  public readonly attr: SiyuanAttributeApi;

  /** SQL 相关 API */
  public readonly sql: SiyuanSqlApi;

  /** 模板相关 API */
  public readonly template: SiyuanTemplateApi;

  /** 资源相关 API */
  public readonly asset: SiyuanAssetApi;

  /** 文件相关 API */
  public readonly file: SiyuanFileApi;

  /** 导出相关 API */
  public readonly export: SiyuanExportApi;

  /** 通知相关 API */
  public readonly notification: SiyuanNotificationApi;

  /** 系统相关 API */
  public readonly system: SiyuanSystemApi;

  /** 今日笔记工具 */
  public readonly dailyNote: DailyNoteUtils;

  /** 辅助工具方法（提供增强功能，但按需使用以避免上下文过载） */
  public readonly helpers: SiyuanHelpers;

  constructor(config: SiyuanConfig) {
    this.client = new SiyuanClient(config);

    // 初始化各个 API 模块
    this.search = new SiyuanSearchApi(this.client);
    this.block = new SiyuanBlockApi(this.client);
    this.document = new SiyuanDocumentApi(this.client);
    this.notebook = new SiyuanNotebookApi(this.client);
    this.snapshot = new SiyuanSnapshotApi(this.client);
    this.tag = new SiyuanTagApi(this.client);
    this.attr = new SiyuanAttributeApi(this.client);
    this.sql = new SiyuanSqlApi(this.client);
    this.template = new SiyuanTemplateApi(this.client);
    this.asset = new SiyuanAssetApi(this.client);
    this.file = new SiyuanFileApi(this.client);
    this.export = new SiyuanExportApi(this.client);
    this.notification = new SiyuanNotificationApi(this.client);
    this.system = new SiyuanSystemApi(this.client);
    this.dailyNote = new DailyNoteUtils(
      this.client,
      this.document,
      this.notebook,
      this.block
    );
    this.helpers = new SiyuanHelpers(this.client);
  }

  /**
   * 更新配置
   * @param config 新的配置（部分）
   */
  updateConfig(config: Partial<SiyuanConfig>): void {
    this.client.updateConfig(config);
  }

  /**
   * 获取当前配置
   */
  getConfig(): Readonly<SiyuanConfig> {
    return this.client.getConfig();
  }

  // ============ 便捷方法：常用操作的快捷方式 ============

  /**
   * 根据文件名搜索文件
   * @param fileName 文件名关键词
   * @param limit 返回结果数量限制，默认 10
   */
  async searchByFileName(fileName: string, limit?: number) {
    return this.search.searchByFileName(fileName, { limit });
  }

  /**
   * 根据文件内容搜索文件
   * @param content 内容关键词
   * @param limit 返回结果数量限制，默认 10
   */
  async searchByContent(content: string, limit?: number) {
    return this.search.searchByContent(content, { limit });
  }

  /**
   * 查看文件内容
   * @param blockId 块 ID（文档 ID）
   * @returns Markdown 内容
   */
  async getFileContent(blockId: string): Promise<string> {
    return this.block.getBlockMarkdown(blockId);
  }

  /**
   * 将内容全覆盖到文件
   * @param blockId 块 ID
   * @param content Markdown 内容
   */
  async overwriteFile(blockId: string, content: string): Promise<void> {
    return this.block.updateBlock(blockId, content);
  }

  /**
   * 将内容追加到文件
   * @param blockId 块 ID（父块）
   * @param content Markdown 内容
   * @returns 新创建的块 ID
   */
  async appendToFile(blockId: string, content: string): Promise<string> {
    return this.block.appendBlock(blockId, content);
  }

  /**
   * 将内容创建为新的文档
   * @param notebookId 笔记本 ID
   * @param path 文档路径（如 /folder/filename）
   * @param content Markdown 内容
   * @returns 新创建的文档 ID
   */
  async createFile(notebookId: string, path: string, content: string): Promise<string> {
    return this.document.createDocument(notebookId, path, content);
  }

  /**
   * 将内容追加到今日笔记
   * @param notebookId 笔记本 ID
   * @param content Markdown 内容
   * @returns 新创建的块 ID
   */
  async appendToDailyNote(notebookId: string, content: string): Promise<string> {
    return this.dailyNote.appendToDailyNote(notebookId, content);
  }

  /**
   * 列出所有笔记本
   */
  async listNotebooks() {
    return this.notebook.listNotebooks();
  }
}

/**
 * 创建 SiyuanTools 实例的工厂函数
 * @param baseUrl 思源笔记服务地址，默认 http://127.0.0.1:6806
 * @param token API Token
 * @param options 额外选项（如 verbose）
 * @returns SiyuanTools 实例
 */
export function createSiyuanTools(
  baseUrl = 'http://127.0.0.1:6806',
  token: string,
  options: Partial<SiyuanConfig> = {}
): SiyuanTools {
  return new SiyuanTools({ baseUrl, token, ...options });
}

// 导出所有类型
export * from './types/index.js';
export * from './types/enhanced.js';

// 导出各个 API 类（供高级用户使用）
export { SiyuanClient } from './api/client.js';
export { SiyuanSearchApi } from './api/search.js';
export { SiyuanBlockApi } from './api/block.js';
export { SiyuanDocumentApi } from './api/document.js';
export { SiyuanNotebookApi } from './api/notebook.js';
export { SiyuanSnapshotApi } from './api/snapshot.js';
export { SiyuanTagApi } from './api/tag.js';
export { SiyuanAttributeApi } from './api/attributes.js';
export { SiyuanSqlApi } from './api/sql.js';
export { SiyuanTemplateApi } from './api/templates.js';
export { SiyuanAssetApi } from './api/assets.js';
export { SiyuanFileApi } from './api/file.js';
export { SiyuanExportApi } from './api/export.js';
export { SiyuanNotificationApi } from './api/notification.js';
export { SiyuanSystemApi } from './api/system.js';
export { DailyNoteUtils } from './utils/daily-note.js';
export { SiyuanHelpers } from './utils/helpers.js';
