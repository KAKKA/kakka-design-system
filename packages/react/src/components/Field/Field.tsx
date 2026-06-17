import {
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
  useId,
  HTMLAttributes,
} from 'react';
import styles from './Field.module.css';

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** ラベル文言 */
  label?: string;
  /** 補助テキスト（エラーがない時のみ表示） */
  hint?: string;
  /** エラーメッセージ（指定時はエラー表示に切替） */
  error?: string;
  /** 必須マーク（*）を表示 */
  required?: boolean;
  /** 必須でない時に「任意」等のラベルを表示 */
  optionalText?: string;
  /** 横幅いっぱい。デフォルト true */
  fullWidth?: boolean;
  /** 単一のフォームコントロール（input/select/textarea/カスタム） */
  children: ReactNode;
}

type InjectableProps = {
  id?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  'data-error'?: boolean;
};

/**
 * Field — ラベル + コントロール + ヒント/エラーを一体化する汎用フォームラッパ。
 * 子コントロールへ id / aria-invalid / aria-describedby を自動注入し、
 * アクセシブルなフォーム行を一貫した余白で量産できる。
 */
export const Field = ({
  label,
  hint,
  error,
  required = false,
  optionalText,
  fullWidth = true,
  children,
  className,
  ...props
}: FieldProps) => {
  const generatedId = useId();
  const child = isValidElement(children) ? (children as ReactElement<InjectableProps>) : null;
  const controlId = child?.props.id ?? generatedId;
  const errorId = error ? `${controlId}-error` : undefined;
  const hintId = hint && !error ? `${controlId}-hint` : undefined;
  const describedBy =
    [child?.props['aria-describedby'], errorId, hintId].filter(Boolean).join(' ') || undefined;

  const control = child
    ? cloneElement(child, {
        id: controlId,
        'aria-invalid': error ? true : child.props['aria-invalid'],
        'aria-describedby': describedBy,
        'aria-required': required || child.props['aria-required'],
        'data-error': error ? true : child.props['data-error'],
      })
    : children;

  return (
    <div
      className={[styles.field, fullWidth ? styles.fullWidth : '', className]
        .filter(Boolean)
        .join(' ')}
      data-error={!!error}
      {...props}
    >
      {label && (
        <label htmlFor={controlId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
          {!required && optionalText && <span className={styles.optional}>{optionalText}</span>}
        </label>
      )}
      {control}
      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          <svg
            className={styles.errorIcon}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.9" fill="currentColor" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

Field.displayName = 'Field';
