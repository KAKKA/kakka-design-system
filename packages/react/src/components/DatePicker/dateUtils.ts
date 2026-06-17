/** 依存ライブラリ無しの日付ユーティリティ（ローカルタイム基準・時刻は無視） */

export const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const isSameDay = (a: Date | null | undefined, b: Date | null | undefined): boolean =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const compareDay = (a: Date, b: Date): number =>
  startOfDay(a).getTime() - startOfDay(b).getTime();

export const isBeforeDay = (a: Date, b: Date): boolean => compareDay(a, b) < 0;
export const isAfterDay = (a: Date, b: Date): boolean => compareDay(a, b) > 0;

export const addDays = (d: Date, n: number): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const addMonths = (d: Date, n: number): Date =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

export const startOfMonth = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), 1);

export const isWithin = (d: Date, min?: Date | null, max?: Date | null): boolean => {
  if (min && isBeforeDay(d, min)) return false;
  if (max && isAfterDay(d, max)) return false;
  return true;
};

/** その月の表示用に 6 週（42 セル）分の日付配列を返す（前後月を含む）。 */
export const buildMonthMatrix = (month: Date, weekStartsOn: 0 | 1 = 0): Date[] => {
  const first = startOfMonth(month);
  const firstWeekday = first.getDay(); // 0=Sun
  const offset = (firstWeekday - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
};

const JA_MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export const formatMonthTitle = (d: Date): string => `${d.getFullYear()}年 ${JA_MONTHS[d.getMonth()]}`;

export const formatDateJa = (d: Date): string =>
  `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

export const weekdayLabels = (weekStartsOn: 0 | 1 = 0): string[] => {
  const base = ['日', '月', '火', '水', '木', '金', '土'];
  return weekStartsOn === 1 ? [...base.slice(1), base[0]] : base;
};
