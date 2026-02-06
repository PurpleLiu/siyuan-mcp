/**
 * 思源笔记文档操作相关 API
 */
import { requireNonEmptyArray, requireNonEmptyString } from '../utils/validation.js';
// extractTitle removed - no longer needed
export class SiyuanDocumentApi {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * 创建文档（使用 Markdown）
     * @param notebookId 笔记本 ID
     * @param path 文档路径（如 /folder/filename）
     * @param markdown Markdown 内容
     * @returns 新创建的文档 ID
     */
    async createDocument(notebookId, path, markdown) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
        requireNonEmptyString(markdown, 'markdown');
        const response = await this.client.request('/api/filetree/createDocWithMd', {
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
    async removeDocument(notebookId, path) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
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
    async renameDocument(notebookId, path, newName) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
        requireNonEmptyString(newName, 'newName');
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
    async moveDocument(fromNotebookId, fromPath, toNotebookId, toPath) {
        requireNonEmptyString(fromNotebookId, 'fromNotebookId');
        requireNonEmptyString(fromPath, 'fromPath');
        requireNonEmptyString(toNotebookId, 'toNotebookId');
        requireNonEmptyString(toPath, 'toPath');
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
    async moveDocumentsByIds(fromIds, toId) {
        const fromIdArray = Array.isArray(fromIds) ? fromIds : [fromIds];
        requireNonEmptyArray(fromIdArray, 'fromIds');
        requireNonEmptyString(toId, 'toId');
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
    async moveDocumentsToNotebookRoot(fromIds, toNotebookId) {
        const fromIdArray = Array.isArray(fromIds) ? fromIds : [fromIds];
        requireNonEmptyArray(fromIdArray, 'fromIds');
        requireNonEmptyString(toNotebookId, 'toNotebookId');
        // 首先获取所有文档的路径
        const fromPaths = [];
        for (const docId of fromIdArray) {
            const stmt = `SELECT hpath FROM blocks WHERE id = '${docId}' AND type = 'd'`;
            const response = await this.client.request('/api/query/sql', { stmt });
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
            toPath: '/', // "/" 表示笔记本根目录
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
    async getDocIdsByPath(notebookId, path) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/filetree/getIDsByHPath', {
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
    async getDocTree(notebookId, path) {
        requireNonEmptyString(notebookId, 'notebookId');
        const response = await this.client.request('/api/filetree/listDocTree', {
            notebook: notebookId,
            path: path,
        });
        return response.data || [];
    }
    /**
     * 获取人类可读的文档路径（通过 ID）
     * @param blockId 块 ID
     * @returns 人类可读路径
     */
    async getHumanReadablePath(blockId) {
        requireNonEmptyString(blockId, 'blockId');
        const response = await this.client.request('/api/filetree/getHPathByID', {
            id: blockId,
        });
        return response.data.hPath;
    }
    /**
     * 根据文档路径获取人类可读路径
     * @param notebookId 笔记本 ID
     * @param path 文档存储路径（如 /foo/bar）
     */
    async getHumanReadablePathByPath(notebookId, path) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/filetree/getHPathByPath', {
            notebook: notebookId,
            path: path,
        });
        return response.data.hPath;
    }
    /**
     * 根据文档 ID 获取存储路径
     * @param blockId 块 ID（文档 ID）
     */
    async getPathById(blockId) {
        requireNonEmptyString(blockId, 'blockId');
        const response = await this.client.request('/api/filetree/getPathByID', {
            id: blockId,
        });
        return response.data.path;
    }
    /**
     * 获取文档树结构（带深度限制）
     * 使用 listDocsByPath API 递归获取，正确处理文档层级关系
     * @param id 文档ID或笔记本ID
     * @param maxDepth 最大深度（1表示只返回直接子节点，默认为1）
     * @returns 文档树响应节点数组
     */
    async getDocumentTree(id, maxDepth = 1) {
        requireNonEmptyString(id, 'id');
        // 判断 id 是笔记本ID还是文档ID
        // 笔记本ID格式: 2025MMDD...-xxxxxxx (通常较长且以日期开头)
        // 先尝试作为笔记本ID获取
        const notebookId = await this.resolveNotebookId(id);
        if (notebookId) {
            // id 是笔记本ID，从根路径开始
            return await this.listDocsRecursive(notebookId, '/', maxDepth, 0, '');
        }
        else {
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
    async resolveNotebookId(id) {
        try {
            const response = await this.client.request('/api/notebook/lsNotebooks', {});
            const notebooks = response.data?.notebooks || [];
            const found = notebooks.find((nb) => nb.id === id);
            return found ? found.id : null;
        }
        catch {
            return null;
        }
    }
    /**
     * 获取文档的 box 和 path 信息
     */
    async getDocInfo(docId) {
        requireNonEmptyString(docId, 'docId');
        const response = await this.client.request('/api/query/sql', {
            stmt: `SELECT box, path, hpath FROM blocks WHERE id = '${docId}' AND type = 'd' LIMIT 1`,
        });
        const data = response.data || [];
        if (data.length === 0)
            return null;
        return { box: data[0].box, path: data[0].path, hpath: data[0].hpath };
    }
    /**
     * 递归使用 listDocsByPath 获取文档树
     */
    async listDocsRecursive(notebookId, path, maxDepth, currentDepth, parentHPath) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/filetree/listDocsByPath', {
            notebook: notebookId,
            path: path,
            sort: 15, // 按文件名排序
            maxListCount: 0, // 不限制数量
        });
        if (response.code !== 0) {
            throw new Error(`Failed to list docs: ${response.msg}`);
        }
        const files = response.data?.files || [];
        const nodes = [];
        for (const file of files) {
            // 文件名去掉 .sy 后缀即为标题
            const name = file.name.replace(/\.sy$/, '');
            const hpath = parentHPath ? `${parentHPath}/${name}` : `/${name}`;
            const node = {
                id: file.id,
                name: name,
                path: hpath,
            };
            // 如果还有子文档且未达到深度限制，递归获取
            if (file.subFileCount > 0 && currentDepth + 1 < maxDepth) {
                node.children = await this.listDocsRecursive(notebookId, file.path, maxDepth, currentDepth + 1, hpath);
            }
            else if (file.subFileCount > 0) {
                // 标记有子文档但未展开
                node.children = [];
            }
            nodes.push(node);
        }
        return nodes;
    }
    /**
     * 批量创建文档
     */
    async createDocuments(items) {
        requireNonEmptyArray(items, 'items');
        const results = await Promise.all(items.map(async (item) => {
            try {
                const id = await this.createDocument(item.notebookId, item.path, item.markdown);
                return { id, success: true };
            }
            catch (error) {
                return { success: false, error: error instanceof Error ? error.message : String(error) };
            }
        }));
        const success = results.filter((r) => r.success).length;
        return {
            total: results.length,
            success,
            failed: results.length - success,
            results,
        };
    }
    /**
     * 通过路径批量移动文档
     */
    async moveDocumentsByPath(fromPaths, toNotebookId, toPath) {
        requireNonEmptyArray(fromPaths, 'fromPaths');
        requireNonEmptyString(toNotebookId, 'toNotebookId');
        requireNonEmptyString(toPath, 'toPath');
        const response = await this.client.request('/api/filetree/moveDocs', {
            fromPaths,
            toNotebook: toNotebookId,
            toPath,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to move documents: ${response.msg}`);
        }
    }
    /**
     * 通过 ID 重命名文档
     */
    async renameDocumentById(documentId, newName) {
        requireNonEmptyString(documentId, 'documentId');
        requireNonEmptyString(newName, 'newName');
        const response = await this.client.request('/api/filetree/renameDocByID', {
            id: documentId,
            title: newName,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to rename document by ID: ${response.msg}`);
        }
    }
    /**
     * 通过 ID 删除文档
     */
    async removeDocumentById(documentId) {
        requireNonEmptyString(documentId, 'documentId');
        const response = await this.client.request('/api/filetree/removeDocByID', {
            id: documentId,
        });
        if (response.code !== 0) {
            throw new Error(`Failed to remove document by ID: ${response.msg}`);
        }
    }
    /**
     * 根据路径列出子文档
     */
    async listDocsByPath(notebookId, path) {
        requireNonEmptyString(notebookId, 'notebookId');
        requireNonEmptyString(path, 'path');
        const response = await this.client.request('/api/filetree/listDocsByPath', {
            notebook: notebookId,
            path,
            sort: 15,
            maxListCount: 0,
        });
        return response.data || { files: [] };
    }
}
//# sourceMappingURL=document.js.map