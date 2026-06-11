import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'NN Consulti — Tecnologia e inovação para sua empresa',
  description:
    'Soluções completas em infraestrutura, redes, servidores, cloud e segurança eletrônica. Entrega ágil em todo o Brasil com frete grátis.',
  keywords: [
    'NN Consulti',
    'tecnologia',
    'infraestrutura de TI',
    'servidores',
    'redes',
    'cloud',
    'segurança eletrônica',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'NN Consulti — Tecnologia e inovação para sua empresa',
    description:
      'Soluções completas em infraestrutura, redes, servidores, cloud e segurança eletrônica.',
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'pt_BR',
  },
  icons: { icon: '/favicon.ico' },
  themeColor: '#121212',
  // Cole aqui o código de verificação do Google Search Console quando tiver:
  // verification: { google: 'SEU_CODIGO_DE_VERIFICACAO' },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/logonn.png`,
  description:
    'Soluções completas em infraestrutura, redes, servidores, cloud e segurança eletrônica.',
  telephone: '+5541987866558',
  sameAs: [site.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
