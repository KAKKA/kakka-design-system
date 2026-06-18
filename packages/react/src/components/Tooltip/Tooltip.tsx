import {
  ReactNode,
  ReactElement,
  MouseEvent,
  FocusEvent,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  cloneElement,
  isValidElement,
  Children,
} from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: ReactNode;
}

export const Tooltip = ({
  content,
  placement = 'top',
  delay = 300,
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hide();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hide]);

  // trigger へ aria-describedby と イベントハンドラを注入
  const child = Children.only(children);
  const trigger = isValidElement(child)
    ? cloneElement(child as ReactElement<Record<string, unknown>>, {
        'aria-describedby': visible ? tooltipId : undefined,
        onMouseEnter: (e: MouseEvent) => {
          show();
          const originalHandler = (child.props as Record<string, unknown>).onMouseEnter;
          if (typeof originalHandler === 'function') originalHandler(e);
        },
        onMouseLeave: (e: MouseEvent) => {
          hide();
          const originalHandler = (child.props as Record<string, unknown>).onMouseLeave;
          if (typeof originalHandler === 'function') originalHandler(e);
        },
        onFocus: (e: FocusEvent) => {
          show();
          const originalHandler = (child.props as Record<string, unknown>).onFocus;
          if (typeof originalHandler === 'function') originalHandler(e);
        },
        onBlur: (e: FocusEvent) => {
          hide();
          const originalHandler = (child.props as Record<string, unknown>).onBlur;
          if (typeof originalHandler === 'function') originalHandler(e);
        },
      })
    : child;

  return (
    <span className={styles.wrapper}>
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        className={styles.tooltip}
        data-placement={placement}
        data-visible={visible}
        aria-hidden={!visible}
      >
        {content}
        <span className={styles.arrow} data-placement={placement} aria-hidden="true" />
      </span>
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
