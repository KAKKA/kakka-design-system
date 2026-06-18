import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rect', 'circle'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

export const Text: Story = {
  args: { variant: 'text', width: '300px' },
};

export const Rect: Story = {
  args: { variant: 'rect', width: '320px', height: '180px' },
};

export const Circle: Story = {
  args: { variant: 'circle', width: '48px', height: '48px' },
};

export const TextMultiLine: Story = {
  name: 'Skeleton.Text (複数行)',
  render: () => (
    <div style={{ width: '320px' }}>
      <Skeleton.Text lines={4} lastLineWidth="40%" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  name: 'カードのスケルトン（合成例）',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '320px',
        padding: '16px',
        border: '1px solid #E0E0DB',
        borderRadius: '8px',
      }}
    >
      {/* サムネイル */}
      <Skeleton variant="rect" width="100%" height="180px" />
      {/* アバター + ユーザー名 */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Skeleton variant="circle" width="40px" height="40px" />
        <div style={{ flex: 1 }}>
          <Skeleton.Text lines={2} lastLineWidth="50%" />
        </div>
      </div>
      {/* 本文 */}
      <Skeleton.Text lines={3} lastLineWidth="70%" />
    </div>
  ),
};

export const ListSkeleton: Story = {
  name: 'リストのスケルトン（合成例）',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Skeleton variant="circle" width="48px" height="48px" />
          <div style={{ flex: 1 }}>
            <Skeleton.Text lines={2} lastLineWidth="60%" />
          </div>
        </div>
      ))}
    </div>
  ),
};
