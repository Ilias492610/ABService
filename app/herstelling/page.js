"use client";

import Link from "next/link";

export default function HerstellingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Herstelling</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Een goed werkende cv-ketel zorgt voor comfort, veiligheid en efficiëntie in uw huis.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Snelle en deskundige herstelling</h2>
            <p className="text-gray-700 mb-6">
              Heeft uw cv-ketel een storing? Geen zorgen, wij staan klaar om u snel te helpen. 
              Met jarenlange ervaring repareren we alle merken en types cv-ketels. Van kleine 
              storingen tot complexe problemen, wij vinden altijd een oplossing.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Veelvoorkomende storingen:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ketel brandt niet meer aan</li>
              <li>Geen warm water</li>
              <li>Minstaande verwarming</li>
              <li>Error codes en foutmeldingen</li>
              <li>Vreemde geluiden</li>
              <li>Hoge energiekosten</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Onze werkwijze:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Snelle reactietijd - binnen 24 uur aanwezig</li>
              <li>Deskundige diagnose van het probleem</li>
              <li>Eerlijke prijsopgave vóór de werkzaamheden</li>
              <li>Professionele reparatie met originele onderdelen</li>
              <li>Garantie op uitgevoerde werkzaamheden</li>
              <li>Onderhoudsadvies voor de toekomst</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Noodgeval?</h3>
              <p className="text-blue-800 mb-4">
                Bij een noodgeval kunt u ons altijd bereiken. We zorgen ervoor dat u niet zonder 
                warmte komt te zitten, ook in het weekend of 's avonds.
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                Vanaf € 0 excl. BTW
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a 
                href="tel:0495799899" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Bel voor afspraak: 0495 79 98 99
              </a>
              <Link 
                href="/contact" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

