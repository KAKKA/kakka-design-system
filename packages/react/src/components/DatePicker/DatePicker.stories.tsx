import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Calendar, DateRange } from './Calendar';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  name: '単日選択',
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ height: 380 }}>
        <DatePicker value={date} onChange={setDate} placeholder="予約日を選択" />
      </div>
    );
  },
};

export const Range: Story = {
  name: '期間選択',
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null });
    return (
      <div style={{ height: 380 }}>
        <DatePicker mode="range" range={range} onRangeChange={setRange} placeholder="期間を選択" fullWidth />
      </div>
    );
  },
};

export const InlineCalendar: Story = {
  name: 'インラインCalendar',
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div
        style={{
          display: 'inline-block',
          border: '1px solid var(--kakka-color-semantic-border-default, #E0E0DB)',
          borderRadius: 8,
        }}
      >
        <Calendar value={date} onChange={setDate} />
      </div>
    );
  },
};
