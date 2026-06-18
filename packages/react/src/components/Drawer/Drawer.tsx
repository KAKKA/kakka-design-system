import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './Drawer.module.css';

export type DrawerSide = 'right' | 'left' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: DrawerSize;
}

export const Drawer = ({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  size = 'md',
}: DrawerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // showModal / close の制御
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  // Esc キー（cancel イベント）
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  // backdrop クリックで閉じる（パネル外をクリックした場合のみ）
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // パネルの div への click はバブルしてくるので、
    // dialog 要素自体が直接ターゲットの場合だけ閉じる
    if (e.target === dialog) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      data-open={open}
      data-side={side}
      data-size={size}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="閉じる"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </dialog>
  );
};

Drawer.displayName = 'Drawer';
