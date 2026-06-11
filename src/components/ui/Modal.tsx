'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ModalVariant = 'success' | 'error' | 'info';

const variantStyles: Record<
  ModalVariant,
  { Icon: typeof Info; iconClass: string }
> = {
  success: { Icon: CircleCheck, iconClass: 'text-green-600 bg-green-50' },
  error: { Icon: CircleAlert, iconClass: 'text-red-600 bg-red-50' },
  info: { Icon: Info, iconClass: 'text-brand-gold bg-brand-yellow/30' },
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: ModalVariant;
};

export function Modal({ open, onClose, title, message, variant = 'info' }: Props) {
  // close on Escape while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const { Icon, iconClass } = variantStyles[variant];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-brand-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-md p-1 text-neutral-400 transition-colors hover:text-brand-ink"
            >
              <X size={20} />
            </button>
            <span
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                iconClass,
              )}
            >
              <Icon size={26} />
            </span>
            <h3 id="modal-title" className="mt-4 font-serif text-2xl text-brand-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-gold"
            >
              Entendi
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
