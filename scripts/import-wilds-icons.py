"""Download the local Wilds UI/large-monster icon set; standard library only."""
import concurrent.futures
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'static/images/monster-hunter-wilds/icons'
DATA = ROOT / 'src/lib/data/monster-hunter-wilds'
CATEGORY = 'https://monsterhunterwiki.org/wiki/Category:MHWilds_Monster_Icons'
def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=45) as response:
        return response.read()
class Images(HTMLParser):
    def __init__(self): super().__init__(); self.images = []
    def handle_starttag(self, tag, attrs):
        if tag == 'img': self.images.append(dict(attrs))
parser = Images()
parser.feed(fetch(CATEGORY).decode())
monster_urls = {}
monster_thumbnails = {}
for image in parser.images:
    url = html.unescape(image.get('src', ''))
    match = re.search(r'/images/thumb/([^/]+/[^/]+)/(MHWA-(.+)_Icon.webp)/', url)
    if match:
        name = urllib.parse.unquote(match[3]).replace('_', ' ')
        monster_thumbnails[name] = url
        monster_urls[name] = 'https://monsterhunterwiki.org/images/' + match[1] + '/' + match[2]
monsters = json.loads((DATA / 'monsters.json').read_text(encoding='utf8'))['monsters']
manifest = {'monsters': {}, 'thumbnails': {}, 'effects': {}, 'sources': {'monsters': CATEGORY, 'effects': 'https://www.phantombrawlers.com/mhwilds/Monsters/Gypceros'}}
jobs = []
for key, monster in monsters.items():
    if monster['kind'] != 'large': continue
    url = monster_urls[monster['name']]
    filename = 'monsters/' + key.removeprefix('monster:') + '.webp'
    manifest['monsters'][key] = '/images/monster-hunter-wilds/icons/' + filename
    jobs.append((filename, url))
    thumbnail = 'monsters/thumbnails/' + key.removeprefix('monster:') + '.webp'
    manifest['thumbnails'][key] = '/images/monster-hunter-wilds/icons/' + thumbnail
    jobs.append((thumbnail, monster_thumbnails[monster['name']]))

effects = {'slash': ('Slash', 'Cutting'), 'blunt': ('Blunt', 'Blunt'), 'pierce': ('Shot', 'Shot'), 'fire': ('Fire', 'fire'), 'water': ('Water', 'water'), 'thunder': ('Thunder', 'thunder'), 'ice': ('Ice', 'ice'), 'dragon': ('Dragon', 'dragon'), 'poison': ('Poison', 'poison'), 'paralysis': ('Paralysis', 'paralysis'), 'sleep': ('Sleep', 'sleep'), 'blastblight': ('Blast', 'blast'), 'stun': ('Stun', 'stun'), 'exhaust': ('Exhaust', 'exhaust'), 'flash': ('Flash', 'flash'), 'noise': ('Noise', 'screamer pod')}
for key, (label, upstream) in effects.items():
    filename = 'effects/' + key + '.png'
    url = 'https://www.phantombrawlers.com/static/mhwilds/Icons/' + urllib.parse.quote(upstream) + '.png'
    manifest['effects'][key] = {'label': label, 'src': '/images/monster-hunter-wilds/icons/' + filename}
    jobs.append((filename, url))
def download(job):
    filename, url = job
    target = ASSETS / filename
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        data = fetch(url)
        assert data.startswith((b'RIFF', b'\x89PNG')), 'Unexpected image response: ' + url
        target.write_bytes(data)
    return target.stat().st_size
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    total = sum(pool.map(download, jobs))
(DATA / 'icons.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(f'Downloaded {len(manifest["monsters"])} monster icons and {len(effects)} damage/status icons ({total:,} bytes).')
