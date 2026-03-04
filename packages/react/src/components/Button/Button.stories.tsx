import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'md',
  },
};

export const Filled: Story = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const SizeLg: Story = {
  name: 'Size: Large',
  args: {
    children: 'Large Button',
    variant: 'filled',
    size: 'lg',
  },
};

export const SizeMd: Story = {
  name: 'Size: Medium',
  args: {
    children: 'Medium Button',
    variant: 'filled',
    size: 'md',
  },
};

export const SizeSm: Story = {
  name: 'Size: Small',
  args: {
    children: 'Small Button',
    variant: 'filled',
    size: 'sm',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'filled',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'filled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'filled',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
    </div>
  ),
};
