import type { ComponentProps } from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends Omit<ComponentProps<'nav'>, 'children'> {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items, className, ...props }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="パンくずリスト"
      className={[styles.nav, className].filter(Boolean).join(' ')}
      {...props}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              ) : (
                <span className={styles.text}>{item.label}</span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
