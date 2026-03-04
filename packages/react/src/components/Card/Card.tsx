import type { ComponentProps, ElementType } from 'react';
import styles from './Card.module.css';

export type CardElevation = 0 | 1 | 2 | 3;
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardAs = 'div' | 'article' | 'section';

export interface CardProps extends ComponentProps<'div'> {
  elevation?: CardElevation;
  padding?: CardPadding;
  as?: CardAs;
}

export const Card = ({
  elevation = 1,
  padding = 'md',
  as: Tag = 'div',
  children,
  className,
  ...props
}: CardProps) => {
  const Component = Tag as ElementType;

  return (
    <Component
      className={[styles.card, className].filter(Boolean).join(' ')}
      data-elevation={elevation}
      data-padding={padding}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.displayName = 'Card';
