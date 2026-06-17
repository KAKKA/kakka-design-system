import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import styles from './Table.module.css';

export interface TableColumn<Row> {
  /** Row オブジェクトのキー（render が不要な場合にセルの値として使う） */
  key: keyof Row;
  /** ヘッダに表示するラベル */
  header: ReactNode;
  /** セルの水平揃え */
  align?: 'left' | 'center' | 'right';
  /** th/td の width（例: '120px', '20%'） */
  width?: string;
  /** 数値列などに等幅フォントを適用（align='right' と組み合わせ推奨） */
  monospace?: boolean;
  /** カスタムセルレンダラ（省略時は row[key] を文字列変換） */
  render?: (row: Row, index: number) => ReactNode;
}

export type TableDensity = 'standard' | 'compact';

export interface TableProps<Row = Record<string, unknown>>
  extends Omit<ComponentProps<'div'>, 'children'> {
  /** カラム定義 */
  columns: TableColumn<Row>[];
  /** 表示するデータ配列 */
  data: Row[];
  /** 行ごとの一意キーを返す関数 */
  getRowKey: (row: Row, index: number) => string | number;
  /** 行の高さ: standard=48px / compact=36px */
  density?: TableDensity;
  /** ホバー時に行背景をグレーにする */
  hoverable?: boolean;
  /** 行クリックハンドラ（設定するとカーソルが pointer になる） */
  onRowClick?: (row: Row, index: number) => void;
  /** データが空の場合に表示するノード */
  empty?: ReactNode;
}

// ジェネリクス付きコンポーネントを forwardRef で包むための workaround
function TableInner<Row = Record<string, unknown>>(
  {
    columns,
    data,
    getRowKey,
    density = 'standard',
    hoverable = false,
    onRowClick,
    empty,
    className,
    ...props
  }: TableProps<Row>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const isClickable = typeof onRowClick === 'function';

  return (
    <div
      ref={ref}
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      {...props}
    >
      <table
        className={styles.table}
        data-density={density}
        data-hoverable={hoverable || isClickable ? 'true' : undefined}
      >
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={styles.th}
                style={{
                  textAlign: col.align ?? 'left',
                  width: col.width,
                }}
                data-monospace={col.monospace ? 'true' : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={styles.emptyCell}
              >
                {empty ?? (
                  <span className={styles.emptyDefault}>データがありません</span>
                )}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className={styles.tr}
                onClick={isClickable ? () => onRowClick(row, rowIndex) : undefined}
                style={isClickable ? { cursor: 'pointer' } : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={
                  isClickable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onRowClick(row, rowIndex);
                        }
                      }
                    : undefined
                }
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={styles.td}
                    style={{ textAlign: col.align ?? 'left' }}
                    data-monospace={col.monospace ? 'true' : undefined}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// forwardRef でラップしつつジェネリクスを保持する
export const Table = forwardRef(TableInner) as <Row = Record<string, unknown>>(
  props: TableProps<Row> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement | null;

(Table as { displayName?: string }).displayName = 'Table';
