import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeTone = 'default' | 'success' | 'warning' | 'info';

const styles: Record<BadgeTone, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-blue-100 text-blue-700',
};

export function Badge({ tone = 'default', children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return <span className={twMerge('rounded-full px-2.5 py-1 text-xs font-semibold', styles[tone], className)}>{children}</span>;
}
