import { ComponentProps, forwardRef, ReactNode } from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps extends ComponentProps<'div'> {
  /** アイコン要素（48px 相当の SVG など） */
  icon?: ReactNode;
  /** タイトル（必須） */
  title: string;
  /** 補足説明文 */
  description?: string;
  /** アクションスロット（Button など） */
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.emptyState, className].filter(Boolean).join(' ')}
        {...props}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
