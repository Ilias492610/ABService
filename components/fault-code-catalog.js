"use client";

import { useMemo, useState } from "react";

const normalize = (value) =>
  value
    .toLocaleLowerCase("nl-BE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.\s/_-]+/g, "");

export default function FaultCodeCatalog({ brand, catalogs }) {
  const [query, setQuery] = useState("");
  const [catalogId, setCatalogId] = useState("all");
  const normalizedQuery = normalize(query.trim());

  const filteredCatalogs = useMemo(
    () =>
      catalogs
        .filter((item) => catalogId === "all" || item.id === catalogId)
        .map((item) => ({
          ...item,
          codes: item.codes.filter((entry) => {
            if (!normalizedQuery) return true;
            return normalize(`${entry.searchTerms} ${entry.meaning}`).includes(normalizedQuery);
          }),
        }))
        .filter((item) => item.codes.length > 0),
    [catalogId, catalogs, normalizedQuery]
  );

  const resultCount = filteredCatalogs.reduce((total, item) => total + item.codes.length, 0);

  return (
    <div className="fault-catalog">
      <div className="fault-search" role="search" aria-label={`Zoek in ${brand} foutcodes`}>
        <div className="fault-search-field">
          <label htmlFor="fault-code-search">Zoek op code of betekenis</label>
          <input
            id="fault-code-search"
            type="search"
            inputMode="search"
            placeholder="Bijvoorbeeld F.28, EA 227 of waterdruk"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="fault-search-field">
          <label htmlFor="fault-model-filter">Toestelreeks of bron</label>
          <select
            id="fault-model-filter"
            value={catalogId}
            onChange={(event) => setCatalogId(event.target.value)}
          >
            <option value="all">Alle gedocumenteerde reeksen</option>
            {catalogs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <p className="fault-result-count" aria-live="polite">
          {resultCount} {resultCount === 1 ? "codeverklaring" : "codeverklaringen"} zichtbaar
        </p>
      </div>

      {filteredCatalogs.length > 0 ? (
        <div className="fault-groups">
          {filteredCatalogs.map((item) => (
            <section className="fault-group" key={item.id} aria-labelledby={`${item.id}-title`}>
              <div className="fault-group-heading">
                <div>
                  <p className="eyebrow">{item.codes.length} codeverklaringen</p>
                  <h2 id={`${item.id}-title`}>{item.title}</h2>
                  <p>{item.scope}</p>
                </div>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  Officiële bron ↗
                </a>
              </div>

              <div className="fault-code-list">
                {item.codes.map((entry, index) => (
                  <article className="fault-code-card" key={`${item.id}-${entry.code}-${index}`}>
                    <div className="fault-code-card-heading">
                      <code>{entry.code}</code>
                      <span>{entry.sourcePage}</span>
                    </div>
                    <h3>Betekenis</h3>
                    <p>{entry.meaning}</p>
                    <h3>Veilige eerste stap</h3>
                    <p>{entry.userAction}</p>
                  </article>
                ))}
              </div>

              <p className="fault-source-line">
                Bron: <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceLabel} ↗</a>
                {item.sourcePages ? `, ${item.sourcePages}` : ""}.
              </p>
            </section>
          ))}
        </div>
      ) : (
        <div className="answer-box" role="status">
          Geen overeenkomst gevonden. Controleer de schrijfwijze op het display, probeer ook zonder punt of spatie en kies de juiste toestelreeks.
        </div>
      )}
    </div>
  );
}
