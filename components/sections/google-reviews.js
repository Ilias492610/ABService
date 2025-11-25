'use client';

import Script from 'next/script';
import { ArrowRight, Star } from 'lucide-react';

const GoogleReviews = () => {
  return (
    <section className="overflow-hidden bg-[#e8f4f8] py-20">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-donkerblauw">
              Klantbeoordelingen
            </p>
            <h2 className="mt-3 text-[42px] font-bold leading-tight text-[#1a2c3d]">
              Ontdek wat onze klanten zeggen
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-[#5a6c7d]">
              Benieuwd naar de ervaringen van onze klanten? Ontdek hun verhalen en beoordelingen en zie waarom ze voor ons kiezen!
            </p>
            <a
              href="https://www.google.com/search?rlz=1C5CHFA_enBE1184BE1185&q=AB%20SERVICE%20Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MTAzNjUyNDYzNzA0MTSwNLGw3MDI-IpRyNFJIdg1KMzT2VUhKLUsM7W8eBErFkEA3PuvTEQAAAA&rldimm=4063521367014109489&tbm=lcl&cs=1&hl=nl&sa=X&ved=0CCAQ9fQKKABqFwoTCNjWkIa5jpEDFQAAAAAdAAAAABAG&biw=1341&bih=1198&dpr=1#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-donkerblauw px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0e2a3d]"
            >
              Bekijk alle reviews
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Google Rating Header */}
        <div className="mb-8 flex items-center justify-center gap-4 rounded-xl bg-white p-6 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
            <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
          </svg>
          <div>
            <a 
              href="https://www.google.com/search?rlz=1C5CHFA_enBE1184BE1185&q=AB%20SERVICE%20Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MTAzNjUyNDYzNzA0MTSwNLGw3MDI-IpRyNFJIdg1KMzT2VUhKLUsM7W8eBErFkEA3PuvTEQAAAA&rldimm=4063521367014109489&tbm=lcl&cs=1&hl=nl&sa=X&ved=0CCAQ9fQKKABqFwoTCNjWkIa5jpEDFQAAAAAdAAAAABAG&biw=1341&bih=1198&dpr=1#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-[#1a2c3d] hover:underline"
            >
              AB SERVICE
            </a>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#1a2c3d]">5.0</span>
              <div className="flex text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">Based on 15 reviews</span>
            </div>
          </div>
        </div>

        {/* Trust.Reviews Widget */}
        <div className="tr-widget" data-id="7841" data-view="list" data-lang="">
          <a href="https://trust.reviews/" className="trcr" target="_blank" rel="noopener noreferrer">
            Powered by <span>Trust.Reviews</span>
          </a>
        </div>
        
        <Script 
          src="https://cdn.trust.reviews/widget/embed.min.js" 
          strategy="afterInteractive"
        />
      </div>
    </section>
  );
};

export default GoogleReviews;
