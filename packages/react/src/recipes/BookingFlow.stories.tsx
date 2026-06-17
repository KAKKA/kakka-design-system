import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Stepper,
  Container,
  Card,
  Field,
  Input,
  DatePicker,
  SegmentedControl,
  Button,
  Stack,
  Grid,
  Alert,
  Divider,
} from '../index';
import { formatDateJa } from '../components/DatePicker/dateUtils';

/**
 * 予約フロー Recipe — 駐車場予約のような複数ステップのトランザクションを、
 * KAKKA のコンポーネントだけで「出荷できる品質」に組み立てる手本。
 * Stepper + Container + Card + Field + DatePicker + SegmentedControl + Button の合成。
 */
const meta = {
  title: 'Recipes/予約フロー',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const STEPS = [
  { label: '日時を選択', description: '利用日と時間帯' },
  { label: 'お客様情報', description: '連絡先' },
  { label: '確認', description: '内容の確認' },
];

const TIME_SLOTS = [
  { value: 'am', label: '午前 (8:00-12:00)' },
  { value: 'pm', label: '午後 (12:00-18:00)' },
  { value: 'night', label: '夜間 (18:00-22:00)' },
];

const BookingFlow = () => {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState('am');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const canNext = step === 0 ? !!date : step === 1 ? !!name && !!email : true;

  return (
    <div style={{ background: 'var(--kakka-color-semantic-background-subtle, #F7F7F5)', minHeight: '100dvh', padding: '40px 0' }}>
      <Container size="md">
        <Stack gap={6}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, fontFamily: 'var(--kakka-font-family-sans)' }}>
              駐車場を予約する
            </h1>
            <p style={{ margin: '4px 0 0', color: 'var(--kakka-color-semantic-text-secondary, #525249)', fontSize: 14 }}>
              渋谷第1駐車場 ・ 3ステップで完了します
            </p>
          </div>

          <Stepper steps={STEPS} current={done ? 3 : step} />

          <Card padding="lg">
            {done ? (
              <Stack gap={4} align="center">
                <Alert variant="success" title="予約が完了しました">
                  確認メールを {email} に送信しました。
                </Alert>
                <Button variant="outline" onClick={() => { setDone(false); setStep(0); }}>
                  最初に戻る
                </Button>
              </Stack>
            ) : (
              <Stack gap={5}>
                {step === 0 && (
                  <>
                    <Field label="利用日" required>
                      <DatePicker value={date} onChange={setDate} placeholder="日付を選択" minDate={new Date()} fullWidth />
                    </Field>
                    <Field label="時間帯" required>
                      <SegmentedControl options={TIME_SLOTS} value={slot} onValueChange={setSlot} />
                    </Field>
                  </>
                )}

                {step === 1 && (
                  <Grid columns={1} gap={5}>
                    <Field label="お名前" required>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" fullWidth />
                    </Field>
                    <Field label="メールアドレス" required hint="予約確認メールをお送りします">
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="taro@example.com" fullWidth />
                    </Field>
                  </Grid>
                )}

                {step === 2 && (
                  <Stack gap={3}>
                    <SummaryRow label="利用日" value={date ? formatDateJa(date) : '-'} />
                    <Divider />
                    <SummaryRow label="時間帯" value={TIME_SLOTS.find((t) => t.value === slot)?.label ?? '-'} />
                    <Divider />
                    <SummaryRow label="お名前" value={name} />
                    <Divider />
                    <SummaryRow label="メール" value={email} />
                  </Stack>
                )}

                <Divider />
                <Stack direction="row" justify="between">
                  <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                    戻る
                  </Button>
                  {step < 2 ? (
                    <Button variant="filled" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
                      次へ
                    </Button>
                  ) : (
                    <Button variant="filled" onClick={() => setDone(true)}>
                      予約を確定する
                    </Button>
                  )}
                </Stack>
              </Stack>
            )}
          </Card>
        </Stack>
      </Container>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" justify="between" align="center">
    <span style={{ color: 'var(--kakka-color-semantic-text-secondary, #525249)', fontSize: 14 }}>{label}</span>
    <strong style={{ fontSize: 14 }}>{value}</strong>
  </Stack>
);

export const 駐車場予約: Story = {
  render: () => <BookingFlow />,
};
