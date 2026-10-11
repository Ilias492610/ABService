"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { buildAnalyticsEvent } from "@/libs/analytics.mjs";
import { buildContactHref } from "@/libs/contact-context.mjs";
import { getWaterMeterObservation } from "@/libs/water-meter-check.mjs";

const initialInput = { safeAccess: "unknown", waterNearElectricity: "unknown", meterScope: "unknown", waterUse: "unknown", unit: "unknown", firstReading: "", secondReading: "", minutes: "" };
const selections = [
  ["safeAccess", "Kunt u de meter veilig bereiken en aflezen?", [["unknown", "Weet ik nog niet"], ["yes", "Ja, veilig bereikbaar en afleesbaar"], ["no", "Nee, de toegang is onveilig"]]],
  ["waterNearElectricity", "Is er water bij elektriciteit?", [["unknown", "Weet ik nog niet"], ["yes", "Ja, er is water bij elektriciteit"], ["no", "Nee, zeker geen water bij elektriciteit"]]],
  ["meterScope", "Meet deze meter alleen uw eigen watercircuit?", [["unknown", "Weet ik nog niet"], ["own", "Ja, mijn eigen meter"], ["shared", "Nee, een gedeelde meter"]]],
  ["waterUse", "Was er watergebruik tijdens de hele meetperiode?", [["unknown", "Weet ik nog niet"], ["none", "Geen kranen, toiletten, toestellen of automatisch watergebruik tijdens de hele periode"], ["possible", "Er was of kon gewoon of automatisch watergebruik zijn"]]],
  ["unit", "Welke eenheid hebben beide totale meterstanden?", [["unknown", "Weet ik nog niet"], ["m3", "Kubieke meter (m³)"], ["litres", "Liter"]]],
];
const numbers = [["firstReading", "Eerste totale meterstand"], ["secondReading", "Tweede totale meterstand"], ["minutes", "Meetduur in minuten"]];
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const format = (amount) => new Intl.NumberFormat("nl-BE", { maximumFractionDigits: 3 }).format(amount);
const emit = (name, props) => {
  const event = buildAnalyticsEvent(name, props);
  track(event.name, event.props);
};

export default function WaterMeterCheck() {
  const [input, setInput] = useState(initialInput);
  const [result, setResult] = useState(null);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const firstField = useRef(null);
  const resultPanel = useRef(null);
  const update = (event) => {
    const { name, value } = event.target;
    setInput((current) => ({ ...current, [name]: value }));
    setResult(null);
  };
  const submit = (event) => {
    event.preventDefault();
    const next = getWaterMeterObservation(input);
    setResult(next);
    emit("water_meter_check_complete", { location: "water_meter_check", result: next.status });
    requestAnimationFrame(() => resultPanel.current?.focus());
  };
  const reset = () => {
    setInput(initialInput);
    setResult(null);
    requestAnimationFrame(() => firstField.current?.focus());
  };

  return <div className="maintenance-check-layout">
    <form className="maintenance-check-form" onSubmit={submit} noValidate>
      <h2>Vergelijk uw totale meterstanden</h2>
      <p className="section-lead">Alle velden zijn optioneel. Onbekende gegevens geven uitleg over wat nog ontbreekt. Geen account of e-mailadres nodig. Uw invoer en de berekening blijven lokaal in uw browser.</p>
      <noscript><p className="warning-box">JavaScript is nodig voor de lokale berekening in uw browser. De invoer en berekenknop zijn uitgeschakeld. Lees hieronder de voorbereiding, veiligheidsgrenzen en officiële bronnen.</p></noscript>
      <fieldset disabled={!ready} aria-label="Gegevens van de watermeterobservatie">
        <div className="form-grid">
          {selections.map(([name, label, options]) => <div className="field field-full" key={name}>
            <label htmlFor={`water-${name}`}>{label}</label>
            <select id={`water-${name}`} name={name} value={input[name]} onChange={update} ref={name === "safeAccess" ? firstField : undefined} aria-describedby={name === "waterUse" ? "water-use-note" : name === "unit" ? "water-reading-note" : undefined}>
              {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
            </select>
            {name === "waterUse" && <small id="water-use-note">Denk ook aan een waterontharder of automatisch bijvullen. Dit zijn voorbeelden; ook andere toestellen kunnen vanzelf water nemen.</small>}
          </div>)}
          <p className="tool-note field-full" id="water-reading-note">Gebruik de totale meterstand, niet het debiet in m³/uur. Lees beide standen van dezelfde meter in dezelfde eenheid af. Gebruik geen duizendtalscheiding; een punt of komma met maximaal 3 decimalen is toegestaan. 1 m³ is 1000 liter.</p>
          {numbers.map(([name, label]) => <div className="field field-full" key={name}>
            <label htmlFor={`water-${name}`}>{label}</label>
            <input type="text" inputMode="decimal" autoComplete="off" id={`water-${name}`} name={name} value={input[name]} onChange={update} aria-describedby={name === "minutes" ? "water-duration-note" : "water-reading-note"} />
            {name === "minutes" && <small id="water-duration-note">Laat leeg als de duur onbekend is. Van 1 tot en met 10080 minuten: dit is een invoergrens van de tool, geen regel van een waterbedrijf.</small>}
          </div>)}
        </div>
        <div className="button-row"><button type="submit" className="button" disabled={!ready}>Bekijk mijn observatie</button><button type="button" className="button button-secondary" onClick={reset} disabled={!ready}>Wis mijn invoer</button></div>
      </fieldset>
    </form>
    <div className="maintenance-check-result" id="watermeterresultaat" ref={resultPanel} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true">
      {result ? <>
        {result.status === "unsafe" ? <div className="warning-box"><h2>{result.title}</h2><p>{result.summary}</p></div> : <><p className="eyebrow">Uw observatie</p><h2>{result.title}</h2><p className={result.status === "invalid" ? "form-status error" : undefined}>{result.summary}</p></>}
        {result.status === "observation" && <dl className="project-facts"><div><dt>Geregistreerd verschil</dt><dd>{format(result.differenceLitres)} liter</dd></div><div><dt>Gemiddelde tijdens deze periode</dt><dd>{format(result.litresPerHour)} liter/uur</dd></div></dl>}
        {result.limitations.length > 0 && <><h3>Grenzen van deze observatie</h3><ul className="link-list">{result.limitations.map((note) => <li key={note}>{note}</li>)}</ul></>}
        <p>Bij een probleem aan straat, meter of hoofdkraan: neem contact op met uw eigen waterbedrijf. Meer uitleg staat bij de veiligheidsinstructies en officiële bronnen hieronder.</p>
        {result.status === "observation" && <>
          <Link className="button" href={buildContactHref({ service: result.nextService, waterMeterContext: result.differenceLitres > 0 ? "positive" : "zero" })} onClick={() => emit("service_cta_click", { location: "water_meter_check", result: result.status, service: result.nextService })}>Bespreek mijn meterobservatie</Link>
          <p className="tool-note">De volledige uitslag en beperkingen staan hierboven. Contact is optioneel: alleen de categorie positief verschil of nulverschil en de dienst worden overgenomen, zonder standen, meetduur of hoeveelheid. Een afspraak is pas bevestigd na rechtstreeks contact.</p>
        </>}
      </> : <><p className="eyebrow">Directe uitleg</p><h2>Uw observatie verschijnt hier</h2><p>De check vergelijkt geregistreerde hoeveelheden tijdens uw meetperiode. Een verschil bevestigt geen lek; nul sluit niet ieder lek uit. Bij ontbrekende of onveilige gegevens krijgt u eerst passende uitleg.</p></>}
    </div>
  </div>;
}
