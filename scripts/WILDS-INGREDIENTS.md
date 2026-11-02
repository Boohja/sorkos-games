# Monster Hunter Wilds database

The Database page searches a bundled snapshot without runtime API calls. Monster and damage/status icons are served from local static assets. The former `/monster-hunter-wilds/ingredients/` route redirects to `/monster-hunter-wilds/database/`.

- `src/lib/data/monster-hunter-wilds/ingredients.json`: HR equipment, recipes, materials and acquisition sources.
- `src/lib/data/monster-hunter-wilds/monsters.json`: independent reusable monster records with stable keys, game IDs where available, locations, weaknesses, resistances and parts. Loaded on demand when a monster is opened; includes regular High Rank drops.
- `src/lib/data/monster-hunter-wilds/ingredients.ts`: types, normalization and equipment/material/monster search.
- `src/lib/data/monster-hunter-wilds/monster-details.ts`: typed monster records, hitzone conversion, best targets and inverse drop lookup.

## Refresh

Run `python scripts/import-wilds-ingredients.py --refresh` from the repository root. Python standard library only. Responses are cached in the OS temporary directory; omit `--refresh` to reuse them.

Recipes and monster records come from https://wilds.mhdb.io/en/. Material sources come from https://www.phantombrawlers.com/mhwilds/Item/; full monster drop tables come from https://www.phantombrawlers.com/mhwilds/Monsters/. Numeric game facts are normalized locally; images and article descriptions are not imported. Source links and import date remain in the snapshot.

Weapons use Rarity 5+, armor uses the explicit High Rank flag. Materials are included by recipe reference and complete monster drop tables regardless of rarity. Forge and Upgrade recipes stay separate. Weapons use kind plus game ID as identity; items use game item IDs. Monster name slugs are shared keys that let small-monster records be enriched later.

Only explicit High Rank acquisition rows are imported. Quest, Mission and Investigation rewards are excluded by label, never by percentage. Quantity, part and conditions are retained. Materials without a matching non-quest source remain searchable and display an unavailable state. This includes quest/event-only materials and incomplete upstream tables; missing records do not establish that no source exists.

## Validation

Run `node --experimental-strip-types scripts/test-wilds-ingredients.mjs` and `npm run check`.

Tests cover Smiting Fulgur I, the regular 15% fang target reward, 30% head break with quantity two, 18% carve, all recipe and monster references, all 14 weapon types, armor variants, search and gathering sources. The importer validates the example before replacing output files.

Monster views share the local detail history with equipment and materials. Hitzone coefficients are multiplied by 100 for display; physical types and elements are compared separately. These base values do not represent build DPS or conditional/enraged states. All 34 large-monster records have body-part values. Small-monster records may lack them; empty upstream drop tables are represented explicitly, with an inverse material-source fallback where available. Import errors are retained in `metadata.monsterSourceFailures`. INVALID upstream placeholders are excluded.

## Icons

Run `python scripts/import-wilds-icons.py` to download missing large-monster and damage/status icons. Sources are Monster Hunter Wiki (MHWilds Monster Icons category) and Phantom Brawlers (Wilds UI icons); the script retains source URLs in `icons.json`. Images are loaded only where displayed.
