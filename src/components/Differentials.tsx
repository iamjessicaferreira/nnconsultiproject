import { ArrowRight } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal, RevealItem } from './ui/Reveal';
import { Button } from './ui/Button';
import { differentials, site } from '@/lib/site';

export function Differentials() {
  return (
    <section
      id="differences"
      className="scroll-mt-24 bg-neutral-50 py-20 sm:py-28"
    >
      <div className="section-x">
        <SectionTitle
          eyebrow="Diferenciais"
          title="Por que escolher a NN Consulti?"
        />

        <Reveal
          stagger
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {differentials.map(({ icon: Icon, title, description }) => (
            <RevealItem key={title}>
              <article className="flex h-full flex-col items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/30 text-brand-gold">
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <h3 className="font-serif text-2xl text-brand-ink">{title}</h3>
                <p className="text-neutral-600">{description}</p>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Button href={site.whatsapp} external variant="outline">
            Conheça nossas condições
            <ArrowRight size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
