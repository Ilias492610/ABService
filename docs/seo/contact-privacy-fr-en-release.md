# Contact en privacy FR/EN — begrensde release

Status 17 oktober 2026: lokaal geïmplementeerd onder expliciet goedgekeurd
[ontwerp](../superpowers/specs/2026-10-17-contact-privacy-fr-en-design.md) en
[uitvoeringsplan](../superpowers/plans/2026-10-17-contact-privacy-fr-en.md).
Onafhankelijke eindreview, publicatie, hosted CI en provider/liveacceptatie zijn
nog aparte gates; dit document is geen publicatie- of indexeringsbewijs.

| Functie | Nederlands blijft | Frans | Engels |
| --- | --- | --- | --- |
| Contact | `/contact` | `/fr/contact` | `/en/contact` |
| Privacy | `/privacy-policy` | `/fr/confidentialite` | `/en/privacy` |

Alleen deze vier nieuwe pagina's zijn toegevoegd: 84 published en 2 noindex,
tegenover 80 en 2. Nieuwe sitemapdatums17oktober; alle oude datums/velden blijven
gelijk. Privacy behoudt de inhoudelijke beleidsdatum13oktober. Vertalen voert
geen nieuwe bewaartermijn of gegevensverwerking in.

## Uitvoering en bewijs

41 Nederlandse routes zijn URL-neutraal naar `app/(nl)` verplaatst. API/social/
robots/sitemap/manifest/beelden blijven op hun bestaande plaats. Geïnstalleerde
Next-handleidingen waren leidend. Multiple roots veroorzaakten een echte andere
standaard404; de gedocumenteerde experimentele global404 hergebruikt nu de bestaande
Nederlandse hulp/shell/noindex. FrameworkmetadataBase-warnings blijven genoteerd;
de werkelijk geserveerde OG-URLs zijn publiek en correct, niet localhost.
Geen algemene waarschuwingvrije-buildclaim.

De eerste response heeft de juiste documenttaal, zes selfcanonicals, twee exacte
wederkerige hreflanggroepen, pagina-schema's en echte taalwissellinks. Geen taalhome,
automatische taalredirect of fictief alternatief voor een Nederlandse dienst.
Onvertaalde bestemmingen zijn herkenbaar als Nederlands. Navigatie/footer,
WhatsApp-begroeting, velden/fouten/status en socialonderwerpen zijn vertaald.
24/7-bereikbaarheid, echte Google-bron, media, functies en juridische zetel zonder
klantontvangst blijven behouden.

Het formulier houdt dezelfde twaalf Nederlandse dienstwaarden en validatielimieten.
Alleen een allowlisted taalvoorkeur reist apart mee; onbekend valt terug op NL.
Een return-URL vervangt nooit de vaste redirect. Alleen niet-NL krijgt intern een
voorkeurstaalregel. Ontvangers/escaping/consent/pendinglock/eventcodes en gefilterde
eventeigenschappen blijven gelijk. Transport is in tests gestubd; geen echte
FR/EN-mail, afspraak of inboxontvangst beweerd.

TDD: ontbrekende vertalingen/nativepaden, echte locale-contact404, ontbrekende
privacy/registry en NL-equivalenten faalden eerst. Lokale technische crawl86pagina's/
97interne links/116assets en zes-equivalenttaalaudit slagen; productieaudit0.
Oude fixture/hashliterals niet herijkt: exacte benoemde bron-/vierregistry-/tweeHTML-
toevoegingen worden alleen bij historische leesgrenzen teruggedraaid; onbekende/
extra drift blijft zichtbaar. De hele oude91responseverzameling behoudt status,
taal, canonical, main, footer en XML na alleen expliciete contactingang/schema/
taalnav/vierXML-toevoegingen plus vier benoemde lege React404-commentmarkers.

Echte browser: Franse validatie320, Engelse390 met eerste foutfocus en geen
overflow; Franse privacy320 heeft acht secties. Toetsenbordactiveerde English
levert echte `/en/privacy` met en-BE. Desktop1280 Services opent met Enter en sluit/
focust met Escape. Eerste Engelse focusmeting was vóór de bestaande smoothscroll
klaar was; later toont de werkelijke meting/screenshot naamveld vrij onder header.
Een zichtbaar samengevallen telefoonlabel is via echte RED→GREEN SSR-regressie
hersteld als één tekstnode, zonder Nederlands hero te wijzigen.

## Grenzen en volgende stap

AI-ondersteunde vertaling/controle, niet menselijke vakman-, juridische of
professionele taalreview. HeleWP15 blijft open: blijvend beheer, eventuele
technische vertalingen en echte klantopvolging/ontvangst zijn niet bewezen.
JS-uitgeschakelde browserproef is pending: beschikbare gedocumenteerde bediening
biedt geen JS-uitknop. Invalid-only native HTTP303 is apart bewezen, niet
hernoemd tot JS-off-browserproef of ontvangen aanvraag.

Cookie/toestemming is apart: Vercel Analytics heeft nog geen consentgate.
Eerdere bron/live-scriptcontrole bewijst geen vrijstelling/compliance; deze
taalrelease verandert dat gedrag niet. Geen nieuwe30dagentermijn, persoonlijke
erkenning, fysieke vakmancontrole, verzonnen klantdata of cases. Accounts/Maps,
echte prijzen enWP16 blijven eigenaar-uitgesteld; negen devbevindingen/lifecycle
apart van productie0. Geen outreach, rechten, accounts, DNS, imports of kosten.

Volgende: één onafhankelijke hele-releasebeoordeling; daarna alleen gecontroleerde
hashes naar bestaande main/Vercel en exacte CI/provider/livecontroles. Pas dan
IndexNow uitsluitend voor vier nieuwe substantiële URLs met publieke bewijsfile.
Geen onveranderde NL-pagina's of docs/runtime inzenden.

