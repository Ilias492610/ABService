const HeroHeader = () => {
  return (
    <section className="bg-[#e8f4f2] py-16 md:py-20 lg:py-24" aria-labelledby="contact-hero-heading">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="mb-3 text-base text-[#2f7a6f] md:text-lg">
          Neem contact op met Verwarming Bros
        </p>
        <h1
          id="contact-hero-heading"
          className="text-3xl font-bold leading-tight text-[#1a2c3d] md:text-[40px] lg:text-5xl"
        >
          Maak online uw afspraak
        </h1>
      </div>
    </section>
  );
};

export default HeroHeader;
