import type { ComponentProps } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={[styles.badge, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
