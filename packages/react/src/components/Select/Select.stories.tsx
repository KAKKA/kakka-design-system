import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="option1">オプション 1</option>
    <option value="option2">オプション 2</option>
    <option value="option3">オプション 3</option>
  </>
);

export const Default: Story = {
  args: {
    children: options,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '選択してください',
    children: options,
    defaultValue: '',
  },
};

export const WithLabel: Story = {
  args: {
    label: '都道府県',
    placeholder: '選択してください',
    defaultValue: '',
    children: (
      <>
        <option value="tokyo">東京都</option>
        <option value="osaka">大阪府</option>
        <option value="kanagawa">神奈川県</option>
        <option value="aichi">愛知県</option>
        <option value="fukuoka">福岡県</option>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    label: '都道府県',
    placeholder: '選択してください',
    defaultValue: '',
    error: '都道府県を選択してください',
    children: (
      <>
        <option value="tokyo">東京都</option>
        <option value="osaka">大阪府</option>
        <option value="kanagawa">神奈川県</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: '無効なセレクト',
    defaultValue: 'option1',
    disabled: true,
    children: options,
  },
};

export const FullWidth: Story = {
  args: {
    label: '言語',
    defaultValue: 'ja',
    fullWidth: true,
    children: (
      <>
        <option value="ja">日本語</option>
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="ko">한국어</option>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};
