'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { site } from '@/lib/site';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 * i },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-ink"
    >
      {/* background photo — subject sits on the right, left stays dark for text */}
      <Image
        src="/bgnil.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_20%]"
      />
      {/* legibility scrim: darker on the left, fades toward the subject */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent"
      />

      <div className="section-x relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink"
          >
            Tecnologia &amp; Inovação
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            NN Consulti
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            Tecnologia e inovação? A NN Consulti tem a solução. Venha já tomar um
            café com os nossos especialistas!
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href={site.whatsapp} external>
              Entre em contato
              <ArrowRight size={18} />
            </Button>
            <Button
              href="#services"
              variant="outline"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-brand-ink"
            >
              Nossos serviços
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
