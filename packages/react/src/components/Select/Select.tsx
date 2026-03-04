import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import styles from './Select.module.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      placeholder,
      fullWidth = false,
      id,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div
        className={[styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}
      >
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            className={[styles.select, error ? styles.selectError : '', className]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={errorId}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <span className={styles.arrow} aria-hidden="true" />
        </div>
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
