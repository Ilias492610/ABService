'use client';

import { usePathname } from 'next/navigation';
import HeroHeader from './hero-header';
import HerstellingHero from './herstelling-hero';
import MaintenanceHero from './maintenance-hero';

const PageHero = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/contact')) {
    return <HeroHeader />;
  }

  if (pathname?.startsWith('/onderhoud')) {
    return <MaintenanceHero />;
  }

  return <HerstellingHero />;
};

export default PageHero;
