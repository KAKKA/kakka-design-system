import { InputHTMLAttributes, forwardRef, useId } from 'react';
import styles from './Switch.module.css';

export type SwitchSize = 'md' | 'sm';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: SwitchSize;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, label, size = 'md', id, disabled, className, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    return (
      <label
        className={[
          styles.wrapper,
          disabled ? styles.wrapperDisabled : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        htmlFor={switchId}
      >
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <span
          className={styles.track}
          data-size={size}
          data-checked={checked}
          aria-hidden="true"
        >
          <span className={styles.knob} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
