import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'コンポーネント', href: '/components' },
      { label: 'Breadcrumbs' },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '現在のページ' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'ホーム' }],
  },
};

export const DeepNested: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'カテゴリ', href: '/category' },
      { label: 'サブカテゴリ', href: '/category/sub' },
      { label: '記事タイトル', href: '/category/sub/article' },
      { label: '現在のページ' },
    ],
  },
};
