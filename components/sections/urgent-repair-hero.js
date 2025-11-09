'use client';

import { usePathname } from 'next/navigation';
import ProfessionalMaintenance from './professional-maintenance';
import ContactForm from './contact-form';

const UrgentRepairHero = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/contact')) {
    return <ContactForm />;
  }

  return <ProfessionalMaintenance />;
};

export default UrgentRepairHero;
