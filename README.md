# SiYuan MCP Server

**English** | [繁體中文](./README.zh-TW.md)

A SiYuan MCP server maintained by PurpleLiu. It connects AI tools to [SiYuan Note](https://github.com/siyuan-note/siyuan) through the **Model Context Protocol (MCP)** for safe search, reading, creation, and organization of your notes.

Compatible with Claude Desktop, Cursor, OpenClaw, and any MCP-compatible client.

## Features

- **66 tools** covering search, documents, blocks, notebooks, daily notes, snapshots, and tags
- **Unified search** — content, filename, tag, or combined filters
- **Document tree** — browse notebook hierarchy by depth
- **Daily notes** — auto-create today’s note if it doesn’t exist
- **Snapshot management** — create/list/rollback
- **Stdio & HTTP** transports
- **TypeScript** full type definitions

## Quick Start

### Install

```bash
git clone https://github.com/PurpleLiu/siyuan-mcp.git
cd siyuan-mcp
npm install && npm run build
npm install -g .
```

### Get Your SiYuan API Token

SiYuan → Settings → About → API Token

### Environment Variables (optional)

```bash
export SIYUAN_TOKEN=your-token
export SIYUAN_BASE_URL=http://127.0.0.1:6806
export SIYUAN_VERBOSE=1   # optional
```

### Configure Your MCP Client

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

Config locations:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

## Tools

| Category | Tool | Description |
|------|------|------|
| 🔍 Search | `unified_search` | Search by content/filename/tag or combined filters |
| 📄 Documents | `get_document_content` | Read document content (paginated) |
| | `create_document` | Create a new document |
| | `append_to_document` | Append content |
| | `update_document` | Replace content |
| | `remove_document` | Remove a document |
| | `rename_document` | Rename a document |
| | `move_documents` | Move documents |
| | `get_document_tree` | Get document tree by depth |
| | `get_human_path_by_id` | Human-readable path by document ID |
| | `get_human_path_by_path` | Human-readable path by storage path |
| | `get_path_by_id` | Storage path by document ID |
| | `get_ids_by_hpath` | Document IDs by human-readable path |
| 📅 Daily Notes | `append_to_daily_note` | Append to today’s note |
| 📚 Notebooks | `list_notebooks` | List notebooks |
| | `get_recently_updated_documents` | Recently updated documents |
| | `create_notebook` | Create a notebook |
| | `open_notebook` | Open a notebook |
| | `close_notebook` | Close a notebook |
| | `rename_notebook` | Rename a notebook |
| | `remove_notebook` | Remove a notebook |
| | `get_notebook_conf` | Get notebook configuration |
| | `set_notebook_conf` | Update notebook configuration |
| 🧱 Blocks | `delete_block` | Delete a block |
| | `move_block` | Move a block |
| | `fold_block` | Fold a block |
| | `unfold_block` | Unfold a block |
| | `get_child_blocks` | Get child blocks |
| | `transfer_block_ref` | Transfer block reference |
| 🧱 Blocks | `delete_block` | Delete a block |
| | `move_block` | Move a block |
| | `fold_block` | Fold a block |
| | `unfold_block` | Unfold a block |
| | `get_child_blocks` | Get child blocks |
| | `transfer_block_ref` | Transfer block reference |
| 🧩 Attributes | `get_block_attrs` | Get block attributes |
| | `set_block_attrs` | Set block attributes |
| 🧮 SQL | `execute_sql` | Execute SQL query |
| | `flush_transaction` | Flush SQL transaction |
| 🧾 Templates | `render_template` | Render template by ID |
| | `render_sprig` | Render sprig template |
| 📦 Assets | `upload_asset_base64` | Upload asset (base64) |
| 📁 Files | `get_file` | Get file by path |
| | `put_file` | Write file by path |
| | `remove_file` | Remove file by path |
| | `rename_file` | Rename/move file |
| | `list_files` | List files under path |
| 📤 Export | `export_markdown` | Export markdown |
| | `export_files` | Export files/folders |
| 🔔 Notification | `push_message` | Push message |
| | `push_error_message` | Push error message |
| 🖥️ System | `get_boot_progress` | Get boot progress |
| | `get_system_version` | Get system version |
| | `get_system_time` | Get system time |
| 📸 Snapshots | `create_snapshot` | Create snapshot |
| | `list_snapshots` | List snapshots |
| | `rollback_to_snapshot` | Rollback snapshot |
| 🏷️ Tags | `list_all_tags` | List all tags (prefix/depth supported) |
| | `batch_replace_tag` | Batch replace/remove tags |

## Usage Examples

```
"List all notebooks"
"Search notes about kubernetes"
"Show the Work notebook tree with 3 levels"
"Create a meeting note under Projects/2026"
"Append today’s standup notes to my daily note"
"Move these three documents into Archive"
"What tags do I have under 'project/'?"
"Get block attributes for this note"
"Set a custom attribute on a block"
"Run an SQL query to find recently updated notes"
"Render a template with variables"
"Upload an image asset"
"Export this document to markdown"
"List files under /data"
"Push a notification message"
"Check SiYuan system version"
```

## Using as a Library

```ts
import { createSiyuanTools } from '@purpleliu/siyuan-mcp';

const siyuan = createSiyuanTools('http://127.0.0.1:6806', 'your-token');

const notebooks = await siyuan.listNotebooks();
const content = await siyuan.getFileContent(documentId);
const results = await siyuan.search.query(
  "SELECT * FROM blocks WHERE content LIKE '%keyword%'"
);
```

## Development

```bash
npm install          # Install dependencies
npm run build        # Build
npm run watch        # Watch mode
npm run lint         # Lint
npm run format       # Format

# Manual testing
npm run mcp:stdio -- --token YOUR_TOKEN --baseUrl http://127.0.0.1:6806
npm run mcp:http -- --token YOUR_TOKEN --port 3000 --baseUrl http://127.0.0.1:6806
```

## Project Structure

```
├── src/               # Core library
│   ├── api/           # SiYuan API client
│   ├── types/         # TypeScript types
│   └── utils/         # Helpers
├── mcp-server/        # MCP server
│   ├── bin/           # CLI entry (stdio/http)
│   ├── core/          # Server core & registry
│   └── handlers/      # Tool handlers
└── dist/              # Build output
```

## License

[Apache-2.0](./LICENSE)
