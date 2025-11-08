"use client";

import Link from "next/link";
import HeaderExact from "@/components/HeaderExact";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <HeaderExact />

      <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90" />
        
        {/* Content */}
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide mb-4 text-gray-300">
              Onderhoud • Herstelling • Installatie
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              De specialist in gasketels
              <br />
              <span className="text-[#2C9BA0]">rond Antwerpen en de Kempen</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Wij zorgen voor een veilige en efficiënte werking van jouw verwarmingssysteem, 
              zodat u altijd kunt genieten van warmte en comfort.
            </p>
            <div className="flex flex-col gap-4">
              <Link 
                href="/contact" 
                className="bg-[#2C9BA0] hover:bg-[#1a7c80] text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                MAAK AFSPRAAK ONLINE
              </Link>
              <a 
                href="tel:0495799899" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                BEL VOOR EEN AFSPRAAK
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlight Blocks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Service van topkwaliteit</h3>
              <p className="text-gray-600">Vakkundige en betrouwbare vakmannen.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Snel & efficiënt</h3>
              <p className="text-gray-600">Snelle service met efficiënte oplossingen.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Marktconforme prijzen</h3>
              <p className="text-gray-600">Kwaliteit aan eerlijke en transparante prijzen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Brand Logos */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-red-600 font-bold text-xl">BOSCH</div>
            <div className="text-blue-600 font-bold text-xl">Buderus</div>
            <div className="text-red-700 font-bold text-xl">Bulex</div>
            <div className="text-blue-700 font-bold text-xl">JUNKERS</div>
            <div className="text-green-600 font-bold text-xl">Vaillant</div>
            <div className="text-orange-600 font-bold text-xl">VIESSMANN</div>
          </div>
        </div>
      </section>

      {/* Bathroom CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link 
            href="#"
            className="bg-[#2C9BA0] hover:bg-[#1a7c80] text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            BEKIJK ONZE BADKAMERSITE →
          </Link>
        </div>
      </section>

      {/* About/Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="border-4 border-[#2C9BA0] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800" 
                  alt="Team van AB Service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-500">AB SERVICE</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Uw verwarming bij ons in de hoofdrol!
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Deskundig in onderhoud, reparatie en installatie van gasketels. 
                Snel, efficiënt en altijd gericht op uw comfort en veiligheid.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">+10 jaar ervaring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Kwalitatieve service</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">7/7 bereikbaarheid bij storingen</span>
                </div>
              </div>

              <Link 
                href="tel:0495799899"
                className="bg-[#2C9BA0] hover:bg-[#1a7c80] text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                BEL ONS VOOR EEN AFSPRAAK →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Coming soon */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#2C9BA0] font-semibold uppercase tracking-wide mb-2">
              KWALITEIT BOVEN KWANTITEIT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ontdek onze dienstverlening
                </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Cards - To be added */}
          </div>
        </div>
      </section>

      {/* Floating Contact Widgets */}
      <div className="fixed bottom-20 left-4 z-50 space-y-3">
        <a 
          href="tel:0495799899"
          className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </a>
        <a 
          href="https://wa.me/32495799899"
          className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">5.0</span>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
              <div className="text-xs text-gray-600">103 recensies</div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
