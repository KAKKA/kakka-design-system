import { useState, useRef, type ReactNode } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItemComponent = ({ item, isOpen, onToggle, index }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentId = `accordion-content-${index}`;
  const triggerId = `accordion-trigger-${index}`;

  return (
    <div className={styles.item} data-open={isOpen}>
      <h3 className={styles.heading}>
        <button
          id={triggerId}
          type="button"
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
        >
          <span className={styles.triggerLabel}>{item.title}</span>
          <span className={styles.icon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6L8 11L13 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.contentWrapper}
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 9999) + 'px' : '0px',
        }}
      >
        <div ref={contentRef} className={styles.content}>
          {item.content}
        </div>
      </div>
    </div>
  );
};

export const Accordion = ({ items, allowMultiple = false, className }: AccordionProps) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={[styles.accordion, className].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={index}
          item={item}
          isOpen={openIndices.has(index)}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
};

Accordion.displayName = 'Accordion';
