const ContactCta = () => {
  return (
    <section className="bg-[#dfe8e6] py-16">
      <div className="mx-auto max-w-[960px] px-6 text-center">
        <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-4xl">
          Klaar voor een zorgeloze verwarming?
        </h2>
        <p className="mt-4 text-base text-[#5a6c7d] md:text-lg">
          Wij garanderen snelle en efficiënte oplossingen. Plan vandaag nog uw herstelling of onderhoud en geniet opnieuw van comfort.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:0495799899"
            className="inline-flex items-center justify-center rounded-md bg-[#2f7a6f] px-8 py-3.5 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#27685f]"
          >
            Bel: 0495 79 98 99
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-[#2f7a6f] px-8 py-3.5 text-sm font-semibold uppercase text-[#2f7a6f] transition-colors hover:bg-[#2f7a6f]/5"
          >
            Contact opnemen
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
