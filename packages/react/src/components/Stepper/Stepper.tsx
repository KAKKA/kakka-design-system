import { forwardRef, type ComponentProps } from 'react';
import styles from './Stepper.module.css';

export interface StepItem {
  label: string;
  description?: string;
}

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperProps extends Omit<ComponentProps<'ol'>, 'children'> {
  steps: StepItem[];
  current: number;
  orientation?: StepperOrientation;
}

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.5 7L5.5 10L11.5 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  ({ steps, current, orientation = 'horizontal', className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={[styles.stepper, className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < current;
          const isCurrent = index === current;
          const isLast = index === steps.length - 1;

          const stepState = isCompleted ? 'completed' : isCurrent ? 'current' : 'pending';

          return (
            <li
              key={index}
              className={styles.step}
              data-state={stepState}
              data-last={isLast}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className={styles.stepTrack}>
                <div className={styles.circle}>
                  {isCompleted ? (
                    <CheckIcon />
                  ) : (
                    <span className={styles.stepNumber} aria-hidden="true">
                      {index + 1}
                    </span>
                  )}
                </div>
                {!isLast && <div className={styles.connector} aria-hidden="true" />}
              </div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>{step.label}</span>
                {step.description && (
                  <span className={styles.stepDescription}>{step.description}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);

Stepper.displayName = 'Stepper';
