import { useMemo, useRef, useState, useEffect, KeyboardEvent } from 'react';
import styles from './Calendar.module.css';
import {
  addDays,
  addMonths,
  buildMonthMatrix,
  compareDay,
  formatDateJa,
  formatMonthTitle,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  isWithin,
  startOfDay,
  startOfMonth,
  weekdayLabels,
} from './dateUtils';

export type CalendarMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarProps {
  /** 'single'（単日） or 'range'（期間）。デフォルト single */
  mode?: CalendarMode;
  /** 単日モードの選択値 */
  value?: Date | null;
  /** 単日モードの選択コールバック */
  onChange?: (date: Date) => void;
  /** 期間モードの選択値 */
  range?: DateRange;
  /** 期間モードの選択コールバック */
  onRangeChange?: (range: DateRange) => void;
  /** 初期表示する月 */
  defaultMonth?: Date;
  /** 選択可能な最小日 */
  minDate?: Date;
  /** 選択可能な最大日 */
  maxDate?: Date;
  /** 週の開始曜日（0=日, 1=月）。デフォルト 0 */
  weekStartsOn?: 0 | 1;
}

/**
 * Calendar — 依存ライブラリ無しの月グリッド。単日・期間選択に対応。
 * DatePicker の中核として、また単体のインライン日付選択としても使える。
 */
export const Calendar = ({
  mode = 'single',
  value,
  onChange,
  range,
  onRangeChange,
  defaultMonth,
  minDate,
  maxDate,
  weekStartsOn = 0,
}: CalendarProps) => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialMonth =
    defaultMonth ?? value ?? range?.start ?? today;
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(initialMonth));
  const [focusedDate, setFocusedDate] = useState<Date>(startOfDay(initialMonth));
  const [hovered, setHovered] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocusRef = useRef(false);

  const matrix = useMemo(
    () => buildMonthMatrix(viewMonth, weekStartsOn),
    [viewMonth, weekStartsOn],
  );
  const weekdays = useMemo(() => weekdayLabels(weekStartsOn), [weekStartsOn]);

  useEffect(() => {
    if (shouldFocusRef.current && gridRef.current) {
      const el = gridRef.current.querySelector<HTMLButtonElement>('[data-focused="true"]');
      el?.focus();
      shouldFocusRef.current = false;
    }
  }, [focusedDate]);

  const moveFocus = (next: Date) => {
    shouldFocusRef.current = true;
    setFocusedDate(next);
    if (next.getMonth() !== viewMonth.getMonth() || next.getFullYear() !== viewMonth.getFullYear()) {
      setViewMonth(startOfMonth(next));
    }
  };

  const handleSelect = (date: Date) => {
    if (!isWithin(date, minDate, maxDate)) return;
    setFocusedDate(date);
    if (mode === 'single') {
      onChange?.(date);
      return;
    }
    const r = range ?? { start: null, end: null };
    if (!r.start || (r.start && r.end)) {
      onRangeChange?.({ start: date, end: null });
    } else {
      if (isBeforeDay(date, r.start)) {
        onRangeChange?.({ start: date, end: r.start });
      } else {
        onRangeChange?.({ start: r.start, end: date });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next: Date | null = null;
    switch (e.key) {
      case 'ArrowLeft':
        next = addDays(focusedDate, -1);
        break;
      case 'ArrowRight':
        next = addDays(focusedDate, 1);
        break;
      case 'ArrowUp':
        next = addDays(focusedDate, -7);
        break;
      case 'ArrowDown':
        next = addDays(focusedDate, 7);
        break;
      case 'PageUp':
        next = addMonths(focusedDate, -1);
        break;
      case 'PageDown':
        next = addMonths(focusedDate, 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelect(focusedDate);
        return;
      default:
        return;
    }
    if (next) {
      e.preventDefault();
      moveFocus(next);
    }
  };

  const cellState = (cell: Date) => {
    const outside = cell.getMonth() !== viewMonth.getMonth();
    const disabled = !isWithin(cell, minDate, maxDate);
    const isToday = isSameDay(cell, today);
    let selected = false;
    let rangeStart = false;
    let rangeEnd = false;
    let inRange = false;

    if (mode === 'single') {
      selected = isSameDay(cell, value ?? null);
    } else if (range) {
      rangeStart = isSameDay(cell, range.start);
      rangeEnd = isSameDay(cell, range.end);
      selected = rangeStart || rangeEnd;
      if (range.start && range.end) {
        inRange = isAfterDay(cell, range.start) && isBeforeDay(cell, range.end);
      } else if (range.start && hovered && !range.end) {
        const lo = isBeforeDay(hovered, range.start) ? hovered : range.start;
        const hi = isBeforeDay(hovered, range.start) ? range.start : hovered;
        inRange = compareDay(cell, lo) > 0 && compareDay(cell, hi) < 0;
      }
    }
    return { outside, disabled, isToday, selected, rangeStart, rangeEnd, inRange };
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setViewMonth(addMonths(viewMonth, -1))}
          aria-label="前の月"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className={styles.title} aria-live="polite">
          {formatMonthTitle(viewMonth)}
        </div>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          aria-label="次の月"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {weekdays.map((w) => (
          <div key={w} className={styles.weekday}>
            {w}
          </div>
        ))}
      </div>

      <div
        className={styles.grid}
        role="grid"
        ref={gridRef}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHovered(null)}
      >
        {matrix.map((cell) => {
          const s = cellState(cell);
          const isFocused = isSameDay(cell, focusedDate);
          return (
            <button
              key={cell.toISOString()}
              type="button"
              role="gridcell"
              className={styles.cell}
              data-outside={s.outside}
              data-today={s.isToday}
              data-selected={s.selected}
              data-range-start={s.rangeStart}
              data-range-end={s.rangeEnd}
              data-in-range={s.inRange}
              data-focused={isFocused}
              disabled={s.disabled}
              tabIndex={isFocused ? 0 : -1}
              aria-selected={s.selected}
              aria-label={formatDateJa(cell)}
              aria-current={s.isToday ? 'date' : undefined}
              onClick={() => handleSelect(cell)}
              onMouseEnter={() => setHovered(cell)}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Calendar.displayName = 'Calendar';
