import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { Sidebar, SidebarSection, SidebarItem } from '../Sidebar';
import { PageHeader } from '../PageHeader';
import { Button } from '../Button';

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Patterns/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoSidebar = (
  <Sidebar
    header={
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18 }}>
        <span
          style={{
            display: 'inline-flex',
            width: 28,
            height: 28,
            borderRadius: 6,
            background: 'var(--kakka-color-accent-primary-default, #8B7355)',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          K
        </span>
        KAKKA
      </div>
    }
    footer={<SidebarItem icon={icon('M10 3a3 3 0 100 6 3 3 0 000-6zM4 16a6 6 0 0112 0')}>アカウント</SidebarItem>}
  >
    <SidebarSection label="メイン">
      <SidebarItem icon={icon('M3 10l7-6 7 6M5 9v7h10V9')} active>
        ダッシュボード
      </SidebarItem>
      <SidebarItem icon={icon('M4 5h12M4 10h12M4 15h12')} trailing="12">
        予約一覧
      </SidebarItem>
      <SidebarItem icon={icon('M10 3v14M3 10h14')}>新規予約</SidebarItem>
    </SidebarSection>
    <SidebarSection label="管理">
      <SidebarItem icon={icon('M5 8l5 5 5-5')}>駐車場</SidebarItem>
      <SidebarItem icon={icon('M3 10a7 7 0 1014 0 7 7 0 00-14 0z')}>レポート</SidebarItem>
      <SidebarItem icon={icon('M10 4v12M4 10h12')}>設定</SidebarItem>
    </SidebarSection>
  </Sidebar>
);

export const Dashboard: Story = {
  render: () => (
    <AppShell
      sidebar={DemoSidebar}
      topbar={
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: 15 }}>渋谷第1駐車場</strong>
          <Button size="sm" variant="filled">新規予約</Button>
        </div>
      }
    >
      <PageHeader
        title="ダッシュボード"
        description="本日の予約状況と稼働率の概要です。"
        actions={<Button size="sm" variant="outline">期間を変更</Button>}
      />
      <div
        style={{
          marginTop: 24,
          minHeight: 320,
          borderRadius: 8,
          border: '1px dashed var(--kakka-color-semantic-border-strong, #A8A89E)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--kakka-color-semantic-text-secondary, #525249)',
        }}
      >
        ここにコンテンツ（Stat / Table など）が入ります
      </div>
    </AppShell>
  ),
};
