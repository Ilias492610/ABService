"use client";

import Link from "next/link";

export default function OnderhoudPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Onderhoud</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Regelmatig onderhoud zorgt voor een zorgeloze werking en optimaal rendement van uw ketel.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Waarom regelmatig onderhoud?</h2>
            <p className="text-gray-700 mb-6">
              Regelmatig onderhoud van uw cv-ketel is essentieel voor een veilige, efficiënte en 
              betrouwbare werking. Door uw ketel jaarlijks te laten onderhouden, voorkomt u storingen, 
              verhoogt u het rendement en verlengt u de levensduur van uw installatie.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Voordelen van regelmatig onderhoud:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Verhoogde veiligheid door controle op lekken en gasdichtheid</li>
              <li>Optimaal rendement en lagere energiekosten</li>
              <li>Voorkomen van onverwachte storingen</li>
              <li>Verlenging van de levensduur van uw ketel</li>
              <li>Garantie blijft geldig bij regelmatig onderhoud</li>
              <li>Minder CO2-uitstoot door optimale verbranding</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Onze onderhoudsdienst omvat:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Visuele controle van de ketel</li>
              <li>Reiniging van de brander en warmtewisselaar</li>
              <li>Controle en kalibratie van de verbrandingsparameters</li>
              <li>Test van veiligheidsvoorzieningen</li>
              <li>Controle op lekkages en gasdichtheid</li>
              <li>Rapportage en advies op maat</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Advies en prijsopgave</h3>
              <p className="text-blue-800 mb-4">
                Elk systeem is anders. Laat uw ketel daarom onderhouden door onze ervaren technici. 
                We geven u altijd een transparante prijsopgave en houden u op de hoogte van wat er 
                nodig is.
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

