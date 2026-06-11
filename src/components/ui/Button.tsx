import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-yellow text-brand-ink shadow-sm hover:bg-brand-gold hover:text-brand-ink hover:shadow-md hover:-translate-y-0.5',
  outline:
    'border border-brand-ink/20 text-brand-ink hover:border-brand-ink hover:bg-brand-ink hover:text-white hover:-translate-y-0.5',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Renders an <a> when `href` is provided, otherwise a <button>. */
export function Button({
  children,
  variant = 'primary',
  className,
  href,
  external,
  ...rest
}: CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
    external?: boolean;
  }) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
