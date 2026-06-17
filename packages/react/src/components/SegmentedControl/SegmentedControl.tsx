import { ComponentProps, forwardRef, useCallback, useRef, KeyboardEvent } from 'react';
import styles from './SegmentedControl.module.css';

export type SegmentedControlSize = 'md' | 'sm';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: string;
  options: SegmentOption[];
  onValueChange?: (value: string) => void;
  size?: SegmentedControlSize;
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ value, options, onValueChange, size = 'md', className, ...props }, ref) => {
    const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const selectedIndex = options.findIndex((opt) => opt.value === value);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let nextIndex = -1;

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextIndex = (index + 1) % options.length;
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          nextIndex = (index - 1 + options.length) % options.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          nextIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          nextIndex = options.length - 1;
        }

        if (nextIndex !== -1) {
          segmentRefs.current[nextIndex]?.focus();
          onValueChange?.(options[nextIndex].value);
        }
      },
      [options, onValueChange],
    );

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={[styles.root, className].filter(Boolean).join(' ')}
        data-size={size}
        {...props}
      >
        {selectedIndex !== -1 && (
          <div
            className={styles.pill}
            aria-hidden="true"
            style={{
              width: `calc(${100 / options.length}% - 4px)`,
              transform: `translateX(calc(${selectedIndex * 100}% + ${selectedIndex * 4}px))`,
            }}
          />
        )}
        {options.map((option, index) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(el) => {
                segmentRefs.current[index] = el;
              }}
              role="radio"
              type="button"
              className={styles.segment}
              data-selected={isSelected}
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onValueChange?.(option.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  },
);

SegmentedControl.displayName = 'SegmentedControl';
