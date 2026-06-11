import Image from 'next/image';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { partners } from '@/lib/site';

export function Partners() {
  // duplicated so the marquee loops seamlessly at -50%
  const loop = [...partners, ...partners];

  return (
    <section id="partners" className="scroll-mt-24 py-20 sm:py-28">
      <div className="section-x">
        <SectionTitle
          eyebrow="Com quem trabalhamos"
          title="Empresas parceiras do nosso portfólio"
        />
      </div>

      <Reveal className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee marquee-track flex w-max gap-12 sm:gap-16">
          {loop.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="relative flex h-16 w-32 shrink-0 items-center justify-center sm:h-20 sm:w-40"
            >
              <Image
                src={`/${logo}`}
                alt="Logo de empresa parceira"
                fill
                sizes="160px"
                className="object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
