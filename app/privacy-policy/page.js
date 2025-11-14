import HeaderTopBar from '@/components/sections/header-top-bar';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacybeleid | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <section className="bg-donkerblauw py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="mb-3 text-base text-white md:text-lg">
              Transparantie en vertrouwen
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-[40px] lg:text-5xl">
              Privacybeleid
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Hoe wij omgaan met uw persoonsgegevens
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-sm text-gray-600 mb-8 text-center">
              Deze pagina is voor het laatst bijgewerkt op 12/11/2025.
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Uw persoonsgegevens verdienen zorg en discretie. In dit privacybeleid leest u welke informatie wij ontvangen wanneer u onze website bezoekt of een aanvraag indient, voor welke doeleinden wij die gegevens verwerken en welke opties u hebt om dat gebruik te sturen.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">1. Welke gegevens verzamelen we?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We bewaren alleen gegevens die we nodig hebben om onze diensten te kunnen leveren of onze communicatie te verbeteren. Het gaat om twee categorieën:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Gegevens die u zelf invult</strong>, zoals naam, telefoonnummer, e-mailadres en bijkomende informatie in het berichtveld.</li>
                <li><strong>Technische informatie</strong> over uw bezoek, bijvoorbeeld IP-adres, gebruikte browser en bekeken pagina&apos;s. Deze gegevens worden anoniem verwerkt voor statistische analyses.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-8">
                De verzamelde informatie gebruiken we om contact op te nemen, afspraken te plannen, vragen te beantwoorden en onze website te verbeteren.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">2. Analyse- en advertentietools</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                AB Service gebruikt Google Analytics om te begrijpen welke pagina&apos;s populair zijn en hoe bezoekers navigeren. Google Ads helpt ons om relevante advertenties te tonen aan personen die interesse hebben getoond in onze diensten. Deze tools plaatsen cookies die geanonimiseerde informatie registreren. Als u geen gepersonaliseerde advertenties wilt zien, kunt u dat aanpassen in de instellingen van uw Google-account of via de cookievoorkeuren in uw browser.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">3. Cookies beheren</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Onze website maakt gebruik van drie soorten cookies: functionele cookies voor een correcte werking, analytische cookies voor statistieken en marketingcookies voor advertenties. Via uw browserinstellingen of via de cookie-banner kunt u aangeven welke cookies u toestaat. Houd er rekening mee dat bepaalde onderdelen minder goed kunnen werken zonder cookies.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">4. Met wie delen we gegevens?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Uw informatie wordt niet verkocht of vrijgegeven aan derden. We werken enkel samen met vertrouwde leveranciers die onze website hosten of ondersteunende diensten leveren. Deze partijen zijn contractueel verplicht om uw gegevens vertrouwelijk te behandelen en alleen te gebruiken volgens onze instructies. Indien de wet dit vereist, bezorgen we gegevens aan bevoegde autoriteiten.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">5. Uw rechten en keuzes</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                U kunt altijd navragen welke persoonsgegevens we van u hebben, vragen om correcties of ons verzoeken om gegevens te verwijderen, voor zover dit wettelijk mogelijk is. U hebt eveneens het recht om bezwaar te maken tegen het gebruik voor marketingdoeleinden. Een aanvraag kan via e-mail of telefoon gebeuren; we reageren zo snel mogelijk.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">6. Wijzigingen aan dit document</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Technische of juridische wijzigingen kunnen ervoor zorgen dat we dit beleid bijstellen. De wijzigingsdatum hierboven laat zien wanneer de laatste update is doorgevoerd. Controleer de pagina dus af en toe opnieuw.
              </p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">7. Contact</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Hebt u vragen over privacy of wilt u een van uw rechten uitoefenen? Neem gerust contact op via onderstaande gegevens.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1a2c3d] mb-4">AB Service</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Telefoon:</strong> <a href="tel:0484906966" className="text-donkerblauw hover:underline">0484 906 966</a></p>
                  <p><strong>E-mail:</strong> <a href="mailto:info@abservice.be" className="text-donkerblauw hover:underline">info@abservice.be</a></p>
                  <p><strong>BTW:</strong> BE0792.534.639</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-8 text-center font-medium">
                AB Service behandelt elke aanvraag met discretie en gebruikt gegevens uitsluitend om u beter te kunnen helpen.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatButton />
      <CookieConsentBanner />
      <div className="fixed bottom-6 right-6 z-[9998] md:bottom-8 md:right-8">
        <GoogleRatingWidget />
      </div>
    </div>
  );
};

export default PrivacyPolicy;