# Phase E Service Area Report

**Implementation date:** 16 September 2026  
**Canonical website:** `https://www.abservice24.be`

## Registered coverage

The complete, generated municipality-by-municipality appendix is available in
`SERVICE_AREA_REGISTRY.md`; it records all 304 served records and the 302 draft/no-route statuses.

| Region | Registered municipalities | Published hub |
|---|---:|---|
| Province Antwerpen | 67 | `/werkgebied/antwerpen` |
| Limburg | 38 | `/werkgebied/limburg` |
| Oost-Vlaanderen | 55 | `/werkgebied/oost-vlaanderen` |
| Vlaams-Brabant | 63 | `/werkgebied/vlaams-brabant` |
| West-Vlaanderen | 62 | `/werkgebied/west-vlaanderen` |
| Brussels Hoofdstedelijk Gewest | 19 | `/werkgebied/brussel` |
| **Total** | **304** | **6 hubs** |

All 304 records have `served: true`. Individual municipality pages are not generated merely
because an area is served.

## Antwerp districts

All ten official districts are registered: Antwerpen, Berchem, Berendrecht-Zandvliet-Lillo,
Borgerhout, Borsbeek, Deurne, Ekeren, Hoboken, Merksem and Wilrijk.

- Antwerpen owns the homepage `/`; `/loodgieter-antwerpen` is intentionally not generated.
- Eight other districts have indexable `/loodgieter-{district}` pages.
- Berendrecht-Zandvliet-Lillo has a routable `noindex, follow` research page until URL and
  search-intent evidence are sufficient.
- Evidence per published district: owner-confirmed coverage, the prompt's explicit Antwerp
  district keyword priority, and official district/wijk geography from Stad in Cijfers.
- No district page claims a local project, review, office, technician base or arrival time.

## Publication and indexability

- 34 indexable routes in the central registry.
- 2 routable `noindex` pages: air conditioning and Berendrecht-Zandvliet-Lillo.
- 8 indexable district pages and 1 noindex district route.
- 6 regional coverage hubs.
- 302 municipality candidates remain data-only drafts.
- 302 individual municipality URLs are intentionally not generated.
- No service × municipality matrix is generated.

The municipality directory is server-rendered and progressively enhanced with an accessible
client-side filter. Municipality names remain plain text unless a genuine published destination
owns the intent.

## Internal links

- Global navigation links to `/werkgebied`.
- Homepage links to the full coverage directory.
- Footer links to the directory and all six hubs.
- The directory links to every hub and all ten Antwerp district destinations.
- Each hub links to central service pages rather than duplicating service content.
- District pages link to central services, tariffs, nearby districts and the Antwerp hub.
- Future projects must link to their district/municipality, province hub and central service page.

## Search Console opportunity

No Search Console query export was available in the repository during implementation. Therefore
no municipality page was published on assumed search volume. Use impressions, clicks, average
position, lead quality and genuine project evidence to reprioritise this list.

The registry includes the complete seven-factor scoring structure. Unknown search, commercial,
operational and competition inputs remain `null`, so `priorityScore` also remains `null` instead
of presenting invented research. Project and review evidence start at zero. Once every input is
evidenced, `calculateAreaPriorityScore` produces the reproducible total.

## Recommended next 20 municipality reviews

These are candidates for research and evidence collection, not pre-approved pages:

1. Edegem
2. Mortsel
3. Kontich
4. Schoten
5. Brasschaat
6. Kapellen
7. Wommelgem
8. Wijnegem
9. Aartselaar
10. Boechout
11. Ranst
12. Lier
13. Mechelen
14. Turnhout
15. Geel
16. Vilvoorde
17. Zaventem
18. Leuven
19. Gent
20. Hasselt

The sequence favours the Antwerp metropolitan area first, then proven high-value regional cities.
Before publication, each candidate still needs a distinct intent, sufficient unique local value,
similarity review and either genuine work evidence or a defensible customer-purpose case.

## Sources

- [Vlaanderen: 285 municipalities](https://www.vlaanderen.be/gemeenten-en-provincies/overzicht-van-vlaamse-steden-en-gemeenten)
- [Brussels: 19 municipalities](https://be.brussels/nl/over-het-gewest/structuur-en-organisatie/plaatselijke-besturen-en-gemeenten/gemeenten)
- [Antwerp: 10 districts](https://www.antwerpen.be/info/waarom-een-apart-bestuur-per-district)
- [Antwerp Stad in Cijfers: official area and wijk classification](https://stadincijfers.antwerpen.be/viewer/JiveEmbedded.aspx?favorite=ggw7_11002bez02&geolevel=ggw7&presel_code=introkaart_eengebied_new)
