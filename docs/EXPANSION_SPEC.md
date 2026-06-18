# KAKKA デザインシステム 拡張スペック

## 背景（なぜ拡張するか）
既存19コンポーネントはすべて「原子（部品）」レベル。AIに複雑なサービス（駐車場予約等）を作らせると、
**レイアウト/構造/複雑系コンポーネントが不足**しているため、AIがその場のアドリブCSSで自作し、画面ごとに
余白・整列・密度がバラバラになりUIが崩壊する。本拡張はその空白の階層を埋める。

## 階層モデル（追加するもの）
1. **トークン拡張** — semantic 状態色 + 薄背景tint、zIndex、motion（duration/easing）、focus-ring。
2. **レイアウト原子** — Stack / Grid / Container（＋ Spacer）。AI のUI崩壊を防ぐ最重要レイヤー。
3. **構造パターン** — AppShell / Sidebar(+SidebarItem) / PageHeader / Field / FormGroup。
4. **複雑系コンポーネント** — Tabs / SegmentedControl / Switch / Alert / Tooltip / Menu(Dropdown) /
   Popover / Table / Pagination / EmptyState / Skeleton / Progress / Stat / Stepper / Drawer / DatePicker。
5. **レシピ** — 予約フロー・ダッシュボードの組み立て実例（Storybook + demo）。

## 優先順位（Web=React を正典に実装 → tokens → native 移植）

### Wave 1（最優先・AI崩壊の直接原因を潰す）
- [ ] トークン拡張（semantic 状態色 / 状態薄背景 / zIndex / motion / focus-ring）
- [ ] **Stack**（direction, gap, align, justify, wrap）
- [ ] **Grid**（columns, gap, responsive minItemWidth）
- [ ] **Container**（size: sm/md/lg/full, 中央寄せ, padding）
- [ ] **Field**（label + 任意control + hint + error の汎用ラッパ。既存Input/Selectの重複解消にも）
- [ ] **PageHeader**（breadcrumb? + title + description + actions）

### Wave 2（構造 & 高頻度コントロール）
- [ ] **AppShell**（sidebar slot + topbar slot + content。レスポンシブでサイドバー開閉）
- [ ] **Sidebar / SidebarItem**（icon+label, active, nest, section label）
- [ ] **Tabs**（アンダーライン式 + パネル）
- [ ] **SegmentedControl**（スライドピル）
- [ ] **Switch**（トグル）
- [ ] **Alert**（インラインメッセージ: info/success/warning/error, 左カラーバー）
- [ ] **Tooltip**（遅延300ms, ダーク）

### Wave 3（メニュー/データ表示）
- [ ] **Menu / Dropdown**（trigger + items, キーボード操作, 外側クリックで閉じる）
- [ ] **Popover**
- [ ] **Table**（compact/standard密度, ホバー, ソート可, 空状態スロット）
- [ ] **Pagination**（前/次 + カウント, ページ番号オプション）
- [ ] **EmptyState**
- [ ] **Skeleton**（text/rect/circle, shimmer）
- [ ] **Progress**（linear + circular）
- [ ] **Stat / MetricCard**

### Wave 4（予約フロー特化）
- [ ] **Stepper**（水平/縦, 状態: done/current/upcoming）
- [ ] **Drawer / Sheet**（右/左/下, ネイティブ dialog ベース）
- [ ] **DatePicker / Calendar**（単日 + 範囲, 予約に必須）
- [ ] **TimeSlot / TimeRange**（予約の時間帯選択。任意）

### Wave 5（レシピ & ネイティブ移植 & トークン全出力）
- [ ] tokens を全プラットフォーム（CSS/JS/Android/iOS）再生成
- [ ] Android(Compose) / iOS(SwiftUI) へ主要コンポーネント移植
- [ ] レシピ: 予約フロー（Stepper + Field + DatePicker + summary）
- [ ] レシピ: ダッシュボード（AppShell + PageHeader + Stat + Table）

## 設計の不変条件（全コンポーネント共通）
- `docs/COMPONENT_CONVENTIONS.md` に厳密準拠。
- トークン経由のみ（生値ハードコード禁止）。フォーカスは box-shadow リング。
- 影は浮遊要素のみ。カード/ボタンはボーダー主役。
- 状態色は薄背景＋濃文字。accent（ウォームブラウン）は強調・選択・フォーカスに限定。
- a11y: ロール/aria/キーボード操作（Tab/Esc/矢印）を必須化。

## デリゲーション方針
- 仕様が明確な単体コンポーネントは Sonnet エージェントに並列委譲（各自が独立した新規ディレクトリを作成）。
- 共有ファイル（`src/index.ts` バレル、tokens JSON）は Opus（統合役）が責任を持って編集し、衝突を防ぐ。
- レイアウト原子・AppShell・DatePicker など設計判断が重い物は Opus が実装し品質基準を確立。
