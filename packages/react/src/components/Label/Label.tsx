import { HTMLAttributes, forwardRef } from 'react';
import styles from './Label.module.css';

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  htmlFor?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, htmlFor, children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={[styles.label, className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
        {required && (
          <span className={styles.required} aria-label="必須">
            必須
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
