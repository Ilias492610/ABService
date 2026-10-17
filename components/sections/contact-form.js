"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackWithConsent as track } from "@/libs/consented-analytics.mjs";
import { buildAnalyticsEvent } from "@/libs/analytics.mjs";
import { CONTACT_SERVICES, validateContactInput } from "@/libs/contact-validation.mjs";
import { readContactContext } from "@/libs/contact-context.mjs";
import { getContactCopy } from "@/content/contact-localization.mjs";
import { getPrivacyRoute, normalizeContactLocale } from "@/content/localization.mjs";

const initialData = {
  name: "", phone: "", email: "", address: "", city: "", postalCode: "",
  service: "", brand: "", boilerType: "", message: "", consent: false,
};

const sendEvent = (name, props) => {
  const event = buildAnalyticsEvent(name, props);
  track(event.name, event.props);
};

export default function ContactForm({ nativeStatus, initialService, locale: requestedLocale } = {}) {
  const locale = normalizeContactLocale(requestedLocale);
  const copy = getContactCopy(locale);
  const [formData, setFormData] = useState(() => ({
    ...initialData,
    service: typeof initialService === "string" && CONTACT_SERVICES.includes(initialService) ? initialService : "",
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(() => nativeStatus === "success"
    ? { type: "success", message: copy.success }
    : nativeStatus === "error"
      ? { type: "error", message: copy.nativeError }
      : { type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);
  const formRef = useRef(null);
  const pending = useRef(false);
  const statusRef = useRef(null);
  const editedPrefillFields = useRef({ service: false, message: false });

  useEffect(() => {
    if (!window.location.hash.startsWith("#aanvraagformulier?")) return;
    let active = true;
    const context = readContactContext(window.location);
    if (!context.service) return;
    queueMicrotask(() => {
      if (!active) return;
      setFormData((current) => ({
        ...current,
        service: editedPrefillFields.current.service ? current.service : context.service,
        message: editedPrefillFields.current.message ? current.message : (context.message ?? current.message),
      }));
      if (window.location.hash.startsWith("#aanvraagformulier?")) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#aanvraagformulier`);
      }
      requestAnimationFrame(() => {
        if (!active) return;
        document.getElementById("aanvraagformulier")?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    });
    return () => { active = false; };
  }, []);

  const noteStart = () => {
    if (!started.current) {
      started.current = true;
      sendEvent("contact_form_start", { location: "contact_page" });
    }
  };

  const updateField = (event) => {
    const { name, type, checked, value } = event.target;
    if (name === "service" || name === "message") editedPrefillFields.current[name] = true;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    setStatus({ type: "idle", message: "" });
    const validation = validateContactInput(formData, { locale });

    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus({ type: "error", message: copy.summary });
      sendEvent("contact_form_failure", { location: "contact_page", reason: "validation", service: formData.service });
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }

    pending.current = true;
    setSubmitting(true);
    setStatus({ type: "pending", message: copy.pending });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locale === "nl-BE" ? validation.data : { ...validation.data, locale }),
      });
      const result = await response.json();
      if (!response.ok || result?.ok !== true) throw new Error("De aanvraag kon niet worden verzonden.");

      sendEvent("contact_form_success", { location: "contact_page", service: validation.data.service });
      setStatus({ type: "success", message: copy.success });
      setFormData(initialData);
      setErrors({});
      started.current = false;
    } catch {
      sendEvent("contact_form_failure", { location: "contact_page", reason: "transport", service: validation.data.service });
      setStatus({ type: "error", message: copy.transport });
      requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  };

  return (
    <form ref={formRef} method="post" action="/api/contact" onSubmit={handleSubmit} onFocus={noteStart} noValidate aria-describedby="form-note" aria-busy={submitting}>
      {locale !== "nl-BE" && <input type="hidden" name="locale" value={locale} />}
      <p id="form-note" className="section-lead">{copy.note}</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">{copy.name}</label>
          <input id="name" name="name" value={formData.name} onChange={updateField} autoComplete="name" maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span id="name-error" className="form-status error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">{copy.phone}</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={updateField} autoComplete="tel" maxLength={40} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <span id="phone-error" className="form-status error">{errors.phone}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="email">{copy.email}</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={updateField} autoComplete="email" maxLength={200} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span id="email-error" className="form-status error">{errors.email}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="service">{copy.service}</label>
          <select id="service" name="service" value={formData.service} onChange={updateField} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
            <option value="">{copy.chooseService}</option>
            {CONTACT_SERVICES.map((service, index) => locale === "nl-BE" ? <option key={service}>{service}</option> : <option key={service} value={service}>{copy.services[index]}</option>)}
          </select>
          {errors.service && <span id="service-error" className="form-status error">{errors.service}</span>}
        </div>
        <div className="field">
          <label htmlFor="address">{copy.address}</label>
          <input id="address" name="address" value={formData.address} onChange={updateField} autoComplete="street-address" maxLength={200} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "address-error" : undefined} />
          {errors.address && <span id="address-error" className="form-status error">{errors.address}</span>}
        </div>
        <div className="field">
          <label htmlFor="city">{copy.city}</label>
          <input id="city" name="city" value={formData.city} onChange={updateField} autoComplete="address-level2" maxLength={100} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined} />
          {errors.city && <span id="city-error" className="form-status error">{errors.city}</span>}
        </div>
        <div className="field">
          <label htmlFor="postalCode">{copy.postalCode}</label>
          <input id="postalCode" name="postalCode" value={formData.postalCode} onChange={updateField} autoComplete="postal-code" maxLength={20} aria-invalid={Boolean(errors.postalCode)} aria-describedby={errors.postalCode ? "postal-code-error" : undefined} />
          {errors.postalCode && <span id="postal-code-error" className="form-status error">{errors.postalCode}</span>}
        </div>
        <div className="field">
          <label htmlFor="brand">{copy.brand}</label>
          <input id="brand" name="brand" value={formData.brand} onChange={updateField} maxLength={120} aria-invalid={Boolean(errors.brand)} aria-describedby={errors.brand ? "brand-error" : undefined} />
          {errors.brand && <span id="brand-error" className="form-status error">{errors.brand}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="boilerType">{copy.boilerType}</label>
          <input id="boilerType" name="boilerType" value={formData.boilerType} onChange={updateField} maxLength={120} aria-invalid={Boolean(errors.boilerType)} aria-describedby={errors.boilerType ? "boiler-type-error" : undefined} />
          {errors.boilerType && <span id="boiler-type-error" className="form-status error">{errors.boilerType}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor="message">{copy.message}</label>
          <textarea id="message" name="message" value={formData.message} onChange={updateField} maxLength={3000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <span id="message-error" className="form-status error">{errors.message}</span>}
        </div>
        <div className="field-full checkbox-row">
          <input id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={updateField} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <div>
            <label htmlFor="consent">{copy.consentBefore}<Link href={getPrivacyRoute(locale)}>{copy.privacy}</Link>{copy.consentAfter}</label>
            {errors.consent && <div id="consent-error" className="form-status error">{errors.consent}</div>}
          </div>
        </div>
      </div>
      {status.type !== "idle" && <p ref={statusRef} tabIndex={-1} className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>}
      <button className="button" type="submit" disabled={submitting}>{submitting ? copy.submitting : copy.submit}</button>
    </form>
  );
}
