import type { ComponentProps } from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends Omit<ComponentProps<'span'>, 'children'> {
  size?: SpinnerSize;
  label?: string;
}

export const Spinner = ({
  size = 'md',
  label = '読み込み中',
  className,
  ...props
}: SpinnerProps) => {
  return (
    <span
      role="status"
      aria-label={label}
      className={[styles.spinner, className].filter(Boolean).join(' ')}
      data-size={size}
      {...props}
    >
      <span className={styles.ring} aria-hidden="true" />
    </span>
  );
};

Spinner.displayName = 'Spinner';
