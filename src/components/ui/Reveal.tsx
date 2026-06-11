'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Orchestrate children (wrapped in <RevealItem>) with a staggered entrance. */
  stagger?: boolean;
};

/** Fade + slide-up once scrolled into view. */
export function Reveal({ children, className, delay = 0, stagger }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger ? container : item}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
}

/** Child of a <Reveal stagger> container. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
