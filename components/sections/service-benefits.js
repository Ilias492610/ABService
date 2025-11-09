'use client';

import { usePathname } from 'next/navigation';
import BenefitsDangers from './benefits-dangers';
import FaqSection from './faq-section';

const ServiceBenefits = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/contact')) {
    return <FaqSection />;
  }

  return <BenefitsDangers />;
};

export default ServiceBenefits;
