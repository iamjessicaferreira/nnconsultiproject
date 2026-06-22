import {
  AppWindow,
  ArrowRightLeft,
  BadgeCheck,
  BatteryCharging,
  Boxes,
  Calendar,
  CircuitBoard,
  Cloud,
  Cpu,
  Database,
  Layers,
  type LucideIcon,
  Monitor,
  Network,
  Puzzle,
  Server,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sun,
  User,
  Wifi,
} from 'lucide-react';

const whatsappBase =
  'https://api.whatsapp.com/send?phone=554187866558&text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre:%20';

export const site = {
  name: 'NN Consulti',
  url: 'https://www.nnconsulti.com.br',
  phone: '(41) 98786-6558',
  whatsapp: whatsappBase,
  linkedin: 'https://www.linkedin.com/company/nn-consulti/',
  email: 'nildete@nnconsulti.com.br',
};

export const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#services' },
  { label: 'Diferenciais', href: '#differences' },
  { label: 'Parceiros', href: '#partners' },
  { label: 'Entregas', href: '#delivery' },
  { label: 'Contato', href: '#form' },
];

export type Service = { icon: LucideIcon; title: string };

// Same 20 services as the original site, mapped to a single, consistent icon set.
export const services: Service[] = [
  { icon: Layers, title: 'Infraestrutura' },
  { icon: Wifi, title: 'Conectividade' },
  { icon: AppWindow, title: 'Softwares' },
  { icon: Monitor, title: 'Computadores' },
  { icon: Cpu, title: 'TI' },
  { icon: Network, title: 'Redes' },
  { icon: ArrowRightLeft, title: 'Switches' },
  { icon: Server, title: 'Servidores' },
  { icon: Settings, title: 'Automação' },
  { icon: Database, title: 'Datacenter' },
  { icon: ShieldCheck, title: 'Segurança eletrônica' },
  { icon: Calendar, title: 'Datadores' },
  { icon: User, title: 'Client' },
  { icon: Puzzle, title: 'Spare parts' },
  { icon: Sun, title: 'Solar' },
  { icon: BadgeCheck, title: 'Licenças' },
  { icon: ShoppingCart, title: 'PDV' },
  { icon: Cloud, title: 'Cloud' },
  { icon: CircuitBoard, title: 'Peças' },
  { icon: BatteryCharging, title: 'Nobreaks' },
];

export type Differential = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const differentials: Differential[] = [
  {
    icon: Boxes,
    title: 'Envio imediato',
    description: 'Enviamos seu pedido em até 48h após a confirmação.',
  },
  {
    icon: Calendar,
    title: 'Condições exclusivas',
    description:
      'Condições exclusivas para empresas: faturamos o seu boleto em até 180 dias.',
  },
  {
    icon: Puzzle,
    title: 'Soluções completas',
    description:
      'As mais completas soluções para os mais diferentes segmentos.',
  },
];

// Partner logos available in /public (the original .png set).
export const partners: string[] = [
  '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',
  '9.jpg', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',
  '16.png', '17.png',
];
