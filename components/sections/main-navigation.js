'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const navigationLinks = [
  { text: 'Home', href: '/' },
  { text: 'Onderhoud', href: '/onderhoud' },
  { text: 'Herstelling', href: '/herstelling' },
  {
    text: 'Installaties',
    submenu: [
      { title: 'Gasketels', href: '/installaties/gasketels' },
      { title: 'Sanitair', href: '/installaties/sanitair' },
      { title: 'Airconditioning', href: '/installaties/airconditioning' },
    ],
  },
  { text: 'Keuring', href: '/keuring' },
  { text: 'Contact', href: '/contact' },
];

const cn = (...classes) => classes.filter(Boolean).join(' ');

const MainNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setOpenMobileSubmenu(null);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-[1000] w-full bg-white transition-shadow duration-300',
        isScrolled && 'shadow-md'
      )}
    >
      <div className="mx-auto flex h-[82px] max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-0 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image src="/LogoZ.png" alt="AB Service" width={44} height={44} unoptimized />
          <span className="ml-[-4px] text-base font-semibold text-[#1a2c3d]">AB Service</span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex flex-1">
          {navigationLinks.map((link) =>
            link.submenu ? (
              <div
                key={link.text}
                className="relative"
                onMouseEnter={() => setOpenDesktopSubmenu(link.text)}
                onMouseLeave={() => setOpenDesktopSubmenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-[#1a2c3d] transition-colors hover:text-goudgeel"
                  aria-haspopup="menu"
                  aria-expanded={openDesktopSubmenu === link.text}
                >
                  {link.text.toUpperCase()}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div
                  className={cn(
                    'absolute left-0 top-full mt-2 w-48 rounded-md border border-slate-200 bg-white shadow-lg transition-opacity',
                    openDesktopSubmenu === link.text
                      ? 'pointer-events-auto opacity-100'
                      : 'pointer-events-none opacity-0'
                  )}
                >
                  <ul className="py-2">
                    {link.submenu.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-[#5a6c7d] transition-colors hover:bg-slate-100 hover:text-goudgeel"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={link.text}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-[#1a2c3d] transition-colors hover:text-goudgeel"
              >
                {link.text.toUpperCase()}
              </Link>
            )
          )}
          <span className="sr-only">nav spacer</span>
        </nav>

        <div className="ml-auto hidden lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#123247] px-7 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0e2736]"
          >
            Maak een afspraak
          </Link>
        </div>

        <a
          href="tel:0484906966"
          className="ml-auto mr-2 inline-flex items-center gap-2 rounded-md bg-[#123247] px-3 py-2 text-xs font-semibold uppercase text-white transition-colors hover:bg-[#0e2736] lg:hidden"
        >
          <Phone className="h-4 w-4" />
          Bel Ons
        </a>

        <button
          type="button"
          className="p-2 lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7 text-[#1a2c3d]" />
          ) : (
            <Menu className="h-7 w-7 text-[#1a2c3d]" />
          )}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-slate-200 bg-white lg:hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        )}
      >
        <div className="space-y-2 px-4 py-4">
          {navigationLinks.map((link) =>
            link.submenu ? (
              <div key={link.text}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold text-[#1a2c3d]"
                  onClick={() =>
                    setOpenMobileSubmenu((prev) => (prev === link.text ? null : link.text))
                  }
                  aria-expanded={openMobileSubmenu === link.text}
                >
                  {link.text.toUpperCase()}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      openMobileSubmenu === link.text && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn('space-y-1 px-3', openMobileSubmenu === link.text ? 'mt-1' : 'hidden')}
                >
                  {link.submenu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-[#5a6c7d] transition-colors hover:bg-slate-100 hover:text-goudgeel"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.text}
                href={link.href}
                className="block rounded-md px-3 py-3 text-sm font-semibold text-[#1a2c3d] transition-colors hover:bg-slate-100 hover:text-goudgeel"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text.toUpperCase()}
              </Link>
            )
          )}
          <a
            href="/contact"
            className="block rounded-md bg-[#123247] px-3 py-3 text-center text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0e2736]"
          >
            Maak een afspraak
          </a>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
