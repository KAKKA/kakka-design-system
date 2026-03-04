import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'メールアドレス',
  },
};

export const Required: Story = {
  args: {
    children: 'メールアドレス',
    required: true,
  },
};

export const WithHtmlFor: Story = {
  args: {
    children: '名前',
    htmlFor: 'name-input',
    required: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Label {...args} />
      <input
        id="name-input"
        type="text"
        placeholder="山田 太郎"
        style={{
          padding: '10px 12px',
          border: '1.5px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'inherit',
          outline: 'none',
        }}
      />
    </div>
  ),
};

export const Optional: Story = {
  args: {
    children: '備考（任意）',
    required: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label>通常のラベル</Label>
      <Label required>必須ラベル</Label>
      <Label>任意のラベル</Label>
    </div>
  ),
};
