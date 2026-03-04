import { useState } from 'react';
import {
  Button,
  Badge,
  Tag,
  Avatar,
  Card,
  Input,
  Divider,
  Spinner,
  Accordion,
} from '@kakka/react';
import styles from './App.module.css';

const NAV_LINKS = [
  { label: '特徴', href: '#features' },
  { label: 'コンポーネント', href: '#components' },
  { label: 'プラットフォーム', href: '#platforms' },
];

const FEATURES = [
  {
    icon: '◐',
    title: 'モノトーン × ウォームアクセント',
    description:
      '微かな温かみを持つグレースケールと、ウォームブラウン（#8B7355）のアクセントカラー。純黒ではない gray.900（#0A0A07）がシステム全体に温度感を与えます。',
  },
  {
    icon: '⬡',
    title: 'クロスプラットフォーム',
    description:
      'Style Dictionary によってデザイントークンを Web（CSS変数）・Android（XML）・iOS（Swift）に自動変換。一つのソースから全プラットフォームへ。',
  },
  {
    icon: '◎',
    title: 'アクセシビリティ',
    description:
      'WCAG 2.2 AA 準拠を目指した設計。コントラスト比・フォーカス管理・ARIA 属性をすべてのコンポーネントで考慮しています。',
  },
];

const PLATFORMS = [
  {
    name: 'Web / React',
    icon: '⬡',
    description: 'React + TypeScript ライブラリ',
    badge: '@kakka/react',
    snippet: `import { Button } from '@kakka/react';

<Button variant="filled">KAKKA</Button>`,
  },
  {
    name: 'Android',
    icon: '⬡',
    description: 'Jetpack Compose ライブラリ',
    badge: 'design.kakka:kakka-components',
    snippet: `KakkaTheme {
    KakkaButton(
        text = "KAKKA",
        onClick = {}
    )
}`,
  },
  {
    name: 'iOS',
    icon: '⬡',
    description: 'SwiftUI ライブラリ',
    badge: 'KakkaComponents',
    snippet: `KakkaTheme {
    KakkaButton("KAKKA") {}
}`,
  },
];

const FAQ_ITEMS = [
  {
    title: 'どのプラットフォームで使えますか？',
    content:
      'Web（React / TypeScript）、Android（Jetpack Compose）、iOS（SwiftUI）の3プラットフォームに対応しています。Style Dictionary によってデザイントークンが各プラットフォームに自動出力されます。',
  },
  {
    title: 'デザイントークンとは何ですか？',
    content:
      'カラー・スペーシング・タイポグラフィ・ボーダーラジウスなどのデザイン値を一元管理するための変数定義です。KAKKA では Style Dictionary v4 を使って JSON から CSS変数・TypeScript定数・Android XML・Swift enum を生成しています。',
  },
  {
    title: 'ライセンスは？',
    content: 'MIT ライセンスです。商用・個人問わず自由にご利用いただけます。',
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.app}>
      {/* ─── Header ─── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoMark}>K</span>
            <span className={styles.logoText}>KAKKA</span>
          </a>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={styles.navLink} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://github.com/KAKKA/kakka-design-system', '_blank')}
            >
              GitHub
            </Button>
          </nav>

          <button
            className={styles.menuToggle}
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroEyebrow}>
              <Badge variant="default">v0.1.0</Badge>
              <span className={styles.heroEyebrowText}>Open Source Design System</span>
            </div>

            <h1 className={styles.heroTitle}>
              シンプルで<br />
              <span className={styles.heroAccent}>オリジナリティのある</span><br />
              デザインシステム
            </h1>

            <p className={styles.heroDesc}>
              Android・iOS・Web（React）に統一したビジュアル言語を提供する
              クロスプラットフォーム対応デザインシステム。
              モノトーン×ウォームアクセントで、シンプルさの中にオリジナリティを。
            </p>

            <div className={styles.heroCta}>
              <Button
                variant="filled"
                size="lg"
                onClick={() => window.open('https://github.com/KAKKA/kakka-design-system', '_blank')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://kakka.github.io/kakka-design-system/storybook/', '_blank')}
              >
                View Storybook
              </Button>
            </div>

            <div className={styles.heroTags}>
              {['React', 'Android', 'iOS', 'TypeScript', 'Style Dictionary', 'MIT'].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroGrid}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={styles.heroGridCell} />
              ))}
            </div>
            <div className={styles.heroFloating}>
              <Button variant="filled">Filled</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Badge variant="default" size="sm">Features</Badge>
              <h2 className={styles.sectionTitle}>KAKKA の特徴</h2>
              <p className={styles.sectionDesc}>
                デザインと開発の両方を考慮した、実用的なデザインシステムです。
              </p>
            </div>

            <div className={styles.featureGrid}>
              {FEATURES.map((f) => (
                <Card key={f.title} elevation={1} padding="lg" className={styles.featureCard}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── Component Showcase ─── */}
        <section id="components" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Badge variant="accent" size="sm">Components</Badge>
              <h2 className={styles.sectionTitle}>18 のコンポーネント</h2>
              <p className={styles.sectionDesc}>
                フォーム・データ表示・ナビゲーション・フィードバックまで網羅した実用的なセット。
              </p>
            </div>

            {/* Buttons */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>ボタン</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <div className={styles.showcaseRow}>
                  <Button variant="filled">Filled</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="filled" loading>Loading</Button>
                  <Button variant="filled" disabled>Disabled</Button>
                </div>
                <div className={styles.showcaseRow}>
                  <Button variant="filled" size="lg">Large</Button>
                  <Button variant="filled" size="md">Medium</Button>
                  <Button variant="filled" size="sm">Small</Button>
                </div>
              </Card>
            </div>

            {/* Badges & Tags */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>バッジ・タグ</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <div className={styles.showcaseRow}>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
                <div className={styles.showcaseRow}>
                  <Tag>React</Tag>
                  <Tag variant="accent">Design System</Tag>
                  <Tag>TypeScript</Tag>
                  <Tag>Open Source</Tag>
                </div>
              </Card>
            </div>

            {/* Avatars */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>アバター</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <div className={styles.showcaseRow}>
                  <Avatar name="田中 太郎" size="xl" />
                  <Avatar name="山田 花子" size="lg" />
                  <Avatar name="佐藤 健" size="md" />
                  <Avatar name="鈴木" size="sm" />
                  <div className={styles.avatarStack}>
                    <Avatar name="A" size="md" />
                    <Avatar name="B" size="md" />
                    <Avatar name="C" size="md" />
                    <span className={styles.avatarMore}>+8</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Form */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>フォーム</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <div className={styles.formDemo}>
                  <Input
                    label="お名前"
                    placeholder="田中 太郎"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    label="メールアドレス"
                    type="email"
                    placeholder="hello@example.com"
                    hint="ログインに使用します"
                  />
                  <Input
                    label="エラー例"
                    placeholder="入力してください"
                    error="このフィールドは必須です"
                  />
                </div>
              </Card>
            </div>

            {/* Spinner */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>スピナー</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <div className={styles.showcaseRow}>
                  <Spinner size="sm" label="読み込み中" />
                  <Spinner size="md" label="読み込み中" />
                  <Spinner size="lg" label="読み込み中" />
                </div>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>カード</h3>
              <div className={styles.statsGrid}>
                {[
                  { label: 'コンポーネント', value: '18', badge: 'Web' },
                  { label: 'トークン', value: '80+', badge: 'Design' },
                  { label: 'プラットフォーム', value: '3', badge: 'Cross' },
                ].map((s) => (
                  <Card key={s.label} elevation={2} padding="lg" className={styles.statCard}>
                    <Badge variant="default" size="sm">{s.badge}</Badge>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── Platforms ─── */}
        <section id="platforms" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Badge variant="default" size="sm">Platforms</Badge>
              <h2 className={styles.sectionTitle}>対応プラットフォーム</h2>
              <p className={styles.sectionDesc}>
                一つのデザイン言語を、あらゆるプラットフォームで。
              </p>
            </div>

            <div className={styles.platformGrid}>
              {PLATFORMS.map((p) => (
                <Card key={p.name} elevation={1} padding="lg" className={styles.platformCard}>
                  <div className={styles.platformHeader}>
                    <span className={styles.platformIcon}>{p.icon}</span>
                    <div>
                      <div className={styles.platformName}>{p.name}</div>
                      <div className={styles.platformDesc}>{p.description}</div>
                    </div>
                  </div>
                  <Tag>{p.badge}</Tag>
                  <pre className={styles.codeBlock}><code>{p.snippet}</code></pre>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── FAQ ─── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Badge variant="default" size="sm">FAQ</Badge>
              <h2 className={styles.sectionTitle}>よくある質問</h2>
            </div>

            <div className={styles.faqList}>
              <Accordion items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>今すぐ始めよう</h2>
            <p className={styles.ctaDesc}>
              npm からインストールするか、GitHub でソースを確認してください。
            </p>
            <div className={styles.ctaCode}>
              <code>pnpm add @kakka/tokens @kakka/react</code>
            </div>
            <div className={styles.heroCta}>
              <Button
                variant="filled"
                size="lg"
                onClick={() => window.open('https://github.com/KAKKA/kakka-design-system', '_blank')}
              >
                GitHub で見る
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://kakka.github.io/kakka-design-system/storybook/', '_blank')}
              >
                Storybook を開く
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <span className={styles.logoMark}>K</span>
              <span className={styles.logoText}>KAKKA</span>
            </div>
            <p className={styles.footerCopy}>
              MIT License &nbsp;·&nbsp; Built with React + Style Dictionary
            </p>
            <div className={styles.footerLinks}>
              <a href="https://github.com/KAKKA/kakka-design-system" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                GitHub
              </a>
              <a href="https://kakka.github.io/kakka-design-system/storybook/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                Storybook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
