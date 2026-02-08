import config from "@/config";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const apiKey = process.env.MAILGUN_API_KEY || process.env.API_KEY || "";
const mailgunDomain =
  process.env.MAILGUN_DOMAIN ||
  config.mailgun.domain ||
  ((config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") + config.domainName);
const mailgunBaseUrl = process.env.MAILGUN_BASE_URL || config.mailgun.baseUrl;

const mg = apiKey
  ? mailgun.client({
      username: "api",
      key: apiKey,
      ...(mailgunBaseUrl && { url: mailgunBaseUrl }),
    })
  : null;

if (!apiKey) {
  console.group("⚠️ Mailgun API key is missing");
  console.error("Set MAILGUN_API_KEY (or API_KEY) in .env.local to send emails.");
  console.error("Mailgun contact form submissions will fail until this is configured.");
  console.groupEnd();
}

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email.
 * @param {string} replyTo - The email address to set as the "Reply-To" address.
 * @returns {Promise} A Promise that resolves when the email is sent.
 */
export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  if (!mg) {
    throw new Error("Missing Mailgun API key. Set MAILGUN_API_KEY in .env.local.");
  }

  if (!mailgunDomain) {
    throw new Error("Missing Mailgun domain. Set MAILGUN_DOMAIN in .env.local.");
  }

  const recipients = Array.isArray(to) ? to : [to];
  const sender = process.env.MAILGUN_FROM || config.mailgun.fromAdmin;

  const data = {
    from: sender,
    to: recipients,
    subject,
    text,
    html,
    ...(replyTo && { "h:Reply-To": replyTo }),
  };

  return await mg.messages.create(mailgunDomain, data);
};
