import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps extends Omit<ComponentPropsWithoutRef<'header'>, 'title'> {
  /** ページタイトル */
  title: ReactNode;
  /** タイトル下の説明文 */
  description?: ReactNode;
  /** 右側のアクション群（Button 等）。Primary を最右に。 */
  actions?: ReactNode;
  /** タイトル上のパンくず（Breadcrumbs 等） */
  breadcrumbs?: ReactNode;
}

/**
 * PageHeader — ページ最上部の見出し帯。パンくず + タイトル + アクション + 説明を
 * 一貫した余白・タイポで配置する。ダッシュボード/詳細/設定すべての画面骨格の起点。
 */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, description, actions, breadcrumbs, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={[styles.header, className].filter(Boolean).join(' ')}
        {...props}
      >
        {breadcrumbs && <div className={styles.breadcrumbs}>{breadcrumbs}</div>}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </header>
    );
  },
);

PageHeader.displayName = 'PageHeader';
