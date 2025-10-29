"use client";

import Link from "next/link";

export default function KeuringPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Keuring & Indienstname</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Voor ingebruikname is een keuring verplicht. Na de keuring ontvangt u een conformiteitsrapport.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Professionele keuring van uw cv-installatie</h2>
            <p className="text-gray-700 mb-6">
              Een keuring van uw verwarmingsinstallatie is wettelijk verplicht bij nieuwe installaties, 
              na grote aanpassingen of bij verkoop van uw woning. Wij voeren deze keuringen uit volgens 
              de meest recente normen en voorschriften.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Wanneer heeft u een keuring nodig?</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Bij nieuwe installatie van een cv-ketel</li>
              <li>Na ingrijpende aanpassingen aan uw installatie</li>
              <li>Bij verkoop van uw woning</li>
              <li>Bij omzetting van mazout naar gas</li>
              <li>Bij periodieke controles (na 5 jaar voor oude installaties)</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Wat omvat de keuring?</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Visuele controle van de installatie</li>
              <li>Controle van de gasdichtheid</li>
              <li>Controle van de afvoer van rookgassen</li>
              <li>Controle van de verbrandingsparameters</li>
              <li>Controle van veiligheidsvoorzieningen</li>
              <li>Aflezing van CO-gehalte in de rookgassen</li>
              <li>Opstellen van een conformiteitsrapport</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Conformiteitsrapport</h3>
              <p className="text-blue-800 mb-4">
                Na een succesvolle keuring ontvangt u een conformiteitsrapport. Dit document 
                bewijst dat uw installatie voldoet aan alle geldende normen en is een belangrijk 
                document bij de verkoop van uw woning of bij verzekeringen.
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

