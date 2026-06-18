import { ComponentPropsWithoutRef, ElementType, forwardRef, CSSProperties } from 'react';
import styles from './Stack.module.css';

export type StackDirection = 'row' | 'column';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
/** spacing トークンのキー（--kakka-spacing-*） */
export type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  /** レンダリングする要素（デフォルト div） */
  as?: ElementType;
  /** 並び方向。デフォルト column（縦積み） */
  direction?: StackDirection;
  /** 子要素間の余白。spacing トークンのキー。デフォルト 4 (=16px) */
  gap?: SpaceScale;
  /** 交差軸の揃え */
  align?: StackAlign;
  /** 主軸の揃え */
  justify?: StackJustify;
  /** 折り返しを許可 */
  wrap?: boolean;
  /** inline-flex にする */
  inline?: boolean;
}

/**
 * Stack — 一次元のレイアウト原子。flexbox を gap で制御する。
 * 余白を毎回手書きせず、トークン化された gap で縦横の整列を一貫させる。
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as,
      direction = 'column',
      gap = 4,
      align,
      justify,
      wrap = false,
      inline = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const Component = (as ?? 'div') as ElementType;
    const mergedStyle: CSSProperties = {
      gap: `var(--kakka-spacing-${gap})`,
      ...style,
    };
    return (
      <Component
        ref={ref}
        className={[styles.stack, className].filter(Boolean).join(' ')}
        data-direction={direction}
        data-align={align}
        data-justify={justify}
        data-wrap={wrap}
        data-inline={inline}
        style={mergedStyle}
        {...props}
      />
    );
  },
);

Stack.displayName = 'Stack';
