import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: 'var(--kakka-color-accent-primary-light, #E8E4DC)',
      color: 'var(--kakka-color-accent-primary-dark, #5C4A35)',
      borderRadius: 'var(--kakka-borderRadius-md, 4px)',
      padding: '12px 16px',
      fontSize: '14px',
      fontFamily: 'var(--kakka-font-family-sans)',
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20] },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: [undefined, 'start', 'center', 'end', 'between', 'around'] },
    wrap: { control: 'boolean' },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: { direction: 'column', gap: 4 },
  render: (args) => (
    <Stack {...args}>
      <Box>1番目</Box>
      <Box>2番目</Box>
      <Box>3番目</Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: { direction: 'row', gap: 3 },
  render: (args) => (
    <Stack {...args}>
      <Box>A</Box>
      <Box>B</Box>
      <Box>C</Box>
    </Stack>
  ),
};

export const SpaceBetween: Story = {
  name: 'Row: justify=between',
  render: () => (
    <Stack direction="row" justify="between" align="center">
      <Box>左端</Box>
      <Box>右端</Box>
    </Stack>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <Stack direction="row" gap={2} wrap>
      {Array.from({ length: 12 }).map((_, i) => (
        <Box key={i}>項目 {i + 1}</Box>
      ))}
    </Stack>
  ),
};
