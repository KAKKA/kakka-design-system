import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ダイアログを開く
        </button>
        <Dialog open={open} onClose={() => setOpen(false)} title="確認">
          <p>この操作を実行してもよろしいですか？</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1.5px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                padding: '8px 16px',
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              実行する
            </button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          タイトルなしダイアログ
        </button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <p>タイトルなしのダイアログコンテンツです。</p>
        </Dialog>
      </>
    );
  },
};

export const WithLongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          長いコンテンツのダイアログ
        </button>
        <Dialog open={open} onClose={() => setOpen(false)} title="利用規約">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} style={{ marginTop: i === 0 ? 0 : '12px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </Dialog>
      </>
    );
  },
};
