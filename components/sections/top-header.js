'use client';

import { Mail, Phone } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="hidden bg-[#2f7a6e] md:block">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-3">
        <a
          href="https://vb-badkamers.be/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transform rounded-[6px] bg-[#ff6b9d] px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
        >
          Nu ook Badkamers!
        </a>

        <div className="flex items-center gap-6">
          <a href="tel:0495799899" className="flex items-center gap-[15px]">
            <Phone size={20} className="flex-shrink-0 text-white" />
            <div>
              <p className="mb-2 text-sm font-medium text-white">0495 79 98 99</p>
              <p className="text-xs text-[#f7f9fa]">Bel ons</p>
            </div>
          </a>

          <a
            href="mailto:info@verwarmingbros.be"
            className="flex items-center gap-[15px]"
          >
            <Mail size={20} className="flex-shrink-0 text-white" />
            <div>
              <p className="mb-2 text-sm font-medium text-white">E-mail ons</p>
              <p className="text-xs text-[#f7f9fa]">info@verwarmingbros.be</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
