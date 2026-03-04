import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Introduction',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '64px 32px',
      fontFamily: 'var(--kakka-font-family-sans)',
      color: 'var(--kakka-color-gray-800)',
    }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          margin: '0 0 16px',
          letterSpacing: '-0.02em',
          color: 'var(--kakka-color-gray-900)',
        }}>
          KAKKA Design System
        </h1>
        <p style={{
          fontSize: 18,
          lineHeight: 1.6,
          margin: 0,
          color: 'var(--kakka-color-gray-600)',
        }}>
          Android・iOS・Web に対応した、シンプルでオリジナリティのあるデザインシステム。
          モノトーンベースのカラーシステムと、一貫したコンポーネント設計で、
          あらゆるプラットフォームに統一した体験を提供します。
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        marginBottom: 48,
      }}>
        {[
          { label: 'Web (React)', icon: '⚛️', desc: '@kakka/react' },
          { label: 'Android', icon: '🤖', desc: 'Jetpack Compose' },
          { label: 'iOS', icon: '🍎', desc: 'SwiftUI' },
        ].map(item => (
          <div key={item.label} style={{
            padding: '24px',
            border: '1.5px solid var(--kakka-color-gray-200)',
            borderRadius: 8,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: 'var(--kakka-color-gray-500)', fontFamily: 'monospace' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>インストール</h2>
        <pre style={{
          background: 'var(--kakka-color-gray-100)',
          padding: '16px 20px',
          borderRadius: 4,
          fontFamily: 'var(--kakka-font-family-mono)',
          fontSize: 14,
          overflowX: 'auto',
          margin: 0,
        }}>
{`# npm
npm install @kakka/tokens @kakka/react

# pnpm
pnpm add @kakka/tokens @kakka/react`}
        </pre>
      </div>

      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>デザイン原則</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'シンプル', desc: '余計な要素を排除し、本質だけを残す。' },
            { title: 'オリジナリティ', desc: 'ウォームブラウンのアクセントが個性を添える。' },
            { title: 'アクセシビリティ', desc: 'WCAG 2.2 AA 準拠。すべての人に使いやすく。' },
            { title: 'クロスプラットフォーム', desc: 'トークンで統一したビジュアル言語を共有。' },
          ].map(item => (
            <div key={item.title} style={{
              padding: '20px',
              borderLeft: '3px solid var(--kakka-color-accent-primary-default)',
              background: 'var(--kakka-color-gray-50)',
              borderRadius: '0 4px 4px 0',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: 'var(--kakka-color-gray-600)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
