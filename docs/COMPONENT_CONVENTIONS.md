# KAKKA コンポーネント実装規約（実装ブリーフ）

このドキュメントは、新規コンポーネントを既存コードと完全に馴染ませるための「守るべき規約」をまとめたもの。
実装を担当する全員（人間・AIエージェント）はこれに準拠すること。

## ファイル構成（1コンポーネント = 1ディレクトリ）

```
packages/react/src/components/<Name>/
  <Name>.tsx          # 実装
  <Name>.module.css   # スタイル（CSS Modules）
  <Name>.stories.tsx  # Storybook
  index.ts            # re-export: export { X } from './X'; export type { ... }
```

最後に `packages/react/src/index.ts`（バレル）へ `export` と `export type` を追加する。

## TSX 実装規約

- `forwardRef` を使い、適切な HTML 要素の ref を転送する。
- props は対応する HTML 属性を継承する: `extends ComponentProps<'button'>` や `InputHTMLAttributes<HTMLInputElement>` など。
- バリアント/サイズ/状態は **`data-*` 属性**で表現し、CSS 側で `[data-variant='...']` で当てる（クラス名分岐より優先）。
- `className` は受け取って `[styles.x, className].filter(Boolean).join(' ')` で合成。
- a11y: フォーム系は `useId()` で id を生成し、`aria-invalid` / `aria-describedby` / `role="alert"`（エラー）を付与。
- `displayName` を必ず設定。
- アイコンはインライン SVG（`stroke="currentColor"`, `strokeWidth="1.5"`, `aria-hidden="true"`）。依存ライブラリは増やさない。
- オーバーレイ系（Dialog 既存実装に倣う）はネイティブ `<dialog>` + `showModal()` を第一候補にする。Drawer/Sheet も同系統で。

## CSS 規約（デザイントークン経由）

- **必ず CSS 変数経由**で色・余白・角丸・影・タイポを参照する。生の値をハードコードしない。
- 変数名は `--kakka-{トークンパスを - で連結}`。フォールバック値を必ず添える: `var(--kakka-color-gray-900, #111)`。
- 主要トークン早見表:
  | 用途 | 変数 | 例 |
  |---|---|---|
  | グレースケール | `--kakka-color-gray-{0..900}` | `--kakka-color-gray-700` |
  | アクセント | `--kakka-color-accent-primary-{light,default,dark}` | `--kakka-color-accent-primary-default` (#8B7355) |
  | セマンティック文字 | `--kakka-color-semantic-text-{primary,secondary,disabled,inverse,accent}` | |
  | セマンティック背景 | `--kakka-color-semantic-background-{default,subtle,muted,inverse}` | |
  | セマンティック境界 | `--kakka-color-semantic-border-{default,strong,focus}` | |
  | ステータス | `--kakka-color-semantic-status-{error,warning,success,info}` | |
  | 余白 | `--kakka-spacing-{0,1,2,3,4,5,6,8,10,12,16,20}` | `4`=16px |
  | 角丸 | `--kakka-borderRadius-{none,sm,md,lg,xl,2xl,full}` | `lg`=8px(メイン) |
  | 影 | `--kakka-elevation-{0..5}` | `2`=カード, `4`=モーダル |
  | フォントサイズ | `--kakka-font-size-{xs..4xl}` | `md`=16px |
  | 太さ | `--kakka-font-weight-{regular,medium,bold}` | |
  | 行間 | `--kakka-font-lineHeight-{tight,normal,loose}` | `normal`=1.6 |

- フォーカス: `:focus-visible { outline: 2px solid var(--kakka-color-semantic-border-focus); outline-offset: 2px; }`
  入力系は `box-shadow: 0 0 0 3px rgba(...)` のリングも併用（Input 既存実装に倣う）。
- トランジション: `transition: ... 0.15s ease`。

## ⚠️ 既知のトークン不足（拡張時に解消する）

既存の Input/Select は以下を参照しているが color.json に未定義（フォールバックで描画されている）:
- `--kakka-color-semantic-text-error`
- `--kakka-color-semantic-border-error`

→ トークン拡張時に `semantic.text.{error,success,warning,info}` / `semantic.border.{error,...}` /
   `semantic.status.*-bg`（薄い背景）を追加し、Alert/Field/Badge 等で正しく参照できるようにする。

## Storybook 規約

- `Meta` の `title` は `'Components/<Name>'`（docs 系は `'Foundation/...'`）。
- 代表的バリアント・サイズ・状態（hover/disabled/error/loading）を網羅する Story を用意。
- a11y アドオン（`@storybook/addon-a11y`）が有効なので、コントラスト・ARIA を意識。

## トークン拡張の手順（@kakka/tokens）

1. `packages/tokens/src/tokens/*.json` に DTCG 形式（`$value`/`$type`/`$description`）で追加。
2. `pnpm build:tokens`（= `node config/style-dictionary.config.js`）で CSS / JS / Android XML / Swift を再生成。
3. 参照は別名（`{color.gray.900}`）で可。dimension は単位なし数値で書く（px/dp/sp は自動付与）。

## クロスプラットフォーム移植方針

- Web(React) を正典（リファレンス実装）とし、トークンと寸法・状態を Android(Compose) / iOS(SwiftUI) に対応させる。
- 移植時も同じトークン名（`KakkaColors` / `KakkaSpacing` / `KakkaRadius` enum）を使う。
