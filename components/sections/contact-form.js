'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [service, setService] = useState('Onderhoud van uw gasketel');

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[920px] px-4">
        <div className="text-center">
          <h2 className="text-[32px] font-bold leading-tight text-[#1a2332] md:text-[36px]">
            Vul onderstaand formulier in
          </h2>
          <p className="mt-3 text-base text-[#6b7280]">
            We zorgen ervoor dat u binnen korte tijd een reactie ontvangt.
          </p>
        </div>

        <form className="mt-12 space-y-10">
          <div>
            <h3 className="text-2xl font-semibold text-[#1a2332]">1. Contactgegevens</h3>
            <p className="mt-2 text-[0.95rem] text-[#6b7280]">
              Geef uw contactgegevens op zodat we u kunnen bereiken.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {['Naam *', 'Telefoon *', 'E-mail *', 'Straatnaam en huisnummer *', 'Gemeente *', 'Postcode *'].map((placeholder) => (
                <input
                  key={placeholder}
                  type="text"
                  placeholder={placeholder}
                  required={placeholder.includes('*')}
                  className="w-full rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] placeholder:text-[#6b7280] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#1a2332]">2. Diensten</h3>
            <p className="mt-2 text-[0.95rem] text-[#6b7280]">
              Selecteer de dienst waarin u geïnteresseerd bent uit de onderstaande opties.
            </p>
            <div className="mt-6">
              <div className="relative">
                <select
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full appearance-none rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
                >
                  <option>Onderhoud van uw gasketel</option>
                  <option>Herstelling van uw gasketel</option>
                  <option>Installatie van uw gasketel</option>
                  <option>Keuring &amp; indienstname van uw gasketel</option>
                  <option>Gratis offerte</option>
                  <option>Andere</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#6b7280]">▾</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#1a2332]">3. Extra informatie</h3>
            <p className="mt-2 text-[0.95rem] text-[#6b7280]">
              Indien mogelijk, geef hier de gegevens van uw cv-ketel door.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {['Merk', 'Type'].map((placeholder) => (
                <input
                  key={placeholder}
                  type="text"
                  placeholder={placeholder}
                  className="w-full rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] placeholder:text-[#6b7280] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
                />
              ))}
            </div>
            <textarea
              placeholder="Extra informatie"
              rows={4}
              className="mt-5 w-full rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] placeholder:text-[#6b7280] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
            />
          </div>

          <div className="space-y-6 pt-2">
            <label className="flex cursor-pointer select-none items-center text-sm text-[#6b7280]">
              <input type="checkbox" required className="mr-3 h-5 w-5 rounded border-2 border-[#d0d9d7] text-donkerblauw focus:ring-donkerblauw" />
              Ik ga akkoord met het{' '}
                              <a href="/privacy-policy" className="underline text-donkerblauw hover:text-[#0e2a3d]">
                  privacybeleid
                </a>
              .
            </label>
            <button
              type="submit"
              className="w-full rounded-md bg-donkerblauw px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#0e2a3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-donkerblauw sm:w-auto"
            >
              Aanvraag verzenden
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
