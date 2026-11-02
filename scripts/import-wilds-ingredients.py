"""Build the local HR crafting index. No requests are made by the finished search UI.

MHDB supplies recipes and reusable monster records. Phantom Brawlers' material
source tables retain the regular Target Rewards / Investigation distinction.
Cache lives in the OS temp directory; use --refresh to download fresh responses.
"""
import concurrent.futures
import datetime
import gzip
import hashlib
import json
from pathlib import Path
import re
import sys
import tempfile
import time
import unicodedata
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'src/lib/data/monster-hunter-wilds'
CACHE = Path(tempfile.gettempdir()) / 'games-wilds-ingredients-cache'
CACHE.mkdir(exist_ok=True)
REFRESH = '--refresh' in sys.argv
UA = {'User-Agent': 'Mozilla/5.0'}
API = 'https://wilds.mhdb.io/en/'
SOURCES = 'https://www.phantombrawlers.com/mhwilds/Item/'

def fetch(url):
    path = CACHE / hashlib.sha256(url.encode()).hexdigest()
    if path.exists() and not REFRESH:
        return path.read_text(encoding='utf-8')
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=35) as response:
                text = response.read().decode('utf-8')
            path.write_text(text, encoding='utf-8')
            return text
        except Exception:
            if attempt == 2:
                raise
            time.sleep(1)

def slug(name):
    name = name.replace('α', 'alpha').replace('β', 'beta').replace('γ', 'gamma')
    return re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower()).strip('-')

class SourceTables(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tables, self.table, self.row, self.cell = [], None, None, None
        self.contexts, self.heading, self.table_heading, self.in_heading = [], '', '', False
    def handle_starttag(self, tag, attrs):
        if tag in ('h2', 'h3', 'h4'):
            self.in_heading, self.heading = True, ''
        if tag == 'table': self.table, self.table_heading = [], self.heading
        elif tag == 'tr' and self.table is not None: self.row = []
        elif tag in ('td', 'th') and self.row is not None: self.cell = ''
        elif tag == 'br' and self.cell is not None: self.cell += ' '
    def handle_data(self, value):
        if self.in_heading: self.heading += value
        if self.cell is not None: self.cell += value
    def handle_endtag(self, tag):
        if tag in ('h2', 'h3', 'h4'): self.in_heading = False
        if tag in ('td', 'th') and self.cell is not None:
            self.row.append(re.sub(r'\s+', ' ', self.cell).strip())
            self.cell = None
        elif tag == 'tr' and self.row is not None:
            self.table.append(self.row)
            self.row = None
        elif tag == 'table' and self.table is not None:
            self.tables.append(self.table)
            self.contexts.append(self.table_heading.strip())
            self.table = None

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    raw_items, weapons, armor, monsters = pool.map(lambda endpoint: json.loads(fetch(API + endpoint)), ['items', 'weapons', 'armor', 'monsters'])
items_by_api = {item['id']: item for item in raw_items}
materials = {}
equipment = []
weapon_ids = {weapon['id']: 'weapon:' + weapon['kind'] + ':' + str(weapon['gameId']) for weapon in weapons}

def costs(entries):
    output = []
    for entry in entries or []:
        raw = items_by_api[entry['item']['id']]
        key = 'item:' + str(raw['gameId'])
        materials.setdefault(key, {'id': key, 'gameId': raw['gameId'], 'name': raw['name'], 'rarity': raw['rarity'], 'sources': []})
        output.append({'id': key, 'quantity': entry['quantity']})
    return output

for weapon in weapons:
    if weapon['rarity'] < 5: continue
    crafting = weapon.get('crafting') or {}
    recipes = []
    for kind, field, price in [('forge', 'craftingMaterials', 'craftingZennyCost'), ('upgrade', 'upgradeMaterials', 'upgradeZennyCost')]:
        if not crafting.get(field): continue
        recipe = {'kind': kind, 'cost': crafting.get(price, 0), 'materials': costs(crafting[field])}
        if kind == 'upgrade' and crafting.get('previous'):
            previous = crafting['previous']
            recipe['from'] = {'id': weapon_ids[previous['id']], 'name': previous['name']}
        recipes.append(recipe)
    if recipes:
        equipment.append({'id': weapon_ids[weapon['id']], 'name': weapon['name'], 'type': 'weapon', 'kind': weapon['kind'], 'rarity': weapon['rarity'], 'recipes': recipes})
for piece in armor:
    if piece['rank'] != 'high': continue
    crafting = piece.get('crafting') or {}
    if not crafting.get('materials'): continue
    equipment.append({'id': 'armor:' + slug(piece['name']), 'name': piece['name'], 'type': 'armor', 'kind': piece['kind'], 'rarity': piece['rarity'], 'recipes': [{'kind': 'forge', 'cost': crafting.get('zennyCost', 0), 'materials': costs(crafting['materials'])}]})
assert len({entry['id'] for entry in equipment}) == len(equipment), 'Duplicate equipment IDs'

# Stable monster keys are shared by material sources and future monster tools.
monster_records = {}
for monster in monsters:
    key = 'monster:' + slug(monster['name'])
    monster_records[key] = {
        'id': key, 'gameId': monster['gameId'], 'name': monster['name'], 'kind': monster['kind'], 'species': monster['species'],
        'locations': [location['name'] for location in monster['locations']],
        'weaknesses': [{k: v for k, v in entry.items() if k != 'id'} for entry in monster['weaknesses']],
        'resistances': [{k: v for k, v in entry.items() if k != 'id'} for entry in monster['resistances']],
        'parts': [{'kind': part['kind'], 'multipliers': part['multipliers'], 'kinsectEssence': part.get('kinsectEssence')} for part in monster['parts']],
    }

# No table classification is inferred from the size of a percentage.
# Explicit source labels exclude special Investigation tables and quest rewards.
failures = []
def import_sources(material):
    url = SOURCES + urllib.parse.quote(material['name'], safe='')
    parser = SourceTables()
    try: parser.feed(fetch(url))
    except Exception as error: return material['id'], [], url, str(error)
    result = []
    for table in parser.tables:
        headers = next((row for row in table if row[:3] == ['Where', 'Rank', 'Reward Type']), None)
        if headers is None: continue
        for row in table[table.index(headers) + 1:]:
            if len(row) != 7: continue
            where, rank, method, part, quantity, chance, conditions = row
            if rank.lower() not in ('high', 'high rank'): continue
            if re.search(r'investigation|quest|mission|event reward', method, re.I): continue
            if not where or not method or where.upper() == 'INVALID': continue
            monster_key = 'monster:' + slug(where)
            is_monster = monster_key in monster_records or bool(re.search(r'carv|target reward|broken part|wound|slinger|fragment', method, re.I))
            entry = {'kind': 'monster' if is_monster else 'gathering', 'method': method, 'quantity': int(quantity) if quantity.isdigit() else 1}
            match = re.fullmatch(r'(\d+(?:\.\d+)?)\s*%', chance)
            if match: entry['chance'] = float(match.group(1))
            if part: entry['part'] = part
            if conditions: entry['conditions'] = conditions
            if is_monster: entry['monsterId'] = monster_key; entry['monsterName'] = where
            else: entry['location'] = where
            if entry not in result: result.append(entry)
    return material['id'], result, url, None

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    for index, (key, sources, url, error) in enumerate(pool.map(import_sources, materials.values()), 1):
        materials[key]['sources'] = sources
        materials[key]['sourceUrl'] = url
        if error: failures.append({'item': materials[key]['name'], 'error': error})
        for source in sources:
            if source['kind'] == 'monster' and source['monsterId'] not in monster_records:
                monster_records[source['monsterId']] = {'id': source['monsterId'], 'name': source['monsterName'], 'kind': 'small', 'locations': []}
        if index % 50 == 0: print('Sources imported:', index, '/', len(materials), flush=True)

# Enrich each monster with its complete normal High Rank drop table, not just
# materials already used by the equipment index. Quest/Investigation rows stay out.
items_by_name = {item['name']: item for item in raw_items}
monster_failures = []
def import_monster_drops(monster):
    url = 'https://www.phantombrawlers.com/mhwilds/Monsters/' + urllib.parse.quote(monster['name'], safe='')
    parser = SourceTables()
    try: parser.feed(fetch(url))
    except Exception as error: return monster['id'], [], url, str(error)
    rows = []
    for context, table in zip(parser.contexts, parser.tables):
        if context.lower() != 'high rank': continue
        headers = next((row for row in table if row[:3] == ['Reward Type', 'Part', 'Item']), None)
        if headers is None: continue
        for row in table[table.index(headers) + 1:]:
            if len(row) != 6: continue
            method, part, name, _, quantity, chance = row
            if re.search(r'investigation|quest|mission|event reward', method, re.I): continue
            raw = items_by_name.get(name)
            if not raw: continue
            value = re.fullmatch(r'(\d+(?:\.\d+)?)\s*%', chance)
            if not value or not quantity.isdigit(): continue
            drop = {'materialId': 'item:' + str(raw['gameId']), 'method': method, 'quantity': int(quantity), 'chance': float(value.group(1))}
            if part: drop['part'] = part
            if drop not in rows: rows.append(drop)
    return monster['id'], rows, url, None

valid_monsters = [monster for monster in monster_records.values() if monster['name'].upper() not in ('INVALID', '???')]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    for key, drops, url, error in pool.map(import_monster_drops, valid_monsters):
        monster_records[key]['drops'] = drops
        monster_records[key]['sourceUrl'] = url
        if error: monster_failures.append({'monster': monster_records[key]['name'], 'error': error})
        for drop in drops:
            raw = next(item for item in raw_items if 'item:' + str(item['gameId']) == drop['materialId'])
            material = materials.setdefault(drop['materialId'], {'id': drop['materialId'], 'gameId': raw['gameId'], 'name': raw['name'], 'rarity': raw['rarity'], 'sources': [], 'sourceUrl': SOURCES + urllib.parse.quote(raw['name'], safe='')})
            source = {k: value for k, value in drop.items() if k != 'materialId'}
            source.update({'kind': 'monster', 'monsterId': key, 'monsterName': monster_records[key]['name']})
            if source not in material['sources']: material['sources'].append(source)
monster_records.pop('monster:invalid', None)
print('Monster drop tables:', sum(bool(monster.get('drops')) for monster in monster_records.values()), '/', len(monster_records), flush=True)

metadata = {'importedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'recipesSource': 'https://wilds.mhdb.io/', 'rewardsSource': 'https://www.phantombrawlers.com/mhwilds/Monsters', 'rank': 'high', 'excluded': ['special-investigation-rewards', 'quest-rewards'], 'sourceFailures': failures, 'monsterSourceFailures': monster_failures}
database = {'metadata': metadata, 'equipment': sorted(equipment, key=lambda entry: entry['name']), 'materials': materials, 'monsters': {key: {k: value for k, value in monster.items() if k in ('id', 'name', 'kind')} for key, monster in monster_records.items()}}
# A known example guards against silently reintroducing special reward tables.
fang = next(item for item in materials.values() if item['name'] == 'Guardian Fulgur Fang+')
fang_sources = [source for source in fang['sources'] if source.get('monsterName') == 'Guardian Fulgur Anjanath']
assert [(source['chance'], source['quantity']) for source in fang_sources if source['method'] == 'Target Rewards'] == [(15, 1)]
assert any(source.get('part') == 'Head' and source['chance'] == 30 and source['quantity'] == 2 for source in fang_sources)
assert any(source['method'] == 'Carving' and source['chance'] == 18 for source in fang_sources)
smiting = next(entry for entry in equipment if entry['name'] == 'Smiting Fulgur I')
assert {materials[cost['id']]['name']: cost['quantity'] for cost in smiting['recipes'][0]['materials']} == {'Guardian Fulgur Fang+': 5, 'Guardian Fulgur Tail': 1, 'Guardian Fulgur Certificate S': 2, 'Thunder Sac': 4}
DEST.mkdir(exist_ok=True, parents=True)
for name, value in [('ingredients.json', database), ('monsters.json', {'metadata': metadata, 'monsters': monster_records})]:
    (DEST / name).write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

summary = {'equipment': len(equipment), 'weapons': sum(entry['type'] == 'weapon' for entry in equipment), 'armor': sum(entry['type'] == 'armor' for entry in equipment), 'materials': len(materials), 'materialsWithSources': sum(bool(item['sources']) for item in materials.values()), 'monsters': len(monster_records), 'sourceFailures': failures, 'gzipBytes': len(gzip.compress(json.dumps(database).encode()))}
print(json.dumps(summary, ensure_ascii=True), flush=True)
