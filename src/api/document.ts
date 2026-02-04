/**
 * 思源笔记文档操作相关 API
 */

import type { SiyuanClient } from './client.js';
import type { DocTreeNode, DocTreeNodeResponse } from '../types/index.js';
// extractTitle removed - no longer needed

export class SiyuanDocumentApi {
  constructor(private client: SiyuanClient) {}

  /**
   * 创建文档（使用 Markdown）
   * @param notebookId 笔记本 ID
   * @param path 文档路径（如 /folder/filename）
   * @param markdown Markdown 内容
   * @returns 新创建的文档 ID
   */
  async createDocument(notebookId: string, path: string, markdown: string): Promise<string> {
    const response = await this.client.request<string>('/api/filetree/createDocWithMd', {
      notebook: notebookId,
      path: path,
      markdown: markdown,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to create document: ${response.msg}`);
    }

    return response.data;
  }

  /**
   * 删除文档
   * @param notebookId 笔记本 ID
   * @param path 文档路径
   */
  async removeDocument(notebookId: string, path: string): Promise<void> {
    const response = await this.client.request('/api/filetree/removeDoc', {
      notebook: notebookId,
      path: path,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to remove document: ${response.msg}`);
    }
  }

  /**
   * 重命名文档
   * @param notebookId 笔记本 ID
   * @param path 文档路径
   * @param newName 新名称
   */
  async renameDocument(notebookId: string, path: string, newName: string): Promise<void> {
    const response = await this.client.request('/api/filetree/renameDoc', {
      notebook: notebookId,
      path: path,
      title: newName,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to rename document: ${response.msg}`);
    }
  }

  /**
   * 移动文档
   * @param fromNotebookId 源笔记本 ID
   * @param fromPath 源路径
   * @param toNotebookId 目标笔记本 ID
   * @param toPath 目标路径
   */
  async moveDocument(
    fromNotebookId: string,
    fromPath: string,
    toNotebookId: string,
    toPath: string
  ): Promise<void> {
    const response = await this.client.request('/api/filetree/moveDoc', {
      fromNotebook: fromNotebookId,
      fromPath: fromPath,
      toNotebook: toNotebookId,
      toPath: toPath,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to move document: ${response.msg}`);
    }
  }

  /**
   * 根据ID移动文档到另一个文档下
   * @param fromIds 要移动的文档ID列表（可以是单个或多个）
   * @param toId 目标文档ID
   */
  async moveDocumentsByIds(fromIds: string | string[], toId: string): Promise<void> {
    const fromIdArray = Array.isArray(fromIds) ? fromIds : [fromIds];

    const response = await this.client.request('/api/filetree/moveDocsByID', {
      fromIDs: fromIdArray,
      toID: toId,
    });

    if (response.code !== 0) {
      throw new Error(`Failed to move documents: ${response.msg}`);
    }
  }

  /**
   * 根据ID移动文档到笔记本根目录
   * @param fromIds 要移动的文档ID列表（可以是单个或多个）
   * @param toNotebookId 目标笔记本ID
   */
  async moveDocumentsToNotebookRoot(fromIds: string | string[], toNotebookId: string): Promise<void> {
    const fromIdArray = Array.isArray(fromIds) ? fromIds : [fromIds];

    // 首先获取所有文档的路径
    const fromPaths: string[] = [];
    for (const docId of fromIdArray) {
      const stmt = `SELECT hpath FROM blocks WHERE id = '${docId}' AND type = 'd'`;
      const response = await this.client.request<any[]>('/api/query/sql', { stmt });
      const blocks = response.data || [];
      if (blocks.length > 0) {
        fromPaths.push(blocks[0].hpath);
      }
    }

    if (fromPaths.length === 0) {
      throw new Error('No valid documents found to move');
    }

    // 使用 moveDocs API 移动到笔记本根目录
    const response = await this.client.request('/api/filetree/moveDocs', {
      fromPaths: fromPaths,
      toNotebook: toNotebookId,
      toPath: '/',  // "/" 表示笔记本根目录
    });

    if (response.code !== 0) {
      throw new Error(`Failed to move documents to notebook root: ${response.msg}`);
    }
  }

  /**
   * 根据路径获取文档 ID
   * @param notebookId 笔记本 ID
   * @param path 文档路径
   * @returns 文档 ID 列表
   */
  async getDocIdsByPath(notebookId: string, path: string): Promise<string[]> {
    const response = await this.client.request<string[]>('/api/filetree/getIDsByHPath', {
      notebook: notebookId,
      path: path,
    });

    return response.data || [];
  }

  /**
   * 获取文档树
   * @param notebookId 笔记本 ID
   * @param path 起始路径（可选）
   * @returns 文档树
   */
  async getDocTree(notebookId: string, path?: string): Promise<DocTreeNode[]> {
    const response = await this.client.request<DocTreeNode[]>('/api/filetree/listDocTree', {
      notebook: notebookId,
      path: path,
    });

    return response.data || [];
  }

  /**
   * 获取人类可读的文档路径
   * @param blockId 块 ID
   * @returns 人类可读路径
   */
  async getHumanReadablePath(blockId: string): Promise<string> {
    const response = await this.client.request<{ hPath: string }>(
      '/api/filetree/getHPathByID',
      {
        id: blockId,
      }
    );

    return response.data.hPath;
  }

  /**
   * 获取文档树结构（带深度限制）
   * 使用 listDocsByPath API 递归获取，正确处理文档层级关系
   * @param id 文档ID或笔记本ID
   * @param maxDepth 最大深度（1表示只返回直接子节点，默认为1）
   * @returns 文档树响应节点数组
   */
  async getDocumentTree(id: string, maxDepth: number = 1): Promise<DocTreeNodeResponse[]> {
    // 判断 id 是笔记本ID还是文档ID
    // 笔记本ID格式: 2025MMDD...-xxxxxxx (通常较长且以日期开头)
    // 先尝试作为笔记本ID获取
    const notebookId = await this.resolveNotebookId(id);

    if (notebookId) {
      // id 是笔记本ID，从根路径开始
      return await this.listDocsRecursive(notebookId, '/', maxDepth, 0, '');
    } else {
      // id 是文档ID，先查出它的 box 和 path
      const docInfo = await this.getDocInfo(id);
      if (!docInfo) {
        throw new Error(`Document or notebook not found: ${id}`);
      }
      // 从该文档的路径开始列出子文档
      return await this.listDocsRecursive(docInfo.box, docInfo.path, maxDepth, 0, docInfo.hpath);
    }
  }

  /**
   * 判断 id 是否为笔记本ID
   */
  private async resolveNotebookId(id: string): Promise<string | null> {
    try {
      const response = await this.client.request<any>('/api/notebook/lsNotebooks', {});
      const notebooks = response.data?.notebooks || [];
      const found = notebooks.find((nb: any) => nb.id === id);
      return found ? found.id : null;
    } catch {
      return null;
    }
  }

  /**
   * 获取文档的 box 和 path 信息
   */
  private async getDocInfo(docId: string): Promise<{ box: string; path: string; hpath: string } | null> {
    const response = await this.client.request<any[]>('/api/query/sql', {
      stmt: `SELECT box, path, hpath FROM blocks WHERE id = '${docId}' AND type = 'd' LIMIT 1`,
    });
    const data = response.data || [];
    if (data.length === 0) return null;
    return { box: data[0].box, path: data[0].path, hpath: data[0].hpath };
  }

  /**
   * 递归使用 listDocsByPath 获取文档树
   */
  private async listDocsRecursive(
    notebookId: string,
    path: string,
    maxDepth: number,
    currentDepth: number,
    parentHPath: string
  ): Promise<DocTreeNodeResponse[]> {
    const response = await this.client.request<any>('/api/filetree/listDocsByPath', {
      notebook: notebookId,
      path: path,
      sort: 15, // 按文件名排序
      maxListCount: 0, // 不限制数量
    });

    if (response.code !== 0) {
      throw new Error(`Failed to list docs: ${response.msg}`);
    }

    const files = response.data?.files || [];
    const nodes: DocTreeNodeResponse[] = [];

    for (const file of files) {
      // 文件名去掉 .sy 后缀即为标题
      const name = file.name.replace(/\.sy$/, '');
      const hpath = parentHPath ? `${parentHPath}/${name}` : `/${name}`;

      const node: DocTreeNodeResponse = {
        id: file.id,
        name: name,
        path: hpath,
      };

      // 如果还有子文档且未达到深度限制，递归获取
      if (file.subFileCount > 0 && currentDepth + 1 < maxDepth) {
        node.children = await this.listDocsRecursive(
          notebookId,
          file.path,
          maxDepth,
          currentDepth + 1,
          hpath
        );
      } else if (file.subFileCount > 0) {
        // 标记有子文档但未展开
        node.children = [];
      }

      nodes.push(node);
    }

    return nodes;
  }


}
