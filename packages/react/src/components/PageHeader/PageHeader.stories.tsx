import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';
import { Button } from '../Button';

const meta = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '予約一覧',
    description: '現在の駐車場予約を管理します。フィルタや検索で目的の予約を素早く見つけられます。',
  },
};

export const WithActions: Story = {
  name: 'アクション付き',
  args: {
    title: '予約一覧',
    description: '現在の駐車場予約を管理します。',
    actions: (
      <>
        <Button variant="outline" size="sm">
          エクスポート
        </Button>
        <Button variant="filled" size="sm">
          新規予約
        </Button>
      </>
    ),
  },
};

export const WithBreadcrumbs: Story = {
  name: 'パンくず付き',
  args: {
    breadcrumbs: 'ホーム / 予約 / 詳細',
    title: '予約 #10293',
    description: '2026年6月20日 10:00 - 12:00 / 渋谷第1駐車場',
    actions: <Button variant="outline" size="sm">キャンセル</Button>,
  },
};
