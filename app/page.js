"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-2">
            Onderhoud • Herstelling • Installatie
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            De specialist in gasketels
            <br />
            <span className="text-blue-200">rond Antwerpen en de Kempen</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Wij zorgen voor een veilige en efficiënte werking van jouw verwarmingssysteem, 
            zodat u altijd kunt genieten van warmte en comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#afspraak" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Maak afspraak online
            </Link>
            <a 
              href="tel:0495799899" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Bel voor een afspraak
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Service van topkwaliteit</h3>
              <p className="text-gray-600">Vakkundige en betrouwbare vakmannen.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Snel & efficiënt</h3>
              <p className="text-gray-600">Snelle service met efficiënte oplossingen.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Marktconforme prijzen</h3>
              <p className="text-gray-600">Kwaliteit aan eerlijke en transparante prijzen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wide mb-2">Verwarming Bros</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Uw verwarming bij ons in de hoofdrol!
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Deskundig in onderhoud, reparatie en installatie van gasketels. 
              Snel, efficiënt en altijd gericht op uw comfort en veiligheid.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="text-blue-600 font-bold text-2xl mb-2">+10</div>
              <div className="text-gray-600">jaar ervaring</div>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="text-blue-600 font-bold text-2xl mb-2">Kwalitatieve</div>
              <div className="text-gray-600">service</div>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="text-blue-600 font-bold text-2xl mb-2">7/7</div>
              <div className="text-gray-600">ber bereikbaarheid bij storingen</div>
            </div>
          </div>
          <div className="text-center mt-12">
            <a 
              href="tel:0495799899" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Bel ons voor een afspraak
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wide mb-2">
              Kwaliteit boven kwantiteit
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ontdek onze dienstverlening
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Onderhoud</h3>
              <p className="text-gray-600 mb-4">
                Regelmatig onderhoud zorgt voor een zorgeloze werking en optimaal rendement van uw ketel.
              </p>
              <div className="text-blue-600 font-semibold mb-4">
                Vanaf <span className="text-2xl">€ 0</span> excl. BTW
              </div>
              <Link 
                href="/onderhoud" 
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Meer informatie →
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Herstelling</h3>
              <p className="text-gray-600 mb-4">
                Een goed werkende cv-ketel zorgt voor comfort, veiligheid en efficiëntie in uw huis.
              </p>
              <div className="text-blue-600 font-semibold mb-4">
                Vanaf <span className="text-2xl">€ 0</span> excl. BTW
              </div>
              <Link 
                href="/herstelling" 
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Meer informatie →
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Keuring & indienstname</h3>
              <p className="text-gray-600 mb-4">
                Voor ingebruikname is een keuring verplicht. Na de keuring ontvangt u een conformiteitsrapport.
              </p>
              <div className="text-blue-600 font-semibold mb-4">
                Vanaf <span className="text-2xl">€ 0</span> excl. BTW
              </div>
              <Link 
                href="/keuring" 
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Meer informatie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Neem meteen contact met ons op
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Wij staan klaar om u snel en professioneel te helpen!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0495799899" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Bel ons: 0495 79 98 99
            </a>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contactformulier
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
