import { InputHTMLAttributes, forwardRef, useId } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className, disabled, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const errorId = error ? `${checkboxId}-error` : undefined;

    return (
      <div className={styles.wrapper}>
        <label
          htmlFor={checkboxId}
          className={[
            styles.label,
            disabled ? styles.labelDisabled : '',
            error ? styles.labelError : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={[styles.input, className].filter(Boolean).join(' ')}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={errorId}
            {...props}
          />
          <span
            className={[styles.box, error ? styles.boxError : ''].filter(Boolean).join(' ')}
            aria-hidden="true"
          />
          {label && <span className={styles.labelText}>{label}</span>}
        </label>
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
