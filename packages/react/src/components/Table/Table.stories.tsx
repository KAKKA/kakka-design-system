import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type TableColumn } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── サンプルデータ ──────────────────────────────────────────────
interface SalesRow {
  id: number;
  product: string;
  category: string;
  sales: number;
  stock: number;
  status: 'active' | 'discontinued';
}

const sampleData: SalesRow[] = [
  { id: 1, product: 'KAKKAシルバーリング', category: 'ジュエリー', sales: 128000, stock: 42, status: 'active' },
  { id: 2, product: 'ゴールドネックレス', category: 'ジュエリー', sales: 256000, stock: 18, status: 'active' },
  { id: 3, product: 'レザーウォレット', category: 'レザー', sales: 84000, stock: 0, status: 'discontinued' },
  { id: 4, product: 'ブレスレット S/M', category: 'ジュエリー', sales: 64000, stock: 73, status: 'active' },
];

const columns: TableColumn<SalesRow>[] = [
  { key: 'product', header: '商品名' },
  { key: 'category', header: 'カテゴリ' },
  {
    key: 'sales',
    header: '売上 (¥)',
    align: 'right',
    monospace: true,
    render: (row) => row.sales.toLocaleString('ja-JP'),
  },
  { key: 'stock', header: '在庫数', align: 'right', monospace: true },
  {
    key: 'status',
    header: 'ステータス',
    align: 'center',
    render: (row) => (
      <span
        style={{
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          background: row.status === 'active' ? '#E8EFE6' : '#EFEFEC',
          color: row.status === 'active' ? '#4A6741' : '#787870',
        }}
      >
        {row.status === 'active' ? '販売中' : '廃盤'}
      </span>
    ),
  },
];

// ── Stories ────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Table<SalesRow>
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
      density="standard"
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <Table<SalesRow>
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
      density="compact"
    />
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Table<SalesRow>
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
      hoverable
    />
  ),
};

export const Clickable: Story = {
  render: () => (
    <Table<SalesRow>
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
      // eslint-disable-next-line no-alert
      onRowClick={(row) => alert(`クリック: ${row.product}`)}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table<SalesRow>
      columns={columns}
      data={[]}
      getRowKey={(row) => row.id}
    />
  ),
};

export const EmptyWithCustomSlot: Story = {
  render: () => (
    <Table<SalesRow>
      columns={columns}
      data={[]}
      getRowKey={(row) => row.id}
      empty={
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#787870' }}>
            該当する商品が見つかりません
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#A8A89E' }}>
            検索条件を変更してください
          </p>
        </div>
      }
    />
  ),
};
