import Image from 'next/image';
import { Mail } from 'lucide-react';

const ContactDetails = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2f7a6f]">Bel ons</p>
          <h2 className="mt-2 text-4xl font-bold leading-tight text-[#1a2c3d]">
            Contactgegevens
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d15aabd3-7400-4814-b987-c0ca0874e387-verwarmingbros-be/assets/icons/logo-kempen-1.png"
              alt="Regio Kempen icoon"
              width={60}
              height={60}
              unoptimized
              className="mb-6"
            />
            <h3 className="mb-3 text-xl font-bold text-[#1a2c3d]">Regio Kempen</h3>
            <p className="text-sm leading-relaxed text-[#5a6c7d]">
              Neem contact op met ons via
              <br />
              <a href="tel:0493838696" className="font-semibold text-[#2f7a6f] hover:underline">
                0493 83 86 96
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d15aabd3-7400-4814-b987-c0ca0874e387-verwarmingbros-be/assets/icons/logo-antwerpen-2.jpg"
              alt="Regio Antwerpen icoon"
              width={60}
              height={60}
              unoptimized
              className="mb-6"
            />
            <h3 className="mb-3 text-xl font-bold text-[#1a2c3d]">Regio Antwerpen</h3>
            <p className="text-sm leading-relaxed text-[#5a6c7d]">
              Neem contact op met ons via
              <br />
              <a href="tel:0495799899" className="font-semibold text-[#2f7a6f] hover:underline">
                0495 79 98 99
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Mail className="mb-6 h-12 w-12 text-[#2f7a6f]" />
            <h3 className="mb-3 text-xl font-bold text-[#1a2c3d]">Gegevens</h3>
            <div className="text-sm leading-relaxed text-[#5a6c7d]">
              <p>
                <a href="mailto:info@verwarmingbros.be" className="font-semibold text-[#2f7a6f] hover:underline">
                  info@verwarmingbros.be
                </a>
              </p>
              <p>BTW BE0770446452</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
