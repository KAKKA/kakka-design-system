import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elevation: 1,
    padding: 'md',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>カードタイトル</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          カードのコンテンツがここに入ります。
        </p>
      </div>
    ),
  },
};

export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {([0, 1, 2, 3] as const).map((elevation) => (
        <Card key={elevation} elevation={elevation} padding="md" style={{ width: '180px' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Elevation {elevation}</p>
        </Card>
      ))}
    </div>
  ),
};

export const Paddings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Card key={padding} elevation={1} padding={padding} style={{ width: '160px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>padding: {padding}</p>
        </Card>
      ))}
    </div>
  ),
};

export const AsArticle: Story = {
  args: {
    as: 'article',
    elevation: 1,
    padding: 'lg',
    children: (
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: '20px' }}>記事タイトル</h2>
        <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: 1.7 }}>
          これはarticle要素を使ったカードです。セマンティックなHTMLを生成します。
        </p>
      </div>
    ),
  },
};
