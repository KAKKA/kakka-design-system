import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypography: Story = {
  render: () => (
    <div style={{ padding: 40, fontFamily: 'var(--kakka-font-family-sans)', maxWidth: 800 }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>フォントサイズ</h2>
      {[
        { name: 'font.size.4xl', size: 36 },
        { name: 'font.size.3xl', size: 30 },
        { name: 'font.size.2xl', size: 24 },
        { name: 'font.size.xl',  size: 20 },
        { name: 'font.size.lg',  size: 18 },
        { name: 'font.size.md',  size: 16, note: 'Base' },
        { name: 'font.size.sm',  size: 14 },
        { name: 'font.size.xs',  size: 12 },
      ].map(({ name, size, note }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 16, borderBottom: '1px solid #E0E0DB', paddingBottom: 16 }}>
          <span style={{ minWidth: 160, fontSize: 12, fontFamily: 'monospace', color: '#787870' }}>{name}</span>
          <span style={{ minWidth: 40, fontSize: 12, color: '#A8A89E' }}>{size}px</span>
          <span style={{ fontSize: size, fontWeight: 500 }}>
            KAKKA Design System {note && <span style={{ fontSize: 12, color: '#8B7355', marginLeft: 8 }}>{note}</span>}
          </span>
        </div>
      ))}

      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24, marginTop: 48 }}>フォントウェイト</h2>
      {[
        { name: 'Regular (400)', weight: 400 },
        { name: 'Medium (500)',  weight: 500 },
        { name: 'Bold (700)',    weight: 700 },
      ].map(({ name, weight }) => (
        <div key={weight} style={{ marginBottom: 16 }}>
          <span style={{ display: 'block', fontSize: 12, fontFamily: 'monospace', color: '#787870', marginBottom: 4 }}>{name}</span>
          <span style={{ fontSize: 20, fontWeight: weight }}>KAKKAデザインシステム</span>
        </div>
      ))}

      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24, marginTop: 48 }}>モノスペース</h2>
      <pre style={{ fontFamily: 'var(--kakka-font-family-mono)', fontSize: 14, background: '#EFEFEC', padding: 16, borderRadius: 4 }}>
{`import { Button } from '@kakka/react';

<Button variant="filled">KAKKA</Button>`}
      </pre>
    </div>
  ),
};
