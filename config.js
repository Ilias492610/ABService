import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "AB Service",
  // Canonical site URL for SEO tags, sitemap and structured data.
  siteUrl: "https://www.abservice24.be",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
  "De specialist in gasketels, onderhoud, herstelling en installaties rond Antwerpen",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "abservice24.be",
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
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
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=light]`]["primary"],
  },
};

export default config;
