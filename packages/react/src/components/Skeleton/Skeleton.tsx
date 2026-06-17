import { ComponentProps, forwardRef } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends ComponentProps<'span'> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export interface SkeletonTextProps extends ComponentProps<'div'> {
  lines?: number;
  /** 各行の幅（最後の行を短くするなど） */
  lastLineWidth?: string | number;
}

const toPixels = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const SkeletonBase = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant = 'text', width, height, className, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={[styles.skeleton, className].filter(Boolean).join(' ')}
        data-variant={variant}
        style={{
          ...(width !== undefined ? { width: toPixels(width) } : {}),
          ...(height !== undefined ? { height: toPixels(height) } : {}),
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

SkeletonBase.displayName = 'Skeleton';

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = '60%', className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.skeletonText, className].filter(Boolean).join(' ')}
        style={style}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={styles.skeleton}
            data-variant="text"
            style={
              i === lines - 1 && lines > 1
                ? { width: toPixels(lastLineWidth) }
                : undefined
            }
          />
        ))}
      </div>
    );
  },
);

SkeletonText.displayName = 'Skeleton.Text';

export const Skeleton = Object.assign(SkeletonBase, {
  Text: SkeletonText,
});
