"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { buildAnalyticsEvent } from "@/libs/analytics.mjs";
import { getMaintenanceResult } from "@/libs/maintenance-check.mjs";
import { buildContactHref } from "@/libs/contact-context.mjs";

const initialInput = { region: "unknown", device: "unknown", fuel: "unknown", power: "unknown", lastDate: "", changed: "unknown" };
const selections = [
  ["region", "Waar staat de installatie?", [["unknown", "Kies een gewest"], ["vlaanderen", "Vlaanderen"], ["brussel", "Brussels Hoofdstedelijk Gewest"], ["other", "Ander gewest of buitenland"]]],
  ["device", "Welk toestel heeft u?", [["unknown", "Weet ik nog niet"], ["central", "Centrale verwarmingsketel"], ["gas-water-heater", "Afzonderlijke gaswaterverwarmer / geiser"], ["electric", "Elektrische boiler of warmtepomp"]]],
  ["fuel", "Welke brandstof gebruikt het toestel?", [["unknown", "Weet ik nog niet"], ["gas", "Gas (aardgas, butaan of propaan)"], ["liquid", "Vloeibare brandstof (stookolie)"], ["solid", "Vaste brandstof (hout of pellets)"]]],
  ["power", "Maximumvermogen op het typeplaatje", [["unknown", "Onbekend"], ["below20", "Minder dan 20 kW"], ["atleast20", "20 kW of meer"]]],
  ["changed", "Recent geplaatst, vervangen, verplaatst of gewijzigd?", [["unknown", "Weet ik nog niet"], ["no", "Nee"], ["yes", "Ja"]]],
];

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const emit = (name, props) => {
  const event = buildAnalyticsEvent(name, props);
  track(event.name, event.props);
};
const displayDate = (value) => new Intl.DateTimeFormat("nl-BE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

export default function MaintenanceCheck() {
  const [input, setInput] = useState(initialInput);
  const [result, setResult] = useState(null);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const resultPanel = useRef(null);
  const firstField = useRef(null);
  const showPower = input.region !== "brussel" && input.device === "central" && input.fuel !== "solid";
  const showFuel = input.device === "central";

  const update = (event) => {
    const { name, value } = event.target;
    setInput((current) => ({ ...current, [name]: value, ...(name === "device" && value === "gas-water-heater" ? { fuel: "gas" } : {}) }));
    setResult(null);
  };
  const submit = (event) => {
    event.preventDefault();
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Brussels" }).format(new Date());
    const next = getMaintenanceResult(input, today);
    setResult(next);
    emit("maintenance_check_complete", { location: "maintenance_check", region: input.region, result: next.kind });
    requestAnimationFrame(() => {
      if (next.kind === "invalid") {
        document.getElementById("check-lastDate")?.focus();
      } else {
        const panel = resultPanel.current;
        panel?.focus({ preventScroll: true });
        panel?.scrollIntoView({ block: "start", behavior: "instant" });
      }
    });
  };

  const reset = () => {
    setInput(initialInput);
    setResult(null);
    requestAnimationFrame(() => {
      const field = firstField.current;
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: "center", behavior: "instant" });
    });
  };

  return (
    <div className="maintenance-check-layout">
      <form className="maintenance-check-form" onSubmit={submit} noValidate>
        <h2>Vul uw toestelgegevens in</h2>
        <p className="section-lead">Geen account nodig. De berekening blijft in uw browser; uw onderhoudsdatum wordt niet naar de analyse verstuurd. Contact is optioneel.</p>
        <noscript><p className="warning-box">JavaScript is nodig voor de lokale berekening in uw browser. De invoer en beide knoppen zijn uitgeschakeld. Lees hieronder de onderhoudsregels, voorbereiding en officiële bronnen.</p></noscript>
        <fieldset disabled={!ready} aria-label="Gegevens van de onderhoudscheck">
        <div className="form-grid">
          {selections.filter(([name]) => (name !== "power" || showPower) && (name !== "fuel" || showFuel)).map(([name, label, options]) => (
            <div className="field field-full" key={name}>
              <label htmlFor={`check-${name}`}>{label}</label>
              <select id={`check-${name}`} name={name} value={input[name]} onChange={update} ref={name === "region" ? firstField : undefined}>
                {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
              </select>
            </div>
          ))}
          <div className="field field-full">
            <label htmlFor="check-lastDate">Datum van het laatste onderhoud / de periodieke controle</label>
            <input type="date" id="check-lastDate" name="lastDate" value={input.lastDate} onChange={update} aria-invalid={result?.kind === "invalid"} aria-describedby={result?.kind === "invalid" ? "check-date-note check-date-error" : "check-date-note"} />
            <small id="check-date-note">Laat dit leeg als u de datum niet kent. Gebruik de datum op uw attest.</small>
            {result?.kind === "invalid" && <span id="check-date-error" className="form-status error">{result.summary}</span>}
          </div>
        </div>
        <div className="button-row"><button type="submit" className="button" disabled={!ready}>Bekijk mijn onderhoudsregel</button><button type="button" className="button button-secondary" onClick={reset} disabled={!ready}>Wis mijn invoer</button></div>
        </fieldset>
      </form>
      <div className="maintenance-check-result" id="onderhoudsresultaat" ref={resultPanel} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true">
        {result ? (
          <>
            <p className="eyebrow">Uw resultaat</p>
            <h2>{result.title}</h2>
            <p>{result.summary}</p>
            {result.planningDate && <div className="planning-date"><span>Richtdatum voor uw planning</span><strong><time dateTime={result.planningDate}>{displayDate(result.planningDate)}</time></strong></div>}
            {result.intervalYears && <p><strong>Gebruikelijke cyclus:</strong> {result.intervalYears === 1 ? "jaarlijks" : "tweejaarlijks"}.</p>}
            {result.notes.length > 0 && <ul className="check-list">{result.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
            {result.source && <p><a href={result.source} target="_blank" rel="noopener noreferrer">Lees de officiële regel voor uw situatie ↗</a></p>}
            {result.kind !== "invalid" && (
              <Link href={buildContactHref({ service: result.service, toolInput: input })} className="button" onClick={() => emit("tool_enquiry_click", { location: "maintenance_check", region: input.region, result: result.kind, service: result.service })}>
                Bespreek mijn situatie
              </Link>
            )}
            <p className="tool-note">De volledige uitslag staat hierboven. Contact opnemen is optioneel; een afspraak is pas bevestigd na rechtstreeks contact.</p>
          </>
        ) : (
          <>
            <p className="eyebrow">Direct een antwoord</p>
            <h2>Uw regel en planning verschijnen hier</h2>
            <p>Een onbekende datum of toestelkeuze is geen probleem: u ziet welke informatie nog nodig is. De check geeft alleen een datum wanneer de invoer daarvoor voldoende duidelijk is.</p>
            <ul className="check-list"><li>Vlaanderen en Brussel afzonderlijk beoordeeld</li><li>Geen verzonnen onderhoudsdatum</li><li>Officiële bron bij uw resultaat</li></ul>
          </>
        )}
      </div>
    </div>
  );
}
