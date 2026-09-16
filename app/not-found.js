import Link from "next/link";

export const metadata = {
  title: "Pagina niet gevonden | AB Service",
  description: "Deze pagina bestaat niet of is verplaatst.",
  robots: { index: false, follow: true },
  alternates: {},
};

export default function NotFound() {
  return (
    <section className="notice-page">
      <div className="shell narrow">
        <p className="eyebrow">404</p>
        <h1>Deze pagina bestaat niet</h1>
        <p className="section-lead">Gebruik de navigatie of ga terug naar de homepage. Voor een concrete vraag kunt u meteen naar contact.</p>
        <div className="button-row" style={{ justifyContent: "center" }}><Link className="button" href="/">Naar de homepage</Link><Link className="button button-secondary" href="/contact">Naar contact</Link></div>
      </div>
    </section>
  );
}
