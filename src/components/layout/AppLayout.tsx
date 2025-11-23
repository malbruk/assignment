import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { label: 'סטודנט', href: '/' },
  { label: 'רכז', href: '/coordinator' },
  { label: 'בודק', href: '/reviewer' },
  { label: 'אדמין', href: '/admin' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">Project Portal</span>
            <nav className="flex items-center gap-3 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={twMerge(
                    'rounded-full px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100',
                    location.pathname.startsWith(item.href) && item.href !== '/' ? 'bg-slate-200 text-slate-900' : '',
                    item.href === '/' && location.pathname === '/' ? 'bg-slate-200 text-slate-900' : ''
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600">שלום, דנה כהן</span>
            <button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">התנתק</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
