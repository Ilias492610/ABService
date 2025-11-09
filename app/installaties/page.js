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
                Vervanging of nieuwe installatie van efficiënte condensatieketels en doorstromers.
              </p>
              <Link href="/installaties/gasketels" className="text-blue-600 font-semibold hover:text-blue-700">
                Meer info →
              </Link>
            </div>

            {/* Sanitair */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Sanitair</h3>
              <p className="text-gray-600 mb-4">
                Badkamers, leidingen en warmwatersystemen op maat van uw project.
              </p>
              <Link href="/installaties/sanitair" className="text-blue-600 font-semibold hover:text-blue-700">
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
                Comfortabele koeling en verwarming met energiezuinige systemen.
              </p>
              <Link href="/installaties/airconditioning" className="text-blue-600 font-semibold hover:text-blue-700">
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

