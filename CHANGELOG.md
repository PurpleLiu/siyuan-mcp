# Changelog

## [1.1.0] - 2026-02-05

### Added
- Core notebook tools: open/close/rename/remove, get/set config
- Core document tools: remove/rename, path helpers (human path + storage path)
- Core block tools: delete/move/fold/unfold/get child blocks/transfer ref
- CLI env support: `SIYUAN_TOKEN`, `SIYUAN_BASE_URL`, `SIYUAN_VERBOSE`
- Verbose/debug logging for requests and responses

### Changed
- Unified error handling via `SiyuanApiError`
- MCP usage guide updated to reflect current tools

## [1.0.0] - 2026-02-05

### Added
- Initial public release
- 15 MCP tools (search/documents/notebooks/daily notes/snapshots/tags)
- Stdio and HTTP transports
- TypeScript types and API wrappers
