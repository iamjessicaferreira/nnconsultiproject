'use client';

import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { Modal, type ModalVariant } from './ui/Modal';
import { site } from '@/lib/site';

const EMAILJS = {
  serviceId: 'service_4t6bv2j',
  templateId: 'template_8jc32ye',
  publicKey: 'RCq0RHnaSdjRp5ISW',
};

// reCAPTCHA only renders/enforces when a site key is configured.
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const messageFor = (service: string | null) =>
  `Olá, gostaria de mais informações sobre ${service ?? 'seus serviços'}.`;

type Props = {
  selectedService: string | null;
};

type ModalState = {
  open: boolean;
  title: string;
  message: string;
  variant: ModalVariant;
};

const CLOSED_MODAL: ModalState = {
  open: false,
  title: '',
  message: '',
  variant: 'info',
};

export function Contact({ selectedService }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(CLOSED_MODAL);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: messageFor(null),
  });

  // Keep the message in sync with the service the user clicked in the grid.
  useEffect(() => {
    setForm((prev) => ({ ...prev, message: messageFor(selectedService) }));
  }, [selectedService]);

  const openModal = (
    variant: ModalVariant,
    title: string,
    message: string,
  ) => setModal({ open: true, variant, title, message });

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Honeypot: a hidden field humans never see. If it's filled, it's a bot.
    const honeypot = formRef.current.elements.namedItem(
      'company_website',
    ) as HTMLInputElement | null;
    if (honeypot?.value) return;

    if (!form.name || !form.email || !form.message) {
      openModal(
        'error',
        'Campos incompletos',
        'Por favor, preencha todos os campos do formulário.',
      );
      return;
    }

    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      openModal(
        'error',
        'Confirmação necessária',
        'Confirme que você não é um robô antes de enviar.',
      );
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        formRef.current,
        EMAILJS.publicKey,
      );
      openModal(
        'success',
        'Mensagem enviada!',
        `Recebemos o seu contato e retornaremos em breve. Se preferir, fale conosco no WhatsApp ${site.phone}.`,
      );
      setForm({ name: '', email: '', message: messageFor(null) });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch {
      openModal(
        'error',
        'Não foi possível enviar',
        `Tente novamente em instantes ou fale conosco no WhatsApp ${site.phone}.`,
      );
    } finally {
      setStatus('idle');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-brand-ink outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/30';

  return (
    <section id="form" className="section-x scroll-mt-24 py-20 sm:py-28">
      <SectionTitle eyebrow="Contato" title="Entre em contato" />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Info panel — replaces the original 2.6 MB illustration */}
        <Reveal className="flex flex-col justify-between gap-6 rounded-3xl bg-brand-yellow p-8 text-brand-ink sm:p-10">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl">
              Vamos conversar sobre o seu projeto
            </h3>
            <p className="mt-3 text-brand-ink/70">
              Conte para a nossa equipe o que você precisa. Respondemos o mais
              rápido possível.
            </p>
          </div>
          <ul className="flex flex-col gap-5">
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ink/10 text-brand-ink transition-colors group-hover:bg-brand-gold group-hover:text-brand-ink">
                  <MessageCircle size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-brand-ink/50">
                    WhatsApp
                  </span>
                  <span className="text-sm font-medium">{site.phone}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ink/10 text-brand-ink">
                <Mail size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-brand-ink/50">
                  E-mail
                </span>
                <span className="text-sm font-medium">{site.email}</span>
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ink/10 text-brand-ink">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-brand-ink/50">
                  Telefone
                </span>
                <span className="text-sm font-medium">{site.phone}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-neutral-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:p-10"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-brand-ink">
                Nome da empresa
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="NN Consulti"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-brand-ink">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contato@suaempresa.com.br"
                className={inputClass}
              />
              <span className="text-xs text-neutral-400">
                Não iremos compartilhar seu e-mail.
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-brand-ink">
                Como podemos te ajudar?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Honeypot — hidden from users, bots tend to fill it */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={setCaptchaToken}
                onExpired={() => setCaptchaToken(null)}
              />
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-7 py-3 text-sm font-semibold text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
              <Send size={16} />
            </button>
          </form>
        </Reveal>
      </div>

      <Modal
        open={modal.open}
        onClose={closeModal}
        variant={modal.variant}
        title={modal.title}
        message={modal.message}
      />
    </section>
  );
}
