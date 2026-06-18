import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'details', label: 'Details' },
  { value: 'reviews', label: 'Reviews' },
];

export const Default: Story = {
  args: {
    value: 'overview',
    tabs: defaultTabs,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div>
        <Tabs {...args} value={value} onValueChange={setValue} />
        <div style={{ padding: '16px', color: 'var(--kakka-color-semantic-text-secondary)' }}>
          Active tab: <strong>{value}</strong>
        </div>
      </div>
    );
  },
};

export const WithDisabledTab: Story = {
  args: {
    value: 'overview',
    tabs: [
      { value: 'overview', label: 'Overview' },
      { value: 'details', label: 'Details' },
      { value: 'reviews', label: 'Reviews', disabled: true },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Tabs {...args} value={value} onValueChange={setValue} />;
  },
};

export const ManyTabs: Story = {
  args: {
    value: 'tab1',
    tabs: [
      { value: 'tab1', label: 'General' },
      { value: 'tab2', label: 'Security' },
      { value: 'tab3', label: 'Notifications' },
      { value: 'tab4', label: 'Billing' },
      { value: 'tab5', label: 'Integrations' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Tabs {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithPanel: Story = {
  args: {
    value: 'overview',
    tabs: defaultTabs,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const content: Record<string, string> = {
      overview: 'This is the overview panel content.',
      details: 'Detailed information goes here.',
      reviews: 'User reviews and ratings appear here.',
    };
    return (
      <div>
        <Tabs {...args} value={value} onValueChange={setValue} />
        <div
          role="tabpanel"
          style={{
            padding: '16px',
            borderTop: 'none',
            color: 'var(--kakka-color-semantic-text-primary)',
          }}
        >
          {content[value]}
        </div>
      </div>
    );
  },
};
