import Image from 'next/image';
import { RiLinkedinBoxFill, RiWhatsappFill } from 'react-icons/ri';
import { navLinks, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-brand-yellow text-brand-ink">
      <div className="section-x flex flex-col gap-10 py-14">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <span className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-3 shadow-sm">
              <Image
                src="/logonn.png"
                width={140}
                height={140}
                alt="NN Consulti"
                className="h-auto w-full"
              />
            </span>
            <p className="max-w-xs text-center text-sm text-brand-ink/60 sm:text-left">
              Tecnologia e inovação com soluções completas para a sua empresa.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-ink/70 transition-colors hover:text-brand-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-brand-ink/70 transition-colors hover:text-whatsapp"
            >
              <RiWhatsappFill size={28} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-brand-ink/70 transition-colors hover:text-linkedin"
            >
              <RiLinkedinBoxFill size={28} />
            </a>
          </div>
        </div>

        <div className="border-t border-brand-ink/15 pt-6 text-center text-xs text-brand-ink/50">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
