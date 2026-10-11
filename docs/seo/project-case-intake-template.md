# Private intake voor een echt AB Service project

Maak een private kopie van dit lege formulier buiten de webrepository. Vul het
uitsluitend met echte, controleerbare werkgegevens in. In dit bestand staan geen
klantgegevens of voorbeeldklus die als uitgevoerd werk kan worden overgenomen.
De standaardstatus is **draft**, de publicatiebeslissing **pending**.

Het formulier ondersteunt de [projectguide](../../PROJECT_CONTENT_GUIDE.md).
Het is een menselijke intake, geen ingevoerd JSON-schema, extra backendveld of
automatische goedkeuring. Een ingevuld formulier verandert geen bestaande URL,
projectstatus, lokaal bewijs of sitemap.

## Invulregels en onbekende gegevens

Laat een ontbrekend gegeven leeg met status `unknown`; gebruik `not_applicable`
alleen met een feitelijke reden. `not_approved` is iets anders dan onbekende
toestemming. Een algemeen eigenaarakkoord of eigen fotoarchief koppelt nog geen
specifieke foto aan deze opdracht.

Bevestig alleen de feiten die het onderliggende record werkelijk ondersteunt.
Een niet-publiceerbare klantidentiteit kan private traceerbaarheid bieden,
zonder dat naam, adres, factuur of bestandslocatie op de website verschijnt.

## Private dossiergegevens

| Gegeven | Waarde in private kopie | Bewijs of status |
|---|---|---|
| Ondoorzichtig dossier-ID | Leeg | pending; geen naam, adres, telefoon of e-mail in het ID |
| Dossierstatus | draft | Alleen na afzonderlijk besluit wijzigen |
| Invuller en datum van intake | Leeg | unknown |
| Werkbon/factuur/opdrachtreferentie | Leeg | unknown; afgeschermde interne referentie |
| Bewijs dat AB Service deze werken uitvoerde | Leeg | unknown; benoem wat het record bevestigt |
| Gemeente, eventueel Antwerps district, provincie/regio | Leeg | unknown; afzonderlijke plaatsreferentie |
| Datum/periode van de werken | Leeg | unknown; datumreferentie en toegestane publieke precisie |
| Uitgevoerde dienst en overeengekomen scope | Leeg | unknown; scope-/werkreferentie |
| Merk, exact model, generatie/revisie | Leeg | unknown of onderbouwd not_applicable; typeplaat/handleiding/werkrecord |
| Aanleiding en gemelde symptomen | Leeg | unknown; onderscheid melding van diagnose |
| Vastgestelde diagnose en beoordelaar | Leeg | unknown; diagnose-/controleverslag, geen gok uit foutcode |
| Feitelijke beginsituatie en beperkingen | Leeg | unknown; bijbehorend record |
| Uitgevoerde stappen en materialen | Leeg | unknown; werkrecord en eventueel productbewijs |
| Feitelijk resultaat en oplevercontrole | Leeg | unknown; resultaat-/handoverreferentie, geen verzonnen meetwinst |
| Eventuele erkenning/conformiteit | Leeg | unknown of not_applicable met reden; document en bevoegde houder |
| Technische inhoudsbeoordelaar en datum | Leeg | unknown; bevoegdheid niet uit functietitel afleiden |

Bewaar de echte documenten, interne identificatoren, originele beelden en
klantidentiteit in het afgeschermde bedrijfsdossier, niet in Git, publieke assets,
URL-parameters, analytics of een openbaar projectrecord. Deze tabel verzamelt
referenties naar bewijs, geen verplichting om alle originelen te kopiëren.

## Foto en rechten per geselecteerd beeld

Gebruik één rij per beeld, doorgaans één tot drie relevante beelden voor de
uiteindelijke case. Meerdere beeldhoeken vervangen de match met de opdracht niet.

| Beeld | Origineel en herkomst | Match met werkrecord | Publicatie en privacy | Webexport |
|---|---|---|---|---|
| Leeg | Private originele-bestandsreferentie, maker/rechthebbende, opnamedatum indien bekend; statusunknown | Private dossier-/werkreferentie en wat daadwerkelijk zichtbaar is; statusunknown | Toestemmingsreferentie/scope en aanwezige personen/identificerende gegevens; statusunknown | Nog niet gemaakt; latere beschrijvende filename/alt, dimensies/crop en WebP/AVIF |

Noteer bewerkingen zoals uitsnede, achtergrondaanpassing of anonimisatie en
bewaar het origineel. Een beeld mag niet als deze specifieke klus worden
bijgeschreven wanneer de koppeling ontbreekt. Controleer gezichten, huisnummer,
kenteken, documenten, schermen, interieurkenmerken en metadata/geolocatie.

## Toestemming en afzonderlijke goedkeuringen

| Onderdeel | Private referentie | Status en werkelijke reikwijdte |
|---|---|---|
| Toestemming voor casetekst | Leeg | unknown; versie van tekst, kanalen en toegestane gegevens |
| Toestemming/rechten voor ieder beeld | Leeg | unknown; beeldlijst en toepasselijke persoons-/eigendomsrechten |
| Toegestane publieke gemeente/district/periode/merk/model | Leeg | unknown; apart per veld beslissen |
| Toegestane anonimisatie of herkenbaarheid | Leeg | unknown; eventuele voorwaarden vastleggen |
| Testimonial/review en herkomst | Leeg | unknown; niet opnemen zonder echte tekst/herkomst/toestemming |
| Eigenaarscontrole feiten en datum | Leeg | pending; niet hetzelfde als technische of klantgoedkeuring |
| Technische/privacyreview en datum | Leeg | pending; concrete reviewer en beoordeelde versie |
| Publicatiebeslissing en datum | Leeg | pending; geen automatische publicatie |

Leg beperkingen vast zoals alleen anoniem, alleen een bepaalde foto of geen
publieke periode. Verzin geen vervaldatum voor toestemming; een echte beperking,
wijziging of intrekking vraagt een passende inhoudsbeslissing.

## Goedgekeurde publieke samenvatting

Vul pas na de bovenstaande beoordelingen de volgende tekstvelden in:

- Titel en korte samenvatting: leeg.
- Goedgekeurde plaats en periode: leeg; niet-publiceerbare precisie weglaten.
- Dienst en werkelijke beginsituatie: leeg.
- Geverifieerde diagnose, relevante beperkingen en uitgevoerde stappen: leeg.
- Resultaat en handover zonder extra garantie: leeg.
- Alleen toegestane merk-/modelinformatie: leeg of expliciet geanonimiseerd.
- Geselecteerde matching webbeelden en feitelijke alt/captions: leeg.
- Relevante bestaande dienst-/merk-/gebiedslink: leeg; alleen published bestemming.
- Publieke review/testimonial: niet opnemen zolang niet afzonderlijk goedgekeurd.

De publieke referentie naar het werkbewijs blijft hooguit een ondoorzichtig
minimaal ID of neutrale beschrijving. Kopieer geen private paden, adressen,
contactgegevens, werkbonnummers of bewijsdocumenten naar `content/projects.mjs`.

## Overdracht naar de bestaande publicatieworkflow

1. Koppel en beoordeel de echte records; onopgeloste feitelijke gaten blijven onbekend.
2. Maak uitsluitend de goedgekeurde publieke projecttekst en geoptimaliseerde media.
3. Voeg een niet-routable `draft` toe volgens de bestaande recordvelden in de guide.
   Model/generatie/diagnose zijn hier intakegegevens; de huidige renderer/validator
   ondersteunt daarmee niet automatisch nieuwe conditionele velden of bewijscontroles.
4. Review inhoud, rechten, privacy en nuttige relatie met bestaande pagina's.
   `validateProjectForPublication` is een structurele controle, geen bewijsverificatie.
5. Publiceer alleen na een expliciet inhoudelijk besluit én de vereiste tests,
   lint/build/crawl/browsergate en centrale registry/inventory/evidence/changelog-update.
6. Koppel passende merk-/gebiedspagina's alleen bij een echte overeenkomst.
   Een case creëert geen vestiging, lokale review, aankomstgarantie of automatische gemeentepublicatie.
