import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastContainer } from './Toast';
import { useToast } from './useToast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '360px', height: '80px' }}>
      <Toast message="操作が完了しました" variant="default" duration={0} />
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '360px', height: '80px' }}>
      <Toast message="保存に成功しました" variant="success" duration={0} />
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '360px', height: '80px' }}>
      <Toast message="入力内容を確認してください" variant="warning" duration={0} />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '360px', height: '80px' }}>
      <Toast message="エラーが発生しました" variant="error" duration={0} />
    </div>
  ),
};

export const WithUseToast: Story = {
  render: () => {
    const { toasts, showToast, dismissToast } = useToast();

    return (
      <div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['default', 'success', 'warning', 'error'] as const).map((variant) => (
            <button
              key={variant}
              type="button"
              onClick={() =>
                showToast({ message: `${variant} トースト`, variant, duration: 3000 })
              }
              style={{
                padding: '8px 16px',
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              {variant}
            </button>
          ))}
        </div>
        <ToastContainer>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onClose={() => dismissToast(toast.id)}
            />
          ))}
        </ToastContainer>
      </div>
    );
  },
};
