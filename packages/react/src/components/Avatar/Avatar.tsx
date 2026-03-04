import type { ComponentProps } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<ComponentProps<'div'>, 'children'> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  ...props
}: AvatarProps) => {
  const initials = name ? getInitials(name) : null;

  return (
    <div
      className={[styles.avatar, className].filter(Boolean).join(' ')}
      data-size={size}
      role={src ? undefined : 'img'}
      aria-label={alt ?? name}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className={styles.image}
          onError={(e) => {
            // 画像読み込み失敗時はイニシャル表示にフォールバック
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : initials ? (
        <span className={styles.initials} aria-hidden="true">
          {initials}
        </span>
      ) : (
        <svg
          className={styles.fallbackIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
