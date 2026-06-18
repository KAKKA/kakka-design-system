import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  ElementType,
} from 'react';
import styles from './Sidebar.module.css';

/* ─────────────── Sidebar（コンテナ） ─────────────── */

export interface SidebarProps extends ComponentPropsWithoutRef<'nav'> {
  /** 上部固定エリア（ロゴ等） */
  header?: ReactNode;
  /** 下部固定エリア（ユーザー・設定等） */
  footer?: ReactNode;
  children: ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ header, footer, children, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={[styles.sidebar, className].filter(Boolean).join(' ')}
        {...props}
      >
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.scroll}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </nav>
    );
  },
);

Sidebar.displayName = 'Sidebar';

/* ─────────────── SidebarSection ─────────────── */

export interface SidebarSectionProps extends ComponentPropsWithoutRef<'div'> {
  /** セクション見出し（小さな大文字ラベル） */
  label?: string;
  children: ReactNode;
}

export const SidebarSection = ({ label, children, className, ...props }: SidebarSectionProps) => (
  <div className={[styles.section, className].filter(Boolean).join(' ')} {...props}>
    {label && <div className={styles.sectionLabel}>{label}</div>}
    <div className={styles.sectionItems}>{children}</div>
  </div>
);

SidebarSection.displayName = 'SidebarSection';

/* ─────────────── SidebarItem ─────────────── */

export interface SidebarItemProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  /** 先頭アイコン（16px 推奨のインラインSVG等） */
  icon?: ReactNode;
  /** 選択中状態 */
  active?: boolean;
  /** 末尾の補助表示（件数バッジ等） */
  trailing?: ReactNode;
  /** href を渡すと <a>、無ければ <button> としてレンダリング */
  href?: string;
  children: ReactNode;
}

export const SidebarItem = forwardRef<HTMLAnchorElement & HTMLButtonElement, SidebarItemProps>(
  ({ icon, active = false, trailing, href, children, className, ...props }, ref) => {
    const Component = (href ? 'a' : 'button') as ElementType;
    return (
      <Component
        ref={ref}
        href={href}
        type={href ? undefined : 'button'}
        className={[styles.item, className].filter(Boolean).join(' ')}
        data-active={active}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {icon && <span className={styles.itemIcon} aria-hidden="true">{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
        {trailing && <span className={styles.itemTrailing}>{trailing}</span>}
      </Component>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';
