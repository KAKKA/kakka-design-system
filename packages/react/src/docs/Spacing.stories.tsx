import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {
  render: () => (
    <div style={{ padding: 40, fontFamily: 'var(--kakka-font-family-sans)' }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>スペーシングスケール</h2>
      <p style={{ color: '#787870', marginBottom: 32, fontSize: 14 }}>4px ベースグリッド。</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { name: 'spacing.0',  px: 0  },
          { name: 'spacing.1',  px: 4  },
          { name: 'spacing.2',  px: 8  },
          { name: 'spacing.3',  px: 12 },
          { name: 'spacing.4',  px: 16 },
          { name: 'spacing.5',  px: 20 },
          { name: 'spacing.6',  px: 24 },
          { name: 'spacing.8',  px: 32 },
          { name: 'spacing.10', px: 40 },
          { name: 'spacing.12', px: 48 },
          { name: 'spacing.16', px: 64 },
          { name: 'spacing.20', px: 80 },
        ].map(({ name, px }) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ minWidth: 120, fontSize: 12, fontFamily: 'monospace', color: '#787870' }}>{name}</span>
            <span style={{ minWidth: 48, fontSize: 12, color: '#A8A89E' }}>{px}px</span>
            {px > 0 && (
              <div style={{
                height: 16,
                width: px,
                background: 'var(--kakka-color-accent-primary-default, #8B7355)',
                borderRadius: 2,
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  ),
};
