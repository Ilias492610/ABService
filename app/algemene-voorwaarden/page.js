import HeaderTopBar from '@/components/sections/header-top-bar';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import { getSEOTags } from '@/libs/seo';
import config from '@/config';

export const metadata = getSEOTags({
  title: `Algemene Voorwaarden | ${config.appName}`,
  canonicalUrlRelative: '/algemene-voorwaarden',
});

const AlgemeneVoorwaarden = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <MainNavigation />
      <main>
        <section className="bg-donkerblauw py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="mb-3 text-base text-white md:text-lg">Professionele dienstverlening</p>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-[40px] lg:text-5xl">Algemene Voorwaarden</h1>
            <p className="mt-4 text-lg text-white/80">Voorwaarden voor onze diensten</p>
          </div>
        </section>
        <section className="py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-sm text-gray-600 mb-8 text-center">Deze pagina is voor het laatst bijgewerkt op 12/11/2025.</div>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">1. Doel en toepassingsgebied</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Deze voorwaarden gelden voor elke offerte, opdracht of levering van AB Service. Afwijkingen zijn enkel mogelijk wanneer ze uitdrukkelijk en schriftelijk werden bevestigd. Voorwaarden van de klant zijn niet van toepassing, tenzij beide partijen dit vooraf schriftelijk zijn overeengekomen.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">2. Offertes en overeenkomsten</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Onze offertes vermelden een geldigheidstermijn van dertig dagen. Na goedkeuring wordt de offerte een bindende overeenkomst. Tussentijdse wijzigingen in het btw-tarief of externe toeslagen worden doorgerekend op de resterende facturen. Plannen, schema&apos;s en andere documenten blijven eigendom van AB Service en mogen niet zonder toestemming worden gebruikt of gedeeld.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">3. Veiligheid en regelgeving</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Aanpassingen die opgelegd worden door veiligheidscoördinatoren, netbeheerders of andere partijen en die niet in de offerte stonden, beschouwen we als meerwerk. Het benodigde dossier en de technische info moeten tijdig worden aangeleverd zodat de werken correct kunnen starten.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">4. Uitvoering en werfvoorwaarden</h2>
              <p className="text-gray-700 leading-relaxed mb-6">We plannen de werken in samenspraak met de klant. Onvoorziene omstandigheden zoals extreme weersomstandigheden, leveringsproblemen of situaties buiten onze wil kunnen de uitvoeringstermijn verlengen. Het materiaal wordt door AB Service geleverd tot op de werf. Vanaf de plaatsing draagt de klant het risico op schade of diefstal.</p>
              <p className="text-gray-700 leading-relaxed mb-6">De werf moet bereikbaar en veilig zijn. Extra wachttijden, moeilijke toegang of niet-voorziene verplaatsingen kunnen afzonderlijk gefactureerd worden. Voor onderhoud of keuring moet de installatie bedrijfszeker zijn en toegang tot afsluitkranen, stopcontacten en de tellerkast mogelijk blijven.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">5. Oplevering en garanties</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Na de werken ontvangt de klant een overzicht van de uitgevoerde taken. Als we binnen acht kalenderdagen geen schriftelijke opmerkingen krijgen, beschouwen we de opdracht als aanvaard. Waarborgtermijnen volgen de garantie van de fabrikant of leverancier. Voor uitgevoerde werken geldt een garantie van zes maanden, met uitzondering van herstellingen op bestaande installaties.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Eventuele zichtbare gebreken meldt u best meteen bij oplevering. Verborgen gebreken dient u binnen een redelijke termijn en schriftelijk te melden zodat we een gepaste oplossing kunnen voorstellen.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">6. Betaling en facturatie</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Facturen zijn betaalbaar binnen veertien dagen na factuurdatum, tenzij anders overeengekomen. Voor bepaalde projecten kan een voorschot of deelse facturatie worden gevraagd. Betalingen gebeuren via overschrijving of rechtstreeks ter plaatse wanneer het om kleinere interventies gaat.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Wanneer een factuur niet tijdig wordt voldaan, kan AB Service de geplande werken uitstellen. Bovendien wordt het openstaande bedrag automatisch verhoogd met de wettelijke nalatigheidsinterest en een forfaitaire schadevergoeding van tien procent (met een minimum van vijftig euro).</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">7. Ontbinding of opschorting</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Als de klant een opdracht annuleert nadat de voorbereiding al is opgestart of materiaal is besteld, rekenen we de reeds gemaakte kosten aan, aangevuld met een schadevergoeding van twintig procent van de overeengekomen prijs. Bij herhaaldelijke wanbetaling kan AB Service de samenwerking beëindigen en behoudt het bedrijf het recht om reeds uitgevoerde werken te factureren.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">8. Toepasselijk recht en bevoegde rechtbank</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Het Belgisch recht is van toepassing op alle overeenkomsten met AB Service. Bij betwistingen is enkel de rechtbank van het arrondissement Antwerpen bevoegd.</p>

              <h2 className="text-2xl font-bold text-[#1a2c3d] mt-12 mb-6">Bedrijfsgegevens</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1a2c3d] mb-4">AB Service</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>BTW:</strong> BE0792.534.639</p>
                  <p><strong>Telefoon:</strong> <a href="tel:0484906966" className="text-donkerblauw hover:underline">0484 906 966</a></p>
                  <p><strong>E-mail:</strong> <a href="mailto:info@abservice.be" className="text-donkerblauw hover:underline">info@abservice.be</a></p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-8 text-center font-medium">Door samen te werken met AB Service gaat u akkoord met bovenstaande voorwaarden. We helpen u graag verder bij vragen of verduidelijkingen.</p>
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

export default AlgemeneVoorwaarden;
