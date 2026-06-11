import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl leading-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-base text-neutral-500 sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
