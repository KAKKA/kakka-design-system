import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    showCount: { control: 'boolean' },
    totalItems: { control: { type: 'number', min: 0 } },
    pageSize: { control: { type: 'number', min: 1 } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 基本（Storybook controls 用にステートフルなラッパー） ─────────────────

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
  args: {
    page: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};

// ─── 件数表示あり ─────────────────────────────────────────────────────────────

export const WithCount: Story = {
  name: 'With Count Display',
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        page={page}
        totalPages={5}
        onPageChange={setPage}
        showCount
        totalItems={100}
        pageSize={20}
      />
    );
  },
};

// ─── ページ数が少ない（省略なし） ─────────────────────────────────────────────

export const FewPages: Story = {
  name: 'Few Pages (no ellipsis)',
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
  },
};

// ─── ページ数が多い（省略あり） ─────────────────────────────────────────────

export const ManyPages: Story = {
  name: 'Many Pages (with ellipsis)',
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} />;
  },
};

// ─── 先頭ページ ────────────────────────────────────────────────────────────────

export const FirstPage: Story = {
  name: 'First Page (prev disabled)',
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

// ─── 最終ページ ────────────────────────────────────────────────────────────────

export const LastPage: Story = {
  name: 'Last Page (next disabled)',
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

// ─── 1ページのみ ──────────────────────────────────────────────────────────────

export const SinglePage: Story = {
  name: 'Single Page (both disabled)',
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={1} onPageChange={setPage} />;
  },
};
