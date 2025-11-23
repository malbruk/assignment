import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface SimpleTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function SimpleTable<T>({ data, columns }: SimpleTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className={twMerge('px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.header} className={twMerge('px-4 py-3 text-sm text-slate-800', col.className)}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
