import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import styles from './Stat.module.css';

export type StatDeltaDirection = 'up' | 'down' | 'neutral';

export interface StatProps extends ComponentProps<'div'> {
  /** メトリクスのラベル（例: "月間売上"） */
  label: ReactNode;
  /** 表示する数値や文字列（例: "¥1,280,000"） */
  value: ReactNode;
  /** 変化量テキスト（例: "+12.3%"） */
  delta?: ReactNode;
  /** 変化の方向: up=増加(success色↑) / down=減少(error色↓) / neutral=変化なし */
  deltaDirection?: StatDeltaDirection;
  /** ラベル下に表示する補足テキスト */
  helpText?: ReactNode;
  /** カードの右上に配置するアイコン（インライン SVG を推奨） */
  icon?: ReactNode;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  (
    {
      label,
      value,
      delta,
      deltaDirection = 'neutral',
      helpText,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[styles.stat, className].filter(Boolean).join(' ')}
        {...props}
      >
        {/* ヘッダ: ラベル + アイコン */}
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          {icon && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}
        </div>

        {/* メインの値 */}
        <div className={styles.value}>{value}</div>

        {/* 変化量 */}
        {delta !== undefined && (
          <div
            className={styles.delta}
            data-direction={deltaDirection}
            aria-label={
              deltaDirection === 'up'
                ? '増加'
                : deltaDirection === 'down'
                  ? '減少'
                  : undefined
            }
          >
            {deltaDirection !== 'neutral' && (
              <span className={styles.deltaArrow} aria-hidden="true">
                {deltaDirection === 'up' ? (
                  /* 上矢印 */
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 10V2M2 6l4-4 4 4" />
                  </svg>
                ) : (
                  /* 下矢印 */
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2v8M2 6l4 4 4-4" />
                  </svg>
                )}
              </span>
            )}
            <span>{delta}</span>
          </div>
        )}

        {/* 補足テキスト */}
        {helpText && <p className={styles.helpText}>{helpText}</p>}
      </div>
    );
  },
);

Stat.displayName = 'Stat';
