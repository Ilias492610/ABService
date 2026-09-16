import { NextResponse } from 'next/server';
import config from '@/config';
import { sendEmail } from '@/libs/mailgun';
import { validateContactInput } from '@/libs/contact-validation.mjs';

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const isNavigationPost = (request) => request.headers.get('sec-fetch-mode') === 'navigate';

const getRedirectUrl = (request) => {
  const fallbackUrl = new URL('/contact', request.url);
  const referer = request.headers.get('referer');

  if (!referer) {
    return fallbackUrl;
  }

  try {
    const refererUrl = new URL(referer);
    if (refererUrl.origin === fallbackUrl.origin) {
      return refererUrl;
    }
  } catch {
    return fallbackUrl;
  }

  return fallbackUrl;
};

const buildErrorResponse = (request, message, status = 400) => {
  if (isNavigationPost(request)) {
    const redirectUrl = getRedirectUrl(request);
    redirectUrl.searchParams.set('contact', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  return NextResponse.json({ error: message }, { status });
};

const buildSuccessResponse = (request) => {
  if (isNavigationPost(request)) {
    const redirectUrl = getRedirectUrl(request);
    redirectUrl.searchParams.set('contact', 'success');
    return NextResponse.redirect(redirectUrl, 303);
  }

  return NextResponse.json({ ok: true });
};

const getRequestData = async (request) => {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return await request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
};

export async function POST(request) {
  try {
    const data = await getRequestData(request);
    const validation = validateContactInput(data);

    if (!validation.ok) {
      return buildErrorResponse(
        request,
        'Controleer de ingevulde velden en uw akkoord met het privacybeleid.'
      );
    }

    const { name, phone, email, address, city, postalCode, service, brand, boilerType, message } = validation.data;

    const recipientSource =
      process.env.CONTACT_FORM_TO ||
      config.mailgun.supportEmail ||
      config.mailgun.forwardRepliesTo;
    const recipients = (recipientSource || '')
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      return buildErrorResponse(
        request,
        'Geen ontvanger ingesteld voor contactaanvragen.',
        500
      );
    }

    const details = [
      ['Naam', name],
      ['Telefoon', phone],
      ['E-mail', email],
      ['Adres', address || '-'],
      ['Gemeente', city || '-'],
      ['Postcode', postalCode || '-'],
      ['Dienst', service || '-'],
      ['Merk', brand || '-'],
      ['Type', boilerType || '-'],
      ['Extra informatie', message || '-'],
      ['Privacy akkoord', 'Ja'],
    ];

    const text = details.map(([label, value]) => `${label}: ${value}`).join('\n');
    const html = `
      <h2>Nieuwe contactaanvraag via AB Service</h2>
      <table cellpadding="6" cellspacing="0" border="0">
        ${details
          .map(
            ([label, value]) =>
              `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
    `;

    const mailgunResponse = await sendEmail({
      to: recipients,
      subject: `Nieuwe contactaanvraag${service ? ` - ${service}` : ''}`,
      text,
      html,
      replyTo: email,
    });
    console.info('Contact aanvraag verstuurd via Mailgun', { id: mailgunResponse?.id });

    return buildSuccessResponse(request);
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return buildErrorResponse(
      request,
      'Serverfout bij het verzenden van de aanvraag. Probeer het later opnieuw.',
      500
    );
  }
}
