import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const DefaultIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M16 24h16M24 16v16" />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="21" cy="21" r="14" />
    <line x1="31.5" y1="31.5" x2="42" y2="42" />
  </svg>
);

const InboxIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 30 12 18 36 18 42 30" />
    <path d="M6 30h36v12H6z" />
    <polyline points="18 30 18 36 30 36 30 30" />
  </svg>
);

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'コンテンツがありません',
    description: 'まだ何も登録されていません。',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <DefaultIcon />,
    title: 'コンテンツがありません',
    description: 'まだ何も登録されていません。新しいアイテムを追加してください。',
  },
};

export const WithAction: Story = {
  args: {
    icon: <SearchIcon />,
    title: '検索結果がありません',
    description: '別のキーワードで検索してみてください。',
    action: <Button variant="filled">新しく作成する</Button>,
  },
};

export const Inbox: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'メッセージはありません',
    description: '受信したメッセージがここに表示されます。',
    action: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="filled">メッセージを送る</Button>
        <Button variant="outline">設定を変更</Button>
      </div>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'データがありません',
  },
};
