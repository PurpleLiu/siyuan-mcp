# SiYuan MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that connects AI assistants to [SiYuan Note](https://github.com/siyuan-note/siyuan). Search, read, create, and organize your notes through natural language.

Works with Claude Desktop, Cursor, OpenClaw, and any MCP-compatible client.

## Features

- **15 tools** covering search, documents, notebooks, daily notes, snapshots, and tags
- **Unified search** — content, filename, tag, or any combination
- **Document tree** — browse your notebook hierarchy with configurable depth
- **Daily notes** — auto-creates today's note if it doesn't exist
- **Snapshot management** — backup and restore your data
- **Stdio & HTTP transports** — flexible integration options
- **TypeScript** — full type definitions included

## Quick Start

### Install

```bash
git clone https://github.com/PurpleLiu/siyuan-mcp.git
cd siyuan-mcp
npm install && npm run build
npm install -g .
```

### Get Your SiYuan API Token

1. Open SiYuan Note → Settings → About → API Token
2. Copy the token

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

Config file location:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

## Tools

| Category | Tool | Description |
|----------|------|-------------|
| 🔍 Search | `unified_search` | Search by content, filename, tag, or combination |
| 📄 Documents | `get_document_content` | Read note content (markdown, with pagination) |
| | `create_document` | Create a new note |
| | `append_to_document` | Append content to a note |
| | `update_document` | Replace note content |
| | `move_documents` | Move notes to a new location |
| | `get_document_tree` | Browse notebook structure by depth |
| 📅 Daily Notes | `append_to_daily_note` | Append to today's daily note |
| 📚 Notebooks | `list_notebooks` | List all notebooks |
| | `get_recently_updated_documents` | Recently modified notes |
| 📸 Snapshots | `create_snapshot` | Create a backup snapshot |
| | `list_snapshots` | List available snapshots |
| | `rollback_to_snapshot` | Restore from snapshot |
| 🏷️ Tags | `list_all_tags` | List all tags (with prefix/depth filtering) |
| | `batch_replace_tag` | Rename or remove tags in bulk |

## Usage Examples

Just talk to your AI assistant:

```
"List all my notebooks"
"Search for notes about kubernetes"
"Show me the tree structure of my Work notebook, 3 levels deep"
"Create a meeting note under Projects/2026"
"Append today's standup notes to my daily note"
"Move these three documents into the Archive notebook"
"What tags do I have under 'project/'?"
```

## Using as a Library

```typescript
import { createSiyuanTools } from '@purpleliu/siyuan-mcp';

const siyuan = createSiyuanTools('http://127.0.0.1:6806', 'your-token');

const notebooks = await siyuan.listNotebooks();
const content = await siyuan.getFileContent(documentId);
const results = await siyuan.search.query("SELECT * FROM blocks WHERE content LIKE '%keyword%'");
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
│   ├── api/           # SiYuan API clients
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helpers
├── mcp-server/        # MCP server
│   ├── bin/           # CLI entry points (stdio/http)
│   ├── core/          # Server core & registry
│   └── handlers/      # Tool handler implementations
└── dist/              # Compiled output
```

## Acknowledgments

Originally based on [@porkll/siyuan-mcp](https://github.com/porkll/siyuan-mcp) (Apache 2.0). This version includes bug fixes (notably the document tree query) and is independently maintained.

## License

[Apache-2.0](./LICENSE)
