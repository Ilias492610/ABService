"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const HeaderExact = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#2C9BA0] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-white text-[#2C9BA0] w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl shadow-sm">
                  AB
                </div>
                <span className="font-bold text-sm hidden sm:inline">AB SERVICE</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-xs font-semibold transition-colors hidden sm:inline">
                NU OOK BADKAMERS!
              </button>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <a href="tel:0495799899" className="flex items-center gap-2 hover:underline">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="hidden md:block">
                  <div className="font-semibold">0495 79 98 99</div>
                  <div className="text-xs opacity-90">Bel ons</div>
                </div>
              </a>
              <a href="mailto:info@abservice.be" className="flex items-center gap-2 hover:underline">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div className="hidden md:block">
                  <div className="font-semibold">info@abservice.be</div>
                  <div className="text-xs opacity-90">E-mail ons</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Only show on non-home pages */}
            {!isHomePage && (
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-[#2C9BA0] text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl">
                  AB
                </div>
                <span className="font-bold text-gray-900">AB SERVICE</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="flex lg:hidden ml-auto mr-4">
              <button
                type="button"
                className="text-gray-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8 flex-1 lg:justify-center">
              <Link href="/" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm">Home</Link>
              <Link href="/onderhoud" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm">Onderhoud</Link>
              <Link href="/herstelling" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm">Herstelling</Link>
              <Link href="/installaties" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm flex items-center gap-1">
                Installaties
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/keuring" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm">Keuring</Link>
              <Link href="/foutcodes" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm flex items-center gap-1">
                Foutcodes
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-[#2C9BA0] font-medium transition-colors uppercase text-sm">Contact</Link>
            </div>

            {/* CTA Button */}
            <Link 
              href="/contact" 
              className="bg-[#2C9BA0] hover:bg-[#1a7c80] text-white px-6 py-2.5 rounded font-semibold transition-colors uppercase text-sm whitespace-nowrap"
            >
              Maak een afspraak
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className="block py-2 text-gray-900 font-medium uppercase text-sm">Home</Link>
              <Link href="/onderhoud" className="block py-2 text-gray-900 font-medium uppercase text-sm">Onderhoud</Link>
              <Link href="/herstelling" className="block py-2 text-gray-900 font-medium uppercase text-sm">Herstelling</Link>
              <Link href="/installaties" className="block py-2 text-gray-900 font-medium uppercase text-sm">Installaties</Link>
              <Link href="/keuring" className="block py-2 text-gray-900 font-medium uppercase text-sm">Keuring</Link>
              <Link href="/foutcodes" className="block py-2 text-gray-900 font-medium uppercase text-sm">Foutcodes</Link>
              <Link href="/contact" className="block py-2 text-gray-900 font-medium uppercase text-sm">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderExact;

