import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';

const sampleSteps = [
  { label: '駐車場選択', description: '希望の駐車場を選ぶ' },
  { label: '日時選択', description: '利用日時を入力する' },
  { label: '確認', description: '予約内容を確認する' },
  { label: '完了' },
];

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'range', min: 0, max: 3, step: 1 },
      description: '現在のステップインデックス（0始まり）',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: sampleSteps,
    current: 1,
    orientation: 'horizontal',
  },
};

export const HorizontalStep0: Story = {
  name: 'Horizontal – Step 1（最初）',
  args: {
    steps: sampleSteps,
    current: 0,
    orientation: 'horizontal',
  },
};

export const HorizontalStep2: Story = {
  name: 'Horizontal – Step 3（中盤）',
  args: {
    steps: sampleSteps,
    current: 2,
    orientation: 'horizontal',
  },
};

export const HorizontalCompleted: Story = {
  name: 'Horizontal – 全完了',
  args: {
    steps: sampleSteps,
    current: 4,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  name: 'Vertical – Step 2',
  args: {
    steps: sampleSteps,
    current: 1,
    orientation: 'vertical',
  },
  parameters: { layout: 'centered' },
};

export const VerticalWithDescription: Story = {
  name: 'Vertical – 説明あり',
  args: {
    steps: [
      { label: '駐車場選択', description: '地図から希望の駐車場を選択してください' },
      { label: '利用日時', description: '開始・終了日時を指定してください' },
      { label: 'お支払い方法', description: 'クレジットカードまたは電子マネー' },
      { label: '予約完了', description: '確認メールをお送りします' },
    ],
    current: 2,
    orientation: 'vertical',
  },
  parameters: { layout: 'centered' },
};

export const SimpleSteps: Story = {
  name: 'シンプル（ラベルのみ）',
  args: {
    steps: [{ label: '確認' }, { label: '入力' }, { label: '完了' }],
    current: 1,
    orientation: 'horizontal',
  },
};
