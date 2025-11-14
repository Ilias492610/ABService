const ContactSection = () => {
  return (
    <section className="bg-white px-4 py-20 md:px-8" id="contact">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-donkerblauw">
              Uw loodgieter in Antwerpen
            </p>
            <h2 className="mt-2 mb-10 text-4xl font-bold text-[#1a2c3d]">
              Direct contact voor onderhoud en herstellingen
            </h2>

            <div className="space-y-8 text-[#5a6c7d]">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-donkerblauw/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-donkerblauw"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2c3d]">Bel 0484 906 966</h3>
                  <p className="mt-1 text-[15px]">Snel inzetbaar in Antwerpen centrum, Deurne, Wilrijk, Merksem en randgemeenten.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-donkerblauw/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-donkerblauw"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.286a2.25 2.25 0 01-2.16 0l-7.5-4.286a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2c3d]">info@abservice.be</h3>
                  <p className="mt-1 text-[15px]">Mail ons voor offertes, onderhoudscontracten en plannen op maat.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-donkerblauw/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-donkerblauw"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.343-4 3v1h8v-1c0-1.657-1.79-3-4-3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2c3d]">Adres</h3>
                  <p className="mt-1 text-[15px]">Antwerpen, actieve ploegen in alle districten voor residentiële en commerciële klanten.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-xl bg-[#f2f5f7] p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-[#1a2c3d]">Vraag uw interventie of offerte aan</h3>
            <p className="mt-2 mb-8 text-[15px] text-[#5a6c7d]">
              Vul het formulier in en wij nemen zo snel mogelijk contact op. Voor dringende vragen raden we aan om rechtstreeks te bellen.
            </p>

            <form className="space-y-6" method="POST" action="/api/contact">
              <div>
                <label htmlFor="name" className="sr-only">
                  Naam
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Naam *"
                  required
                  className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-donkerblauw"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Telefoon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Telefoon *"
                    required
                    className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-donkerblauw"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail *"
                    required
                    className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-donkerblauw"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Bericht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Beschrijf het probleem, bv. lekkage in keuken, toilet verstopt, ..."
                  className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-donkerblauw"
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-[#5a6c7d]">
                <input type="checkbox" name="consent" className="h-4 w-4 rounded border-[#94a3b8] text-donkerblauw focus:ring-donkerblauw" required />
                Ik ga akkoord met het{' '}
                <a href="/privacy-policy" className="underline text-[#1a2c3d] transition hover:text-donkerblauw">
                  privacybeleid
                </a>
                .
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-donkerblauw px-6 py-[14px] text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0e2a3d]"
              >
                Aanvraag verzenden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

