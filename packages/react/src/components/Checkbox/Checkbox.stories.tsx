import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

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
    label: '利用規約に同意する',
  },
};

export const WithLabelChecked: Story = {
  name: 'WithLabel (Checked)',
  args: {
    label: '利用規約に同意する',
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: '利用規約に同意する',
    error: '利用規約への同意が必要です',
  },
};

export const Disabled: Story = {
  args: {
    label: '無効なチェックボックス',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  name: 'Disabled (Checked)',
  args: {
    label: '無効なチェックボックス（チェック済み）',
    disabled: true,
    defaultChecked: true,
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="オプション A" defaultChecked />
      <Checkbox label="オプション B" />
      <Checkbox label="オプション C" />
      <Checkbox label="オプション D（無効）" disabled />
    </div>
  ),
};
