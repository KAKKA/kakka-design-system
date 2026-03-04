import type { ComponentProps } from 'react';
import styles from './Tag.module.css';

export type TagVariant = 'default' | 'accent';

export interface TagProps extends Omit<ComponentProps<'span'>, 'children'> {
  children: React.ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
}

export const Tag = ({
  children,
  variant = 'default',
  onRemove,
  className,
  ...props
}: TagProps) => {
  return (
    <span
      className={[styles.tag, className].filter(Boolean).join(' ')}
      data-variant={variant}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          aria-label="削除"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

Tag.displayName = 'Tag';
