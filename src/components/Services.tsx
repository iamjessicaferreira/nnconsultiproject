'use client';

import { SectionTitle } from './ui/SectionTitle';
import { Reveal, RevealItem } from './ui/Reveal';
import { services } from '@/lib/site';

type Props = {
  onSelect: (title: string) => void;
};

export function Services({ onSelect }: Props) {
  const handleSelect = (title: string) => {
    onSelect(title);
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="section-x scroll-mt-24 py-20 sm:py-28">
      <SectionTitle
        eyebrow="Nossos serviços"
        title="O que oferecemos aos nossos clientes"
        subtitle="Soluções completas de ponta a ponta para a infraestrutura de tecnologia da sua empresa."
      />

      <Reveal
        stagger
        className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
      >
        {services.map(({ icon: Icon, title }) => (
          <RevealItem key={title}>
            <button
              type="button"
              onClick={() => handleSelect(title)}
              className="group flex h-full w-full flex-col items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-yellow bg-brand-yellow text-brand-ink transition-colors duration-300 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-ink">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium text-brand-ink">{title}</span>
            </button>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
