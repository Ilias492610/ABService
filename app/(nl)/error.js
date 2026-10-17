"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <section className="notice-page section-muted">
      <div className="shell narrow card">
        <p className="eyebrow">Technische fout</p>
        <h1>Deze pagina kon niet worden geladen</h1>
        <p>
          Probeer het opnieuw. Lukt dat niet, ga dan terug naar de startpagina of
          neem rechtstreeks contact op. Technische details worden niet publiek getoond.
        </p>
        <div className="button-row">
          <button className="button" type="button" onClick={reset}>
            Opnieuw proberen
          </button>
          <Link href="/" className="button button-secondary">
            Naar de startpagina
          </Link>
        </div>
      </div>
    </section>
  );
}
