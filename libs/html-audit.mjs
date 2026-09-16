const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match?.[1] ?? match?.[2] ?? match?.[3];
};

const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];

const textInside = (html, name) => {
  const match = html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
};

export const auditHtml = ({ html, url, indexable }) => {
  const issues = [];
  const title = textInside(html, "title");
  const descriptionTag = tags(html, "meta").find(
    (tag) => getAttribute(tag, "name")?.toLowerCase() === "description"
  );
  const description = descriptionTag ? getAttribute(descriptionTag, "content") || "" : "";
  const canonicalTag = tags(html, "link").find((tag) =>
    (getAttribute(tag, "rel") || "").toLowerCase().split(/\s+/).includes("canonical")
  );
  const canonical = canonicalTag ? getAttribute(canonicalTag, "href") || "" : "";
  const robotsTag = tags(html, "meta").find(
    (tag) => getAttribute(tag, "name")?.toLowerCase() === "robots"
  );
  const robots = robotsTag ? getAttribute(robotsTag, "content") || "" : "";
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const htmlTag = tags(html, "html")[0] || "";

  if (!title) issues.push("title ontbreekt");
  if (!description) issues.push("description ontbreekt");
  if (!canonical) issues.push("canonical ontbreekt");
  if (h1Count !== 1) issues.push(`pagina heeft ${h1Count} H1-elementen`);
  if (getAttribute(htmlTag, "lang") !== "nl-BE") {
    issues.push("html lang ontbreekt of is niet nl-BE");
  }
  if (!indexable && !robots.toLowerCase().includes("noindex")) {
    issues.push("noindex ontbreekt");
  }
  if (indexable && robots.toLowerCase().includes("noindex")) {
    issues.push("indexeerbare pagina bevat noindex");
  }
  if (tags(html, "img").some((tag) => getAttribute(tag, "alt") === undefined)) {
    issues.push("image zonder alt-attribuut");
  }

  const schemaScripts = [
    ...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const schemaPayloads = new Set();
  for (const schema of schemaScripts) {
    try {
      const normalized = JSON.stringify(JSON.parse(schema[1]));
      if (schemaPayloads.has(normalized)) {
        issues.push("dubbele JSON-LD");
        break;
      }
      schemaPayloads.add(normalized);
    } catch {
      issues.push("ongeldig JSON-LD");
      break;
    }
  }

  const origin = new URL(url).origin;
  const internalLinks = [
    ...new Set(
      tags(html, "a")
        .map((tag) => getAttribute(tag, "href"))
        .filter(Boolean)
        .map((href) => {
          try {
            return new URL(href, url);
          } catch {
            return null;
          }
        })
        .filter((link) => link?.origin === origin && ["http:", "https:"].includes(link.protocol))
        .map((link) => {
          link.hash = "";
          return link.toString();
        })
    ),
  ];

  return { issues, internalLinks, title, description, canonical, robots };
};
