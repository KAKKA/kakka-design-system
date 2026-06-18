# 調査レポート: Stripe / Notion デザイン言語の要点（KAKKA向け統合）

> 出典: Stripe（Dashboard / Checkout / Elements / docs）と Notion（アプリUI / マーケ）の
> 公開UI実装に関する知見の統合。数値は実装観察ベースの目安であり、ピクセル単位の最終確定は
> 実機 DevTools 実測を推奨。本リポジトリの warm monochrome × ウォームブラウン文脈に翻訳して記載。

## 共通する設計哲学（両社に共通＝KAKKAに移植すべき核）

1. **純黒を使わない** — Notion `#37352F`、Stripe `#1A1F36` 系。KAKKA は既に gray.900=`#0A0A07` で実践済みで方向性は正しい。
2. **境界線より「背景色差＋余白」で領域分離** — divider は `rgba(warm, 0.08〜0.09)` 級の極薄。罫線を減らすほど静かで上質。
3. **影は“本当に浮く要素”だけ** — カード/ボタンはフラット（ボーダー主役）。メニュー/モーダル/ポップオーバーのみ柔らかいシャドウ。
4. **状態色は「彩度を抑えた薄い背景 ＋ 濃い同系文字」** — 鮮やかなソリッドは使わない。バッジ先頭にドット`●`（Stripe）。
5. **フォーカスは `box-shadow` リング** — `outline` でなく `box-shadow: 0 0 0 3px rgba(accent, .15)`。KAKKA はウォームブラウンの滲みリングに。
6. **4px ベースグリッド** — 4/8/12/16/24/32/48。KAKKA の spacing トークンと一致。
7. **角丸のスケール連動** — 小要素=4px、入力/アラート=6px、カード/メニュー=8px、モーダル=12px、ピル=full。
8. **文脈別の密度** — 操作UI（テーブル行・ナビ項目）は密（28〜40px）、読み物領域は疎（行間1.6・広い左右余白）。
9. **数値は Monospace** — 金額・ID・コードは等幅で桁揃え。KAKKA は font.family.mono を既に保有。
10. **ホバーリビール（Notion）** — 行末アクションは静止時非表示→ホバーでフェードイン。密度と清潔さの両立。

## コンポーネント別アナトミー（実装の目安）

### レイアウト / AppShell
- サイドバー幅: 220〜260px（Stripe ~240 / Notion 240、折りたたみ可）。背景は本文よりわずかに沈んだ色（`gray.50`）。
- コンテンツ最大幅: 管理画面 1100〜1200px / 設定・読み物 720〜880px。`margin: 0 auto`。
- コンテンツ左右パディング: 24〜32px（デスクトップ）/ 16〜24px（モバイル）。
- セクション間: 24〜48px。

### Sidebar / ListItem（ナビ項目）
- 高さ 32〜36px、アイコン16px＋ラベル間6〜8px、角丸4px。
- ホバー `rgba(warm,.08)`、選択は背景＋weight 500（色でなく濃度で示す）。
- セクションラベルは 11px・大文字・letter-spacing 0.08em・ミュート。

### PageHeader
- 構成（上→下）: パンくず(13px ミュート) → タイトル(24px/600)＋右にアクション群 → 説明(14px/secondary)。
- アクションは右揃え、Primary が最右。

### Field（フォーム）
- ラベル上配置 13px/500、ラベル↔入力 4px。
- 入力高 40px、border 1.5px、角丸6px、padding 10px 12px、font 14〜16px。
- フォーカス: border=accent ＋ `box-shadow: 0 0 0 3px rgba(accent,.15)`。
- エラー: border=error ＋ 赤リング、メッセージは赤文字＋アイコン（色覚対応）。背景は変えない。
- バリデーションは blur 即時（submit非依存）。

### Table
- ヘッダ行 40px・薄背景・12px/600・letter-spacing 0.04em（大文字化しない）。
- データ行 44〜48px（標準）/ 36px（compact）。セル padding 0 16px。
- ゼブラ禁止、ホバーで薄背景。区切りは 1px 極薄。

### Tabs / SegmentedControl
- Tabs: アンダーライン式、選択に 2px ボトムボーダー（accent）、高さ40px。
- SegmentedControl: ピル外枠（muted bg）＋選択セグメント白＋軽い影、選択ピルがスライド（transform 150ms）。

### Menu / Tooltip / Popover
- Menu: 白背景、`1px 極薄ボーダー ＋ 柔らかい拡散シャドウ`、角丸8px、項目36px、ホバーで内側4px角丸ハイライト、出現 translateY(-4px)→0＋fade 120ms。
- Tooltip: ダーク背景・白文字12px・角丸4〜6px・遅延300ms。
- Popover: メニュー同系、padding16px、max-width 320px。

### Stepper / 予約フロー
- 3〜4ステップ。現在=塗り円、完了=チェック、未到達=グレー円。コネクター 2px（完了区間=accent）。
- 戻っても値を保持。右サイドに常時サマリー（order summary）。

### Badge / Alert
- Badge: 高さ20px、padding 0 8px、角丸full、11px/600、薄背景＋濃文字、先頭ドット可。
- Alert: 角丸6px、左カラーバー4px、薄い役割色背景、アイコン16px＋テキスト、padding 12px16px。

### Stat / Metric
- ラベル(12px/ミュート)→値(28〜32px/600)→前期比(13px/色付き矢印)。4カラムグリッド gap16。

### EmptyState / Skeleton
- EmptyState: 中央寄せ、薄いアイコン/絵文字＋見出し(16px/600)＋説明(14px/ミュート)＋CTA。min-height 320px。
- Skeleton: コンテンツ形状のグレーブロック＋微シマー。スピナーよりレイアウト保持を優先。

## KAKKA への翻訳メモ
- accent（ウォームブラウン `#8B7355`）は「強CTA・選択・フォーカス」に限定して使い、特別感を維持。
- 状態色は warm に寄せる: success=オリーブ `#4A6741`、warning=アンバー `#B7860B`、error=テラコッタ寄り `#C0392B`、info=gray.700。
  各々に「薄背景tint」を新設してバッジ/アラートで使う。
- 影は単層シンプル＋ボーダーで奥行き（elevation.json の方針と一致）。
