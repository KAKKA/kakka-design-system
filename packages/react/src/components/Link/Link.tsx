import type { AnchorHTMLAttributes } from 'react';
import styles from './Link.module.css';

export type LinkVariant = 'default' | 'subtle';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  variant?: LinkVariant;
}

export const Link = ({
  href,
  external = false,
  variant = 'default',
  children,
  className,
  ...props
}: LinkProps) => {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={[styles.link, className].filter(Boolean).join(' ')}
      data-variant={variant}
      {...externalProps}
      {...props}
    >
      {children}
      {external && (
        <span className={styles.externalIcon} aria-label="（外部リンク）">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6.5 1H10M10 1V4.5M10 1L5 6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 2H2C1.44772 2 1 2.44772 1 3V9C1 9.55228 1.44772 10 2 10H8C8.55228 10 9 9.55228 9 9V6.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </a>
  );
};

Link.displayName = 'Link';
