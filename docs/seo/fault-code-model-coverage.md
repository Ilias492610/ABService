# WP07 — actuele model- en brondekking

Vastlegging 11 oktober 2026; geaccepteerd productbaseline `64d7f56e`.
Task50's historische ACVscope/vier eersteacties zijn onafhankelijk gereviewd en
exact door CI/beide werkelijke Production-projecten/live geaccepteerd.
Task52's Intergas-bron-/displaycontext is lokaal/native geverifieerd; review/
hosted/live blijven aparte gates. Task53's leesmarker is geen extra brondekking.
Task47 inventariseert, Task48 leest één extra historische tabelbron en
Task49 leest afgebakend de context van één professioneel codeboek.
Dit is **geen bronheraudit van de overige catalogi, bewijs van de nieuwste
revisie of voltooiing van WP07**.
De [machineleesbare inventaris](fault-code-model-coverage.json) bevat alle 32
letterlijke scopes, IDs, modellen/artikelnummers indien vastgesteld, markt/taal,
revisie, component, tabellen/pagina’s, bronlabels/URLs, bewijsbasis en gaten.
De hoofdonderzoeker heeft de oorspronkelijke 31 records gelezen en de zeven
bewaarde bronbestanden opnieuw gehasht. Alleen vijf PDF’s en de Bulex-bronweergave
hebben een eerdere vastgelegde SHA; Vaillant-HTML heeft hier een nieuw
vastgelegde hash, geen eerder gepinde vergelijking. Task48 voegt één gelezen
A/B-PDF, 31 genummerde regels en een achtste snapshot toe. Bij die release bleven
de oorspronkelijke31 records/zeven snapshots/overige twaalf gidsen exact behouden.
Task49 voegt een negende snapshot toe en corrigeert alleen zes gedeelde scopes
en twee waarschuwingen; andere26 records/acht snapshots/elf gidsrecords blijven
exact. Nieuw Nederlands/hoofdstukjaar/context is geen nieuwe 242-regelheraudit.
Task50 voegt de tiende snapshot toe, leest daadwerkelijk de ACV-identiteit en
geselecteerde24groepen en corrigeert vier eersteacties. Andere31records/negen
snapshots/twaalfgidsrecords blijven exact. Dag/SKU/firmware/currentfit onbekend.
Task52 voegt een elfde snapshot toe: werkelijk gelezen Prestige A CW6/
88136803,11groepen/20nummers/drie gegroepeerde broncellen. Knipperende storingsled
en temperatuurdisplay onderscheiden deze tabel van normale servicedisplaystates.
Alle11acties/andere10betekenissen behouden; andere31records/10snapshots/12mirrors
exact. NL-context is geen actuele Belgische toestel-/firmware-/SKU-bevestiging;
editie/revisie blijven onbekend. Geen nieuwe ontbrekende/bedrijfscodes verzonnen.

## Wat de aantallen betekenen

Dertien gidsen; 38 catalogustoewijzingen; 32 afzonderlijke catalogi;
1.596 weergegeven uitleg-/tabelregels. Zonder Bosch/Junkers-hergebruik zijn
het 1.354 catalogusregels. Zes Bosch-catalogi worden op beide merkgidsen
gebruikt. Deze aantallen zijn niet unieke foutcodes, modellen, zoekvolume,
Google-indexatie, klanten of resultaat. Buderus heeft 52 uitlegregels voor
74 codecombinaties; dit zijn eveneens verschillende maten.

| Gids | Weergegeven uitlegregels | Catalogustoewijzingen |
|---|---:|---:|
| Vaillant | 90 | 2 |
| Bulex | 74 | 3 |
| Bosch | 242 | 6 |
| Junkers | 242 | 6 |
| Remeha | 659 | 13 |
| Buderus | 52 | 1 |
| Viessmann | 71 | 1 |
| ACV | 24 | 1 |
| Intergas | 11 | 1 |
| Nefit Bosch | 54 | 1 |
| ATAG | 14 | 1 |
| Itho Daalderop | 26 | 1 |
| Ferroli | 37 | 1 |

Er zijn 18 verschillende catalogusbron-URL’s. De websitebrede broninventaris
was bij Task47 58 unieke URLs; de nieuwe bron voegt één URL toe. Dat is een
andere verzameling en wordt door deze inventarisatie niet opnieuw op
toegankelijkheid of inhoud gecertificeerd.

## Alle afzonderlijke catalogi

Een bewaard bronbestand plus eerder afgebakend leesrapport is sterker bewijs
dan uitsluitend een bestaande declaratie. Tweeëntwintig catalogi zijn gekoppeld
aan negen bewaarde PDF’s; twee aan bewaarde publieke bronweergaven.
Acht hebben binnen deze inventaris alleen de bestaande declaratie en
historische bewijsregistratie (G). Bewaren/hashvergelijking is op zichzelf
geen nieuwe inhoudelijke controle van alle foutcoderegels.

| Catalogus-ID | Uitlegregels | Gedeclareerde bronlocatie | Officiële bron | Bewijsbasis |
|---|---:|---|---|---|
| `vaillant-publiek-overzicht` | 12 | Online overzicht | [bron 1](https://www.vaillant.be/nl/advies/helpcentrum/foutcodes-ketel/) | vaillant-public-html |
| `vaillant-ecotec-plus-cs` | 78 | Bijlage D, p. 225-236 | [bron 2](https://support.vaillant.be/downloads/documenten/installatievoorschrift/0020282230-00-2764886.pdf) | vaillant-ecotec-pdf |
| `bulex-publiek-overzicht` | 14 | Online overzicht | [bron 3](https://www.bulex.be/particulier/diensten/foutcodes/) | bulex-public-web-render |
| `bulex-thema-condens` | 29 | Bijlage D, p. 37-38 | [bron 4](https://www.bulex.be/themacondens/0020124551-02-1746869.pdf) | bulex-thema-pdf |
| `bulex-thema-condens-ab` | 31 | § 13.3, p. 33-34 | [A/B-bron](https://www.bulex.be/themacondens/0020109430-06-1746866.pdf) | bulex-thema-ab-pdf; nieuw gelezen Task48 |
| `bosch-serie-7000i` | 31 | p. 27-30; hoofdstuk p10/from2017 | [bron 5](https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf) | bosch-junkers-codebook-pdf; context, geen regelheraudit |
| `bosch-serie-9000i` | 41 | p. 45-53; hoofdstuk p32/from2015 | [bron 5](https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf) | bosch-junkers-codebook-pdf; context, geen regelheraudit |
| `bosch-cerapur-maxx` | 47 | p. 64-75; hoofdstuk p56 | [bron 5](https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf) | bosch-junkers-codebook-pdf; context, geen regelheraudit |
| `bosch-serie-4` | 37 | p. 103-109; hoofdstuk p84/from2013 | [bron 5](https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf) | bosch-junkers-codebook-pdf; context, geen regelheraudit |
| `bosch-serie-3` | 29 | p. 132-133; hoofdstuk p111/from2007 | [bron 5](https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf) | bosch-junkers-codebook-pdf; context, geen regelheraudit |
| `bosch-serie-2` | 57 | p. 160-163; hoofdstuk p134/1997–2006 | [bron 5](https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf) | bosch-junkers-codebook-pdf; context, geen regelheraudit |
| `remeha-avanta` | 17 | Online productoverzicht, 17 codes | [bron 6](https://storingswijzer.remeha.be/error-codes-products/avanta/) | G: declaratie/historisch register |
| `remeha-calenta-legacy` | 23 | §11.1, gedrukte p. 79–82 (PDF-pagina 80–83) | [bron 7](https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf) | G: declaratie/historisch register |
| `remeha-calenta-legacy-blocking` | 19 | §11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85) | [bron 7](https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf) | G: declaratie/historisch register |
| `remeha-calenta-ace-matic-cu-warnings` | 18 | NL tabel 227, p. 369 | [bron 8](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/ML-ISM-7871265-04-Calenta-Ace-Matic.pdf) | remeha-four-model-pdf |
| `remeha-calenta-ace-matic-cu-blocking` | 41 | NL tabel 228, p. 370–373 | [bron 8](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/ML-ISM-7871265-04-Calenta-Ace-Matic.pdf) | remeha-four-model-pdf |
| `remeha-calenta-ace-matic-cu-locking` | 47 | NL tabel 229, p. 373–377 | [bron 8](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/ML-ISM-7871265-04-Calenta-Ace-Matic.pdf) | remeha-four-model-pdf |
| `remeha-calenta-ace-matic-scb-warnings` | 60 | NL tabel 230, p. 378–382 | [bron 8](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/ML-ISM-7871265-04-Calenta-Ace-Matic.pdf) | remeha-four-model-pdf |
| `remeha-calenta-ace-matic-scb-blocking` | 134 | NL tabel 231, p. 382–392 | [bron 8](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/ML-ISM-7871265-04-Calenta-Ace-Matic.pdf) | remeha-four-model-pdf |
| `remeha-calenta-ace-matic-25l-cu-warnings` | 18 | NL tabel 224, p. 346 | [bron 9](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/7871254-Calenta-Ace-Matic-25L-ISM-SCB10-BE-de-fr-nl.pdf) | remeha-25l-pdf |
| `remeha-calenta-ace-matic-25l-cu-blocking` | 41 | NL tabel 225, p. 347–350 | [bron 9](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/7871254-Calenta-Ace-Matic-25L-ISM-SCB10-BE-de-fr-nl.pdf) | remeha-25l-pdf |
| `remeha-calenta-ace-matic-25l-cu-locking` | 47 | NL tabel 226, p. 350–354 | [bron 9](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/7871254-Calenta-Ace-Matic-25L-ISM-SCB10-BE-de-fr-nl.pdf) | remeha-25l-pdf |
| `remeha-calenta-ace-matic-25l-scb-warnings` | 60 | NL tabel 227, p. 355–359 | [bron 9](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/7871254-Calenta-Ace-Matic-25L-ISM-SCB10-BE-de-fr-nl.pdf) | remeha-25l-pdf |
| `remeha-calenta-ace-matic-25l-scb-blocking` | 134 | NL tabel 228, p. 359–369 | [bron 9](https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/7871254-Calenta-Ace-Matic-25L-ISM-SCB10-BE-de-fr-nl.pdf) | remeha-25l-pdf |
| `buderus-logamax-gb162-v2` | 52 | Tabel 17, p. 33-37 | [bron 10](https://buderus-be-fl.boschtt-documents.com/download/pdf/file/6720813438.pdf) | buderus-gb162-pdf |
| `viessmann-vitodens-200-300-vitotronic` | 71 | Officiële online tabel | [bron 11](https://www.viessmann.de/de/wissen/wartung-und-reparatur/fehlercodes.html) | G: declaratie/historisch register |
| `acv-prestige-mkiii` | 24 | p. 42-43; 664Y4200 H/03-2011 | [bron 12](https://downloads.acv.com/NT_664Y4200_H_Prestige_MkIII_NL.pdf) | acv-prestige-mkiii-pdf; geselecteerde tabel |
| `intergas-prestige` | 11 | § 8.1, p. 42; Prestige A CW6/NL/88136803 | [bron 13](https://www.intergas-verwarming.nl/app/uploads/2018/01/Installatievoorschrift-Prestige-88136803.pdf) | intergas-prestige-pdf; geselecteerde tabel-/displaycontext |
| `nefit-proline-hrc` | 54 | Tabel 25, p. 31-34 | [bron 14](https://www.nefit-bosch.nl/media/country_pool/professioneel/installateurs/installatie-instructie_proline.pdf) | G: declaratie/historisch register |
| `atag-officieel-overzicht` | 14 | Online merkoverzicht | [bron 15](https://www.atagwarmte.nl/atag-cv-ketel-storingscodes) | G: declaratie/historisch register |
| `itho-base-cube` | 26 | § 7.2-7.4, p. 79-95 | [bron 16](https://ithodaalderop.compano.com/Data/Environments/000001/Attachment/Bijlage/A01_CV-Ketels/A01_01_Doorstroom/A01_01_01_Cube%20Solo/B01_05_MAN/01-04199-001%20%20Handleiding%20Base%20Cube%20NL.pdf) | G: declaratie/historisch register |
| `ferroli-bluesense` | 37 | § 9, p. S12-S13 | [bron 17](https://www.ferroli.com/media/1547640352.pdf) | G: declaratie/historisch register |

## Exacte scope en niet ingevulde gaten

- Vaillant: publiek Belgisch overzicht naast ecoTEC plus CS/1-5,
  `0020282230_00`, 02.05.2023, België. De JSON koppelt alle negen exacte
  modellen aan hun artikelnummers uit p. 180; tabel Bijlage D pp. 225–236.
  Niet elke code verschijnt op elk product; andere varianten/revisies open.
- Bulex: publiek overzicht naast afzonderlijk THEMA Condens FAS 65,
  artikel `0010010389`, `0020124551_02`, 27.02.2015, BEnl, p. 10 en
  Bijlage D pp. 37–38. F54 is een regel uit het publieke overzicht, niet
  uit die FAS65-tabel. Task48 leest daarnaast historische installatiehandleiding
  `0020109430_06` (06/13), §13.3 p.33–34/PDF35–36, voor F AS 12-A,
  F AS 25-A, F AS 30-A, F AS 30-B, F 25/30-A, F 30/35-A, F 25/30-B
  en F 30/35-B. Aardgasvarianten BE/LU, propaanvarianten BE volgens de
  technische tabellen; daadwerkelijke toestelbestemming/gasvariant blijft
  bepalend. Alle 31 genummerde codes behouden, inclusief letterlijk `F 68`;
  vier streepjes en één lege codecel zijn geen verzonnen schermcodes.
  De lege vlamsignaalregel wordt niet F67 of een extra F65-betekenis. F54/F67
  ontbreken in deze tabel, niet bewezen onmogelijk op ieder toestel.
  F73/F74 krijgen elektrische diagnose, F77 gasmechanisme/optionele
  condensaatpomp, niet de FAS65-rookgasklep. Geen mantel openen, installateur-
  reparaties of veiligheidsbypass; onbekende artikel/firmwaremapping blijft
  `null`. Geen dekking van andere THEMA-varianten/nieuwste revisies afleiden.
- Bosch/Junkers: zes bestaande codeboekselecties blijven afzonderlijk, met
  begrensde scopes van de werkelijke hoofdstukken. Task49 leest het Nederlandse
  professionele codeboek, cover/voorwoord/inhoudsopgave/hoofdstukken/imprint en23
  relevante paginabeelden, niet opnieuw alle242 betekenissen/acties of alle268
  PDF-pagina's. Hoofdstukjaren/headers staan hierboven; -4/2013 is niet het
  afzonderlijke2015HMI-hoofdstuk p76. P132 bevat29 benoemde groepen plus twee
  grafische displayregels, niet verzonnen alfanumerieke codes. P103 laat het
  hoofdcodedeel van276/370 leeg; Aero/Modul-voorwaarden blijven modelgebonden.
  Voorwoord p2: de installatiegids vervangt geen productinstructies. Formele
  documentidentifier/editie/revisiedatum, exacte model/productidentifiers,
  artikel/firmware/markt blijven onbekend. Metadata2018 is geen uitgiftedatum;
  Belgische hosting/Mechelen-imprint is geen BE-only toesteltoepasbaarheid.
- Remeha Avanta: 17 gedeclareerde regels uit het online overzicht met
  historische scopedatum 17 september; geen nieuwe primaire lezing hier.
  Legacy Calenta 15s/25s/28c/35s/40c, `080715–117061-08`: E23 en Su19
  apart. Geen nieuw geverifieerd oorspronkelijk legacy-PDF in deze inventaris.
- Remeha Ace-Matic 25s/35s/30c/40c: werkelijke PDF-footer
  `7871265-05-04072025`, België/Luxemburg, NL tabellen 227–231,
  pp. 369–392; vijf aparte CU-GH-21/SCB-10-tabellen, 300 regels.
  De URL-bestandsnaam met ‘04’ is niet de werkelijke footerrevisie.
- Remeha Ace-Matic 25L: afzonderlijke footer
  `7871254-04-04072025`, België/Luxemburg, NL tabellen 224–228,
  pp. 346–369; vijf eigen catalogi/bronattributies, 300 regels.
  De volledige literal-bronkolomvergelijking uit Task45 vindt dezelfde
  codes/beschrijvingen/installateurkolommen in beide manuals. Dat bewijst
  geen firmware-, configuratie- of generatiecompatibiliteit. SCB geldt
  alleen met aanwezige uitbreiding/aangesloten componenten. Ontbrekende
  H03.254-beschrijving en broncontradicties blijven zichtbaar. Calenta Ace,
  Tzerra, Quinta en andere revisies zijn niet ineens gedekt.
- Buderus: uitsluitend GB162-70/85/100 V2, `6720813438` (2021/07), BE
  Nederlands, tabel 17 pp. 33–37. Gewone bedrijf/test/resetregels niet
  als storingen opgenomen; ontbrekende classificaties niet uitgevonden.
  Rookgastemperatuursensor in schema alleen voor Zwitserland: 1U317/1Y318
  alleen indien aanwezig. Exacte artikelnummers blijven onbekend.
- Viessmann: gedeclareerd Vitodens 200-W/300-W met Vitotronic;
  oriëntatie, niet universeel/volledig voor nieuwere generaties. Exacte
  modellen/productcodes/revisie/markt niet nieuw vastgesteld.
- ACV: werkelijk664Y4200 H/03-2011, Solo/Excellence18/32MkIII/ESYS.
  Geselecteerde42–43:23E+NTC/24groepen/25beschrijvingssubregels, E03samengevoegd.
  NTC temperatuurverschil, E37 geen drukrichting/grens; vier acties nietbijvullen.
  Historisch multi-country, geen BE-only/SKU/firmware/nieuwste compatibiliteit.
- Intergas: werkelijk Prestige A CW6/§8.1p42/88136803 op footer56.
  Elf bronregels/twintig nummers; knipperende storingsled met temperatuurdisplay,
  niet normale servicedisplaystates. NL-context, editie/revisie/ketelartikel/
  firmware/actuele Belgische toepasbaarheid onbekend; geen nieuwsteclaim.
- Nefit: declaratie ProLine HRC 24/CW3, 24/CW4, 30/CW5, tabel 25
  pp. 31–34. Exacte artikel/markt/taal/handboekrevisie nog niet herlezen.
- ATAG: gedeclareerd Nederlands online overzicht, Q-serie/ECZ in bestaande
  regeltekst. Geen exacte modeltoepasbaarheid op basis daarvan certificeren.
- Itho: gedeclareerd Base Cube, documentidentifier `01-04199-001`,
  §7.2–7.4 pp. 79–95; identifier is niet automatisch een footerrevisie/SKU.
- Ferroli: declaratie BlueSense 3/4/5, DRS9100 versie 9, §9 S12–S13.
  Nog geen nieuwe controle van werkelijke footer/markt/SKU in dit register.

JSON-`null` betekent: niet vastgesteld binnen deze afgebakende inventaris,
niet dat een gegeven niet bestaat. De velddeclaratie en de bewijsbasis blijven
onderscheiden. De negen PDF-SHA’s en twee bronweergave-SHA’s staan afzonderlijk
in `snapshots`; de eerdere leesrapporten blijven in de lokale recoveryledger.

## Vervolg binnen het bestaande meesterplan

[M04](briefs/wp03-first-five.md): Bulex-bezoekers kunnen ook zonder bekende
modelnaam veilig hulp vragen op de bestaande pagina. Task46–47 is geaccepteerd
als `b32084e5`: statische intakehulp met officiële handleidingselectie,
geen mantel openen/gevaarlijke foto’s, geen diagnose van een ander model en
bestaande contactcontext. Alle oorspronkelijke 43 regels/scopes en overige
twaalf gidsen blijven ongewijzigd. Task48 voegt uitsluitend de eigen 31 A/B-
regels toe en is inmiddels geaccepteerd als `e71fbf69`; de exacte CI, beide
werkelijke Productionstatuses, canonical tests en één IndexNow-ontvangstbewijs
staan apart in de QA-registratie. Task49's contextcorrectie bewaart alle
242codeobjecten/elf andere gidsen en is exact geaccepteerd als `64e93669`.
Task50's ACVcorrectie is exact geaccepteerd als `64d7f56e`; Task52's Intergas-
context en Task53's leesmarker zijn de huidige lokale kandidaten, nog niet live.

Verdere modeluitbreiding pas na exacte primaire toepasbaarheid/revisie en
consumentveilige uitleg; prioritair echte zoek-/intakevragen, niet verzonnen
modelvraag of een onbegrensde “alle modellen”-belofte. Onbekende productcodes,
bronbeschikbaarheid en technische controle blijven gates. Ook casebewijs,
plaatselijk klantbewijs, Franse tekstcontrole en accounttoegang worden hierdoor
niet opgelost. [Publicatiebeleid](content-publishing-policy.md) blijft gelden.
