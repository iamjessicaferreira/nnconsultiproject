import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { site } from '@/lib/site';

export function Delivery() {
  return (
    <section
      id="delivery"
      className="scroll-mt-24 overflow-hidden bg-brand-yellow py-20 text-brand-ink sm:py-28"
    >
      <div className="section-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink shadow-sm">
            <MapPin size={14} />
            Entregas
          </span>
          <h2 className="font-serif text-3xl leading-snug sm:text-4xl lg:text-5xl">
            Entregamos com compromisso e agilidade em todo o Brasil com{' '}
            <span className="mt-2 inline-block rounded-lg bg-brand-ink px-3 py-1 leading-tight text-brand-yellow">
              frete grátis!
            </span>
          </h2>
          <Button
            href={site.whatsapp}
            external
            className="bg-brand-ink text-white hover:bg-white hover:text-brand-ink"
          >
            Entre em contato
            <ArrowRight size={18} />
          </Button>
          <small className="text-sm text-brand-ink/60">
            * Exceto para a região Norte.
          </small>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center">
          <Image
            src="/mapa.svg"
            width={480}
            height={480}
            alt="Mapa do Brasil indicando a área de entrega"
            className="h-auto w-full max-w-md"
          />
        </Reveal>
      </div>
    </section>
  );
}
