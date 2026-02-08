'use client';

import { useState } from 'react';

const ContactForm = () => {
  const defaultService = 'Onderhoud van uw gasketel';
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    service: defaultService,
    brand: '',
    boilerType: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFields = [
    { key: 'name', label: 'Naam *', type: 'text', required: true },
    { key: 'phone', label: 'Telefoon *', type: 'tel', required: true },
    { key: 'email', label: 'E-mail *', type: 'email', required: true },
    { key: 'address', label: 'Straatnaam en huisnummer *', type: 'text', required: true },
    { key: 'city', label: 'Gemeente *', type: 'text', required: true },
    { key: 'postalCode', label: 'Postcode *', type: 'text', required: true },
  ];

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: result?.error || 'Er ging iets mis. Probeer het opnieuw.',
        });
        return;
      }

      setStatus({
        type: 'success',
        message: 'Bedankt! Uw aanvraag is verzonden. We nemen snel contact met u op.',
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        service: defaultService,
        brand: '',
        boilerType: '',
        message: '',
        consent: false,
      });
    } catch {
      setStatus({
        type: 'error',
        message: 'De aanvraag kon niet worden verzonden. Probeer het later opnieuw.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[920px] px-4">
        <div className="text-center">
          <h2 className="text-[32px] font-bold leading-tight text-[#1a2332] md:text-[36px]">
            Vraag uw afspraak aan bij AB Service
          </h2>
          <p className="mt-3 text-base text-[#6b7280]">
            Onze loodgieters en warmtespecialisten contacteren u snel voor interventies in Antwerpen en randgemeenten.
          </p>
        </div>

        <form className="mt-12 space-y-10" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-2xl font-semibold text-[#1a2332]">1. Contactgegevens</h3>
            <p className="mt-2 text-[0.95rem] text-[#6b7280]">
              Geef uw contactgegevens op zodat we u kunnen bereiken.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {contactFields.map((field) => (
                <input
                  key={field.key}
                  name={field.key}
                  type={field.type}
                  placeholder={field.label}
                  value={formData[field.key]}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] placeholder:text-[#6b7280] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#1a2332]">2. Diensten</h3>
            <p className="mt-2 text-[0.95rem] text-[#6b7280]">
              Selecteer de dienst waarin u geïnteresseerd bent uit de onderstaande opties.
            </p>
            <div className="mt-6">
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
                >
                  <option>Onderhoud van uw gasketel</option>
                  <option>Herstelling van uw gasketel</option>
                  <option>Installatie van uw gasketel</option>
                  <option>Keuring &amp; indienstname van uw gasketel</option>
                  <option>Gratis offerte</option>
                  <option>Andere</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#6b7280]">▾</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#1a2332]">3. Extra informatie</h3>
            <p className="mt-2 text-[0.95rem] text-[#6b7280]">
              Indien mogelijk, geef hier de gegevens van uw cv-ketel door.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {['Merk', 'Type'].map((placeholder) => (
                <input
                  key={placeholder}
                  name={placeholder === 'Merk' ? 'brand' : 'boilerType'}
                  type="text"
                  placeholder={placeholder}
                  value={placeholder === 'Merk' ? formData.brand : formData.boilerType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] placeholder:text-[#6b7280] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
                />
              ))}
            </div>
            <textarea
              name="message"
              placeholder="Extra informatie"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="mt-5 w-full rounded-md border border-transparent bg-[#e8eaed] px-4 py-3.5 text-base text-[#111827] placeholder:text-[#6b7280] focus:border-donkerblauw focus:bg-white focus:outline-none focus:ring-2 focus:ring-donkerblauw/15"
            />
          </div>

          <div className="space-y-6 pt-2">
            <label className="flex cursor-pointer select-none items-center text-sm text-[#6b7280]">
              <input
                name="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={handleInputChange}
                required
                className="mr-3 h-5 w-5 rounded border-2 border-[#d0d9d7] text-donkerblauw focus:ring-donkerblauw"
              />
              Ik ga akkoord met het{' '}
                              <a href="/privacy-policy" className="underline text-donkerblauw hover:text-[#0e2a3d]">
                  privacybeleid
                </a>
              .
            </label>
            {status.type !== 'idle' && (
              <p
                role="status"
                className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-700'}`}
              >
                {status.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-donkerblauw px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#0e2a3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-donkerblauw sm:w-auto"
            >
              {isSubmitting ? 'Bezig met verzenden...' : 'Aanvraag verzenden'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
