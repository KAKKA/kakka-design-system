import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    title: 'KAKKA Design System とは何ですか？',
    content:
      'KAKKA Design System は、モノトーンを基調としたシンプルかつオリジナリティのあるデザインシステムです。React コンポーネント、CSS 変数、デザイントークンで構成されています。',
  },
  {
    title: '商用利用は可能ですか？',
    content:
      'はい、商用利用が可能です。ライセンスの詳細については、リポジトリの LICENSE ファイルをご確認ください。',
  },
  {
    title: 'カスタマイズ方法を教えてください。',
    content: (
      <div>
        <p style={{ margin: '0 0 8px' }}>CSS 変数を上書きすることでカスタマイズできます。</p>
        <pre
          style={{
            margin: 0,
            padding: '8px 12px',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '12px',
            overflowX: 'auto',
          }}
        >
          {`:root {\n  --kakka-color-gray-900: #1a1a2e;\n}`}
        </pre>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    allowMultiple: false,
  },
  decorators: [(Story) => <div style={{ width: '480px' }}><Story /></div>],
};

export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
  },
  decorators: [(Story) => <div style={{ width: '480px' }}><Story /></div>],
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        title: '単一アイテムのアコーディオン',
        content: 'これは単一のアイテムのみを持つアコーディオンです。',
      },
    ],
  },
  decorators: [(Story) => <div style={{ width: '480px' }}><Story /></div>],
};
