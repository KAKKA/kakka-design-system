import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: ElementType;
  /**
   * 最大幅。sm=640 / md=800 / lg=1100 / xl=1280 / full=制限なし。
   * 読み物は sm〜md、ダッシュボードは lg〜xl が目安。デフォルト lg。
   */
  size?: ContainerSize;
  /** 左右パディングを付与（レスポンシブ）。デフォルト true */
  padded?: boolean;
}

/**
 * Container — コンテンツの最大幅を制限し中央寄せするレイアウト原子。
 * ページ本文を毎回手書きの max-width で囲む手間と不統一をなくす。
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as, size = 'lg', padded = true, className, ...props }, ref) => {
    const Component = (as ?? 'div') as ElementType;
    return (
      <Component
        ref={ref}
        className={[styles.container, className].filter(Boolean).join(' ')}
        data-size={size}
        data-padded={padded}
        {...props}
      />
    );
  },
);

Container.displayName = 'Container';
