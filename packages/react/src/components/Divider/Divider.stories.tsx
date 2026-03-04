import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <p style={{ margin: '0 0 16px' }}>上のコンテンツ</p>
      <Divider />
      <p style={{ margin: '16px 0 0' }}>下のコンテンツ</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '40px', gap: '16px' }}>
      <span>左</span>
      <Divider orientation="vertical" />
      <span>右</span>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <p style={{ margin: '0 0 16px' }}>上のコンテンツ</p>
      <Divider label="または" />
      <p style={{ margin: '16px 0 0' }}>下のコンテンツ</p>
    </div>
  ),
};

export const WithLongLabel: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Divider label="セクション区切り" />
    </div>
  ),
};
