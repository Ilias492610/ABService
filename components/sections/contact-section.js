import Image from 'next/image';

const ContactSection = () => {
  return (
    <section className="bg-white px-4 py-20 md:px-8" id="contact">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2f7a6f]">
              Verwarming Bros
            </p>
            <h2 className="mt-2 mb-10 text-4xl font-bold text-[#1a2c3d]">
              Contactgegevens
            </h2>

            <div className="space-y-8 text-[#5a6c7d]">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#db3730] text-white">
                  <span className="text-sm font-bold">A</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2c3d]">Regio Antwerpen</h3>
                  <p className="mt-1 text-[15px]">Neem contact met ons op via 0495 79 98 99.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/svgs/logo-kemp-4.svg"
                    alt="Regio Kempen"
                    width={32}
                    height={32}
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2c3d]">Regio Kempen</h3>
                  <p className="mt-1 text-[15px]">Neem contact met ons op via 0493 83 86 96.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#2f7a6f]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#2f7a6f]"
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
                  <h3 className="text-lg font-semibold text-[#1a2c3d]">info@verwarmingbros.be</h3>
                  <p className="mt-1 text-[15px]">Geef ons een seintje bij vragen of opmerkingen.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-xl bg-[#f2f5f7] p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-[#1a2c3d]">Neem meteen contact met ons op</h3>
            <p className="mt-2 mb-8 text-[15px] text-[#5a6c7d]">
              Wij staan klaar om u snel en professioneel te helpen!
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Naam
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Naam *"
                  required
                  className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2f7a6f]"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Telefoon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Telefoon *"
                    required
                    className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2f7a6f]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="E-mail *"
                    required
                    className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2f7a6f]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Bericht
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Bericht"
                  className="w-full rounded-md border border-[#d1d5db] bg-white p-3 text-base text-[#1a2c3d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2f7a6f]"
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-[#5a6c7d]">
                <input type="checkbox" required className="h-4 w-4 rounded border-[#94a3b8] text-[#2f7a6f] focus:ring-[#2f7a6f]" />
                Ik ga akkoord met het{' '}
                <a href="#" className="underline text-[#1a2c3d] transition hover:text-[#2f7a6f]">
                  privacybeleid
                </a>
                .
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-[#2f7a6f] px-6 py-[14px] text-sm font-semibold uppercase text-white transition-colors hover:bg-[#27685f]"
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
