import Image from 'next/image';
import { Instagram } from 'lucide-react';

const dienstenLinks = ['Onderhoud gasketel', 'Herstelling gasketel', 'Installatie gasketel', 'Keuring gasketel'];
const serviceLinks = ['Vaillant service', 'Bosch service', 'Bulex service', 'Junkers service'];
const algemeenLinks = ['Contact', 'Privacy voorwaarden', 'Algemene voorwaarden'];

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
    <ul className="space-y-1.5 text-sm text-white/80">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="transition-opacity hover:opacity-100">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#2f7a6f] text-white">
      <div className="mx-auto max-w-[1200px] px-8 pb-6 pt-[60px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Verwarming Bros</h3>
            <p className="mb-6 text-sm text-white/90">
              Wij garanderen snelle en efficiënte oplossingen en bieden tevens installaties van nieuwe gasketels aan. Uw comfort is onze hoogste prioriteit.
            </p>
            <h4 className="mb-4 text-base font-semibold">Volg ons</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white transition-colors hover:bg-white/10"
              >
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/svgs/whatsapp-logo-5.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  unoptimized
                />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white transition-colors hover:bg-white/10"
              >
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/svgs/f-7.svg"
                  alt="Facebook"
                  width={10}
                  height={20}
                  unoptimized
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white transition-colors hover:bg-white/10"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <FooterLinkColumn title="Diensten" links={dienstenLinks} />
          <FooterLinkColumn title="Onze service" links={serviceLinks} />
          <FooterLinkColumn title="Algemeen" links={algemeenLinks} />
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-white/70 md:flex md:items-center md:justify-between">
          <p className="text-[13px]">© Verwarming Bros. Alle rechten voorbehouden</p>
          <p className="text-[13px]">
            Website door{' '}
            <a href="#" className="text-white underline underline-offset-2 hover:text-white/90">
              Naverco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
