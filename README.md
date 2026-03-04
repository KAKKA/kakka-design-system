# KAKKA Design System

シンプルでオリジナリティのある、クロスプラットフォーム対応デザインシステム。
Android・iOS・Web（React）に統一したビジュアル言語を提供します。

## 特徴

- **モノトーン × ウォームアクセント** - 微かな温かみを持つグレースケールと、ウォームブラウンのアクセントカラー
- **クロスプラットフォーム** - デザイントークンで Web / Android / iOS を統一
- **アクセシビリティ** - WCAG 2.2 AA 準拠を目指した設計
- **18 コンポーネント** - Button、Input、Checkbox、Radio、Select、Badge、Tag、Avatar など

## パッケージ構成

| パッケージ | 説明 |
|---|---|
| `@kakka/tokens` | デザイントークン（CSS変数 / JS / Android XML / Swift） |
| `@kakka/react` | React コンポーネントライブラリ |
| `packages/android` | Jetpack Compose ライブラリ |
| `packages/ios` | SwiftUI ライブラリ（Swift Package） |

## インストール

### Web (React)

```bash
npm install @kakka/tokens @kakka/react
# または
pnpm add @kakka/tokens @kakka/react
```

```tsx
// globals.css または App.tsx でトークンを読み込む
import '@kakka/tokens/css';
import { Button, Input, Badge } from '@kakka/react';

function App() {
  return <Button variant="filled">KAKKA</Button>;
}
```

### Android (Jetpack Compose)

`settings.gradle.kts` に GitHub Packages を追加し、依存を追加：

```kotlin
// build.gradle.kts
dependencies {
    implementation("design.kakka:kakka-components:0.1.0")
}
```

```kotlin
import design.kakka.components.KakkaTheme
import design.kakka.components.button.KakkaButton

@Composable
fun MyScreen() {
    KakkaTheme {
        KakkaButton(text = "KAKKA", onClick = {})
    }
}
```

### iOS (SwiftUI)

Xcode の Swift Package Manager で `https://github.com/KAKKA/kakka-design-system` を追加：

```swift
import KakkaComponents

struct ContentView: View {
    var body: some View {
        KakkaTheme {
            KakkaButton("KAKKA") {}
        }
    }
}
```

## 開発環境

### 必要なツール

- Node.js 20+
- pnpm 9+
- Android Studio（Android 開発時）
- Xcode 15+（iOS 開発時）

### セットアップ

```bash
git clone https://github.com/KAKKA/kakka-design-system
cd kakka-design-system
pnpm install
pnpm build:tokens
```

### Storybook（ドキュメントサイト）起動

```bash
pnpm storybook
# → https://kakka.github.io/kakka-design-system/
```

### ビルド

```bash
# トークンのみ
pnpm build:tokens

# Webライブラリ
pnpm build:react

# 全体
pnpm build
```

## ディレクトリ構成

```
kakka-design-system/
├── packages/
│   ├── tokens/        # @kakka/tokens（Style Dictionary）
│   ├── react/         # @kakka/react（React + Storybook）
│   ├── android/       # Jetpack Compose ライブラリ
│   └── ios/           # SwiftUI ライブラリ
├── .github/workflows/ # CI/CD
├── turbo.json
└── pnpm-workspace.yaml
```

## デザイントークン

### カラーシステム

| トークン | 値 | 用途 |
|---|---|---|
| `--kakka-color-gray-900` | `#0A0A07` | プライマリブラック |
| `--kakka-color-gray-0` | `#FFFFFF` | ホワイト |
| `--kakka-color-accent-primary-default` | `#8B7355` | アクセント（ウォームブラウン） |
| `--kakka-color-accent-secondary-default` | `#4A6741` | サブアクセント（ダークオリーブ） |

### スペーシング

4px ベースグリッド（`--kakka-spacing-1` = 4px、`--kakka-spacing-4` = 16px ...）

## ライセンス

MIT
