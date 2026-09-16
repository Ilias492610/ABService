"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { buildAnalyticsEvent } from "@/libs/analytics.mjs";
import { CONTACT_SERVICES, validateContactInput } from "@/libs/contact-validation.mjs";

const initialData = {
  name: "", phone: "", email: "", address: "", city: "", postalCode: "",
  service: "", brand: "", boilerType: "", message: "", consent: false,
};

const sendEvent = (name, props) => {
  const event = buildAnalyticsEvent(name, props);
  track(event.name, event.props);
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);

  const noteStart = () => {
    if (!started.current) {
      started.current = true;
      sendEvent("contact_form_start", { location: "contact_page" });
    }
  };

  const updateField = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });
    const validation = validateContactInput(formData);

    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus({ type: "error", message: "Controleer de gemarkeerde velden en probeer opnieuw." });
      sendEvent("contact_form_failure", { location: "contact_page", reason: "validation", service: formData.service });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "De aanvraag kon niet worden verzonden.");

      sendEvent("contact_form_success", { location: "contact_page", service: validation.data.service });
      setStatus({ type: "success", message: "Uw aanvraag is verzonden. Een afspraak of timing is pas bevestigd na rechtstreeks contact." });
      setFormData(initialData);
      setErrors({});
      started.current = false;
    } catch (error) {
      sendEvent("contact_form_failure", { location: "contact_page", reason: "transport", service: validation.data.service });
      setStatus({ type: "error", message: error.message || "De aanvraag kon niet worden verzonden." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} onFocus={noteStart} noValidate aria-describedby="form-note">
      <p id="form-note" className="section-lead">Velden met een * zijn verplicht. Vermeld geen gevoelige medische of financiële gegevens.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Naam *</label>
          <input id="name" name="name" value={formData.name} onChange={updateField} autoComplete="name" maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span id="name-error" className="form-status error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Telefoon *</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={updateField} autoComplete="tel" maxLength={40} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <span id="phone-error" className="form-status error">{errors.phone}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="email">E-mail *</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={updateField} autoComplete="email" maxLength={200} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span id="email-error" className="form-status error">{errors.email}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="service">Waarover gaat uw aanvraag?</label>
          <select id="service" name="service" value={formData.service} onChange={updateField} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
            <option value="">Kies een dienst</option>
            {CONTACT_SERVICES.map((service) => <option key={service}>{service}</option>)}
          </select>
          {errors.service && <span id="service-error" className="form-status error">{errors.service}</span>}
        </div>
        <div className="field">
          <label htmlFor="address">Straat en huisnummer (optioneel)</label>
          <input id="address" name="address" value={formData.address} onChange={updateField} autoComplete="street-address" maxLength={200} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "address-error" : undefined} />
          {errors.address && <span id="address-error" className="form-status error">{errors.address}</span>}
        </div>
        <div className="field">
          <label htmlFor="city">Gemeente (optioneel)</label>
          <input id="city" name="city" value={formData.city} onChange={updateField} autoComplete="address-level2" maxLength={100} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined} />
          {errors.city && <span id="city-error" className="form-status error">{errors.city}</span>}
        </div>
        <div className="field">
          <label htmlFor="postalCode">Postcode (optioneel)</label>
          <input id="postalCode" name="postalCode" value={formData.postalCode} onChange={updateField} autoComplete="postal-code" maxLength={20} aria-invalid={Boolean(errors.postalCode)} aria-describedby={errors.postalCode ? "postal-code-error" : undefined} />
          {errors.postalCode && <span id="postal-code-error" className="form-status error">{errors.postalCode}</span>}
        </div>
        <div className="field">
          <label htmlFor="brand">Merk en model (optioneel)</label>
          <input id="brand" name="brand" value={formData.brand} onChange={updateField} maxLength={120} aria-invalid={Boolean(errors.brand)} aria-describedby={errors.brand ? "brand-error" : undefined} />
          {errors.brand && <span id="brand-error" className="form-status error">{errors.brand}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="boilerType">Type of productcode (optioneel)</label>
          <input id="boilerType" name="boilerType" value={formData.boilerType} onChange={updateField} maxLength={120} aria-invalid={Boolean(errors.boilerType)} aria-describedby={errors.boilerType ? "boiler-type-error" : undefined} />
          {errors.boilerType && <span id="boiler-type-error" className="form-status error">{errors.boilerType}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="message">Wat gebeurt er en sinds wanneer?</label>
          <textarea id="message" name="message" value={formData.message} onChange={updateField} maxLength={3000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <span id="message-error" className="form-status error">{errors.message}</span>}
        </div>
        <div className="field-full checkbox-row">
          <input id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={updateField} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <div>
            <label htmlFor="consent">Ik heb het <Link href="/privacy-policy">privacybeleid</Link> gelezen en geef toestemming om mijn gegevens te gebruiken voor deze aanvraag. *</label>
            {errors.consent && <div id="consent-error" className="form-status error">{errors.consent}</div>}
          </div>
        </div>
      </div>
      {status.type !== "idle" && <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>}
      <button className="button" type="submit" disabled={submitting}>{submitting ? "Aanvraag verzenden…" : "Aanvraag verzenden"}</button>
    </form>
  );
}
