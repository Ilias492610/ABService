import config from "@/config";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mailgunDomain =
  process.env.MAILGUN_DOMAIN ||
  config.mailgun.domain ||
  ((config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") + config.domainName);
const mailgunBaseUrl = process.env.MAILGUN_BASE_URL || config.mailgun.baseUrl;

const getMailgunClient = () => {
  const apiKey = process.env.MAILGUN_API_KEY || process.env.API_KEY || "";
  if (!apiKey) {
    throw new Error("Missing Mailgun API key. Set MAILGUN_API_KEY in the deployment environment.");
  }

  return mailgun.client({
    username: "api",
    key: apiKey,
    ...(mailgunBaseUrl && { url: mailgunBaseUrl }),
  });
};

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
  if (!mailgunDomain) {
    throw new Error("Missing Mailgun domain. Set MAILGUN_DOMAIN in the deployment environment.");
  }

  const mg = getMailgunClient();
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
