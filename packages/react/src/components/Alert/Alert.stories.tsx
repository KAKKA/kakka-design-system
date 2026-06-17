import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    children: 'これは情報メッセージです。',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'ご案内',
    children: 'システムメンテナンスが予定されています。',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: '完了しました',
    children: '変更が正常に保存されました。',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '注意が必要です',
    children: 'この操作は元に戻せません。続行する前に確認してください。',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'エラーが発生しました',
    children: 'データの保存に失敗しました。もう一度お試しください。',
  },
};

export const WithClose: Story = {
  args: {
    variant: 'info',
    title: '閉じるボタン付き',
    children: '右上の×ボタンで閉じることができます。',
    onClose: () => alert('closed'),
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'タイトルのみのAlert',
  },
};

export const BodyOnly: Story = {
  args: {
    variant: 'warning',
    children: '本文のみのAlertです。タイトルなしでも使用できます。',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <Alert variant="info" title="情報">
        情報メッセージのサンプルです。
      </Alert>
      <Alert variant="success" title="成功">
        成功メッセージのサンプルです。
      </Alert>
      <Alert variant="warning" title="警告">
        警告メッセージのサンプルです。
      </Alert>
      <Alert variant="error" title="エラー">
        エラーメッセージのサンプルです。
      </Alert>
    </div>
  ),
};
