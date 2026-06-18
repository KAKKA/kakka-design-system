import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 基本（items API）────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">メニューを開く</Button>,
    items: [
      { label: '編集', onSelect: () => alert('編集') },
      { label: 'コピー', onSelect: () => alert('コピー') },
      { label: '削除', onSelect: () => alert('削除'), danger: true, separator: true },
    ],
  },
};

// ─── アイコン付き ─────────────────────────────────────────────────────────────

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 4h12M6 4V2h4v2M5 4v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const WithIcons: Story = {
  args: {
    trigger: <Button variant="outline">アイコン付きメニュー</Button>,
    items: [
      { label: '編集', icon: <EditIcon />, onSelect: () => alert('編集') },
      { label: 'コピー', icon: <CopyIcon />, onSelect: () => alert('コピー') },
      {
        label: '削除',
        icon: <TrashIcon />,
        onSelect: () => alert('削除'),
        danger: true,
        separator: true,
      },
    ],
  },
};

// ─── disabled 項目 ─────────────────────────────────────────────────────────────

export const WithDisabled: Story = {
  args: {
    trigger: <Button variant="outline">disabled 項目あり</Button>,
    items: [
      { label: '編集', onSelect: () => alert('編集') },
      { label: 'コピー（無効）', disabled: true },
      { label: '削除', onSelect: () => alert('削除'), danger: true, separator: true },
    ],
  },
};

// ─── 右端アライン ─────────────────────────────────────────────────────────────

export const AlignEnd: Story = {
  name: 'Align: End',
  args: {
    trigger: <Button variant="ghost">右端アライン ▾</Button>,
    align: 'end',
    items: [
      { label: 'プロフィール' },
      { label: '設定' },
      { label: 'ログアウト', danger: true, separator: true },
    ],
  },
};

// ─── コンポジション API ───────────────────────────────────────────────────────

export const CompositionAPI: Story = {
  name: 'Composition API',
  render: () => (
    <Menu trigger={<Button variant="outline">コンポジション</Button>}>
      <Menu.Item onClick={() => alert('プロフィール')}>プロフィール</Menu.Item>
      <Menu.Item onClick={() => alert('設定')}>設定</Menu.Item>
      <Menu.Separator />
      <Menu.Item danger onClick={() => alert('ログアウト')}>
        ログアウト
      </Menu.Item>
    </Menu>
  ),
};
