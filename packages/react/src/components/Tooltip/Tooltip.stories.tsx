import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'ツールチップのテキストです',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">ホバーしてください</Button>
    </Tooltip>
  ),
};

export const PlacementTop: Story = {
  name: 'Placement: Top',
  args: { content: '上に表示', placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Top</Button>
    </Tooltip>
  ),
};

export const PlacementBottom: Story = {
  name: 'Placement: Bottom',
  args: { content: '下に表示', placement: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Bottom</Button>
    </Tooltip>
  ),
};

export const PlacementLeft: Story = {
  name: 'Placement: Left',
  args: { content: '左に表示', placement: 'left' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Left</Button>
    </Tooltip>
  ),
};

export const PlacementRight: Story = {
  name: 'Placement: Right',
  args: { content: '右に表示', placement: 'right' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Right</Button>
    </Tooltip>
  ),
};

export const NoDelay: Story = {
  args: { content: '遅延なし', placement: 'top', delay: 0 },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="ghost">遅延なし</Button>
    </Tooltip>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '32px' }}>
      <Tooltip content="上に表示" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="下に表示" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="左に表示" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="右に表示" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
};
