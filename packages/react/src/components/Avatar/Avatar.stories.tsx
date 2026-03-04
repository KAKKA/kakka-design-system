import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    size: 'md',
  },
};

export const WithName: Story = {
  args: {
    name: 'Kakka Design',
    size: 'md',
  },
};

export const WithSingleName: Story = {
  args: {
    name: 'Tanaka',
    size: 'md',
  },
};

export const Fallback: Story = {
  args: {
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="Kakka Design" size="sm" />
      <Avatar name="Kakka Design" size="md" />
      <Avatar name="Kakka Design" size="lg" />
      <Avatar name="Kakka Design" size="xl" />
    </div>
  ),
};

export const WithImageAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="xl" />
    </div>
  ),
};
