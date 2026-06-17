import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: 'var(--kakka-color-gray-100, #EFEFEC)',
      border: '1px solid var(--kakka-color-semantic-border-default, #E0E0DB)',
      borderRadius: 'var(--kakka-borderRadius-lg, 8px)',
      padding: '20px 16px',
      fontSize: '14px',
      textAlign: 'center',
      fontFamily: 'var(--kakka-font-family-sans)',
      color: 'var(--kakka-color-semantic-text-secondary, #525249)',
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 12 } },
    minItemWidth: { control: { type: 'number' } },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8] },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FixedColumns: Story = {
  args: { columns: 3, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i}>セル {i + 1}</Box>
      ))}
    </Grid>
  ),
};

export const ResponsiveAutoFit: Story = {
  name: 'レスポンシブ (minItemWidth)',
  args: { minItemWidth: 220, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Box key={i}>カード {i + 1}</Box>
      ))}
    </Grid>
  ),
};

export const TwoColumnForm: Story = {
  name: 'フォーム2カラム',
  render: () => (
    <Grid columns={2} gap={4}>
      <Box>姓</Box>
      <Box>名</Box>
      <Box>メールアドレス</Box>
      <Box>電話番号</Box>
    </Grid>
  ),
};
