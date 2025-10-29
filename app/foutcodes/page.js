"use client";

import Link from "next/link";

export default function FoutcodesPage() {
  const merken = [
    { name: "Vaillant", href: "/foutcodes/vaillant" },
    { name: "Bosch", href: "/foutcodes/bosch" },
    { name: "Junkers", href: "/foutcodes/junkers" },
    { name: "Bulex", href: "/foutcodes/bulex" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Foutcodes</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Zoek de betekenis van foutcodes op uw cv-ketel en ontdek wat u kunt doen.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Selecteer uw ketelmerk</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {merken.map((merk) => (
              <Link
                key={merk.href}
                href={merk.href}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{merk.name}</div>
                <div className="text-gray-600 text-sm">Klik voor foutcodes</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Wat te doen bij een foutcode?</h3>
            <p className="text-gray-700 mb-4">
              Als uw cv-ketel een foutcode toont, raadpleeg onze overzichten hierboven om de betekenis 
              te achterhalen. Veel foutcodes kunnen eenvoudig worden opgelost, zoals:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Herstarten van de ketel</li>
              <li>Lucht uit het systeem laten</li>
              <li>Water druk aanvullen</li>
              <li>Resetten van de ketel</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Als de foutcode blijft bestaan of als u twijfelt, neem dan contact met ons op voor 
              professionele hulp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:0495799899" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Bel: 0495 79 98 99
              </a>
              <Link 
                href="/contact" 
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
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

