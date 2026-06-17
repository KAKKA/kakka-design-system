import { ComponentProps, forwardRef } from 'react';
import styles from './Pagination.module.css';

// ─── ページ番号リストを生成するユーティリティ ────────────────────────────────

/**
 * 表示するページ番号の配列を生成する。
 * 省略箇所は null で表現する。
 */
function buildPageItems(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: (number | null)[] = [];
  const SIBLINGS = 1; // 現在ページの前後に表示するページ数

  const left = Math.max(current - SIBLINGS, 2);
  const right = Math.min(current + SIBLINGS, total - 1);

  items.push(1);

  if (left > 2) {
    items.push(null); // 左の省略記号
  }

  for (let i = left; i <= right; i++) {
    items.push(i);
  }

  if (right < total - 1) {
    items.push(null); // 右の省略記号
  }

  items.push(total);

  return items;
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface PaginationProps extends Omit<ComponentProps<'nav'>, 'onChange'> {
  /** 現在のページ番号（1始まり） */
  page: number;
  /** 総ページ数 */
  totalPages: number;
  /** ページ変更時のコールバック */
  onPageChange: (page: number) => void;
  /** 件数表示を有効にする */
  showCount?: boolean;
  /** 総件数（showCount=true 時に使用） */
  totalItems?: number;
  /** 1ページあたりの件数（showCount=true 時に使用） */
  pageSize?: number;
  /** ナビゲーションの aria-label */
  ariaLabel?: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onPageChange,
      showCount = false,
      totalItems,
      pageSize,
      ariaLabel = 'ページネーション',
      className,
      ...props
    },
    ref,
  ) => {
    const isPrevDisabled = page <= 1;
    const isNextDisabled = page >= totalPages;

    const pageItems = buildPageItems(page, totalPages);

    // 件数表示テキストを計算
    const countText = (() => {
      if (!showCount || totalItems == null || pageSize == null) return null;
      const start = (page - 1) * pageSize + 1;
      const end = Math.min(page * pageSize, totalItems);
      return `${totalItems}件中 ${start}〜${end}件`;
    })();

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={[styles.root, className].filter(Boolean).join(' ')}
        {...props}
      >
        {/* 件数表示 */}
        {countText && (
          <span className={styles.count} aria-live="polite">
            {countText}
          </span>
        )}

        <div className={styles.controls}>
          {/* 前へ */}
          <button
            type="button"
            className={[styles.navButton, styles.prevButton].join(' ')}
            onClick={() => onPageChange(page - 1)}
            disabled={isPrevDisabled}
            aria-label="前のページへ"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11L5 7l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>前へ</span>
          </button>

          {/* ページ番号 */}
          <ol className={styles.pageList} role="list">
            {pageItems.map((item, idx) =>
              item === null ? (
                // 省略記号
                <li key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
                  &hellip;
                </li>
              ) : (
                <li key={item}>
                  <button
                    type="button"
                    className={styles.pageButton}
                    onClick={() => onPageChange(item)}
                    disabled={item === page}
                    aria-current={item === page ? 'page' : undefined}
                    aria-label={`${item}ページ目${item === page ? '（現在のページ）' : ''}`}
                    data-current={item === page}
                  >
                    {item}
                  </button>
                </li>
              ),
            )}
          </ol>

          {/* 次へ */}
          <button
            type="button"
            className={[styles.navButton, styles.nextButton].join(' ')}
            onClick={() => onPageChange(page + 1)}
            disabled={isNextDisabled}
            aria-label="次のページへ"
          >
            <span>次へ</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
