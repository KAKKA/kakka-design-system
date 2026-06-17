import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';

const meta = {
  title: 'Components/Stat',
  component: Stat,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── インラインSVGアイコン例（依存なし） ──────────────────────
const SalesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 10h16M10 2l6 8-6 8-6-8 6-8z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="7" r="3" />
    <path d="M2 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M14 5c1.7 0 3 1.3 3 3M17 17c0-2.2-1.3-4-3-4" />
  </svg>
);

const OrderIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <path d="M7 8h6M7 12h4" />
  </svg>
);

// ── Stories ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: '月間売上',
    value: '¥1,280,000',
    delta: '+12.3%',
    deltaDirection: 'up',
    helpText: '先月比',
  },
};

export const DeltaDown: Story = {
  args: {
    label: '直帰率',
    value: '34.2%',
    delta: '-2.1%',
    deltaDirection: 'down',
    helpText: '先週比',
  },
};

export const Neutral: Story = {
  args: {
    label: '在庫数',
    value: '1,042',
    delta: '±0',
    deltaDirection: 'neutral',
    helpText: '昨日と同数',
  },
};

export const WithIcon: Story = {
  args: {
    label: '月間売上',
    value: '¥1,280,000',
    delta: '+12.3%',
    deltaDirection: 'up',
    helpText: '先月比',
    icon: <SalesIcon />,
  },
};

export const NoDelta: Story = {
  args: {
    label: '登録商品数',
    value: '248',
  },
};

export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      <Stat
        label="月間売上"
        value="¥1,280,000"
        delta="+12.3%"
        deltaDirection="up"
        helpText="先月比"
        icon={<SalesIcon />}
      />
      <Stat
        label="新規顧客数"
        value="84"
        delta="+7"
        deltaDirection="up"
        helpText="先月比"
        icon={<UsersIcon />}
      />
      <Stat
        label="受注件数"
        value="326"
        delta="-14"
        deltaDirection="down"
        helpText="先月比"
        icon={<OrderIcon />}
      />
      <Stat
        label="平均客単価"
        value="¥3,926"
        delta="+¥140"
        deltaDirection="up"
        helpText="先月比"
      />
    </div>
  ),
};

export const LongValue: Story = {
  args: {
    label: '累計売上',
    value: '¥128,400,000',
    delta: '+23.8%',
    deltaDirection: 'up',
    helpText: '前年同月比',
    icon: <SalesIcon />,
  },
};
