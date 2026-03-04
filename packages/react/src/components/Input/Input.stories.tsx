import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'テキストを入力してください',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@kakka.design',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@kakka.design',
    type: 'email',
    defaultValue: 'invalid-email',
    error: '有効なメールアドレスを入力してください',
  },
};

export const WithHint: Story = {
  args: {
    label: 'パスワード',
    type: 'password',
    hint: '8文字以上で入力してください',
    placeholder: '••••••••',
  },
};

export const Disabled: Story = {
  args: {
    label: '無効なフィールド',
    defaultValue: '編集できません',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: '名前',
    placeholder: '山田 太郎',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
