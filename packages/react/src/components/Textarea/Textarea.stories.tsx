import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'コメント',
    placeholder: 'ここにテキストを入力してください...',
    rows: 4,
  },
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};

export const WithHint: Story = {
  args: {
    label: '自己紹介',
    placeholder: '自己紹介を入力してください',
    hint: '200文字以内で入力してください',
    rows: 5,
  },
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: 'コメント',
    placeholder: 'コメントを入力してください',
    error: 'コメントは必須です。10文字以上入力してください。',
    rows: 4,
  },
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};

export const Required: Story = {
  args: {
    label: '問い合わせ内容',
    placeholder: 'お問い合わせ内容を詳しくご記入ください',
    required: true,
    rows: 6,
  },
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: '備考',
    value: 'このフィールドは編集できません。',
    disabled: true,
    rows: 3,
  },
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};

export const NoLabel: Story = {
  args: {
    placeholder: 'ラベルなしのテキストエリア',
    rows: 4,
  },
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};
