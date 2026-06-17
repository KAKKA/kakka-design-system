import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useState,
  useCallback,
  CSSProperties,
} from 'react';
import styles from './AppShell.module.css';

export interface AppShellProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** 左サイドバーの中身（Sidebar 推奨） */
  sidebar?: ReactNode;
  /** 上部バーの中身（ロゴ・検索・ユーザーメニュー等） */
  topbar?: ReactNode;
  /** サイドバー幅(px)。デフォルト 256 */
  sidebarWidth?: number;
  /** モバイルでのサイドバー開閉（制御）。未指定なら内部状態で管理 */
  sidebarOpen?: boolean;
  /** 開閉トグル時に呼ばれる */
  onSidebarOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/**
 * AppShell — サイドバー + トップバー + コンテンツの管理画面骨格。
 * デスクトップではサイドバー常設、モバイルではオフキャンバス（オーバーレイ）で開閉。
 * これ一つで「画面の骨格を毎回手書きして崩れる」問題を防ぐ。
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      sidebar,
      topbar,
      sidebarWidth = 256,
      sidebarOpen,
      onSidebarOpenChange,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = sidebarOpen !== undefined;
    const open = isControlled ? sidebarOpen : internalOpen;

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isControlled) setInternalOpen(next);
        onSidebarOpenChange?.(next);
      },
      [isControlled, onSidebarOpenChange],
    );

    const mergedStyle = {
      ...style,
      ['--kakka-shell-sidebar-w']: `${sidebarWidth}px`,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={[styles.shell, className].filter(Boolean).join(' ')}
        data-has-sidebar={!!sidebar}
        data-sidebar-open={open}
        style={mergedStyle}
        {...props}
      >
        {sidebar && (
          <>
            <aside className={styles.sidebar}>{sidebar}</aside>
            <div
              className={styles.overlay}
              data-visible={open}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          </>
        )}
        <div className={styles.mainCol}>
          {topbar && (
            <header className={styles.topbar}>
              {sidebar && (
                <button
                  type="button"
                  className={styles.menuButton}
                  onClick={() => setOpen(!open)}
                  aria-label="メニューを開閉"
                  aria-expanded={open}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M3 5h14M3 10h14M3 15h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
              <div className={styles.topbarContent}>{topbar}</div>
            </header>
          )}
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    );
  },
);

AppShell.displayName = 'AppShell';
