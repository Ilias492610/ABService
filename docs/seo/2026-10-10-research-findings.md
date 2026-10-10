# Onderzoeksbevindingen — 10 oktober 2026

Dit verslag scheidt broncontrole, implementatiekeuzes en nog te meten effect. Het bevat
geen verzonnen zoekvolume, ranking, geïndexeerd aantal of omzetresultaat.

## Google: actuele richtlijnen

- De [actuele AI-richtlijn](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
  (bijgewerkt 10 juli 2026) benadrukt unieke, nuttige inhoud, crawlbaarheid, interne links,
  gebruikservaring en correcte bedrijfsinformatie. Google verlangt geen speciale AI-schema,
  tekst-“chunking” of llms.txt; dat laatste helpt de Google-ranking niet. De adviespagina's en
  onderhoudscheck zijn gebruiksgerichte verbeteringen, geen garantie op AI-vermeldingen.
- Dezelfde richtlijn verwijst inmiddels naar een Generative AI performance report en een
  Search Console-instelling voor opname. Controleer beschikbaarheid in de juiste eigenaarproperty;
  er zijn hier geen accountgegevens gecontroleerd. Herhaal niet ongecontroleerd oudere informatie
  dat AI-prestaties uitsluitend in het gewone Web-rapport samenkomen.
- [Spambeleid](https://developers.google.com/search/docs/essentials/spam-policies) geldt ook voor
  generatieve zoekresultaten. Grootschalige weinig nuttige pagina's en plaatsnaam-doorwaypagina's
  worden niet gerechtvaardigd door AI-productie. Geen massale gemeentevarianten, ingekochte links
  of gefingeerde externe vermeldingen toegevoegd.
- Volgens [Googles wijzigingslog](https://developers.google.com/search/updates#may-2026) verschijnt
  het FAQ-rich-result sinds **7 mei 2026** niet meer. Zichtbare veelgestelde vragen blijven nuttig;
  FAQ-markup levert geen beloofde zoekresultaatuitbreiding op.

## Onderhoud: Vlaanderen en Brussel niet samenvoegen

De [Vlaamse overheid](https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming)
onderscheidt centrale gas- en stookolietoestellen vanaf 20 kW (respectievelijk tweejaarlijks
en jaarlijks), kleinere toestellen (aanbevolen onderhoud) en vaste brandstof (jaarlijks).
Afzonderlijke geisers vallen niet automatisch onder die centrale-verwarmingsregel. De mogelijke
verlenging van maximaal drie maanden verschuift de oorspronkelijke volgende onderhoudscyclus niet.
Erkenning betreft de uitvoerende persoon; een bedrijfsnaam bewijst geen erkenning.

[Leefmilieu Brussel](https://leefmilieu.brussels/verwarmingsketel) vermeldt tweejaarlijkse EPB-controle
voor aardgasketels en gaswaterverwarmers en jaarlijkse controle voor stookolie/vaste brandstof,
zonder de Vlaamse 20 kW-selectie. Nieuwe/vervangen installaties vereisen daarnaast de relevante
[EPB-oplevering of eerste controle](https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/technische-installaties-epb-controles-en-onderhoud).
De check geeft daarom planningsinformatie met bron, geen conformiteits- of veiligheidsverklaring.
Informatie over stookolie/vaste brandstof is geen bevestiging dat AB Service die werken aanbiedt.

## Externe bronnen: uitvoerbare controle

`npm run sources:audit` op 10 oktober 2026 controleerde **47 unieke URL's** uit gemeentegegevens,
alle 13 merkcatalogi/documentatielinks, adviesbronnen, onderhoudsregels en gedeelde kernbronnen:
**46 HTTP 200**, één
HTTP 403 voor [Sibelga contact](https://www.sibelga.be/nl/contact?_country=BE).
Die 403 betekent dat dit automatische verzoek werd geweigerd; de precieze oorzaak is niet vastgesteld.
De onafhankelijke reviewer kon dezelfde officiële pagina via webretrieval openen en bevestigde
het gasnoodnummer 0800 19 400. Het script eindigde terecht met exitcode 1 zodat de uitzondering
zichtbaar blijft; de handmatige broncontrole ondersteunt dat de pagina nog bestaat.

De oude Bulex- en ACV-documentatiepaden zijn vervangen door bereikbare primaire pagina's:
[Bulex handleidingen](https://www.bulex.be/particulier/documentatie/technische-documentaties/handleidingen/)
en [ACV documentatie](https://www.acv.com/belgie/documentation).
De audit verwerkt nu grotere antwoordheaders: eerder veroorzaakte Node-fetch bij sommige
Vaillant/Bulex-bronnen een headerfout terwijl curl HTTP 200 bevestigde. Bereikbaarheid is geen
inhoudelijke validatie van elke code, handleidingversie of toepasselijk toestel.

De gasketelpagina verwijst niet meer naar het historische premiewebinar van januari 2025.
De actuele Mijn VerbouwPremie- en Mijn VerbouwLening-overzichten zijn opgenomen in
`content/core-sources.mjs`, naast druk- en erkenningsinformatie. De pagina belooft geen steun
of financieringsrecht. Het stopzetten van de gascondensatiepremie is bevestigd in de actuele
[officiële toolkit](https://www.vlaanderen.be/bouwen-wonen-en-energie/bouwen-en-verbouwen/premies-voor-renovatie/mijn-verbouwpremie/communicatietoolkit-voor-lokale-besturen-en-intermediairen).

## X/Twitter-ideeën: bruikbaar patroon versus onbewezen claim

Rechtstreekse X-posts bleken tijdens deze zoekronde niet betrouwbaar toegankelijk. Geen
spiegelpagina, cursusmarketing of viraal omzetcijfer is daarom als bewezen Twitter-case gebruikt.
Wel zijn twee primaire verslagen van de aanbieder zelf gelezen:
[Ahrefs over gratis tools](https://ahrefs.com/blog/lead-generation-tactics/#3-create-free-tools)
en [Ahrefs over zijn Twitter-aanpak](https://ahrefs.com/blog/ahrefs-twitter-marketing-strategy/).
Dit zijn praktijkideeën, geen onafhankelijk bewijs van resultaat voor AB Service.

- **Aangepast:** een kleine tool rond een echte klantvraag, gekoppeld aan een relevante dienst.
  De onderhoudscheck toont de volledige uitslag vóór een optionele aanvraag; geen e-mailpoort,
  verborgen antwoord of ongedekte prijsberekening.
- **Aangepast als vervolgidee:** één brononderbouwde tip uit een adviespagina delen, vragen van
  bewoners verzamelen en de inhoud verbeteren. Een bestaande gids hergebruiken is zinvoller
  dan automatisch tientallen posts publiceren. Er is niets extern gepost of verstuurd.
- **Niet onderbouwd/overgenomen:** gegarandeerde leads of top-rankings door gratis tools,
  universele publicatiefrequentie, betaalde mentions/backlinks, speciale AI-schema of llms.txt
  als Google-rankinghefboom. Test kwaliteit met echte aanvragen en eigenaar-GSC-data,
  niet met volgers, verzonnen omzet of een algemeen “SEO-score”-percentage.
