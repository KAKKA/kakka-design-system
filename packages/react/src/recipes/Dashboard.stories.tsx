import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  AppShell,
  Sidebar,
  SidebarSection,
  SidebarItem,
  PageHeader,
  Stat,
  Grid,
  Table,
  TableColumn,
  Pagination,
  Badge,
  Button,
  SegmentedControl,
} from '../index';

/**
 * ダッシュボード Recipe — AppShell + Sidebar + PageHeader + Stat + Table + Pagination の合成。
 * 情報密度の高い管理画面を、余白・整列・密度を崩さず組み立てる手本。
 */
const meta = {
  title: 'Recipes/ダッシュボード',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Reservation {
  id: string;
  customer: string;
  date: string;
  slot: string;
  status: 'confirmed' | 'pending' | 'canceled';
  amount: number;
}

const ALL: Reservation[] = Array.from({ length: 43 }, (_, i) => ({
  id: `#${10293 - i}`,
  customer: ['田中 花子', '佐藤 太郎', '鈴木 一郎', '高橋 美咲', '渡辺 健'][i % 5],
  date: `2026-06-${String((i % 28) + 1).padStart(2, '0')}`,
  slot: ['午前', '午後', '夜間'][i % 3],
  status: (['confirmed', 'pending', 'canceled'] as const)[i % 3],
  amount: 800 + (i % 5) * 400,
}));

const STATUS: Record<Reservation['status'], { label: string; variant: 'success' | 'warning' | 'error' }> = {
  confirmed: { label: '確定', variant: 'success' },
  pending: { label: '保留', variant: 'warning' },
  canceled: { label: 'キャンセル', variant: 'error' },
};

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState('all');
  const pageSize = 8;
  const filtered = view === 'all' ? ALL : ALL.filter((r) => r.status === view);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: TableColumn<Reservation>[] = [
    { key: 'id', header: '予約番号', monospace: true },
    { key: 'customer', header: 'お客様' },
    { key: 'date', header: '利用日', monospace: true },
    { key: 'slot', header: '時間帯' },
    {
      key: 'status',
      header: 'ステータス',
      render: (r) => <Badge variant={STATUS[r.status].variant}>{STATUS[r.status].label}</Badge>,
    },
    {
      key: 'amount',
      header: '金額',
      align: 'right',
      monospace: true,
      render: (r) => `¥${r.amount.toLocaleString()}`,
    },
  ];

  return (
    <AppShell
      sidebar={
        <Sidebar
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18 }}>
              <span style={{ display: 'inline-flex', width: 28, height: 28, borderRadius: 6, background: 'var(--kakka-color-accent-primary-default, #8B7355)', color: '#fff', alignItems: 'center', justifyContent: 'center' }}>K</span>
              KAKKA Park
            </div>
          }
        >
          <SidebarSection label="メイン">
            <SidebarItem icon={icon('M3 10l7-6 7 6M5 9v7h10V9')}>ダッシュボード</SidebarItem>
            <SidebarItem icon={icon('M4 5h12M4 10h12M4 15h12')} active trailing="43">予約一覧</SidebarItem>
            <SidebarItem icon={icon('M10 3v14M3 10h14')}>新規予約</SidebarItem>
          </SidebarSection>
          <SidebarSection label="管理">
            <SidebarItem icon={icon('M3 10a7 7 0 1014 0 7 7 0 00-14 0z')}>レポート</SidebarItem>
            <SidebarItem icon={icon('M10 4v12M4 10h12')}>設定</SidebarItem>
          </SidebarSection>
        </Sidebar>
      }
      topbar={
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="filled">新規予約</Button>
        </div>
      }
    >
      <PageHeader
        title="予約一覧"
        description="渋谷第1駐車場の予約状況です。"
        actions={<Button size="sm" variant="outline">エクスポート</Button>}
      />

      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <Grid minItemWidth={200} gap={4}>
          <Stat label="本日の予約" value="18" delta="+12%" deltaDirection="up" />
          <Stat label="稼働率" value="86%" delta="+4pt" deltaDirection="up" />
          <Stat label="売上(今月)" value="¥1,284,000" delta="-3%" deltaDirection="down" />
          <Stat label="キャンセル" value="5" deltaDirection="neutral" delta="前週と同じ" />
        </Grid>
      </div>

      <div style={{ marginBottom: 16 }}>
        <SegmentedControl
          value={view}
          onValueChange={(v) => { setView(v); setPage(1); }}
          options={[
            { value: 'all', label: 'すべて' },
            { value: 'confirmed', label: '確定' },
            { value: 'pending', label: '保留' },
            { value: 'canceled', label: 'キャンセル' },
          ]}
        />
      </div>

      <Table<Reservation>
        columns={columns}
        data={rows}
        getRowKey={(r) => r.id}
        hoverable
        onRowClick={() => {}}
      />

      <div style={{ marginTop: 16 }}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showCount
          totalItems={filtered.length}
          pageSize={pageSize}
        />
      </div>
    </AppShell>
  );
};

export const 予約管理: Story = {
  render: () => <Dashboard />,
};
