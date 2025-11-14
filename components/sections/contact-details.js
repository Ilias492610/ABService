import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

const ContactDetails = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-donkerblauw">Bel ons</p>
          <h2 className="mt-2 text-4xl font-bold leading-tight text-[#1a2c3d]">
            Contactgegevens
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Phone className="mb-6 h-12 w-12 text-donkerblauw" />
            <h3 className="mb-3 text-xl font-bold text-[#1a2c3d]">Telefoonnummer</h3>
            <p className="text-sm leading-relaxed text-[#5a6c7d]">
              Neem contact op met ons via
              <br />
              <a href="tel:0484906966" className="font-semibold text-donkerblauw hover:underline">
                0484 906 966
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Mail className="mb-6 h-12 w-12 text-donkerblauw" />
            <h3 className="mb-3 text-xl font-bold text-[#1a2c3d]">Gegevens</h3>
            <div className="text-sm leading-relaxed text-[#5a6c7d]">
              <p>
                <a href="mailto:info@abservice.be" className="font-semibold text-donkerblauw hover:underline">
                  info@abservice.be
                </a>
              </p>
              <p>BTW BE0792.534.639</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
