import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Enable notifications',
    size: 'md',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Dark mode',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Dark mode',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled option',
  },
};

export const DisabledChecked: Story = {
  name: 'Disabled (Checked)',
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled and on',
  },
};

export const NoLabel: Story = {
  args: {
    checked: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const SizeSm: Story = {
  name: 'Size: Small',
  args: {
    checked: false,
    label: 'Small switch',
    size: 'sm',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const [md, setMd] = useState(true);
    const [sm, setSm] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
        <Switch checked={md} onCheckedChange={setMd} label="Medium (default)" size="md" />
        <Switch checked={sm} onCheckedChange={setSm} label="Small" size="sm" />
      </div>
    );
  },
};
