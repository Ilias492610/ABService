const HeroHeader = () => {
  return (
    <section className="bg-donkerblauw py-16 md:py-20 lg:py-24" aria-labelledby="contact-hero-heading">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="mb-3 text-base text-white md:text-lg">
          Contacteer uw loodgieter en warmtespecialist in Antwerpen
        </p>
        <h1
          id="contact-hero-heading"
          className="text-3xl font-bold leading-tight text-white md:text-[40px] lg:text-5xl"
        >
          Plan online uw interventie of onderhoud
        </h1>
      </div>
    </section>
  );
};

export default HeroHeader;
