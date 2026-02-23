# Tailwind CSS 使用檢查報告

檢查日期: 2026-02-23

## 執行摘要

專案中存在**大量未使用 Tailwind CSS** 的情況，主要問題集中在：

1. ✅ **沒有 CSS Modules** - 沒有發現任何 CSS modules
2. ⚠️ **globals.css 中有傳統 CSS 類別** - 應轉換為 Tailwind
3. ❌ **大量組件使用 inline styles** - 198 個檔案使用 `style={{...}}`
4. ⚠️ **響應式設計不完整** - 許多組件缺少手機版適配

---

## 1. globals.css 傳統 CSS 類別

**檔案**: `src/styles/globals.css`

### 需要轉換的類別

```css
/* ❌ 應該移除，改用 Tailwind */
.tool-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.tool-textarea {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  /* ... */
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  /* ... */
}

.btn-secondary {
  /* ... */
}
```

### 建議替換方案

| 原始類別 | Tailwind 替代 |
|---------|--------------|
| `.tool-container` | `max-w-4xl mx-auto px-4 py-8` |
| `.tool-textarea` | `w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10` |
| `.btn-primary` | `inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)]` |
| `.btn-secondary` | `inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]` |

---

## 2. Inline Styles 問題

### 高優先級組件（核心 UI）

這些組件在整個專案中被廣泛使用，應優先轉換：

#### 2.1 ToolCard.tsx
**檔案**: `src/components/shared/ToolCard.tsx`

```typescript
// ❌ 目前 - 使用大量 inline styles
<Link
  href={href}
  style={{
    display: 'block',
    padding: '1.25rem',
    borderRadius: '0.75rem',
    border: '1px solid var(--color-border)',
    // ... 更多 styles
  }}
>

// ✅ 建議 - 使用 Tailwind
<Link
  href={href}
  className="block p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] no-underline text-[var(--color-text)] transition-all hover:border-[var(--color-primary)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)] relative"
>
```

#### 2.2 Navbar.tsx
**檔案**: `src/components/layout/Navbar.tsx`

```typescript
// ❌ 目前
<nav style={{
  borderBottom: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg)',
  position: 'sticky',
  top: 0,
  zIndex: 50,
}}>

// ✅ 建議
<nav className="border-b border-[var(--color-border)] bg-[var(--color-bg)] sticky top-0 z-50">
```

#### 2.3 Footer.tsx
**檔案**: `src/components/layout/Footer.tsx`

```typescript
// ❌ 目前
<footer style={{
  borderTop: '1px solid var(--color-border)',
  padding: '2rem 1rem',
  marginTop: '4rem',
  textAlign: 'center',
  color: 'var(--color-text-secondary)',
  fontSize: '0.875rem',
}}>

// ✅ 建議
<footer className="border-t border-[var(--color-border)] px-4 py-8 mt-16 text-center text-[var(--color-text-secondary)] text-sm">
```

#### 2.4 SearchBar.tsx
**檔案**: `src/components/search/SearchBar.tsx`

- 使用大量 inline styles 定義三種 variant
- 建議使用 Tailwind 的 `@apply` 或直接使用條件類別

#### 2.5 RelatedTools.tsx
**檔案**: `src/components/shared/RelatedTools.tsx`

```typescript
// ❌ 使用 inline grid styles
style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '0.75rem',
}}

// ✅ 建議
className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3"
```

### 中優先級組件（工具組件）

以下工具組件大量使用 inline styles，需要逐步轉換：

- `JsonFormatter.tsx` - 使用 `style={{}}` 定義 flex 布局
- `PasswordGenerator.tsx` - 使用 inline width, flex 屬性
- `TimezoneConverter.tsx` - 複雜的 grid 布局都用 inline styles
- `ColorConverter.tsx` - 大量 flex 和 grid inline styles
- `JwtDecoder.tsx` - grid 布局
- `YamlJsonConverter.tsx` - grid 布局
- `DiffChecker.tsx` - grid 布局
- `Base64Tool.tsx` - grid 布局

**完整列表**: 約 150+ 工具組件都有類似問題

---

## 3. 響應式設計問題

### 3.1 固定 Grid 欄位問題

很多組件使用固定的 grid columns，**在手機版會破版**：

```typescript
// ❌ 手機版會破版 - 2 欄在小螢幕太擠
style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}

// ❌ 手機版會破版 - 3 欄在手機根本顯示不了
style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}

// ❌ 手機版會破版 - 4 欄
style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}
```

**受影響的檔案** (部分列表):
- `YamlJsonConverter.tsx` - 固定 2 欄
- `TwIncomeTaxBrackets.tsx` - 固定 3 欄
- `PunycodeConverter.tsx` - 固定 3 欄
- `JwtDecoder.tsx` - 固定 2 欄
- `TimezoneConverter.tsx` - 多處固定 2 欄和 3 欄
- `JsonPathFinder.tsx` - 固定 2 欄
- `Base64Tool.tsx` - 固定 2 欄
- `DiffChecker.tsx` - 固定 2 欄
- `LatexEditor.tsx` - 固定 2 欄

**建議修正**:
```typescript
// ✅ 正確的響應式 grid
className="grid grid-cols-1 md:grid-cols-2 gap-4"  // 手機 1 欄，桌面 2 欄
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"  // 手機 1 欄，平板 2 欄，桌面 3 欄
```

### 3.2 固定寬度問題

```typescript
// ❌ 固定寬度，手機版會超出螢幕
style={{ maxWidth: '300px' }}
style={{ width: '200px' }}
style={{ minWidth: '140px' }}

// ✅ 使用響應式寬度
className="w-full md:max-w-[300px]"
className="w-full sm:w-[200px]"
```

### 3.3 良好範例

**ToolGrid.tsx** ✅ - 這個組件正確使用了 Tailwind 響應式類別：

```typescript
const gridClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}
```

**首頁** ✅ - 正確使用響應式：
```typescript
<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
<div className="hidden md:block flex-1 max-w-[500px]">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
```

---

## 4. 檢查統計

| 項目 | 數量 | 狀態 |
|------|------|------|
| CSS 檔案 | 1 | ⚠️ 需要清理 |
| CSS Modules | 0 | ✅ 無問題 |
| 使用 inline styles 的檔案 | 198 | ❌ 需要轉換 |
| 核心布局組件 | 5 | ❌ 高優先級 |
| 工具組件 | 150+ | ❌ 中優先級 |
| 響應式問題組件 | 50+ | ⚠️ 需要修正 |

---

## 5. 修正優先級建議

### 🔴 P0 - 立即修正 (影響全站)

1. **globals.css** - 移除 4 個傳統 CSS 類別，改用 Tailwind
2. **ToolCard.tsx** - 每個頁面都用到，影響最大
3. **Navbar.tsx** - 全站導航欄
4. **Footer.tsx** - 全站頁尾

### 🟡 P1 - 高優先級 (核心功能)

5. **SearchBar.tsx** - 搜尋功能
6. **RelatedTools.tsx** - 相關工具推薦
7. **SearchSuggestions.tsx** - 搜尋建議

### 🟢 P2 - 中優先級 (逐步改善)

8. 熱門工具組件 (依使用頻率排序)
   - JsonFormatter.tsx
   - PasswordGenerator.tsx
   - QrGenerator.tsx
   - ColorConverter.tsx
   - 等等...

### 🔵 P3 - 低優先級

9. 其他 100+ 工具組件 - 可以批量處理或漸進式改善

---

## 6. 手機版破版風險評估

### 高風險組件 (確定會破版)

1. **所有使用固定 2/3/4 欄 grid 的工具組件** - 約 50+ 個
   - 在螢幕寬度 < 640px 時會嚴重擠壓
   - 文字可能會換行或截斷
   - 輸入框會太小無法使用

2. **使用固定寬度的組件**
   - 如 `maxWidth: '300px'` 的輸入框在小螢幕可能太寬
   - 如 `width: '200px'` 的固定寬度元素

3. **表格類工具**
   - `TwIncomeTaxBrackets.tsx` - 固定 3 欄表格
   - `ShoeSizeConverter.tsx` - 表格過寬
   - 其他包含大型表格的工具

### 中風險組件

1. **長文字組件**
   - 沒有正確使用 `overflow-x-auto` 或 `text-ellipsis`
   - 可能造成水平滾動

2. **Flex 布局沒有 flex-wrap**
   - 在小螢幕可能會超出邊界

---

## 7. 建議修正流程

### Step 1: 建立 Tailwind 組件庫 (1-2 天)

在 `src/components/ui/` 建立可重用組件：

```typescript
// Button.tsx
export const Button = ({ variant, children, ...props }) => {
  const baseClasses = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium cursor-pointer transition-colors"
  const variantClasses = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
    secondary: "bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)]",
  }
  return <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>{children}</button>
}

// Textarea.tsx
export const Textarea = ({ ...props }) => (
  <textarea
    className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10"
    {...props}
  />
)
```

### Step 2: 修正 globals.css (30 分鐘)

移除 `.tool-container`, `.tool-textarea`, `.btn-primary`, `.btn-secondary`

### Step 3: 修正核心組件 (2-3 天)

依序修正：
1. ToolCard.tsx
2. Navbar.tsx
3. Footer.tsx
4. SearchBar.tsx
5. RelatedTools.tsx

### Step 4: 批量修正工具組件 (1-2 週)

使用 find & replace 配合手動調整

### Step 5: 手機版測試 (持續)

每修正一個組件都要測試：
- Chrome DevTools 手機模擬器
- 實機測試 (iPhone, Android)
- 測試寬度: 320px, 375px, 414px, 768px, 1024px

---

## 8. 自動化工具建議

可以考慮使用以下工具加速轉換：

1. **ESLint Plugin** - 檢測 inline styles
2. **Codemod** - 自動轉換簡單的 style prop
3. **正則表達式批量替換** - 處理重複模式

---

## 9. 結論

### 現況

- ❌ 專案中 **大量使用 inline styles**，違反 Tailwind CSS 優先原則
- ⚠️ **手機版響應式設計不完整**，存在多處破版風險
- ⚠️ **globals.css 有傳統 CSS 類別**，應該移除

### 建議

1. **立即開始 P0 修正** - 核心組件優先
2. **建立組件庫** - 避免重複勞動
3. **逐步遷移** - 不要一次改太多，以免引入 bug
4. **加強測試** - 每次修改都要測試手機版

### 預估工作量

- P0 (核心組件): **3-5 天**
- P1 (核心功能): **2-3 天**
- P2 (工具組件): **1-2 週**
- 總計: **約 3-4 週**

---

生成時間: 2026-02-23
檢查工具: Claude Code (Sonnet 4.5)
