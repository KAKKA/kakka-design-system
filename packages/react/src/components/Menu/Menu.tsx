import {
  ComponentProps,
  forwardRef,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styles from './Menu.module.css';

// ─── MenuItem ────────────────────────────────────────────────────────────────

export interface MenuItemData {
  label: string;
  onSelect?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  /** セパレータをこの項目の上に表示する */
  separator?: boolean;
}

export interface MenuItemProps extends ComponentProps<'button'> {
  icon?: ReactNode;
  danger?: boolean;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ icon, danger = false, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="menuitem"
        type="button"
        className={[styles.item, className].filter(Boolean).join(' ')}
        data-danger={danger}
        {...props}
      >
        {icon && (
          <span className={styles.itemIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.itemLabel}>{children}</span>
      </button>
    );
  },
);
MenuItem.displayName = 'Menu.Item';

// ─── MenuSeparator ────────────────────────────────────────────────────────────

export const MenuSeparator = () => (
  <div role="separator" className={styles.separator} />
);
MenuSeparator.displayName = 'Menu.Separator';

// ─── Menu ────────────────────────────────────────────────────────────────────

export type MenuAlign = 'start' | 'end';

export interface MenuProps {
  /** トリガー要素。クリックで開閉する */
  trigger: ReactElement;
  /** items API（シンプルなケース） */
  items?: MenuItemData[];
  /** コンポジション API（children に MenuItem/MenuSeparator を渡す） */
  children?: ReactNode;
  /** ドロップダウンの水平方向アライン */
  align?: MenuAlign;
  className?: string;
  'data-testid'?: string;
}

export const Menu = ({
  trigger,
  items,
  children,
  align = 'start',
  className,
  'data-testid': dataTestId,
}: MenuProps) => {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // 外側クリックで閉じる
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open, close]);

  // Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        // トリガーにフォーカスを戻す
        (triggerRef.current as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  // 開いたときに最初の項目にフォーカス
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const first = list.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)');
    first?.focus();
  }, [open]);

  // 矢印キーで項目移動
  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(
      list.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)'),
    );
    const current = document.activeElement as HTMLElement;
    const idx = items.indexOf(current);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  // items API 用レンダリング
  const renderItems = () => {
    if (!items) return children;
    return items.map((item, i) => (
      <span key={i}>
        {item.separator && <MenuSeparator />}
        <MenuItem
          icon={item.icon}
          danger={item.danger}
          disabled={item.disabled}
          onClick={() => {
            if (!item.disabled) {
              item.onSelect?.();
              close();
            }
          }}
        >
          {item.label}
        </MenuItem>
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-testid={dataTestId}
    >
      {/* トリガー */}
      <span
        ref={triggerRef as RefObject<HTMLSpanElement>}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        style={{ display: 'inline-flex' }}
      >
        {trigger}
      </span>

      {/* ドロップダウンリスト */}
      {open && (
        <div
          id={menuId}
          ref={listRef}
          role="menu"
          className={styles.list}
          data-align={align}
          data-open={open}
          onKeyDown={handleListKeyDown}
          // Tab キーで閉じる（フォーカスが外れる）
          onBlur={(e) => {
            if (listRef.current && !listRef.current.contains(e.relatedTarget as Node)) {
              close();
            }
          }}
        >
          {renderItems()}
        </div>
      )}
    </div>
  );
};

Menu.displayName = 'Menu';
Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;
