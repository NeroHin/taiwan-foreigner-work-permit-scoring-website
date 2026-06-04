# 前端設計方案與實施計畫

> 規則版本依據：勞動部勞動力發展署外國人在臺工作服務網（113-07-01 更新）
> 文件版本：v1.0 | 最後更新：2026-06-04

---

## 一、技術選型

| 層級 | 選用 | 理由 |
|------|------|------|
| 框架 | **Next.js 14+ (App Router)** | 支援靜態匯出（SSG）無需後端、內建路由、SEO 友善、React 生態系成熟 |
| 語言 | **TypeScript** | 評點規則複雜，型別安全可避免計算錯誤 |
| 樣式 | **Tailwind CSS 3** | 行動優先設計、開發快速、bundle 小 |
| 元件庫 | **shadcn/ui** (基於 Radix) | 無障礙合規、可客製化、不綁定特定設計語言 |
| 狀態管理 | **Zustand** | 輕量、跨步驟表單狀態保存、支援 persist 中間斷續 |
| 國際化 | **next-intl**（v2 啟用） | 未來需繁中/英/越南文/印尼文 |
| PDF 匯出 | **@react-pdf/renderer**（v2 啟用） | 結果頁下載 |
| 部署 | **Vercel / GitHub Pages（靜態匯出）** | 零後端成本、CDN 加速 |

### 替代方案比較

| 方案 | 優點 | 缺點 | 結論 |
|------|------|------|------|
| Nuxt.js (Vue) | 同樣支援 SSG | Vue 生態元件庫較少、shadcn 無官方 Vue 版 | 次選 |
| Vite + React SPA | 更輕量 | 無 SSR/SSG、SEO 較弱 | 不適合需被搜尋到的工具網站 |
| Astro | 極快靜態頁 | 互動邏輯需 island，計算器是全互動場景 | 不適合 |

---

## 二、頁面拆分與路由

```
/                     → 首頁（直接進入計算 CTA）
/calculator           → 計算器主頁（多步驟 wizard）
/calculator/result    → 結果頁（可獨立分享連結）
/about                → 關於本工具 + 法律聲明
/faq                  → 常見問題
```

### 頁面職責

| 頁面 | 職責 | 關鍵互動 |
|------|------|----------|
| 首頁 `/` | 一句話說明 + 大按鈕「開始計算」 | 零捲動即可開始 |
| 計算器 `/calculator` | 四步驟 wizard（資格確認→評點計分→文件盤點→結果摘要） | 即時分數顯示、步驟導航 |
| 結果頁 `/calculator/result` | 分數明細 + 文件清單 + 缺口建議 + 分享/下載 | URL 含 query param 可復原狀態 |
| 關於 `/about` | 規則版本、免責聲明、官方連結 | 靜態內容 |
| FAQ `/faq` | 常見問題摺疊面板 | Accordion |

---

## 三、四步驟 UX 流程

```
┌────────────────┐    ┌──────────────────┐    ┌────────────────┐    ┌────────────────┐
│ Step 1         │    │ Step 2           │    │ Step 3         │    │ Step 4         │
│ 基本資格確認   │ →  │ 八大項目評分     │ →  │ 文件清單產生   │ →  │ 結果與下一步   │
│                │    │                  │    │                │    │                │
│ • 畢業身分     │    │ • 逐項填答       │    │ • 自動產生     │    │ • 分數摘要     │
│ • 簽證類型     │    │ • 即時計分       │    │ • 依分數來源   │    │ • 差距分析     │
│ • 居留狀態     │    │ • 說明提示       │    │ • 標註提供者   │    │ • 下載/分享    │
└────────────────┘    └──────────────────┘    └────────────────┘    └────────────────┘
```

### Step 2 八大評點項目 UI

每個項目以 **Card + Radio Group** 呈現：

| 項目 | 滿分 | UI 元件 | 備註 |
|------|------|---------|------|
| 學歷 | 30 | Radio（博/碩/學/副學士） | 需說明副學士認定邊界 |
| 聘僱薪資 | 40 | Radio（四級距） | 顯示月薪級距金額 |
| 工作/實習經驗 | 20 | Radio + Conditional（年資/實習細分） | 需區分畢業前後 |
| 職務資格 | 20 | Checkbox + 說明 | 標註「需人工確認」 |
| 華語能力 | 30 | Radio（流利/高階/中階）+ 證照選擇 | 支援多種證照對應 |
| 他國語言/成長經驗 | 20 | Radio + Conditional | 語言數量或居住年數 |
| 配合政策 | 20 | Checkbox + 說明 | 政策企業認定、國際專班 |
| 獎學金/成績 | 20 | Radio + Conditional | 區分政府獎學金/校內/成績排名 |

---

## 四、元件結構

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 全站佈局（Header + Footer + Disclaimer）
│   ├── page.tsx                  # 首頁
│   ├── calculator/
│   │   ├── page.tsx              # 計算器主容器（步驟狀態管理）
│   │   └── result/
│   │       └── page.tsx          # 結果頁
│   ├── about/
│   │   └── page.tsx
│   └── faq/
│       └── page.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui 基礎元件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── radio-group.tsx
│   │   ├── accordion.tsx
│   │   ├── progress.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.tsx            # 導航列
│   │   ├── Footer.tsx            # 版本資訊 + 官方連結
│   │   ├── StepIndicator.tsx     # 步驟進度條（1/4, 2/4...）
│   │   └── DisclaimerBanner.tsx  # 免責聲明橫幅
│   │
│   ├── calculator/
│   │   ├── QualificationCheck.tsx      # Step 1：資格確認
│   │   ├── ScoringForm.tsx             # Step 2：評分表單容器
│   │   ├── categories/                 # 各評點項目子表單
│   │   │   ├── EducationForm.tsx       # 學歷
│   │   │   ├── SalaryForm.tsx          # 薪資
│   │   │   ├── ExperienceForm.tsx      # 工作/實習經驗
│   │   │   ├── QualificationForm.tsx   # 職務資格
│   │   │   ├── MandarinForm.tsx        # 華語能力
│   │   │   ├── ForeignLangForm.tsx     # 他國語言
│   │   │   ├── PolicyForm.tsx          # 配合政策
│   │   │   └── AcademicForm.tsx        # 獎學金/成績
│   │   ├── DocumentChecklist.tsx       # Step 3：文件清單
│   │   └── ResultSummary.tsx           # Step 4：結果摘要
│   │
│   └── shared/
│       ├── ScoreProgressBar.tsx        # 即時分數進度條（始終顯示）
│       ├── CategoryScoreCard.tsx       # 單項分數卡片
│       ├── DocumentItem.tsx            # 文件清單項目
│       ├── GapAnalysis.tsx             # 缺口建議
│       └── ShareButton.tsx             # 分享按鈕
│
├── data/
│   ├── scoring-rules.ts         # 評點規則（資料驅動，可版本化）
│   ├── documents.ts             # 文件需求對應表
│   ├── faq.ts                   # FAQ 內容
│   └── version.ts               # 規則版本元資料
│
├── lib/
│   ├── types.ts                 # TypeScript 型別定義
│   ├── calculator.ts            # 純計算邏輯（無 UI 依賴）
│   ├── document-generator.ts    # 文件清單產生邏輯
│   ├── url-state.ts             # URL query param 狀態序列化/反序列化
│   └── constants.ts             # 常數（門檻分數、版本號等）
│
├── hooks/
│   ├── useCalculatorStore.ts    # Zustand store（表單狀態）
│   └── useScoreComputation.ts   # 即時分數計算 hook
│
└── styles/
    └── globals.css              # Tailwind 設定 + 字型引入
```

---

## 五、資料架構（評點規則資料驅動設計）

```typescript
// data/scoring-rules.ts
interface ScoringRule {
  version: string;           // e.g. "113-07-01"
  effectiveDate: string;
  categories: Category[];
  passingThreshold: number;  // 70
  maxScore: number;          // 200
}

interface Category {
  id: string;
  name: string;             // 中文名稱
  maxPoints: number;
  options: ScoringOption[];
  requiredDocuments: DocumentRequirement[];
  notes?: string[];         // 需人工確認的邊界情境
}

interface ScoringOption {
  id: string;
  label: string;
  points: number;
  conditions?: string;      // 說明文字
  needsManualVerification?: boolean;
}

interface DocumentRequirement {
  id: string;
  name: string;
  provider: 'applicant' | 'employer' | 'school' | 'government' | 'conditional';
  description: string;
  isRequired: boolean;
  conditions?: string;      // 何時需要此文件
}
```

**設計原則**：所有評點規則與文件需求存放在 `data/` 資料夾，以 TypeScript 物件定義。未來若規則更新，只需修改資料檔，不需改動 UI 元件。

---

## 六、視覺設計規範

### 色彩系統

| 用途 | 色碼 | 說明 |
|------|------|------|
| Primary | `#1E40AF` (Blue 800) | 主色調、按鈕、連結 |
| Success | `#059669` (Green 600) | ≥70 分、通過狀態 |
| Warning | `#D97706` (Amber 600) | 60-69 分、接近門檻 |
| Danger | `#DC2626` (Red 600) | <60 分、差距較大 |
| Neutral | `#374151` (Gray 700) | 內文文字 |
| Background | `#F9FAFB` (Gray 50) | 頁面底色 |

### 字型

- 標題：Noto Sans TC Bold
- 內文：Noto Sans TC Regular
- 數字/分數：Inter（等寬數字）

### 響應式斷點

| 斷點 | 寬度 | 佈局 |
|------|------|------|
| Mobile | < 640px | 單欄、全寬卡片、底部固定分數條 |
| Tablet | 640-1024px | 雙欄評分卡片 |
| Desktop | > 1024px | 側邊即時分數面板 + 主內容區 |

### 關鍵 UI 模式

1. **即時分數條**：固定於畫面頂部或側邊，顯示目前總分 / 70 分門檻 / 200 分滿分
2. **步驟進度**：水平 stepper（桌面）/ 頂部小進度條（行動）
3. **評分卡片**：每個項目一張卡片，選取後即時顯示該項得分
4. **文件清單**：分群顯示（申請人/雇主/學校/視情況），每項可勾選已備妥

---

## 七、實施計畫與開發排程

### Phase 1：專案建置與基礎架構（1-2 天）

- [ ] 初始化 Next.js 專案（TypeScript + Tailwind + ESLint）
- [ ] 設定 shadcn/ui 元件庫
- [ ] 建立全站佈局（Header, Footer, DisclaimerBanner）
- [ ] 設定路由結構
- [ ] 建立 Zustand store 骨架

### Phase 2：資料層與計算邏輯（1-2 天）

- [ ] 定義 TypeScript 型別（`lib/types.ts`）
- [ ] 撰寫八大項目評點規則資料（`data/scoring-rules.ts`）
- [ ] 撰寫文件需求對應表（`data/documents.ts`）
- [ ] 實作計分邏輯（`lib/calculator.ts`）
- [ ] 實作文件清單產生邏輯（`lib/document-generator.ts`）
- [ ] 撰寫單元測試驗證計分正確性

### Phase 3：核心 UI 元件（3-4 天）

- [ ] 首頁設計與實作
- [ ] StepIndicator 步驟指示器
- [ ] ScoreProgressBar 即時分數條
- [ ] Step 1：QualificationCheck 資格確認
- [ ] Step 2：8 個分類表單元件
- [ ] Step 3：DocumentChecklist 文件清單
- [ ] Step 4：ResultSummary 結果摘要

### Phase 4：整合與優化（1-2 天）

- [ ] 串接 Zustand 狀態管理
- [ ] 即時計分聯動
- [ ] URL 狀態序列化（結果頁可分享）
- [ ] 響應式調整與行動裝置測試
- [ ] 無障礙檢測（axe-core）

### Phase 5：收尾（1 天）

- [ ] 免責聲明與法律文字
- [ ] About / FAQ 頁面
- [ ] 部署設定（Vercel 或 GitHub Pages）
- [ ] 效能優化（Lighthouse ≥ 90）

---

## 八、設計決策與風險因應

| 決策 | 理由 |
|------|------|
| 規則資料驅動 | 官方可能更新級距或門檻，只改資料檔即可 |
| 前端純計算 | MVP 不需後端，降低維運成本與隱私風險 |
| URL 狀態 | 使用者可分享結果連結給雇主/學校 |
| shadcn/ui | 可自訂、無障礙、不會被上游 breaking change 影響 |
| Zustand | 比 Redux 輕量，比 Context 適合跨步驟持久化 |

| 風險 | 因應措施 |
|------|----------|
| 規則變更 | `data/version.ts` 標記版本，頁面顯示「規則依據日期」 |
| 邊界情境 | 職務資格、政策企業等標註「需人工確認」，不給確定分數 |
| 行動裝置長表單 | Accordion 或 Tab 收合各項目，減少捲動 |
| SEO 被搜尋到 | Next.js SSG + 適當 meta tag + structured data |

---

## 九、驗收標準

1. 使用者可在 3 分鐘內完成全部填答並取得結果
2. 計分結果與官方規則 100% 一致（以 scoring-rules 資料為準）
3. 行動裝置可正常操作（iOS Safari + Android Chrome）
4. Lighthouse Performance ≥ 90, Accessibility ≥ 95
5. 結果頁 URL 可正確復原填答狀態
6. 每頁皆顯示免責聲明與規則版本
