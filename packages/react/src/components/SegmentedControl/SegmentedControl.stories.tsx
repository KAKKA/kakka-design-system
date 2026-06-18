import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const viewOptions = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

export const Default: Story = {
  args: {
    value: 'list',
    options: viewOptions,
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onValueChange={setValue} />;
  },
};

export const TwoOptions: Story = {
  args: {
    value: 'on',
    options: [
      { value: 'on', label: 'On' },
      { value: 'off', label: 'Off' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onValueChange={setValue} />;
  },
};

export const SizeMd: Story = {
  name: 'Size: Medium',
  args: {
    value: 'list',
    options: viewOptions,
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onValueChange={setValue} />;
  },
};

export const SizeSm: Story = {
  name: 'Size: Small',
  args: {
    value: 'list',
    options: viewOptions,
    size: 'sm',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onValueChange={setValue} />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const [valueMd, setValueMd] = useState('list');
    const [valueSm, setValueSm] = useState('list');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <SegmentedControl value={valueMd} options={viewOptions} size="md" onValueChange={setValueMd} />
        <SegmentedControl value={valueSm} options={viewOptions} size="sm" onValueChange={setValueSm} />
      </div>
    );
  },
};
