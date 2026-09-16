const config = {
  // REQUIRED
  appName: "AB Service",
  // Canonical site URL for SEO tags, sitemap and structured data.
  siteUrl: "https://www.abservice24.be",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
  "Loodgieterswerk, sanitair en verwarmingsservice in Antwerpen",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "abservice24.be",
  mailgun: {
    // Full Mailgun sending domain.
    domain: "mg.abservice24.be",
    // EU region endpoint (required for EU domains).
    baseUrl: "https://api.eu.mailgun.net",
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `AB Service <noreply@mg.abservice24.be>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `AB Service <no-reply@mg.abservice24.be>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "info@abservice24.be",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "info@abservice24.be",
  },
  colors: { theme: "light", main: "#103447" },
};

export default config;
