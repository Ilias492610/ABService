# Calenta Ace (2018) — afgebakende broninventaris

Alleen de twee Belgische Nederlandstalige archieforiginalen voor Calenta Ace
15ds, 25ds, 25/28, 35ds en 35/39 zijn gebruikt. De installateurbron noemt
CU-GH08 en HMI T-control. Het gedeelde controlleretiket is geen reden om
betekenissen, remedies of softwarebasis uit Quinta of Ace-Matic over te nemen.

| Origineel | Interne editie | Pagina’s | Bytes | SHA-256 |
|---|---|---:|---:|---|
| [Installatie/service](https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_IM_SM_Calenta_Ace_NL.pdf) | 7688047-v.01-08052018 | 144 | 16.992.150 | `22713454d22089e9c1fd3f876aa6bc0b623f0c6205a798f9e3294de36699eef4` |
| [Gebruiker](https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_UM_Calenta_Ace_NL.pdf) | 7688050-v.01-08052018 | 44 | 1.099.445 | `d48fce2bd343f76e1f2fba399ee8cc703a406cc007b550fb376426591580aaf9` |

Root controleerde beide bestaande originalen opnieuw op 13 oktober 2026:
HTTP200, PDF-contenttype, identieke bytes en SHA. De interne publicatiedatum
8 mei 2018 verschilt van de archiefwijziging 31 mei 2018. Dit bewijst geen
nieuwste handleiding, individuele firmwarefit of aanwezigheid van alle opties.
De productimplementer las persoonlijk alle 29 bewaarde volledige relevante
bronbeelden: beide covers, installateur p. 7–11/25/47/82/90/121–129 en gebruiker
p. 5–10/15/31–32. De afzonderlijke onafhankelijke inventaris stelt 71 letterlijke
rijen vast, in bronvolgorde: 17 A in tabel 85, 24 H in tabel 86 en 30 E in tabel
87. Alle rijlocators verwijzen uitsluitend naar de installateurstabel/pagina.

Het gebruikersboek § 8 p. 31–32 bevat klassebeschrijvingen, rapportagecontext en
zeven probleemregels, geen tweede volledige tabel van 71 codes. Het noemt vijf
keer een code, vier verschillende codes; E04.08 is alleen een klassevoorbeeld
en wordt niet als aanvullende diagnoserij gepubliceerd. Axx/Hxx/Exx-patronen,
status/substatus en het geheugen voor de laatste 32 storingen zijn evenmin rijen.

Bij bronspanningen worden de kolommen onderscheiden: E04.01 laag schermetiket
tegenover kortsluiting/hoge meting; E04.02 kortsluitingsetiket tegenover
verwijderd/laag/open; E04.03 absolute aanvoerveiligheidstemperatuur tegenover
maximale warmtewisselaarstijging; E01.24 verbrandingsfouten ‘met 24 uur’ tegenover
te veel geresette fouten. E02.15 blijft E-vergrendeling ondanks blokkeerwoorden
en CSU-advies. A02.36 blijft A-waarschuwing ondanks het woord blokkering.
E02.78 houdt warm/koud en cv/SWW als verschillende leidingparen. E04.07 betreft
twee aanvoersensoren. H03.00 behoudt het onduidelijke ‘niet fout of ontbreken’;
H03.17 is een lopende controle met een streepje als advies. H01.00 heeft hier
professioneel herstartadvies, geen automatische herstelbelofte of
besturingsvervanging. E04.17/23 noemen besturingsvervanging als professioneel
advies, geen automatisch bewezen defect te vervangen klantonderdeel.

H02.31 na spanningsuitval, A02.33/34 vulwaarschuwingen en E02.32/39
vulvergrendelingen blijven onderscheiden. Geen rij bewijst een lek. Automatisch
vullen is alleen toepasselijk als aanwezig en daarvoor ingesteld. H02.00 is
een al actieve reset, A02.69 een demomodus; beide bewijzen geen defect.

Klantacties beperken zich tot de volledige veilig zichtbare melding,
modelgegevens uit reeds veilige documentatie en bekende gewone klachten;
aanhoudende of terugkerende meldingen gaan naar een bevoegde installateur of
leverancier. Geen openen, klimmen, technisch onderzoek, gas-/elektrische
handeling, reset, stroomonderbreking, vullen/ontluchten of instellingen wijzigen.
De bestaande gas/CO/water-elektrische veiligheidsmelding blijft vóór de lookup.
Artikelparen, serials, softwarebasis, actuele toestel-/regelaarcompatibiliteit en
nieuwste editie blijven onbekend (`null`). Geen volledige merk-, andere editie-,
Ace-Matic-, 25L- of actuele klanttoesteldekking wordt afgeleid.

De onafhankelijke bronfeiten zijn vóór productcode bevroren in
`tests/fixtures/calenta-ace-source-facts.json`, inclusief actual326file-capture,
bron-/paginatuples en inventarishash. Nieuwe actuele bron-/zoek-/SSR-tests toetsen
alle 71 rijen. De named beforeCalentaAce-inverse bewaart de volledige werkelijke
19/816-baseline en composeert vóór de oudere inverses, met positieve hashes en
negatieve oude-row/unknown-leaf/count/link/markup/date-driftchecks. Geen oudere
fixture of hash is opnieuw vastgesteld. Review, build, browser/crawl en
publicatieacceptatie blijven afzonderlijke rootgates.
