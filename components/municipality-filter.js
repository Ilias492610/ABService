"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function MunicipalityFilter({ groups }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query.trim());
  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          areas: normalizedQuery
            ? group.areas.filter((area) => normalize(area.name).includes(normalizedQuery))
            : group.areas,
        }))
        .filter((group) => group.areas.length > 0),
    [groups, normalizedQuery]
  );
  const resultCount = filteredGroups.reduce((total, group) => total + group.areas.length, 0);

  return (
    <div className="area-directory">
      <div className="area-search">
        <label htmlFor="municipality-search">Zoek uw gemeente</label>
        <input
          id="municipality-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Bijvoorbeeld Gent, Wilrijk of Schaarbeek"
          autoComplete="off"
        />
        <p aria-live="polite">
          {resultCount} {resultCount === 1 ? "gebied gevonden" : "gebieden gevonden"}
        </p>
      </div>
      {filteredGroups.length ? (
        <div className="area-groups">
          {filteredGroups.map((group) => (
            <section className="area-group" key={group.slug} aria-labelledby={`area-${group.slug}`}>
              <div className="area-group-heading">
                <h3 id={`area-${group.slug}`}>{group.name}</h3>
                <Link href={group.hubPath}>Bekijk regiopagina →</Link>
              </div>
              <ul className="area-name-grid">
                {group.areas.map((area) => (
                  <li key={`${group.slug}-${area.slug}`}>
                    {area.href ? <Link href={area.href}>{area.name}</Link> : <span>{area.name}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="warning-box">Geen gemeente gevonden. Controleer de spelling of neem contact op.</p>
      )}
    </div>
  );
}
