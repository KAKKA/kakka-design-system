import {
  cloneElement,
  forwardRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styles from './Popover.module.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** クリックすると Popover を開くトリガー要素 */
  trigger: ReactElement;
  /** Popover 内に表示するコンテンツ */
  content: ReactNode;
  /** 表示位置（デフォルト: bottom） */
  placement?: PopoverPlacement;
  className?: string;
  'data-testid'?: string;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      content,
      placement = 'bottom',
      className,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const popoverId = useId();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => setOpen(false), []);
    const toggle = useCallback(() => setOpen((v) => !v), []);

    // 外側クリックで閉じる
    useEffect(() => {
      if (!open) return;
      const handlePointerDown = (e: PointerEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
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
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, close]);

    return (
      <div
        ref={(node) => {
          // forwardRef と内部 ref を両立させる
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={[styles.root, className].filter(Boolean).join(' ')}
        data-testid={dataTestId}
      >
        {/* トリガー */}
        {cloneElement(trigger, {
          onClick: (e: MouseEvent) => {
            toggle();
            trigger.props.onClick?.(e);
          },
          'aria-haspopup': 'dialog',
          'aria-expanded': open,
          'aria-controls': open ? popoverId : undefined,
        })}

        {/* パネル */}
        {open && (
          <div
            id={popoverId}
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            className={styles.panel}
            data-placement={placement}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = 'Popover';
