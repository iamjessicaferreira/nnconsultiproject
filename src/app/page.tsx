'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Differentials } from '@/components/Differentials';
import { Partners } from '@/components/Partners';
import { Delivery } from '@/components/Delivery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  // Clicking a service prefills the contact form — replaces the old Redux store.
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services onSelect={setSelectedService} />
        <Differentials />
        <Partners />
        <Delivery />
        <Contact selectedService={selectedService} />
      </main>
      <Footer />
    </>
  );
}
