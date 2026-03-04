import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'デフォルトリンク',
    variant: 'default',
  },
};

export const Subtle: Story = {
  args: {
    href: '#',
    children: 'サトルリンク',
    variant: 'subtle',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: '外部リンク',
    external: true,
  },
};

export const ExternalSubtle: Story = {
  args: {
    href: 'https://example.com',
    children: 'サトル外部リンク',
    variant: 'subtle',
    external: true,
  },
};

export const InText: Story = {
  render: () => (
    <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.7, maxWidth: '360px' }}>
      KAKKA Design System は、<Link href="#">オープンソース</Link>のデザインシステムです。
      詳細については
      <Link href="https://example.com" external>
        公式ドキュメント
      </Link>
      をご覧ください。
    </p>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
      <Link href="#" variant="default">Default リンク</Link>
      <Link href="#" variant="subtle">Subtle リンク</Link>
      <Link href="https://example.com" variant="default" external>外部 Default リンク</Link>
      <Link href="https://example.com" variant="subtle" external>外部 Subtle リンク</Link>
    </div>
  ),
};
