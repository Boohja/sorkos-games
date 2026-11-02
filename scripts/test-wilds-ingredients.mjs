import test from 'node:test';
import { monstersById, bestTargets, hitzone, isBestHitzone, monsterDrops } from '../src/lib/data/monster-hunter-wilds/monster-details.ts';
import assert from 'node:assert/strict';
import { ingredients, searchEntries, searchIngredients, normalizeSearch, groupSources } from '../src/lib/data/monster-hunter-wilds/ingredients.ts';

test('partial equipment search resolves the complete upgrade recipe', () => {
    const result = searchIngredients('Smiting Fulg', 'weapon');
    const hit = result.find((item) => item.name === 'Smiting Fulgur I');
    assert.ok(hit);
    const equipment = ingredients.equipment.find((item) => item.id === hit.id);
    assert.equal(equipment.kind, 'great-sword');
    assert.equal(equipment.recipes[0].kind, 'upgrade');
    assert.equal(equipment.recipes[0].from.name, 'Chicken Decapitator I');
    assert.deepEqual(Object.fromEntries(equipment.recipes[0].materials.map((cost) => [ingredients.materials[cost.id].name, cost.quantity])), {
        'Guardian Fulgur Fang+': 5, 'Guardian Fulgur Tail': 1, 'Guardian Fulgur Certificate S': 2, 'Thunder Sac': 4,
    });
});

test('normal Target Rewards are distinct from special Investigation tables', () => {
    const fang = Object.values(ingredients.materials).find((item) => item.name === 'Guardian Fulgur Fang+');
    const group = groupSources(fang).find((group) => group.name === 'Guardian Fulgur Anjanath');
    assert.deepEqual(group.sources.filter((source) => source.method === 'Target Rewards').map((source) => [source.chance, source.quantity]), [[15, 1]]);
    assert.ok(group.sources.some((source) => source.part === 'Head' && source.chance === 30 && source.quantity === 2));
    assert.ok(group.sources.some((source) => source.method === 'Carving' && source.chance === 18));
    for (const material of Object.values(ingredients.materials)) {
        for (const source of material.sources) assert.doesNotMatch(source.method, /investigation|quest|mission/i);
    }
});

test('every recipe material and source monster resolves through a stable reference', () => {
    assert.equal(new Set(searchEntries.map((item) => item.id)).size, searchEntries.length);
    assert.equal(new Set(ingredients.equipment.filter((item) => item.type === 'weapon').map((item) => item.kind)).size, 14);
    for (const equipment of ingredients.equipment) {
        for (const recipe of equipment.recipes) {
            for (const cost of recipe.materials) {
                assert.ok(ingredients.materials[cost.id], equipment.name);
                assert.ok(Number.isInteger(cost.quantity) && cost.quantity > 0);
            }
        }
    }
    for (const material of Object.values(ingredients.materials)) {
        for (const source of material.sources) {
            if (source.kind === 'monster') assert.ok(ingredients.monsters[source.monsterId]);
            if (source.chance !== undefined) assert.ok(source.chance > 0 && source.chance <= 100);
        }
    }
    assert.equal(ingredients.metadata.sourceFailures.length, 0);
});

test('material names, Greek armor variants, and gathering sources are searchable', () => {
    assert.equal(normalizeSearch('G. Fulgur Mail α'), 'g fulgur mail alpha');
    assert.ok(searchIngredients('fulgur mail alpha', 'armor').some((item) => item.name === 'G. Fulgur Mail α'));
    assert.equal(searchIngredients('Thunder Sac')[0].name, 'Thunder Sac');
    assert.equal(searchIngredients('   ').length, 0);
    const iron = Object.values(ingredients.materials).find((item) => item.name === 'Iron Ore');
    assert.ok(iron.sources.some((source) => source.kind === 'gathering' && source.method === 'Mining Outcrop' && source.location === 'Windward Plains'));
});


test('monster search and linked drop materials use the same stable references', () => {
    const hit = searchIngredients('Gypceros', 'monster').find((entry) => entry.name === 'Gypceros');
    assert.equal(hit.id, 'monster:gypceros');
    assert.ok(searchIngredients('gypceros').some((entry) => entry.type === 'monster'));
    for (const entry of searchIngredients('invalid', 'monster')) assert.notEqual(entry.name, 'INVALID');
    for (const monster of Object.values(monstersById)) {
        assert.ok(ingredients.monsters[monster.id]);
        for (const drop of monsterDrops(monster)) {
            assert.ok(ingredients.materials[drop.materialId]);
            assert.doesNotMatch(drop.method, /investigation|quest|mission/i);
        }
    }
    const fulgur = monsterDrops(monstersById['monster:guardian-fulgur-anjanath']);
    const fang = fulgur.filter((drop) => ingredients.materials[drop.materialId].name === 'Guardian Fulgur Fang+');
    assert.deepEqual(fang.filter((drop) => drop.method === 'Target Rewards').map((drop) => [drop.chance, drop.quantity]), [[15, 1]]);
});

test('hitzones convert damage coefficients and preserve physical and elemental comparisons', () => {
    const monster = monstersById['monster:gypceros'];
    const targets = Object.fromEntries(bestTargets(monster).map((target) => [target.type, target]));
    assert.deepEqual([targets.slash.value, targets.slash.parts], [70, ['Tail']]);
    assert.deepEqual([targets.blunt.value, targets.blunt.parts], [55, ['Head']]);
    assert.deepEqual([targets.pierce.value, targets.pierce.parts], [80, ['Tail']]);
    assert.deepEqual([targets.fire.value, targets.fire.parts], [30, ['Head']]);
    assert.deepEqual(targets.thunder.parts, []);
    const head = monster.parts.find((part) => part.kind === 'head');
    assert.equal(hitzone(head, 'slash'), 45);
    assert.ok(isBestHitzone(head, 'blunt'));
    assert.ok(isBestHitzone(head, 'fire'));
    assert.equal(isBestHitzone(head, 'thunder'), false);
});
