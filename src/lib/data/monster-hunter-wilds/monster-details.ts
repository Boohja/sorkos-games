import snapshot from './monsters.json' with { type: 'json' };
import { ingredients, type MaterialSource } from './ingredients.ts';

export const physicalTypes = ['slash', 'blunt', 'pierce'] as const;
export const elementalTypes = ['fire', 'water', 'thunder', 'ice', 'dragon'] as const;
export const damageTypes = [...physicalTypes, ...elementalTypes];
export type DamageType = typeof damageTypes[number];
export const damageLabels: Record<DamageType, string> = { slash: 'Slash', blunt: 'Blunt', pierce: 'Shot', fire: 'Fire', water: 'Water', thunder: 'Thunder', ice: 'Ice', dragon: 'Dragon' };
export type MonsterPart = { kind: string; multipliers: Partial<Record<DamageType | 'stun', number>>; kinsectEssence?: string | null };
export type MonsterEffect = { kind: string; element?: string; status?: string; effect?: string; level?: number; condition?: string | null };
export type MonsterDrop = { materialId: string; method: string; quantity: number; chance?: number; part?: string; conditions?: string };
export type MonsterDetails = { id: string; name: string; kind: string; species?: string; gameId?: number; locations: string[]; weaknesses?: MonsterEffect[]; resistances?: MonsterEffect[]; parts?: MonsterPart[]; drops?: MonsterDrop[]; sourceUrl?: string };
export const monstersById = snapshot.monsters as unknown as Record<string, MonsterDetails>;
export function readableName(value: string) {
    return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}
export function hitzone(part: MonsterPart, type: DamageType): number | undefined {
    const value = part.multipliers[type];
    return value === undefined ? undefined : Math.round(value * 100);
}
export function isBestHitzone(part: MonsterPart, type: DamageType) {
    const value = hitzone(part, type);
    const group = physicalTypes.includes(type as typeof physicalTypes[number]) ? physicalTypes : elementalTypes;
    const values = group.map((key) => hitzone(part, key)).filter((number): number is number => number !== undefined);
    return value !== undefined && value > 0 && value === Math.max(...values);
}
export function bestTargets(monster: MonsterDetails) {
    return damageTypes.map((type) => {
        const parts = monster.parts ?? [];
        const values = parts.map((part) => hitzone(part, type)).filter((value): value is number => value !== undefined);
        const value = values.length ? Math.max(...values) : 0;
        return { type, label: damageLabels[type], value, parts: value > 0 ? parts.filter((part) => hitzone(part, type) === value).map((part) => readableName(part.kind)) : [] };
    });
}
export function monsterDrops(monster: MonsterDetails): MonsterDrop[] {
    const drops = monster.drops?.length ? monster.drops : Object.values(ingredients.materials).flatMap((material) => material.sources
        .filter((source: MaterialSource) => source.monsterId === monster.id)
        .map((source) => ({ materialId: material.id, method: source.method, quantity: source.quantity, chance: source.chance, part: source.part, conditions: source.conditions })));
    return [...drops].sort((a, b) => ingredients.materials[a.materialId].name.localeCompare(ingredients.materials[b.materialId].name) || a.method.localeCompare(b.method));
}

export function monsterAffinities(monster: MonsterDetails) {
    const isElement = (entry: MonsterEffect) => elementalTypes.includes(entry.element as typeof elementalTypes[number]);
    return [
        { title: 'Effective', entries: (monster.weaknesses ?? []).filter(isElement) },
        { title: 'Weakness', entries: (monster.weaknesses ?? []).filter((entry) => !isElement(entry) && (entry.level ?? 0) >= 3) },
        { title: 'Resistances', entries: monster.resistances ?? [] },
    ].filter((group) => group.entries.length > 0);
}
