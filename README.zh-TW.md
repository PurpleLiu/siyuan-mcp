# SiYuan MCP Server

[English](./README.md) | **繁體中文**

PurpleLiu 維護的 SiYuan MCP 伺服器，讓 AI 工具透過 **Model Context Protocol (MCP)** 連接 [SiYuan Note](https://github.com/siyuan-note/siyuan)，安全地搜尋、讀取、建立與整理你的筆記。

相容 Claude Desktop、Cursor、OpenClaw 以及所有 MCP-compatible 客戶端。

## 功能亮點

- **15 個工具** 覆蓋搜尋、文件、筆記本、今日筆記、快照與標籤
- **統一搜尋** — 內容、檔名、標籤與組合條件
- **文件樹** — 以深度瀏覽筆記本階層
- **今日筆記** — 不存在即自動建立
- **快照管理** — 建立/列出/回滾
- **Stdio & HTTP** 兩種傳輸模式
- **TypeScript** 完整型別

## 快速開始

### 安裝

```bash
git clone https://github.com/PurpleLiu/siyuan-mcp.git
cd siyuan-mcp
npm install && npm run build
npm install -g .
```

### 取得 SiYuan API Token

SiYuan → 設定 → 關於 → API Token

### 環境變數（選用）

```bash
export SIYUAN_TOKEN=your-token
export SIYUAN_BASE_URL=http://127.0.0.1:6806
export SIYUAN_VERBOSE=1   # optional
```

### 設定 MCP Client

**Cursor** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "siyuan-mcp",
      "args": ["stdio", "--token", "YOUR_TOKEN", "--baseUrl", "http://127.0.0.1:6806"]
    }
  }
}
```

**Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "siyuan-mcp",
      "args": ["stdio", "--token", "YOUR_TOKEN", "--baseUrl", "http://127.0.0.1:6806"]
    }
  }
}
```

Config 路徑：
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

## 工具列表

| 分類 | Tool | 說明 |
|------|------|------|
| 🔍 Search | `unified_search` | 以內容/檔名/標籤或組合搜尋 |
| 📄 Documents | `get_document_content` | 讀取文件內容（分頁） |
| | `create_document` | 建立新文件 |
| | `append_to_document` | 追加內容 |
| | `update_document` | 覆寫內容 |
| | `remove_document` | 刪除文件 |
| | `rename_document` | 重新命名文件 |
| | `move_documents` | 移動文件 |
| | `get_document_tree` | 依深度取得文件樹 |
| | `get_human_path_by_id` | 以文件 ID 取得人類可讀路徑 |
| | `get_human_path_by_path` | 以存儲路徑取得人類可讀路徑 |
| | `get_path_by_id` | 以文件 ID 取得存儲路徑 |
| | `get_ids_by_hpath` | 以人類可讀路徑取得文件 ID |
| 📅 Daily Notes | `append_to_daily_note` | 追加到今日筆記 |
| 📚 Notebooks | `list_notebooks` | 列出筆記本 |
| | `get_recently_updated_documents` | 最近更新文件 |
| | `create_notebook` | 建立筆記本 |
| | `open_notebook` | 開啟筆記本 |
| | `close_notebook` | 關閉筆記本 |
| | `rename_notebook` | 重新命名筆記本 |
| | `remove_notebook` | 刪除筆記本 |
| | `get_notebook_conf` | 取得筆記本設定 |
| | `set_notebook_conf` | 更新筆記本設定 |
| 🧱 Blocks | `delete_block` | 刪除區塊 |
| | `move_block` | 移動區塊 |
| | `fold_block` | 摺疊區塊 |
| | `unfold_block` | 展開區塊 |
| | `get_child_blocks` | 取得子區塊 |
| | `transfer_block_ref` | 轉移區塊引用 |
| 🧱 Blocks | `delete_block` | 刪除區塊 |
| | `move_block` | 移動區塊 |
| | `fold_block` | 摺疊區塊 |
| | `unfold_block` | 展開區塊 |
| | `get_child_blocks` | 取得子區塊 |
| | `transfer_block_ref` | 轉移區塊引用 |
| 🧩 Attributes | `get_block_attrs` | 取得區塊屬性 |
| | `set_block_attrs` | 設定區塊屬性 |
| 🧮 SQL | `execute_sql` | 執行 SQL 查詢 |
| | `flush_transaction` | 送出 SQL 交易 |
| 🧾 Templates | `render_template` | 以模板 ID 渲染 |
| | `render_sprig` | 渲染 Sprig 模板 |
| 📦 Assets | `upload_asset_base64` | 上傳資源（base64） |
| 📁 Files | `get_file` | 取得檔案 |
| | `put_file` | 寫入檔案 |
| | `remove_file` | 刪除檔案 |
| | `rename_file` | 重新命名/移動檔案 |
| | `list_files` | 列出路徑下檔案 |
| 📤 Export | `export_markdown` | 匯出 Markdown |
| | `export_files` | 匯出檔案/資料夾 |
| 🔔 Notification | `push_message` | 推播訊息 |
| | `push_error_message` | 推播錯誤訊息 |
| 🖥️ System | `get_boot_progress` | 取得啟動進度 |
| | `get_system_version` | 取得系統版本 |
| | `get_system_time` | 取得系統時間 |
| 📸 Snapshots | `create_snapshot` | 建立快照 |
| | `list_snapshots` | 列出快照 |
| | `rollback_to_snapshot` | 回滾快照 |
| 🏷️ Tags | `list_all_tags` | 列出所有標籤（支援前綴/深度） |
| | `batch_replace_tag` | 批次替換或移除標籤 |

## 使用示例

```
"列出所有筆記本"
"搜尋與 kubernetes 相關的筆記"
"顯示 Work 筆記本的 3 層文件樹"
"在 Projects/2026 建立一份會議記錄"
"把今天的 standup 記錄加入今日筆記"
"把這三篇文件移到 Archive"
"有哪些 project/ 開頭的標籤？"
"取得這份筆記的區塊屬性"
"為區塊設定自訂屬性"
"用 SQL 查詢最近更新的筆記"
"以變數渲染模板"
"上傳圖片資源"
"匯出這份筆記為 Markdown"
"列出 /data 底下的檔案"
"推播一則通知"
"檢查 SiYuan 系統版本"
```

## 作為程式庫使用

```ts
import { createSiyuanTools } from '@purpleliu/siyuan-mcp';

const siyuan = createSiyuanTools('http://127.0.0.1:6806', 'your-token');

const notebooks = await siyuan.listNotebooks();
const content = await siyuan.getFileContent(documentId);
const results = await siyuan.search.query(
  "SELECT * FROM blocks WHERE content LIKE '%keyword%'"
);
```

## 開發

```bash
npm install          # 安裝依賴
npm run build        # 編譯
npm run watch        # 監看編譯
npm run lint         # Lint
npm run format       # 格式化

# 手動測試
npm run mcp:stdio -- --token YOUR_TOKEN --baseUrl http://127.0.0.1:6806
npm run mcp:http -- --token YOUR_TOKEN --port 3000 --baseUrl http://127.0.0.1:6806
```

## 專案結構

```
├── src/               # 核心 library
│   ├── api/           # SiYuan API client
│   ├── types/         # TypeScript 型別
│   └── utils/         # 工具函式
├── mcp-server/        # MCP 伺服器
│   ├── bin/           # CLI 入口 (stdio/http)
│   ├── core/          # Server core & registry
│   └── handlers/      # Tool handlers
└── dist/              # 編譯輸出
```

## License

[Apache-2.0](./LICENSE)
