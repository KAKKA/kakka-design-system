import { ComponentProps, forwardRef } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'filled' | 'outline' | 'ghost';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={[styles.button, className].filter(Boolean).join(' ')}
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        data-full-width={fullWidth}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
