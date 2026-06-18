import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 基本 ─────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Popoverを開く</Button>,
    content: (
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>タイトル</p>
        <p style={{ margin: '8px 0 0' }}>ここにポップオーバーのコンテンツを表示します。</p>
      </div>
    ),
    placement: 'bottom',
  },
};

// ─── テキストのみ ────────────────────────────────────────────────────────────

export const TextOnly: Story = {
  name: 'Text Only',
  args: {
    trigger: <Button variant="ghost">詳細を見る</Button>,
    content: 'ここに補足情報やヒントテキストが入ります。最大幅は320pxです。',
    placement: 'bottom',
  },
};

// ─── 配置バリアント ───────────────────────────────────────────────────────────

export const PlacementTop: Story = {
  name: 'Placement: Top',
  args: {
    trigger: <Button variant="outline">上に表示</Button>,
    content: '上に表示されるポップオーバーです。',
    placement: 'top',
  },
};

export const PlacementRight: Story = {
  name: 'Placement: Right',
  args: {
    trigger: <Button variant="outline">右に表示</Button>,
    content: '右に表示されるポップオーバーです。',
    placement: 'right',
  },
};

export const PlacementLeft: Story = {
  name: 'Placement: Left',
  args: {
    trigger: <Button variant="outline">左に表示</Button>,
    content: '左に表示されるポップオーバーです。',
    placement: 'left',
  },
};

// ─── リッチコンテンツ ─────────────────────────────────────────────────────────

export const RichContent: Story = {
  name: 'Rich Content',
  render: () => (
    <Popover
      trigger={<Button variant="outline">リッチコンテンツ</Button>}
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '15px' }}>アカウント情報</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#e0d8cc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              K
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 500 }}>KAKKA User</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>user@example.com</p>
            </div>
          </div>
        </div>
      }
    />
  ),
};
