'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { RiLinkedinBoxFill, RiWhatsappFill } from 'react-icons/ri';
import { navLinks, site } from '@/lib/site';
import { cn } from '@/lib/cn';

function Socials({ size = 22 }: { size?: number }) {
  return (
    <>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="text-neutral-500 transition-colors hover:text-whatsapp"
      >
        <RiWhatsappFill size={size} />
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-neutral-500 transition-colors hover:text-linkedin"
      >
        <RiLinkedinBoxFill size={size} />
      </a>
    </>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-brand-yellow transition-all duration-300',
        scrolled ? 'border-b border-brand-ink/10 shadow-sm' : '',
      )}
    >
      <nav className="section-x flex h-16 items-center justify-between sm:h-20">
        <a href="#home" aria-label="NN Consulti — início" className="flex items-center">
          <Image
            src="/logo1.svg"
            width={48}
            height={48}
            alt="NN Consulti"
            priority
            className="h-10 w-auto sm:h-11"
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-brand-ink/80 transition-colors hover:text-brand-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-brand-ink after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <Socials />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="rounded-md p-2 text-brand-ink lg:hidden"
        >
          <Menu size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-brand-ink/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-72 max-w-[80%] flex-col bg-white p-6 shadow-xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Image src="/logo1.svg" width={40} height={40} alt="NN Consulti" className="h-9 w-auto" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="rounded-md p-2 text-brand-ink"
                >
                  <X size={26} />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-brand-ink/90 transition-colors hover:bg-brand-yellow/30"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-5 border-t border-neutral-100 pt-6">
                <Socials size={26} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
