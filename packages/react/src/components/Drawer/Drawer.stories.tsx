import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['right', 'left', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerStyle = {
  padding: '10px 20px',
  background: '#111',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
} as const;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
          Drawerを開く（right）
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="予約詳細" side="right">
          <p>駐車場の予約詳細をここに表示します。</p>
          <p style={{ marginTop: '12px' }}>スクロール可能なコンテンツが続きます。</p>
        </Drawer>
      </>
    );
  },
};

export const RightDrawer: Story = {
  name: 'Right（右側）',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
          右から開く
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="フィルター"
          side="right"
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label>
              <div style={{ marginBottom: '4px', fontWeight: 500 }}>エリア</div>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option>すべて</option>
                <option>渋谷区</option>
                <option>新宿区</option>
              </select>
            </label>
            <label>
              <div style={{ marginBottom: '4px', fontWeight: 500 }}>最大料金</div>
              <input
                type="number"
                placeholder="500"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </label>
          </div>
        </Drawer>
      </>
    );
  },
};

export const LeftDrawer: Story = {
  name: 'Left（左側）',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
          左から開く
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="メニュー" side="left" size="sm">
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['ホーム', '予約一覧', 'お気に入り', 'アカウント設定'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Drawer>
      </>
    );
  },
};

export const BottomDrawer: Story = {
  name: 'Bottom（下から）',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
          下から開く
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="並び替え" side="bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['距離が近い順', '料金が安い順', '評価が高い順', '空き状況順'].map((option) => (
              <button
                key={option}
                type="button"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
                onClick={() => setOpen(false)}
              >
                {option}
              </button>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  name: 'フッターあり（アクション）',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
          フッターありDrawer
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="予約確認"
          side="right"
          size="md"
          footer={
            <>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'transparent',
                  border: '1.5px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onClick={() => setOpen(false)}
              >
                キャンセル
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#8B7355',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                onClick={() => setOpen(false)}
              >
                予約を確定する
              </button>
            </>
          }
        >
          <p>予約内容をご確認ください。</p>
          <dl style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px' }}>
            <dt style={{ color: '#888', fontSize: '13px' }}>駐車場</dt>
            <dd style={{ margin: 0, fontSize: '14px' }}>渋谷パーキング A</dd>
            <dt style={{ color: '#888', fontSize: '13px' }}>日時</dt>
            <dd style={{ margin: 0, fontSize: '14px' }}>2026/06/17 10:00〜12:00</dd>
            <dt style={{ color: '#888', fontSize: '13px' }}>料金</dt>
            <dd style={{ margin: 0, fontSize: '14px' }}>¥400</dd>
          </dl>
        </Drawer>
      </>
    );
  },
};

export const SizeLg: Story = {
  name: 'Size: Large（520px）',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
          大きいDrawer（lg）
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="詳細情報" side="right" size="lg">
          <p>幅520pxのLargeサイズDrawerです。地図表示や詳細コンテンツに適しています。</p>
        </Drawer>
      </>
    );
  },
};
