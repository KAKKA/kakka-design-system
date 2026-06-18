import { ComponentProps, forwardRef, useCallback, useRef, KeyboardEvent } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: string;
  tabs: TabItem[];
  onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, tabs, onValueChange, className, ...props }, ref) => {
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const enabledTabs = tabs
          .map((tab, i) => ({ tab, i }))
          .filter(({ tab }) => !tab.disabled);
        const currentEnabledIndex = enabledTabs.findIndex(({ i }) => i === index);

        let nextEnabledIndex = -1;

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextEnabledIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          nextEnabledIndex =
            (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          nextEnabledIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          nextEnabledIndex = enabledTabs.length - 1;
        }

        if (nextEnabledIndex !== -1) {
          const nextTab = enabledTabs[nextEnabledIndex];
          tabRefs.current[nextTab.i]?.focus();
          onValueChange?.(nextTab.tab.value);
        }
      },
      [tabs, onValueChange],
    );

    return (
      <div ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
        <div role="tablist" className={styles.tablist} aria-label="Tabs">
          {tabs.map((tab, index) => {
            const isSelected = tab.value === value;
            return (
              <button
                key={tab.value}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                type="button"
                className={styles.tab}
                data-selected={isSelected}
                aria-selected={isSelected}
                disabled={tab.disabled}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  if (!tab.disabled) {
                    onValueChange?.(tab.value);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
