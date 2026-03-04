import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'オプション A',
  },
};

export const WithLabelChecked: Story = {
  name: 'WithLabel (Checked)',
  args: {
    label: 'オプション A',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '無効なラジオボタン',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  name: 'Disabled (Checked)',
  args: {
    label: '無効なラジオボタン（選択済み）',
    disabled: true,
    defaultChecked: true,
  },
};

export const Group: Story = {
  render: () => (
    <div
      role="radiogroup"
      aria-label="お支払い方法"
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <Radio name="payment" label="クレジットカード" defaultChecked />
      <Radio name="payment" label="銀行振込" />
      <Radio name="payment" label="コンビニ払い" />
      <Radio name="payment" label="電子マネー（無効）" disabled />
    </div>
  ),
};
