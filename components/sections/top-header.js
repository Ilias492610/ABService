'use client';

import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const TopHeader = () => {
  return (
    <div className="hidden bg-white md:block border-b border-gray-300">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 ">
        <div className="flex items-center">
          <Image
            src="/LogoZ.png"
            alt="Logo"
            width={80}
            height={80}
            unoptimized
          />
          <span className="ml-[-12px] text-xl font-bold text-gray-900">AB Service</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:0484906966" className="flex items-center gap-[15px]">
            <Phone size={20} className="flex-shrink-0 text-gray-900" />
            <div>
              <p className="mb-1 text-sm font-medium text-gray-900">0484 906 966</p>
              <p className="text-sm text-gray-600">Bel ons</p>
            </div>
          </a>

          <a
            href="mailto:info@abservice.be"
            className="flex items-center gap-[15px]"
          >
            <Mail size={20} className="flex-shrink-0 text-gray-900" />
            <div>
              <p className="mb-1 text-sm font-medium text-gray-900">E-mail ons</p>
              <p className="text-sm text-gray-600">info@abservice.be</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
