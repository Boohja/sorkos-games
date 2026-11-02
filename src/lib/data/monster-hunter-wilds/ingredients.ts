import snapshot from './ingredients.json' with { type: 'json' };

export type MaterialCost = { id: string; quantity: number };
export type Recipe = { kind: 'forge' | 'upgrade'; cost: number; from?: { id: string; name: string }; materials: MaterialCost[] };
export type Equipment = { id: string; name: string; type: 'weapon' | 'armor'; kind: string; rarity: number; recipes: Recipe[] };
export type MaterialSource = {
    kind: 'monster' | 'gathering'; method: string; quantity: number; chance?: number;
    part?: string; conditions?: string; monsterId?: string; monsterName?: string; location?: string;
};
export type Material = { id: string; gameId: number; name: string; rarity: number; sources: MaterialSource[]; sourceUrl: string };
export type MonsterReference = { id: string; name: string; kind: string };
export type IngredientsDatabase = {
    metadata: { importedAt: string; recipesSource: string; rewardsSource: string; rank: string; sourceFailures: { item: string; error: string }[] };
    equipment: Equipment[]; materials: Record<string, Material>; monsters: Record<string, MonsterReference>;
};
export type SearchEntry = { id: string; name: string; type: 'weapon' | 'armor' | 'material' | 'monster'; label: string; rarity?: number; normalized: string };
export type SearchKind = 'all' | SearchEntry['type'];

export const ingredients = snapshot as unknown as IngredientsDatabase;
export const equipmentById = new Map(ingredients.equipment.map((entry) => [entry.id, entry]));
export const kindLabels: Record<string, string> = {
    'great-sword': 'Great Sword', 'long-sword': 'Long Sword', 'sword-shield': 'Sword & Shield',
    'dual-blades': 'Dual Blades', hammer: 'Hammer', 'hunting-horn': 'Hunting Horn', lance: 'Lance',
    gunlance: 'Gunlance', 'switch-axe': 'Switch Axe', 'charge-blade': 'Charge Blade',
    'insect-glaive': 'Insect Glaive', 'light-bowgun': 'Light Bowgun', 'heavy-bowgun': 'Heavy Bowgun', bow: 'Bow',
    head: 'Head armor', chest: 'Chest armor', arms: 'Arm armor', waist: 'Waist armor', legs: 'Leg armor',
};
export function normalizeSearch(value: string) {
    return value.replaceAll('α', ' alpha ').replaceAll('β', ' beta ').replaceAll('γ', ' gamma ')
        .normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9+]+/g, ' ').trim();
}
export const searchEntries: SearchEntry[] = [
    ...ingredients.equipment.map((entry) => ({ id: entry.id, name: entry.name, type: entry.type, label: kindLabels[entry.kind] ?? entry.kind, rarity: entry.rarity, normalized: normalizeSearch(entry.name) })),
    ...Object.values(ingredients.materials).map((entry) => ({ id: entry.id, name: entry.name, type: 'material' as const, label: 'Material', rarity: entry.rarity, normalized: normalizeSearch(entry.name) })),
];
// Monster references stay in the tiny search index; full details load on demand.
searchEntries.push(...Object.values(ingredients.monsters)
    .filter((monster) => monster.name !== 'INVALID' && monster.name !== '???')
    .map((monster) => ({ id: monster.id, name: monster.name, type: 'monster' as const, label: monster.kind === 'large' ? 'Large monster' : 'Small monster', normalized: normalizeSearch(monster.name) })));
export function searchIngredients(query: string, kind: SearchKind = 'all') {
    const normalized = normalizeSearch(query);
    if (!normalized) return [];
    const tokens = normalized.split(/\s+/);
    return searchEntries.filter((entry) => (kind === 'all' || entry.type === kind) && tokens.every((token) => entry.normalized.includes(token)))
        .sort((a, b) => Number(b.normalized === normalized) - Number(a.normalized === normalized) || Number(b.normalized.startsWith(normalized)) - Number(a.normalized.startsWith(normalized)) || a.name.localeCompare(b.name));
}
export function groupSources(material: Material) {
    const groups = new Map<string, { id: string; name: string; kind: MaterialSource['kind']; sources: MaterialSource[] }>();
    for (const source of material.sources) {
        const id = source.monsterId ?? source.location ?? 'unknown';
        if (!groups.has(id)) groups.set(id, { id, name: ingredients.monsters[id]?.name ?? source.monsterName ?? source.location ?? 'Unknown source', kind: source.kind, sources: [] });
        groups.get(id)!.sources.push(source);
    }
    const priority: Record<string, number> = { 'Target Rewards': 0, 'Broken Part Rewards': 1, Carving: 2, 'Wound Destroyed Reward': 3 };
    return [...groups.values()].map((group) => ({ ...group, sources: [...group.sources].sort((a, b) => (priority[a.method] ?? 10) - (priority[b.method] ?? 10) || a.method.localeCompare(b.method)) }));
}
