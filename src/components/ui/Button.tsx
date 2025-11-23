import { ButtonHTMLAttributes, ReactElement, ReactNode, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-blue-600',
  secondary: 'bg-white text-slate-800 border border-slate-200 hover:border-primary/60',
  ghost: 'text-slate-700 hover:bg-slate-100',
};

const baseClasses =
  'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center gap-2';

export function Button({ variant = 'primary', className, children, asChild, ...props }: ButtonProps) {
  const merged = twMerge(baseClasses, variants[variant], className);

  if (asChild && children && (children as ReactElement)) {
    return cloneElement(children as ReactElement, {
      className: twMerge((children as ReactElement).props.className, merged),
    });
  }

  return (
    <button className={merged} {...props}>
      {children}
    </button>
  );
}
