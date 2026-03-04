import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  message,
  variant = 'default',
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(false);

  // マウント後にフェードインアニメーション
  useEffect(() => {
    const enterTimer = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(enterTimer);
  }, []);

  // auto-dismiss
  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // フェードアウト完了後に onClose を呼ぶ
  const handleTransitionEnd = () => {
    if (!visible) {
      onClose?.();
    }
  };

  return (
    <div
      className={styles.toast}
      data-variant={variant}
      data-visible={visible}
      role="alert"
      aria-live="polite"
      onTransitionEnd={handleTransitionEnd}
    >
      <span className={styles.icon} aria-hidden="true">
        {variant === 'success' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {variant === 'warning' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L14.5 13.5H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
          </svg>
        )}
        {variant === 'error' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        {variant === 'default' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="4.5" r="0.75" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setVisible(false)}
          aria-label="閉じる"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

Toast.displayName = 'Toast';

/* --- ToastContainer: 複数トーストを右下に表示するコンテナ --- */
export interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContainer = ({ children }: ToastContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

ToastContainer.displayName = 'ToastContainer';
