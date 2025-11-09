'use client';

import { useEffect, useState } from 'react';

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  const hide = () => setVisible(false);

  return (
    <div
      className="fixed bottom-5 right-5 z-[10000] w-full max-w-[380px] animate-[slideUp_0.4s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="flex flex-col rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
        <h2 id="cookie-consent-title" className="mb-3 text-base font-semibold text-[#111827]">
          Wij hechten waarde aan uw privacy
        </h2>
        <p id="cookie-consent-description" className="mb-5 text-sm leading-[1.6] text-[#4b5563]">
          Wij gebruiken cookies om uw browse-ervaring te verbeteren, gepersonaliseerde advertenties of inhoud te tonen en ons verkeer te analyseren. Door op "Accepteren" te klikken, stemt u in met ons gebruik van cookies.
        </p>
        <div className="grid grid-cols-3 gap-2 text-[13px] font-semibold">
          <button
            type="button"
            onClick={hide}
            className="rounded-md border border-[#d4d4d4] bg-white px-4 py-2.5 text-[#4b5563] transition hover:brightness-95"
          >
            Aanpassen
          </button>
          <button
            type="button"
            onClick={hide}
            className="rounded-md border border-[#d4d4d4] bg-white px-4 py-2.5 text-[#4b5563] transition hover:brightness-95"
          >
            Weigeren
          </button>
          <button
            type="button"
            onClick={hide}
            className="rounded-md bg-[#2d7a6e] px-4 py-2.5 text-white transition hover:brightness-95"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
