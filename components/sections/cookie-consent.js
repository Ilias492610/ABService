'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const accordionItems = [
  {
    category: 'Noodzakelijk',
    description:
      'Noodzakelijke cookies zijn vereist om de basisfunctionaliteiten van deze site mogelijk te maken, zoals het bieden van een veilige inlog of het aanpassen van uw toestemmingsvoorkeuren.',
    alwaysActive: true,
    cookies: [
      {
        name: 'cookieyes-consent',
        duration: '1 jaar',
        description:
          "CookieYes onthoudt uw voorkeuren zodat deze bij volgende bezoeken worden gerespecteerd. Er worden geen persoonlijke gegevens opgeslagen.",
      },
      {
        name: 'wpEmojiSettingsSupports',
        duration: 'Sessie',
        description:
          'WordPress gebruikt deze cookie om te controleren of uw browser emoji correct kan weergeven.',
      },
    ],
  },
  {
    category: 'Functioneel',
    description:
      'Functionele cookies helpen bij het uitvoeren van bepaalde functionaliteiten, zoals het delen op sociale media, het verzamelen van feedback en andere functies van derden.',
  },
  {
    category: 'Analytisch',
    description:
      'Analytische cookies geven inzicht in hoe bezoekers de website gebruiken. Zo kunnen wij onze site blijven verbeteren.',
  },
  {
    category: 'Prestaties',
    description:
      'Prestatiecookies helpen om de belangrijkste prestatie-indicatoren van de website te begrijpen en te analyseren.',
  },
  {
    category: 'Advertenties',
    description:
      'Advertentiecookies worden gebruikt om bezoekers gepersonaliseerde advertenties te tonen en de effectiviteit van campagnes te meten.',
  },
];

const CookieRow = ({ cookie }) => (
  <div className="border-t border-[#eceff5] pt-4 text-sm text-[#516377]">
    <p>
      <strong className="text-[#182b42]">Cookie:</strong> {cookie.name}
    </p>
    <p>
      <strong className="text-[#182b42]">Duur:</strong> {cookie.duration}
    </p>
    <p className="mt-2">
      <strong className="text-[#182b42]">Beschrijving:</strong> {cookie.description}
    </p>
  </div>
);

const AccordionItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-[#eceff5]">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-start gap-3 p-4 text-left"
      aria-expanded={isOpen}
    >
      <ChevronRight
        className={`mt-1 h-5 w-5 text-[#8792a3] transition-transform ${isOpen ? 'rotate-90' : ''}`}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-[#182b42]">{item.category}</h3>
          {item.alwaysActive && (
            <span className="rounded bg-[#f1f3f6] px-2 py-1 text-xs font-semibold text-[#516377]">
              Altijd actief
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-[#516377]">{item.description}</p>
      </div>
    </button>
    {isOpen && (
      <div className="pb-4 pl-12 pr-4 text-sm text-[#516377]">
        {item.cookies && item.cookies.length > 0 ? (
          item.cookies.map((cookie) => <CookieRow key={cookie.name} cookie={cookie} />)
        ) : (
          <p className="border-t border-[#eceff5] pt-4">Geen cookies om weer te geven.</p>
        )}
      </div>
    )}
  </div>
);

const SettingsModal = ({ onAccept, onReject, onClose }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [fullText, setFullText] = useState(false);

  const introShort =
    'Wij gebruiken cookies om u efficiënt te laten navigeren en bepaalde functies uit te voeren. De cookies die als "Noodzakelijk" zijn gecategoriseerd, worden in uw browser opgeslagen omdat ze essentieel zijn voor het mogelijk maken van de basisfunctionaliteiten van de site...';
  const introLong =
    'Wij gebruiken cookies om u efficiënt te laten navigeren en bepaalde functies uit te voeren. Gedetailleerde informatie over alle cookies vindt u onder elke toestemmingscategorie hieronder. De cookies die als "Noodzakelijk" zijn gecategoriseerd, worden in uw browser opgeslagen omdat ze essentieel zijn voor het mogelijk maken van de basisfunctionaliteiten van de site. Wij gebruiken ook cookies van derden die ons helpen te analyseren hoe u deze website gebruikt, uw voorkeuren op te slaan en u de voor u relevante inhoud en advertenties te bezorgen. Deze cookies worden alleen met uw voorafgaande toestemming opgeslagen. U kunt ervoor kiezen om sommige of al deze cookies in of uit te schakelen, maar het uitschakelen van sommige ervan kan uw surfervaring beïnvloeden.';

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#eceff5] px-6 py-4">
          <h2 className="text-lg font-bold text-[#182b42]">Pas uw toestemmingsvoorkeuren aan</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d15aabd3-7400-4814-b987-c0ca0874e387-verwarmingbros-be/assets/svgs/close-2.svg"
              alt="Sluiten"
              width={24}
              height={24}
              unoptimized
            />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 text-sm text-[#516377]">
            <p>
              {fullText ? introLong : introShort}{' '}
              {!fullText && (
                <button
                  type="button"
                  onClick={() => setFullText(true)}
                  className="font-semibold text-donkerblauw"
                >
                  Toon meer
                </button>
              )}
            </p>
          </div>
          <div className="border-t border-[#eceff5]">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.category}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-[#eceff5] bg-gray-50 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onReject}
                className="rounded-[6px] border border-[#d0d9d7] px-5 py-2.5 text-sm font-medium text-[#4a5d58] transition-colors hover:bg-gray-50"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[6px] border border-[#d0d9d7] px-5 py-2.5 text-sm font-medium text-[#4a5d58] transition-colors hover:bg-gray-50"
              >
                Sla mijn voorkeuren op
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="rounded-[6px] bg-donkerblauw px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e2a3d]"
              >
                Accepteren
              </button>
            </div>
            <a
              href="https://www.cookieyes.com/product/cookie-consent/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#8792a3]"
            >
              Powered by
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d15aabd3-7400-4814-b987-c0ca0874e387-verwarmingbros-be/assets/svgs/poweredbtcky-3.svg"
                alt="CookieYes"
                width={68}
                height={16}
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CookieConsent = () => {
  // Temporarily disabled - return null to hide
  return null;

  const [status, setStatus] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('cookie_consent');
      if (stored === 'accepted' || stored === 'rejected') {
        setStatus(stored);
      } else {
        setStatus('pending');
      }
    } catch (error) {
      setStatus('pending');
    }
  }, []);

  const handleConsent = useCallback((value) => {
    try {
      window.localStorage.setItem('cookie_consent', value);
    } catch (error) {
      // noop
    }
    setStatus(value);
    setShowSettings(false);
  }, []);

  if (status === null) {
    return null;
  }

  const showBanner = status === 'pending' && !showSettings;
  const showRevisit = status !== 'pending' && !showSettings;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 right-0 z-[10000] w-full sm:bottom-5 sm:right-5 sm:max-w-[420px]">
          <div className="rounded-t-xl bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.15)] sm:rounded-xl">
            <h2 className="text-[1.1rem] font-bold text-[#1a2b26]">
              Wij hechten waarde aan uw privacy
            </h2>
            <p className="mt-4 text-sm text-[#4a5d58]">
              Wij gebruiken cookies om uw browse-ervaring te verbeteren, gepersonaliseerde advertenties of inhoud te tonen en ons verkeer te analyseren. Door op &quot;Accepteren&quot; te klikken, stemt u in met ons gebruik van cookies.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="flex-1 rounded-[6px] border border-[#d0d9d7] px-5 py-2.5 text-sm font-medium text-[#4a5d58] transition-colors hover:bg-gray-50"
              >
                Aanpassen
              </button>
              <button
                type="button"
                onClick={() => handleConsent('rejected')}
                className="flex-1 rounded-[6px] border border-[#d0d9d7] px-5 py-2.5 text-sm font-medium text-[#4a5d58] transition-colors hover:bg-gray-50"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={() => handleConsent('accepted')}
                className="flex-1 rounded-[6px] bg-donkerblauw px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e2a3d]"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}

      {showRevisit && (
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="fixed bottom-5 left-5 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
          aria-label="Cookie instellingen"
        >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d15aabd3-7400-4814-b987-c0ca0874e387-verwarmingbros-be/assets/svgs/revisit-1.svg"
            alt="Cookie instellingen"
            width={24}
            height={24}
            unoptimized
          />
        </button>
      )}

      {showSettings && (
        <SettingsModal
          onAccept={() => handleConsent('accepted')}
          onReject={() => handleConsent('rejected')}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
};

export default CookieConsent;
