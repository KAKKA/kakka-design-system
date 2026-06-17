import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';

/** Field と組み合わせる素のコントロール例（トークン準拠の最小スタイル）。 */
const demoInputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px 12px',
  fontFamily: 'var(--kakka-font-family-sans)',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--kakka-color-semantic-text-primary, #1E1E19)',
  background: 'var(--kakka-color-semantic-background-default, #fff)',
  border: '1.5px solid var(--kakka-color-semantic-border-strong, #A8A89E)',
  borderRadius: 'var(--kakka-borderRadius-md, 4px)',
  outline: 'none',
  boxSizing: 'border-box',
};

const meta = {
  title: 'Components/Field',
  component: Field,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    optionalText: { control: 'text' },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'お名前', hint: '本名でご記入ください', required: true },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Field {...args}>
        <input style={demoInputStyle} placeholder="山田 太郎" />
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  name: 'エラー状態',
  args: { label: 'メールアドレス', error: 'メールアドレスの形式が正しくありません', required: true },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Field {...args}>
        <input
          style={{ ...demoInputStyle, borderColor: 'var(--kakka-color-semantic-border-error, #C0392B)' }}
          defaultValue="invalid-email"
        />
      </Field>
    </div>
  ),
};

export const Optional: Story = {
  name: '任意項目',
  args: { label: '電話番号', optionalText: '任意', hint: 'ハイフンなしで入力' },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Field {...args}>
        <input style={demoInputStyle} placeholder="09012345678" />
      </Field>
    </div>
  ),
};
