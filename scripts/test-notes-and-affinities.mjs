import test from 'node:test';
import assert from 'node:assert/strict';
import { games } from '../src/lib/games.ts';
import { notesSyncPage, isSyncPageValue, syncPages } from '../src/lib/sync.ts';
import { monstersById, monsterAffinities } from '../src/lib/data/monster-hunter-wilds/monster-details.ts';
import { endgameGlaiveBuilds } from '../src/lib/data/monster-hunter-wilds/builds.ts';
import { ingredients } from '../src/lib/data/monster-hunter-wilds/ingredients.ts';

test('each game has an independent Markdown document registered with existing Sync', () => {
    const pages = games.map((game) => notesSyncPage(game.slug));
    assert.equal(new Set(pages.map((page) => page.storageKey)).size, games.length);
    const markdown = '# Notes\n\n- **Bold** and *italic*\n'.repeat(2000);
    for (const page of pages) {
        assert.equal(page.format, 'markdown');
        assert.ok(isSyncPageValue(page.route, page.storageKey, markdown));
        assert.ok(isSyncPageValue(page.route, page.storageKey, ''));
        assert.equal(isSyncPageValue(page.route, page.storageKey, ['not a document']), false);
    }
    assert.equal(isSyncPageValue(pages[0].route, pages[1].storageKey, markdown), false);
});

test('legacy checklist transfer validation still rejects Markdown and arbitrary payloads', () => {
    const page = syncPages.wildsAchievements;
    assert.ok(isSyncPageValue(page.route, page.storageKey, ['achievement-one']));
    for (const value of ['# Markdown', { text: 'notes' }, [123], null]) assert.equal(isSyncPageValue(page.route, page.storageKey, value), false);
});

test('monster summaries separate elements from strong status weaknesses and omit empty groups', () => {
    const chatacabra = monsterAffinities(monstersById['monster:chatacabra']);
    assert.deepEqual(chatacabra.map((group) => group.title), ['Effective', 'Weakness', 'Resistances']);
    assert.deepEqual(chatacabra[0].entries.map((entry) => entry.element), ['thunder']);
    assert.deepEqual(chatacabra[1].entries.map((entry) => entry.status), ['paralysis', 'poison']);
    assert.deepEqual(monsterAffinities(monstersById['monster:gypceros']).map((group) => group.title), ['Effective', 'Resistances']);
    assert.deepEqual(monsterAffinities({ id: 'empty', name: 'Empty', kind: 'small', locations: [] }), []);
});

test('both HR100 loadouts reference real armor from the local database', () => {
    for (const build of endgameGlaiveBuilds) {
        assert.equal(build.armor.length, 5);
        for (const name of build.armor) assert.ok(ingredients.equipment.some((entry) => entry.type === 'armor' && entry.name === name), name);
    }
});
