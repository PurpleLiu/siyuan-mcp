/**
 * 导出所有工具处理器
 */
export { BaseToolHandler } from './base.js';
// 搜索相关
export * from './search.js';
// 文档相关
export * from './document.js';
// 笔记本相关
export * from './notebook.js';
// 块相关
export * from './block.js';
// 属性相关
export * from './attributes.js';
// SQL 相关
export * from './sql.js';
// 模板相关
export * from './templates.js';
// 资源相关
export * from './assets.js';
// 文件相关
export * from './file.js';
// 导出相关
export * from './export.js';
// 通知相关
export * from './notification.js';
// 系统相关
export * from './system.js';
// 快照相关
export * from './snapshot.js';
// 标签相关
export * from './tag.js';
import { UnifiedSearchHandler, } from './search.js';
import { GetDocumentContentHandler, CreateDocumentHandler, AppendToDocumentHandler, UpdateDocumentHandler, AppendToDailyNoteHandler, MoveDocumentsHandler, GetDocumentTreeHandler, RemoveDocumentHandler, RenameDocumentHandler, GetHumanPathByIdHandler, GetHumanPathByPathHandler, GetPathByIdHandler, GetIdsByHPathHandler, } from './document.js';
import { ListNotebooksHandler, GetRecentlyUpdatedDocumentsHandler, CreateNotebookHandler, OpenNotebookHandler, CloseNotebookHandler, RenameNotebookHandler, RemoveNotebookHandler, GetNotebookConfHandler, SetNotebookConfHandler, } from './notebook.js';
import { DeleteBlockHandler, MoveBlockHandler, FoldBlockHandler, UnfoldBlockHandler, GetChildBlocksHandler, TransferBlockRefHandler, } from './block.js';
import { GetBlockAttrsHandler, SetBlockAttrsHandler, } from './attributes.js';
import { ExecuteSqlHandler, FlushTransactionHandler, } from './sql.js';
import { RenderTemplateHandler, RenderSprigHandler, } from './templates.js';
import { UploadAssetBase64Handler, } from './assets.js';
import { GetFileHandler, PutFileHandler, RemoveFileHandler, RenameFileHandler, ListFilesHandler, } from './file.js';
import { ExportMarkdownHandler, ExportFilesHandler, } from './export.js';
import { PushMessageHandler, PushErrorHandler, } from './notification.js';
import { GetBootProgressHandler, GetSystemVersionHandler, GetSystemTimeHandler, } from './system.js';
import { CreateSnapshotHandler, ListSnapshotsHandler, RollbackSnapshotHandler, } from './snapshot.js';
import { ListAllTagsHandler, ReplaceTagHandler, } from './tag.js';
// 工厂函数：创建所有处理器实例
export function createAllHandlers() {
    return [
        // 搜索
        new UnifiedSearchHandler(), // 统一搜索
        // 文档
        new GetDocumentContentHandler(),
        new CreateDocumentHandler(),
        new AppendToDocumentHandler(),
        new UpdateDocumentHandler(),
        new AppendToDailyNoteHandler(),
        new MoveDocumentsHandler(),
        new GetDocumentTreeHandler(),
        new RemoveDocumentHandler(),
        new RenameDocumentHandler(),
        new GetHumanPathByIdHandler(),
        new GetHumanPathByPathHandler(),
        new GetPathByIdHandler(),
        new GetIdsByHPathHandler(),
        // 笔记本
        new ListNotebooksHandler(),
        new GetRecentlyUpdatedDocumentsHandler(),
        new CreateNotebookHandler(),
        new OpenNotebookHandler(),
        new CloseNotebookHandler(),
        new RenameNotebookHandler(),
        new RemoveNotebookHandler(),
        new GetNotebookConfHandler(),
        new SetNotebookConfHandler(),
        // 块
        new DeleteBlockHandler(),
        new MoveBlockHandler(),
        new FoldBlockHandler(),
        new UnfoldBlockHandler(),
        new GetChildBlocksHandler(),
        new TransferBlockRefHandler(),
        // 属性
        new GetBlockAttrsHandler(),
        new SetBlockAttrsHandler(),
        // SQL
        new ExecuteSqlHandler(),
        new FlushTransactionHandler(),
        // 模板
        new RenderTemplateHandler(),
        new RenderSprigHandler(),
        // 资源
        new UploadAssetBase64Handler(),
        // 文件
        new GetFileHandler(),
        new PutFileHandler(),
        new RemoveFileHandler(),
        new RenameFileHandler(),
        new ListFilesHandler(),
        // 导出
        new ExportMarkdownHandler(),
        new ExportFilesHandler(),
        // 通知
        new PushMessageHandler(),
        new PushErrorHandler(),
        // 系统
        new GetBootProgressHandler(),
        new GetSystemVersionHandler(),
        new GetSystemTimeHandler(),
        // 快照
        new CreateSnapshotHandler(),
        new ListSnapshotsHandler(),
        new RollbackSnapshotHandler(),
        // 标签
        new ListAllTagsHandler(),
        new ReplaceTagHandler(),
    ];
}
//# sourceMappingURL=index.js.map