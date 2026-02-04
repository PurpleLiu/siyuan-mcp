# 測試說明

## 前置條件

在執行測試前，請完成以下設定：

1. **設定環境變數**

   複製 `.env.example` 為 `.env`：
   ```bash
   cp .env.example .env
   ```

   編輯 `.env`：
   ```bash
   # SiYuan API Base URL (預設: http://127.0.0.1:6806)
   SIYUAN_BASE_URL=http://127.0.0.1:6806

   # SiYuan API Token (設定 → 關於 → API Token)
   SIYUAN_TOKEN=your-api-token-here

   # 測試筆記本名稱 (預設: 99測試)
   SIYUAN_TEST_NOTEBOOK=99測試
   ```

2. **啟動 SiYuan**
   - 預設位置: `http://127.0.0.1:6806`
   - 如有不同埠號，請在 `.env` 中修改 `SIYUAN_BASE_URL`

3. **建立測試筆記本**
   - 在 SiYuan 建立名為 **"99測試"** 的筆記本（或 `.env` 指定名稱）
   - 測試資料僅會寫入這個筆記本

## 執行測試

```bash
npm test
# 或
npm run test:watch
```

## 測試涵蓋

共覆蓋 15 個 MCP 工具：

### 🔍 搜尋 (1個)
- `unified_search`

### 📄 文件操作 (6個)
- `get_document_content`
- `create_document`
- `append_to_document`
- `update_document`
- `append_to_daily_note`
- `move_documents`
- `get_document_tree`

### 📚 筆記本 (2個)
- `list_notebooks`
- `get_recently_updated_documents`

### 📸 快照 (3個)
- `create_snapshot`
- `list_snapshots`
- `rollback_to_snapshot`

### 🏷️ 標籤 (2個)
- `list_all_tags`
- `batch_replace_tag`

## 測試資料

測試會在「99測試」筆記本中建立：

- 測試文件（`test-doc-` 開頭）
- 測試標籤（`test-tag-` 開頭）
- 今日筆記條目
- 快照

> 注意：標籤替換測試會保留測試標籤，方便手動驗證。

## 常見問題

### SIYUAN_TOKEN is not set
- 確認 `.env` 已建立
- 檢查 `SIYUAN_TOKEN` 是否正確

### Test notebook not found
- 請建立測試筆記本
- 或調整 `SIYUAN_TEST_NOTEBOOK`

### 連線失敗
- 確認 SiYuan 已啟動
- 檢查 `SIYUAN_BASE_URL` / `SIYUAN_TOKEN`

### 測試超時
- 增加 `jest.config.js` 的 `testTimeout`

## 清理測試資料

可直接刪除「99測試」筆記本，或清掉其中測試文件與標籤。
