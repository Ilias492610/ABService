'use client';

import { usePathname } from 'next/navigation';
import LegalInspection from './legal-inspection';
import ContactDetails from './contact-details';

const CvRepairServices = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/contact')) {
    return <ContactDetails />;
  }

  return <LegalInspection />;
};

export default CvRepairServices;
