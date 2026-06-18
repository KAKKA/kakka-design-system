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
  Stack,
  Grid,
  Field,
  Tabs,
  SegmentedControl,
  Switch,
  Alert,
  Tooltip,
  EmptyState,
  Skeleton,
  Pagination,
  Table,
  Stat,
  Stepper,
  DatePicker,
  type TableColumn,
} from '@kakka/react';
import styles from './App.module.css';

const STORYBOOK_URL = 'https://kakka.github.io/kakka-design-system/storybook/';
const GITHUB_URL = 'https://github.com/KAKKA/kakka-design-system';

const NAV_LINKS = [
  { label: '特徴', href: '#features' },
  { label: 'コンポーネント', href: '#components' },
  { label: 'レシピ', href: '#recipes' },
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
    icon: '▦',
    title: '原子からレシピまで',
    description:
      'Button などの原子だけでなく、Stack/Grid/Container（レイアウト原子）、AppShell/PageHeader/Field（構造）、Table/Stepper/DatePicker（複雑系）、そして予約フロー等のレシピまでを提供。複雑な画面も崩れず組めます。',
  },
  {
    icon: '⬡',
    title: 'クロスプラットフォーム',
    description:
      'Style Dictionary によってデザイントークンを Web（CSS変数）・Android（XML）・iOS（Swift）に自動変換。一つのソースから全プラットフォームへ。',
  },
  {
    icon: '◎',
    title: '洗練された設計思想',
    description:
      'Stripe / Notion 等を参考に「境界線より余白・色差」「影は浮遊要素のみ」「状態色は薄背景＋濃文字」「box-shadow フォーカスリング」を採用。WCAG 2.2 AA を志向。',
  },
];

const PLATFORMS = [
  {
    name: 'Web / React',
    icon: '⬡',
    description: 'React + TypeScript ライブラリ',
    badge: '@kakka/react',
    snippet: `import { AppShell, PageHeader, Stat } from '@kakka/react';

<AppShell sidebar={<Sidebar/>}>
  <PageHeader title="ダッシュボード" />
</AppShell>`,
  },
  {
    name: 'Android',
    icon: '⬡',
    description: 'Jetpack Compose ライブラリ',
    badge: 'design.kakka:kakka-components',
    snippet: `KakkaTheme {
    KakkaStepper(
        steps = listOf("日時", "情報", "確認"),
        current = 1,
    )
}`,
  },
  {
    name: 'iOS',
    icon: '⬡',
    description: 'SwiftUI ライブラリ',
    badge: 'KakkaComponents',
    snippet: `KakkaTheme {
    KakkaAlert("予約が完了しました",
               variant: .success)
}`,
  },
];

const FAQ_ITEMS = [
  {
    title: 'どんなコンポーネントがありますか？',
    content:
      '基本（Button/Input/Badge…）に加え、レイアウト原子（Stack/Grid/Container）、構造（Field/PageHeader/AppShell/Sidebar）、コントロール（Tabs/SegmentedControl/Switch）、フィードバック（Alert/Tooltip/Drawer/Menu…）、データ表示（Table/Stat/Pagination）、フロー/日付（Stepper/DatePicker）まで、40以上のコンポーネントを提供しています。',
  },
  {
    title: 'なぜ「レシピ」があるのですか？',
    content:
      '原子部品だけだと、複雑な画面の「組み立て方」が人やAIによってバラつき、UIが崩れがちです。KAKKA は予約フローやダッシュボードといった実例（レシピ）を用意し、余白・整列・密度の正解を示します。Storybook の Recipes/ で確認できます。',
  },
  {
    title: 'どのプラットフォームで使えますか？',
    content:
      'Web（React / TypeScript）、Android（Jetpack Compose）、iOS（SwiftUI）の3プラットフォーム。Style Dictionary によってデザイントークンが各プラットフォームに自動出力されます。',
  },
  {
    title: 'ライセンスは？',
    content: 'MIT ライセンスです。商用・個人問わず自由にご利用いただけます。',
  },
];

/* ─── データ表示デモ用 ─── */
interface Reservation {
  id: string;
  customer: string;
  date: string;
  status: 'confirmed' | 'pending' | 'canceled';
}

const RESERVATIONS: Reservation[] = [
  { id: '#10293', customer: '田中 花子', date: '6/20', status: 'confirmed' },
  { id: '#10292', customer: '佐藤 太郎', date: '6/20', status: 'pending' },
  { id: '#10291', customer: '鈴木 一郎', date: '6/19', status: 'confirmed' },
  { id: '#10290', customer: '高橋 美咲', date: '6/19', status: 'canceled' },
];

const STATUS_MAP: Record<Reservation['status'], { label: string; variant: 'success' | 'warning' | 'error' }> = {
  confirmed: { label: '確定', variant: 'success' },
  pending: { label: '保留', variant: 'warning' },
  canceled: { label: 'キャンセル', variant: 'error' },
};

const RESERVATION_COLUMNS: TableColumn<Reservation>[] = [
  { key: 'id', header: '予約番号', monospace: true },
  { key: 'customer', header: 'お客様' },
  { key: 'date', header: '利用日', monospace: true },
  {
    key: 'status',
    header: 'ステータス',
    render: (r) => <Badge variant={STATUS_MAP[r.status].variant}>{STATUS_MAP[r.status].label}</Badge>,
  },
];

const BOOKING_STEPS = [
  { label: '日時を選択' },
  { label: 'お客様情報' },
  { label: '確認' },
];

const TIME_SLOTS = [
  { value: 'am', label: '午前' },
  { value: 'pm', label: '午後' },
  { value: 'night', label: '夜間' },
];

/* ─── 予約フロー（レシピのインライン実演） ─── */
function BookingDemo() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState('am');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const canNext = step === 0 ? !!date : step === 1 ? !!name : true;

  return (
    <Card elevation={1} padding="lg">
      <Stack gap={5}>
        <Stepper steps={BOOKING_STEPS} current={done ? 3 : step} />
        <Divider />

        {done ? (
          <Alert variant="success" title="予約が完了しました">
            確認メールを送信しました。これがKAKKAのレシピで組んだ予約フローです。
          </Alert>
        ) : (
          <div style={{ minHeight: 180 }}>
            {step === 0 && (
              <Stack gap={4}>
                <Field label="利用日" required>
                  <DatePicker value={date} onChange={setDate} placeholder="日付を選択" minDate={new Date()} fullWidth />
                </Field>
                <Field label="時間帯" required>
                  <SegmentedControl options={TIME_SLOTS} value={slot} onValueChange={setSlot} />
                </Field>
              </Stack>
            )}
            {step === 1 && (
              <Field label="お名前" required hint="予約確認に使用します">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" fullWidth />
              </Field>
            )}
            {step === 2 && (
              <Stack gap={2}>
                <SummaryRow label="利用日" value={date ? `${date.getMonth() + 1}/${date.getDate()}` : '-'} />
                <SummaryRow label="時間帯" value={TIME_SLOTS.find((t) => t.value === slot)?.label ?? '-'} />
                <SummaryRow label="お名前" value={name || '-'} />
              </Stack>
            )}
          </div>
        )}

        {!done && (
          <>
            <Divider />
            <Stack direction="row" justify="between">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                戻る
              </Button>
              {step < 2 ? (
                <Button variant="filled" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
                  次へ
                </Button>
              ) : (
                <Button variant="filled" onClick={() => setDone(true)}>
                  予約を確定する
                </Button>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justify="between" align="center">
      <span style={{ color: 'var(--kakka-color-semantic-text-secondary, #525249)', fontSize: 14 }}>{label}</span>
      <strong style={{ fontSize: 14 }}>{value}</strong>
    </Stack>
  );
}

const searchIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState('all');
  const [seg, setSeg] = useState('month');
  const [notify, setNotify] = useState(true);
  const [page, setPage] = useState(1);

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
            <Button variant="outline" size="sm" onClick={() => window.open(GITHUB_URL, '_blank')}>
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
              <Badge variant="default">v0.2.0</Badge>
              <span className={styles.heroEyebrowText}>Open Source Design System</span>
            </div>

            <h1 className={styles.heroTitle}>
              シンプルで<br />
              <span className={styles.heroAccent}>オリジナリティのある</span><br />
              デザインシステム
            </h1>

            <p className={styles.heroDesc}>
              原子部品からレイアウト・構造・複雑系・レシピまで。
              複雑なサービスでも「出荷品質」で組み立てられる、
              モノトーン×ウォームアクセントのクロスプラットフォーム対応デザインシステム。
            </p>

            <div className={styles.heroCta}>
              <Button variant="filled" size="lg" onClick={() => window.open(GITHUB_URL, '_blank')}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open(STORYBOOK_URL, '_blank')}>
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

            <Grid minItemWidth={260} gap={4}>
              {FEATURES.map((f) => (
                <Card key={f.title} elevation={1} padding="lg" className={styles.featureCard}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.description}</p>
                </Card>
              ))}
            </Grid>
          </div>
        </section>

        <Divider />

        {/* ─── Component Showcase ─── */}
        <section id="components" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Badge variant="accent" size="sm">Components</Badge>
              <h2 className={styles.sectionTitle}>40+ のコンポーネント</h2>
              <p className={styles.sectionDesc}>
                原子からレイアウト・構造・複雑系まで。複雑な画面も一貫した余白・密度で組めます。
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
                  <Tooltip content="これは Tooltip です">
                    <Button variant="outline">Hover で Tooltip</Button>
                  </Tooltip>
                </div>
              </Card>
            </div>

            {/* Controls: Tabs / Segmented / Switch */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>コントロール（Tabs / SegmentedControl / Switch）</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <Stack gap={4}>
                  <Tabs
                    value={tab}
                    onValueChange={setTab}
                    tabs={[
                      { value: 'all', label: 'すべて' },
                      { value: 'active', label: '稼働中' },
                      { value: 'archived', label: 'アーカイブ' },
                    ]}
                  />
                  <div className={styles.showcaseRow}>
                    <SegmentedControl
                      value={seg}
                      onValueChange={setSeg}
                      options={[
                        { value: 'day', label: '日' },
                        { value: 'week', label: '週' },
                        { value: 'month', label: '月' },
                      ]}
                    />
                    <Switch checked={notify} onCheckedChange={setNotify} label="通知を受け取る" />
                  </div>
                </Stack>
              </Card>
            </div>

            {/* Feedback: Alert */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>フィードバック（Alert）</h3>
              <Stack gap={3}>
                <Alert variant="info" title="お知らせ">新しいコンポーネントが追加されました。</Alert>
                <Alert variant="success" title="成功">予約が確定しました。</Alert>
                <Alert variant="warning" title="注意">利用時間の30分前です。</Alert>
                <Alert variant="error" title="エラー">支払いに失敗しました。</Alert>
              </Stack>
            </div>

            {/* Data: Stat + Table */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>データ表示（Stat / Table）</h3>
              <Stack gap={4}>
                <Grid minItemWidth={180} gap={4}>
                  <Stat label="本日の予約" value="18" delta="+12%" deltaDirection="up" />
                  <Stat label="稼働率" value="86%" delta="+4pt" deltaDirection="up" />
                  <Stat label="売上(今月)" value="¥1.28M" delta="-3%" deltaDirection="down" />
                  <Stat label="キャンセル" value="5" delta="前週と同じ" deltaDirection="neutral" />
                </Grid>
                <Table
                  columns={RESERVATION_COLUMNS}
                  data={RESERVATIONS}
                  getRowKey={(r) => r.id}
                  hoverable
                />
                <Pagination
                  page={page}
                  totalPages={5}
                  onPageChange={setPage}
                  showCount
                  totalItems={43}
                  pageSize={10}
                />
              </Stack>
            </div>

            {/* Form */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>フォーム（Field）</h3>
              <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                <Grid minItemWidth={240} gap={4}>
                  <Field label="お名前" required>
                    <Input placeholder="田中 太郎" fullWidth />
                  </Field>
                  <Field label="メールアドレス" hint="ログインに使用します">
                    <Input type="email" placeholder="hello@example.com" fullWidth />
                  </Field>
                </Grid>
              </Card>
            </div>

            {/* Loading & Empty */}
            <div className={styles.showcaseBlock}>
              <h3 className={styles.showcaseLabel}>ローディング / 空状態（Skeleton / Spinner / EmptyState）</h3>
              <Grid minItemWidth={260} gap={4}>
                <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                  <Stack gap={2}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="75%" />
                    <div style={{ marginTop: 8 }}>
                      <Spinner size="md" label="読み込み中" />
                    </div>
                  </Stack>
                </Card>
                <Card elevation={0} padding="lg" className={styles.showcaseCard}>
                  <EmptyState
                    icon={searchIcon}
                    title="予約が見つかりません"
                    description="条件を変えて再検索してください。"
                    action={<Button variant="outline" size="sm">条件をリセット</Button>}
                  />
                </Card>
              </Grid>
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
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        {/* ─── Recipes ─── */}
        <section id="recipes" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Badge variant="accent" size="sm">Recipes</Badge>
              <h2 className={styles.sectionTitle}>レシピ — 崩れない組み立ての手本</h2>
              <p className={styles.sectionDesc}>
                原子を「どう組むか」の正解を提示。下は実際に動く予約フローです（駐車場予約を想定）。
              </p>
            </div>

            <Grid minItemWidth={320} gap={6} align="start">
              <div>
                <h3 className={styles.showcaseLabel}>予約フロー（動作します）</h3>
                <BookingDemo />
              </div>
              <div>
                <h3 className={styles.showcaseLabel}>もっと見る</h3>
                <Card elevation={1} padding="lg">
                  <Stack gap={4}>
                    <p style={{ margin: 0, color: 'var(--kakka-color-semantic-text-secondary, #525249)', lineHeight: 1.7 }}>
                      Storybook には予約フローのフル版に加え、AppShell + Sidebar + PageHeader + Stat + Table +
                      Pagination で構成した<strong>ダッシュボード</strong>のレシピも収録しています。
                    </p>
                    <Stack direction="row" gap={2} wrap>
                      <Button variant="filled" onClick={() => window.open(`${STORYBOOK_URL}?path=/story/recipes-予約フロー--駐車場予約`, '_blank')}>
                        予約フロー（フル版）
                      </Button>
                      <Button variant="outline" onClick={() => window.open(`${STORYBOOK_URL}?path=/story/recipes-ダッシュボード--予約管理`, '_blank')}>
                        ダッシュボード
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </div>
            </Grid>
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

            <Grid minItemWidth={280} gap={4}>
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
            </Grid>
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
              <Button variant="filled" size="lg" onClick={() => window.open(GITHUB_URL, '_blank')}>
                GitHub で見る
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open(STORYBOOK_URL, '_blank')}>
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
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                GitHub
              </a>
              <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                Storybook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
