import { InputHTMLAttributes, forwardRef, useId } from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, id, className, disabled, ...props }, ref) => {
    const generatedId = useId();
    const radioId = id ?? generatedId;

    return (
      <label
        htmlFor={radioId}
        className={[styles.label, disabled ? styles.labelDisabled : ''].filter(Boolean).join(' ')}
      >
        <input
          ref={ref}
          id={radioId}
          type="radio"
          className={[styles.input, className].filter(Boolean).join(' ')}
          disabled={disabled}
          {...props}
        />
        <span className={styles.circle} aria-hidden="true" />
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
