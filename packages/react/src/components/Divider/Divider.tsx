import type { ComponentProps } from 'react';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends Omit<ComponentProps<'div'>, 'children'> {
  orientation?: DividerOrientation;
  label?: string;
}

export const Divider = ({
  orientation = 'horizontal',
  label,
  className,
  ...props
}: DividerProps) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={[styles.divider, styles.vertical, className].filter(Boolean).join(' ')}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        className={[styles.dividerWithLabel, className].filter(Boolean).join(' ')}
        role="separator"
        aria-label={label}
        {...props}
      >
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={[styles.divider, styles.horizontal, className].filter(Boolean).join(' ')}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
};

Divider.displayName = 'Divider';
