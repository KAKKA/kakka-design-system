import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, value, textColor = '#1E1E19' }: { name: string; value: string; textColor?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{
      width: '100%',
      height: 64,
      background: value,
      borderRadius: 4,
      border: '1px solid rgba(0,0,0,0.08)',
    }} />
    <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
    <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#787870' }}>{value}</div>
  </div>
);

export const AllColors: Story = {
  render: () => (
    <div style={{ padding: 40, fontFamily: 'var(--kakka-font-family-sans)' }}>
      <h2 style={{ fontWeight: 700, marginBottom: 8, fontSize: 22 }}>グレースケール</h2>
      <p style={{ color: '#787870', marginBottom: 24, fontSize: 14 }}>
        微かな温かみを持つモノトーン。gray.900 は純黒ではなく #0A0A07 です。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 48 }}>
        {[
          { name: 'gray.0',   value: '#FFFFFF' },
          { name: 'gray.50',  value: '#F7F7F5' },
          { name: 'gray.100', value: '#EFEFEC' },
          { name: 'gray.200', value: '#E0E0DB' },
          { name: 'gray.300', value: '#C8C8C1' },
          { name: 'gray.400', value: '#A8A89E' },
          { name: 'gray.500', value: '#787870' },
          { name: 'gray.600', value: '#525249' },
          { name: 'gray.700', value: '#363630' },
          { name: 'gray.800', value: '#1E1E19' },
          { name: 'gray.900', value: '#0A0A07' },
        ].map(c => <ColorSwatch key={c.name} {...c} />)}
      </div>

      <h2 style={{ fontWeight: 700, marginBottom: 8, fontSize: 22 }}>アクセントカラー</h2>
      <p style={{ color: '#787870', marginBottom: 24, fontSize: 14 }}>
        KAKKA のオリジナリティを演出するウォームブラウン＋ダークオリーブ。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 48 }}>
        {[
          { name: 'accent.primary.light',   value: '#E8E4DC' },
          { name: 'accent.primary.default', value: '#8B7355' },
          { name: 'accent.primary.dark',    value: '#5C4A35' },
          { name: 'accent.secondary',       value: '#4A6741' },
        ].map(c => <ColorSwatch key={c.name} {...c} />)}
      </div>

      <h2 style={{ fontWeight: 700, marginBottom: 8, fontSize: 22 }}>セマンティックカラー</h2>
      <p style={{ color: '#787870', marginBottom: 24, fontSize: 14 }}>
        用途に応じたセマンティックな色定義。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { name: 'status.error',   value: '#C0392B' },
          { name: 'status.warning', value: '#B7860B' },
          { name: 'status.success', value: '#4A6741' },
          { name: 'status.info',    value: '#363630' },
        ].map(c => <ColorSwatch key={c.name} {...c} />)}
      </div>
    </div>
  ),
};
