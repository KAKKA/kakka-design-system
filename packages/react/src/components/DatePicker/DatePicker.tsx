import { useEffect, useRef, useState, useId } from 'react';
import { Calendar, CalendarMode, DateRange } from './Calendar';
import { formatDateJa } from './dateUtils';
import styles from './DatePicker.module.css';

interface BaseProps {
  /** ボタンに表示するプレースホルダ */
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  /** エラー状態（枠を赤に） */
  error?: boolean;
  fullWidth?: boolean;
  weekStartsOn?: 0 | 1;
  id?: string;
}

interface SingleProps extends BaseProps {
  mode?: 'single';
  value?: Date | null;
  onChange?: (date: Date) => void;
}

interface RangeProps extends BaseProps {
  mode: 'range';
  range?: DateRange;
  onRangeChange?: (range: DateRange) => void;
}

export type DatePickerProps = SingleProps | RangeProps;

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 6h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * DatePicker — 入力ボタン + ポップオーバーカレンダー。単日・期間に対応。
 * 予約フローの日付選択を、外部依存なし・トークン準拠で提供する。
 */
export const DatePicker = (props: DatePickerProps) => {
  const {
    placeholder = '日付を選択',
    minDate,
    maxDate,
    disabled = false,
    error = false,
    fullWidth = false,
    weekStartsOn = 0,
    id,
  } = props;
  const mode: CalendarMode = props.mode ?? 'single';
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = (() => {
    if (mode === 'single') {
      const v = (props as SingleProps).value;
      return v ? formatDateJa(v) : null;
    }
    const r = (props as RangeProps).range;
    if (r?.start && r?.end) return `${formatDateJa(r.start)} 〜 ${formatDateJa(r.end)}`;
    if (r?.start) return `${formatDateJa(r.start)} 〜`;
    return null;
  })();

  return (
    <div
      ref={rootRef}
      className={[styles.root, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        id={fieldId}
        className={styles.trigger}
        data-error={error}
        data-placeholder={label === null}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <CalendarIcon />
        <span className={styles.triggerLabel}>{label ?? placeholder}</span>
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-modal="false" aria-label="日付を選択">
          {mode === 'single' ? (
            <Calendar
              mode="single"
              value={(props as SingleProps).value}
              onChange={(d) => {
                (props as SingleProps).onChange?.(d);
                setOpen(false);
              }}
              minDate={minDate}
              maxDate={maxDate}
              weekStartsOn={weekStartsOn}
            />
          ) : (
            <Calendar
              mode="range"
              range={(props as RangeProps).range}
              onRangeChange={(r) => {
                (props as RangeProps).onRangeChange?.(r);
                if (r.start && r.end) setOpen(false);
              }}
              minDate={minDate}
              maxDate={maxDate}
              weekStartsOn={weekStartsOn}
            />
          )}
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
