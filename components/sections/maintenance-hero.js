const MaintenanceHero = () => {
  return (
    <section className="bg-[#e8ebed] py-16 md:py-20 lg:py-24" aria-labelledby="maintenance-hero-heading">
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-20">
        <h1
          id="maintenance-hero-heading"
          className="text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#1a3847] md:text-[40px] lg:text-[48px]"
        >
          Onderhoud van uw gasketel
        </h1>
        <p className="mt-4 text-base text-[#4a5d58] md:text-lg">
          Regelmatig onderhoud zorgt voor een zorgeloze werking en optimaal rendement van uw ketel.
        </p>
      </div>
    </section>
  );
};

export default MaintenanceHero;
