import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const Filler = ({ label }: { label: string }) => (
  <div
    style={{
      background: 'var(--kakka-color-gray-100, #EFEFEC)',
      border: '1px dashed var(--kakka-color-semantic-border-strong, #A8A89E)',
      borderRadius: 'var(--kakka-borderRadius-lg, 8px)',
      padding: '32px 16px',
      textAlign: 'center',
      fontFamily: 'var(--kakka-font-family-sans)',
      color: 'var(--kakka-color-semantic-text-secondary, #525249)',
      fontSize: '14px',
    }}
  >
    {label}
  </div>
);

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    padded: { control: 'boolean' },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 'lg', padded: true },
  render: (args) => (
    <div style={{ background: 'var(--kakka-color-gray-50, #F7F7F5)', padding: '24px 0' }}>
      <Container {...args}>
        <Filler label={`max-width: ${args.size}`} />
      </Container>
    </div>
  ),
};

export const ReadingWidth: Story = {
  name: '読み物幅 (md)',
  render: () => (
    <div style={{ background: 'var(--kakka-color-gray-50, #F7F7F5)', padding: '24px 0' }}>
      <Container size="md">
        <Filler label="記事・設定ページ向け (max-width 800px)" />
      </Container>
    </div>
  ),
};
