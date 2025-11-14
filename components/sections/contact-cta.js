const ContactCta = () => {
  return (
    <section className="bg-[#dfe8e6] py-16">
      <div className="mx-auto max-w-[960px] px-6 text-center">
        <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-4xl">
          Hulp nodig in Antwerpen of de rand?
        </h2>
        <p className="mt-4 text-base text-[#5a6c7d] md:text-lg">
          Bel of plan uw afspraak voor onderhoud, herstellingen of keuringen in Antwerpen en omstreken. Ons team staat klaar met snelle service en duidelijke afspraken.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:0484906966"
            className="inline-flex items-center justify-center rounded-md bg-donkerblauw px-8 py-3.5 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0e2a3d]"
          >
            Bel: 0484 906 966
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-donkerblauw px-8 py-3.5 text-sm font-semibold uppercase text-donkerblauw transition-colors hover:bg-donkerblauw/5"
          >
            Contact opnemen
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
