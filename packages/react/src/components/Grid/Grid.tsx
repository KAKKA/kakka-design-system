import { ComponentPropsWithoutRef, ElementType, forwardRef, CSSProperties } from 'react';
import type { SpaceScale, StackAlign } from '../Stack/Stack';
import styles from './Grid.module.css';

export interface GridProps extends ComponentPropsWithoutRef<'div'> {
  as?: ElementType;
  /** 固定カラム数。指定時は repeat(columns, 1fr)。 */
  columns?: number;
  /**
   * レスポンシブ自動カラム。各アイテムの最小幅(px)。指定すると
   * repeat(auto-fit, minmax(minItemWidth, 1fr)) になり columns より優先。
   */
  minItemWidth?: number;
  /** グリッド間隔。spacing トークンのキー。デフォルト 4 (=16px) */
  gap?: SpaceScale;
  /** 行間隔を gap と別に指定する場合 */
  rowGap?: SpaceScale;
  /** align-items */
  align?: StackAlign;
}

/**
 * Grid — 二次元レイアウト原子。カード一覧・統計・フォームの2カラム化などに。
 * minItemWidth を渡すとメディアクエリ無しでレスポンシブに折り返す。
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { as, columns = 12, minItemWidth, gap = 4, rowGap, align, className, style, ...props },
    ref,
  ) => {
    const Component = (as ?? 'div') as ElementType;
    const templateColumns = minItemWidth
      ? `repeat(auto-fit, minmax(min(${minItemWidth}px, 100%), 1fr))`
      : `repeat(${columns}, minmax(0, 1fr))`;
    const mergedStyle: CSSProperties = {
      gridTemplateColumns: templateColumns,
      columnGap: `var(--kakka-spacing-${gap})`,
      rowGap: `var(--kakka-spacing-${rowGap ?? gap})`,
      ...style,
    };
    return (
      <Component
        ref={ref}
        className={[styles.grid, className].filter(Boolean).join(' ')}
        data-align={align}
        style={mergedStyle}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';
