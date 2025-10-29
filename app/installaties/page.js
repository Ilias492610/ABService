"use client";

import Link from "next/link";

export default function InstallatiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Installaties</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Verwarming en sanitair warm water - van offerte tot installatie.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Gasketels */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Gasketels</h3>
              <p className="text-gray-600 mb-4">
                Installatie van nieuwe condensatieketels, doorstromers en verwarmingstoestellen.
              </p>
              <Link href="/installaties/gasketels" className="text-blue-600 font-semibold hover:text-blue-700">
                Meer info →
              </Link>
            </div>

            {/* Airconditioning */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Airconditioning</h3>
              <p className="text-gray-600 mb-4">
                Installatie van airconditioning voor optimaal comfort, ook in de zomer.
              </p>
              <Link href="/installaties/airconditioning" className="text-blue-600 font-semibold hover:text-blue-700">
                Meer info →
              </Link>
            </div>

            {/* Waterverzachters */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Waterverzachters</h3>
              <p className="text-gray-600 mb-4">
                Installatie van waterontharders voor zacht water zonder kalkaanslag.
              </p>
              <Link href="/installaties/waterverzachters" className="text-blue-600 font-semibold hover:text-blue-700">
                Meer info →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Gratis en vrijblijvende offerte</h2>
            <p className="text-gray-700 mb-6">
              Een offerte voor de vervanging van uw cv-ketel wordt volledig gratis opgesteld. 
              Voor kleine of beperkte werken rekenen wij wel een interventievergoeding aan. 
              De uiteindelijke prijs is steeds afhankelijk van uw specifieke situatie, 
              uw persoonlijke voorkeuren en de gekozen technische oplossingen.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Gratis en vrijblijvende offerte</li>
              <li>Begeleiding bij aanvraag premies en subsidies</li>
              <li>Snelle en vakkundige service</li>
              <li>Gebruik van kwaliteitsmerken en duurzame oplossingen</li>
              <li>Professionele installatie door erkende techniekers</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
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

